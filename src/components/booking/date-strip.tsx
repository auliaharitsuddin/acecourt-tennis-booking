"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { toDateKey } from "@/lib/booking";

const DAY_COUNT = 14;

function buildDays(): { key: string; weekday: string; day: number; month: string }[] {
  const days = [];
  const today = new Date();
  for (let i = 0; i < DAY_COUNT; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      key: toDateKey(date),
      weekday: new Intl.DateTimeFormat("id-ID", { weekday: "short" }).format(date),
      day: date.getDate(),
      month: new Intl.DateTimeFormat("id-ID", { month: "short" }).format(date),
    });
  }
  return days;
}

export function DateStrip({
  value,
  onChange,
}: {
  value: string;
  onChange: (dateKey: string) => void;
}) {
  const days = buildDays();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {days.map((d) => {
        const active = d.key === value;
        return (
          <button
            key={d.key}
            type="button"
            onClick={() => onChange(d.key)}
            className={cn(
              "relative flex shrink-0 flex-col items-center justify-center rounded-xl border px-3.5 py-2.5 text-center transition-colors cursor-pointer",
              active
                ? "border-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
            )}
            style={{ minWidth: 64 }}
          >
            {active && (
              <motion.span
                layoutId="date-strip-active"
                className="absolute inset-0 rounded-xl bg-primary"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="relative z-10 text-[11px] font-medium uppercase opacity-80">
              {d.weekday}
            </span>
            <span className="relative z-10 font-heading text-lg font-bold leading-tight">
              {d.day}
            </span>
            <span className="relative z-10 text-[10px] opacity-80">{d.month}</span>
          </button>
        );
      })}
    </div>
  );
}
