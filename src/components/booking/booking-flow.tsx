"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Home, Sun } from "lucide-react";
import type { Court } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { FlowHeader } from "@/components/booking/flow-header";
import { DateStrip } from "@/components/booking/date-strip";
import { TimeSlotGrid } from "@/components/booking/time-slot-grid";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDateLabel, formatHourRange, toDateKey } from "@/lib/booking";

type AvailabilityBooking = { courtId: string; startHour: number; durationHours: number };

export function BookingFlow({
  courts,
  initialCourtId,
}: {
  courts: Court[];
  initialCourtId?: string;
}) {
  const router = useRouter();
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(
    initialCourtId ?? courts[0]?.id ?? null
  );
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [duration, setDuration] = useState<1 | 2>(1);
  const [selectedStartHour, setSelectedStartHour] = useState<number | null>(null);
  const [bookings, setBookings] = useState<AvailabilityBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // Reset the selected hour whenever the court, date, or duration changes,
  // since a previous selection may no longer be valid.
  const selectionKey = `${selectedCourtId}-${selectedDate}-${duration}`;
  const [prevSelectionKey, setPrevSelectionKey] = useState(selectionKey);
  if (selectionKey !== prevSelectionKey) {
    setPrevSelectionKey(selectionKey);
    setSelectedStartHour(null);
  }

  useEffect(() => {
    let active = true;
    fetch(`/api/availability?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (active) setBookings(data.bookings ?? []);
      })
      .catch(() => {
        if (active) toast.error("Gagal memuat ketersediaan jadwal.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selectedDate]);

  const selectedCourt = useMemo(
    () => courts.find((c) => c.id === selectedCourtId) ?? null,
    [courts, selectedCourtId]
  );

  const courtBookings = useMemo(
    () => bookings.filter((b) => b.courtId === selectedCourtId),
    [bookings, selectedCourtId]
  );

  const totalPrice = selectedCourt ? selectedCourt.pricePerHour * duration : 0;
  const canContinue = Boolean(selectedCourt && selectedStartHour !== null);

  const handleContinue = () => {
    if (!canContinue || !selectedCourt || selectedStartHour === null) return;
    const params = new URLSearchParams({
      court: selectedCourt.id,
      date: selectedDate,
      hour: String(selectedStartHour),
      duration: String(duration),
    });
    router.push(`/booking/checkout?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <FlowHeader step={1} />

      <main className="flex-1 pb-32">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Pilih Lapangan &amp; Jadwal
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Ketersediaan jam diperbarui secara real-time berdasarkan booking lain.
          </p>

          {/* Court selector */}
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-foreground">1. Pilih Lapangan</h2>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {courts.map((court) => {
                const active = court.id === selectedCourtId;
                return (
                  <button
                    key={court.id}
                    type="button"
                    onClick={() => setSelectedCourtId(court.id)}
                    className={cn(
                      "group relative flex w-56 shrink-0 overflow-hidden rounded-2xl border text-left transition-colors cursor-pointer",
                      active ? "border-primary ring-2 ring-primary/25" : "border-border hover:border-primary/40"
                    )}
                  >
                    <div className="relative h-full w-20 shrink-0">
                      <img
                        src={court.imageUrl}
                        alt={court.name}
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5 bg-card p-3">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                        {court.indoor ? <Home className="size-3" /> : <Sun className="size-3" />}
                        {court.indoor ? "Indoor" : "Outdoor"}
                      </span>
                      <span className="font-heading text-sm font-semibold leading-tight text-foreground">
                        {court.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{court.surface}</span>
                      <span className="mt-1 text-xs font-semibold text-primary">
                        {formatCurrency(court.pricePerHour)}/jam
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Date selector */}
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-foreground">2. Pilih Tanggal</h2>
            <div className="mt-3">
              <DateStrip
                value={selectedDate}
                onChange={(date) => {
                  setLoading(true);
                  setSelectedDate(date);
                }}
              />
            </div>
          </section>

          {/* Duration + time slots */}
          <section className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-foreground">3. Pilih Jam &amp; Durasi</h2>
              <div className="inline-flex rounded-lg border border-border bg-card p-1">
                {[1, 2].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d as 1 | 2)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                      duration === d
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {d} Jam
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full border border-border bg-card" /> Tersedia
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-primary" /> Dipilih
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-muted" /> Terisi
              </span>
            </div>

            <div className="mt-4">
              {loading ? (
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
                  ))}
                </div>
              ) : (
                <TimeSlotGrid
                  bookings={courtBookings}
                  duration={duration}
                  selectedStartHour={selectedStartHour}
                  onSelect={setSelectedStartHour}
                />
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Sticky summary bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            {selectedCourt ? (
              <>
                <p className="truncate text-sm font-semibold text-foreground">
                  {selectedCourt.name}
                  {selectedStartHour !== null && (
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      &middot; {formatHourRange(selectedStartHour, duration)}
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {formatDateLabel(selectedDate)}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Pilih lapangan untuk memulai</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <p className="hidden font-heading text-lg font-bold text-foreground sm:block">
              {formatCurrency(totalPrice)}
            </p>
            <Button
              size="lg"
              disabled={!canContinue}
              onClick={handleContinue}
              className="h-11 cursor-pointer px-5"
            >
              Lanjutkan
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
