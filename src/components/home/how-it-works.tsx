"use client";

import { motion } from "motion/react";
import { CalendarSearch, Clock3, CreditCard } from "lucide-react";

const steps = [
  {
    icon: CalendarSearch,
    title: "Pilih Lapangan & Tanggal",
    description:
      "Jelajahi 6 lapangan dengan permukaan berbeda, lihat ketersediaan jam secara real-time.",
  },
  {
    icon: Clock3,
    title: "Tentukan Jam Bermain",
    description:
      "Pilih slot 1 atau 2 jam yang tersedia langsung dari grid interaktif, tanpa perlu konfirmasi manual.",
  },
  {
    icon: CreditCard,
    title: "Bayar & Main",
    description:
      "Selesaikan pembayaran online melalui transfer, e-wallet, atau kartu, lalu tunjukkan bukti booking di lapangan.",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="border-t border-border bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Booking Semudah 3 Langkah
          </h2>
          <p className="mt-3 text-muted-foreground">
            Dari pilih lapangan sampai siap main, semua bisa selesai dalam waktu kurang
            dari dua menit.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-heading text-5xl font-bold text-secondary select-none">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <span className="mt-4 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <step.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
