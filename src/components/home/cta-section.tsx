"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-16 sm:py-20"
        >
          <motion.div
            aria-hidden
            className="absolute -right-10 -top-10 size-40 rounded-full bg-lime/90"
            animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-16 -left-10 size-56 rounded-full bg-white/10"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <h2 className="relative font-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Siap Main Hari Ini?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Cek jadwal lapangan yang masih kosong dan amankan slot favoritmu sebelum
            diambil orang lain.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 cursor-pointer px-7 text-base"
              render={<Link href="/booking" />}
              nativeButton={false}
            >
              Booking Lapangan Sekarang
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
