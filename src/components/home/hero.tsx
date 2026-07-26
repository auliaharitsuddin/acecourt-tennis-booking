"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "./hero-visual";
import { AnimatedCounter } from "./animated-counter";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { value: 6, suffix: "", label: "Lapangan premium" },
  { value: 500, suffix: "+", label: "Booking selesai" },
  { value: 16, suffix: " jam", label: "Buka setiap hari" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,theme(colors.secondary),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-lime" />
            Booking online &middot; Konfirmasi instan
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
          >
            Main Tenis Tanpa Ribet,{" "}
            <span className="text-primary">Booking Lapangan</span> dalam Hitungan Detik
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Pilih lapangan favoritmu, tentukan tanggal dan jam, lalu bayar langsung
            online. Tidak perlu telepon, tidak perlu antre &mdash; slot lapangan
            terupdate secara real-time.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-12 cursor-pointer px-6 text-base"
              render={<Link href="/booking" />}
              nativeButton={false}
            >
              Booking Sekarang
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 cursor-pointer px-6 text-base"
              render={<Link href="/#cara-kerja" />}
              nativeButton={false}
            >
              <PlayCircle className="size-4" data-icon="inline-start" />
              Lihat Cara Kerja
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}
