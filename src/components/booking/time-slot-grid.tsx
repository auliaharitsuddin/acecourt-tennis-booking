"use client";

import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLOSE_HOUR, formatHourLabel, getBookableHours, hoursOverlap } from "@/lib/booking";

type ExistingBooking = { startHour: number; durationHours: number };

export function TimeSlotGrid({
  bookings,
  duration,
  selectedStartHour,
  onSelect,
}: {
  bookings: ExistingBooking[];
  duration: 1 | 2;
  selectedStartHour: number | null;
  onSelect: (hour: number) => void;
}) {
  const hours = getBookableHours();

  const isBooked = (startHour: number) => {
    if (startHour + duration > CLOSE_HOUR) return true;
    return bookings.some((b) => hoursOverlap(startHour, duration, b.startHour, b.durationHours));
  };

  const isSelectedRange = (hour: number) =>
    selectedStartHour !== null && hour >= selectedStartHour && hour < selectedStartHour + duration;

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
      {hours.map((hour) => {
        const booked = isBooked(hour);
        const selected = isSelectedRange(hour);
        const isPrimarySlot = selected && hour === selectedStartHour;

        return (
          <motion.button
            key={hour}
            type="button"
            disabled={booked}
            onClick={() => onSelect(hour)}
            whileTap={!booked ? { scale: 0.96 } : undefined}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 rounded-xl border px-2 py-3 text-sm font-medium transition-colors",
              booked &&
                "cursor-not-allowed border-border bg-muted text-muted-foreground/60",
              !booked &&
                !selected &&
                "cursor-pointer border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary/60",
              selected && "cursor-pointer border-primary bg-primary text-primary-foreground"
            )}
          >
            {booked ? <Lock className="size-3.5" /> : null}
            <span>{formatHourLabel(hour)}</span>
            {isPrimarySlot && duration === 2 && (
              <span className="text-[10px] font-normal opacity-80">
                s/d {formatHourLabel(hour + duration)}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
