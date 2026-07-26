"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Home, Sun } from "lucide-react";
import type { Court } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/booking";

export function CourtShowcase({ courts }: { courts: Court[] }) {
  return (
    <section id="lapangan" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Lapangan Kami
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Enam lapangan dengan permukaan dan suasana berbeda, semua terawat dan
              siap dipesan.
            </p>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer"
            render={<Link href="/booking" />}
            nativeButton={false}
          >
            Lihat Semua Jadwal
            <ArrowRight className="size-4" data-icon="inline-end" />
          </Button>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courts.map((court, index) => (
            <motion.div
              key={court.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
            >
              <Link href={`/booking?court=${court.id}`} className="block">
                <div className="relative aspect-[8/5] overflow-hidden">
                  <img
                    src={court.imageUrl}
                    alt={`${court.name} - ${court.surface}`}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 gap-1 bg-background/90 text-foreground">
                    {court.indoor ? <Home className="size-3" /> : <Sun className="size-3" />}
                    {court.indoor ? "Indoor" : "Outdoor"}
                  </Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {court.name}
                    </h3>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      Lapangan #{court.number}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{court.surface}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {court.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <p className="font-heading text-base font-bold text-foreground">
                      {formatCurrency(court.pricePerHour)}
                      <span className="text-xs font-normal text-muted-foreground">/jam</span>
                    </p>
                    <span className="text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                      Booking &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
