import type { ReactNode } from "react";
import type { Court } from "@/generated/prisma/client";
import { Home, Sun } from "lucide-react";
import { formatCurrency, formatDateLabel, formatHourRange } from "@/lib/booking";

export function OrderSummary({
  court,
  date,
  startHour,
  durationHours,
  children,
}: {
  court: Court;
  date: string;
  startHour: number;
  durationHours: number;
  children?: ReactNode;
}) {
  const totalPrice = court.pricePerHour * durationHours;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex gap-3">
        <div className="size-16 shrink-0 overflow-hidden rounded-xl">
          <img src={court.imageUrl} alt={court.name} className="size-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
            {court.indoor ? <Home className="size-3" /> : <Sun className="size-3" />}
            {court.indoor ? "Indoor" : "Outdoor"} &middot; {court.surface}
          </p>
          <p className="truncate font-heading text-base font-semibold text-foreground">
            {court.name}
          </p>
          <p className="text-xs text-muted-foreground">Lapangan #{court.number}</p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Tanggal</dt>
          <dd className="font-medium text-foreground">{formatDateLabel(date)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Jam</dt>
          <dd className="font-medium text-foreground">
            {formatHourRange(startHour, durationHours)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Durasi</dt>
          <dd className="font-medium text-foreground">{durationHours} jam</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Harga / jam</dt>
          <dd className="font-medium text-foreground">{formatCurrency(court.pricePerHour)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <p className="text-sm font-semibold text-foreground">Total</p>
        <p className="font-heading text-xl font-bold text-primary">
          {formatCurrency(totalPrice)}
        </p>
      </div>

      {children}
    </div>
  );
}
