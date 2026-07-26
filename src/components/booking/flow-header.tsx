"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Pilih Jadwal" },
  { id: 2, label: "Data Diri" },
  { id: 3, label: "Pembayaran" },
  { id: 4, label: "Selesai" },
];

export function FlowHeader({ step }: { step: 1 | 2 | 3 | 4 }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-base font-bold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Trophy className="size-3.5" />
          </span>
          <span className="hidden sm:inline">AceCourt</span>
        </Link>

        <ol className="flex items-center gap-1.5 sm:gap-3">
          {STEPS.map((s, index) => {
            const state = s.id < step ? "done" : s.id === step ? "active" : "todo";
            return (
              <li key={s.id} className="flex items-center gap-1.5 sm:gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors sm:size-7 sm:text-xs",
                      state === "done" && "bg-primary text-primary-foreground",
                      state === "active" && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                      state === "todo" && "bg-muted text-muted-foreground"
                    )}
                  >
                    {state === "done" ? <Check className="size-3.5" /> : s.id}
                  </span>
                  <span
                    className={cn(
                      "hidden text-xs font-medium sm:block",
                      state === "todo" ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <span className="h-px w-4 bg-border sm:w-8" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <motion.div
        className="h-0.5 bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${(step / STEPS.length) * 100}%` }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </header>
  );
}
