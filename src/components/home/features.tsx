"use client";

import { motion } from "motion/react";
import { ShieldCheck, Zap, Wallet, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-time Availability",
    description: "Jadwal lapangan selalu up-to-date, tidak ada risiko booking ganda.",
  },
  {
    icon: Wallet,
    title: "Pembayaran Fleksibel",
    description: "Transfer bank, e-wallet, atau kartu kredit — pilih yang paling nyaman.",
  },
  {
    icon: ShieldCheck,
    title: "Konfirmasi Terjamin",
    description: "Setiap booking langsung mendapat bukti digital yang bisa ditunjukkan di lokasi.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dukungan Responsif",
    description: "Tim kami siap membantu jika ada perubahan jadwal atau pertanyaan lain.",
  },
];

export function Features() {
  return (
    <section id="kenapa-kami" className="border-t border-border bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Kenapa Booking di AceCourt
          </h2>
          <p className="mt-3 text-muted-foreground">
            Dibangun untuk pemain tenis yang menghargai waktu &mdash; cepat, transparan,
            dan tanpa drama.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
