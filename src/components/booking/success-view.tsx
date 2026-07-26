"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check, Download, Home as HomeIcon, Mail, Phone, User } from "lucide-react";
import type { Booking, Court } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { FlowHeader } from "@/components/booking/flow-header";
import { OrderSummary } from "@/components/booking/order-summary";
import { PAYMENT_METHOD_LABELS } from "@/lib/booking";

const confettiOffsets = [
  { x: -70, y: -40 }, { x: 70, y: -50 }, { x: -90, y: 10 },
  { x: 90, y: 20 }, { x: -40, y: -80 }, { x: 45, y: -75 },
  { x: 0, y: -95 }, { x: -95, y: -10 },
];

export function SuccessView({ booking }: { booking: Booking & { court: Court } }) {
  const bookingCode = booking.id.slice(-8).toUpperCase();

  return (
    <div className="flex min-h-screen flex-col">
      <FlowHeader step={4} />

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="relative flex flex-col items-center text-center">
            {confettiOffsets.map((offset, i) => (
              <motion.span
                key={i}
                className="absolute top-8 size-2 rounded-full bg-lime"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], x: offset.x, y: offset.y, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
              />
            ))}

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Check className="size-10" strokeWidth={3} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Booking Berhasil Dikonfirmasi!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="mt-2 max-w-md text-sm text-muted-foreground"
            >
              Tunjukkan kode booking berikut kepada petugas lapangan saat kamu tiba.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.4 }}
              className="mt-5 rounded-2xl border-2 border-dashed border-primary/40 bg-secondary/40 px-8 py-3"
            >
              <p className="text-xs text-muted-foreground">Kode Booking</p>
              <p className="font-heading text-2xl font-bold tracking-[0.2em] text-primary">
                {bookingCode}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-5"
          >
            <OrderSummary
              court={booking.court}
              date={booking.date}
              startHour={booking.startHour}
              durationHours={booking.durationHours}
            />

            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground">Detail Pemesan</p>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5">
                  <User className="size-4 text-muted-foreground" />
                  <dd className="text-foreground">{booking.customerName}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="size-4 text-muted-foreground" />
                  <dd className="text-foreground">{booking.customerPhone}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="size-4 text-muted-foreground" />
                  <dd className="text-foreground">{booking.customerEmail}</dd>
                </div>
              </dl>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">Metode Pembayaran</span>
                <span className="font-medium text-foreground">
                  {booking.paymentMethod ? PAYMENT_METHOD_LABELS[booking.paymentMethod] : "-"}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              variant="outline"
              className="h-11 flex-1 cursor-pointer"
              onClick={() => window.print()}
            >
              <Download className="size-4" data-icon="inline-start" />
              Simpan Bukti Booking
            </Button>
            <Button
              size="lg"
              className="h-11 flex-1 cursor-pointer"
              render={<Link href="/" />}
              nativeButton={false}
            >
              <HomeIcon className="size-4" data-icon="inline-start" />
              Kembali ke Beranda
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
