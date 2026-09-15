"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Court } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FlowHeader } from "@/components/booking/flow-header";
import { OrderSummary } from "@/components/booking/order-summary";
import { STATIC_DEMO } from "@/lib/demo-data";
import { saveDemoBooking } from "@/lib/demo-storage";

type FieldErrors = Partial<Record<"customerName" | "customerPhone" | "customerEmail", string>>;

function validate(values: {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (values.customerName.trim().length < 2) {
    errors.customerName = "Nama minimal 2 karakter";
  }
  if (!/^[0-9+\s-]{8,20}$/.test(values.customerPhone.trim())) {
    errors.customerPhone = "Nomor telepon tidak valid";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.customerEmail.trim())) {
    errors.customerEmail = "Format email tidak valid";
  }
  return errors;
}

export function CheckoutForm({
  court,
  date,
  startHour,
  durationHours,
}: {
  court: Court;
  date: string;
  startHour: number;
  durationHours: 1 | 2;
}) {
  const router = useRouter();
  const [values, setValues] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    try {
      if (STATIC_DEMO) {
        saveDemoBooking({
          id: "demo",
          courtId: court.id,
          date,
          startHour,
          durationHours,
          customerName: values.customerName,
          customerPhone: values.customerPhone,
          customerEmail: values.customerEmail,
          notes: values.notes || null,
          totalPrice: court.pricePerHour * durationHours,
          status: "PENDING",
          paymentMethod: null,
          createdAt: new Date().toISOString(),
          paidAt: null,
        });
        toast.info("Mode demo — booking ini tidak disimpan ke server.");
        router.push("/booking/payment/demo");
        return;
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courtId: court.id,
          date,
          startHour,
          durationHours,
          ...values,
          notes: values.notes || undefined,
        }),
      });
      const data = await res.json();

      if (res.status === 409) {
        toast.error(data.error ?? "Slot ini baru saja dipesan orang lain.");
        router.push("/booking");
        return;
      }
      if (!res.ok) {
        toast.error(data.error ?? "Gagal membuat booking. Coba lagi.");
        return;
      }

      router.push(`/booking/payment/${data.booking.id}`);
    } catch {
      toast.error("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <FlowHeader step={2} />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Lengkapi Data Diri
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Data ini digunakan untuk konfirmasi booking dan verifikasi di lapangan.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border bg-card p-5 sm:p-6"
            >
              <div>
                <Label htmlFor="customerName">
                  Nama Lengkap <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerName"
                  autoComplete="name"
                  placeholder="cth. Budi Santoso"
                  value={values.customerName}
                  onChange={(e) => setValues((v) => ({ ...v, customerName: e.target.value }))}
                  aria-invalid={Boolean(errors.customerName)}
                  className="mt-1.5 h-11"
                />
                {errors.customerName && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.customerName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="customerPhone">
                  Nomor WhatsApp <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="08123456789"
                  value={values.customerPhone}
                  onChange={(e) => setValues((v) => ({ ...v, customerPhone: e.target.value }))}
                  aria-invalid={Boolean(errors.customerPhone)}
                  className="mt-1.5 h-11"
                />
                {errors.customerPhone && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.customerPhone}</p>
                )}
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Bukti booking akan dikirim melalui nomor ini.
                </p>
              </div>

              <div>
                <Label htmlFor="customerEmail">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  value={values.customerEmail}
                  onChange={(e) => setValues((v) => ({ ...v, customerEmail: e.target.value }))}
                  aria-invalid={Boolean(errors.customerEmail)}
                  className="mt-1.5 h-11"
                />
                {errors.customerEmail && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.customerEmail}</p>
                )}
              </div>

              <div>
                <Label htmlFor="notes">Catatan (opsional)</Label>
                <Textarea
                  id="notes"
                  placeholder="cth. butuh sewa raket tambahan"
                  value={values.notes}
                  onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
                  className="mt-1.5"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="h-11 w-full cursor-pointer"
              >
                {submitting ? (
                  <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                ) : null}
                Lanjutkan ke Pembayaran
                {!submitting && <ArrowRight className="size-4" data-icon="inline-end" />}
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <OrderSummary
                court={court}
                date={date}
                startHour={startHour}
                durationHours={durationHours}
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
