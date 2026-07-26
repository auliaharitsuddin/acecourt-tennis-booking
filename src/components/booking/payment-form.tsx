"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Building2, Check, CreditCard, Loader2, Smartphone } from "lucide-react";
import type { Booking, Court } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { FlowHeader } from "@/components/booking/flow-header";
import { OrderSummary } from "@/components/booking/order-summary";
import { cn } from "@/lib/utils";

type PaymentMethod = "BANK_TRANSFER" | "E_WALLET" | "CREDIT_CARD";

const METHODS: { id: PaymentMethod; label: string; description: string; icon: typeof Building2 }[] = [
  {
    id: "BANK_TRANSFER",
    label: "Transfer Bank",
    description: "Virtual account BCA, Mandiri, BNI, BRI",
    icon: Building2,
  },
  {
    id: "E_WALLET",
    label: "E-Wallet",
    description: "GoPay, OVO, DANA, ShopeePay",
    icon: Smartphone,
  },
  {
    id: "CREDIT_CARD",
    label: "Kartu Kredit/Debit",
    description: "Visa, Mastercard, JCB",
    icon: CreditCard,
  },
];

function generateVirtualAccount(bookingId: string) {
  const digits = bookingId
    .split("")
    .map((c) => c.charCodeAt(0))
    .join("")
    .slice(0, 12);
  return `8807${digits}`.slice(0, 16);
}

export function PaymentForm({ booking }: { booking: Booking & { court: Court } }) {
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>("BANK_TRANSFER");
  const [processing, setProcessing] = useState(false);

  const virtualAccount = useMemo(() => generateVirtualAccount(booking.id), [booking.id]);

  const handlePay = async () => {
    setProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      const res = await fetch(`/api/bookings/${booking.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethod: method }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Pembayaran gagal. Coba lagi.");
        return;
      }

      toast.success("Pembayaran berhasil dikonfirmasi!");
      router.push(`/booking/success/${booking.id}`);
    } catch {
      toast.error("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <FlowHeader step={3} />

      <main className="flex-1 pb-28">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Pilih Metode Pembayaran
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Simulasi pembayaran &mdash; tidak ada transaksi finansial sungguhan.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {METHODS.map((m) => {
                  const active = method === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={cn(
                        "relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors cursor-pointer",
                        active
                          ? "border-primary bg-secondary/50 ring-2 ring-primary/20"
                          : "border-border bg-card hover:border-primary/40"
                      )}
                    >
                      {active && (
                        <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="size-3" />
                        </span>
                      )}
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <m.icon className="size-5" />
                      </span>
                      <span className="font-heading text-sm font-semibold text-foreground">
                        {m.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{m.description}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={method}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  {method === "BANK_TRANSFER" && (
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Transfer ke Virtual Account
                      </p>
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-muted px-4 py-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Nomor Virtual Account</p>
                          <p className="font-heading text-lg font-bold tracking-wider text-foreground">
                            {virtualAccount}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard?.writeText(virtualAccount);
                            toast.success("Nomor VA disalin");
                          }}
                        >
                          Salin
                        </Button>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Transfer sesuai jumlah total melalui ATM, mobile banking, atau internet
                        banking dari bank apa pun.
                      </p>
                    </div>
                  )}

                  {method === "E_WALLET" && (
                    <div className="flex flex-col items-center text-center">
                      <div className="grid size-40 grid-cols-6 gap-0.5 rounded-xl border border-border bg-white p-3">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              "rounded-[2px]",
                              (i * 7 + booking.id.length) % 3 === 0 ? "bg-foreground" : "bg-transparent"
                            )}
                          />
                        ))}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-foreground">
                        Scan QRIS dengan aplikasi e-wallet
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Mendukung GoPay, OVO, DANA, ShopeePay, dan aplikasi berlogo QRIS lainnya.
                      </p>
                    </div>
                  )}

                  {method === "CREDIT_CARD" && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-foreground">Detail Kartu</p>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Nomor Kartu (contoh: 4111 1111 1111 1111)"
                        maxLength={19}
                        className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="CVV"
                          maxLength={4}
                          className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Form simulasi &mdash; data kartu tidak dikirim atau disimpan di server.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div>
              <OrderSummary
                court={booking.court}
                date={booking.date}
                startHour={booking.startHour}
                durationHours={booking.durationHours}
              >
                <Button
                  size="lg"
                  disabled={processing}
                  onClick={handlePay}
                  className="mt-4 h-11 w-full cursor-pointer"
                >
                  {processing ? (
                    <>
                      <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                      Memproses...
                    </>
                  ) : (
                    "Bayar Sekarang"
                  )}
                </Button>
              </OrderSummary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
