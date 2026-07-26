export const OPEN_HOUR = 6;
export const CLOSE_HOUR = 22;

export function getBookableHours(): number[] {
  const hours: number[] = [];
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) hours.push(h);
  return hours;
}

export function formatHourLabel(hour: number): string {
  return `${hour.toString().padStart(2, "0")}:00`;
}

export function formatHourRange(startHour: number, durationHours: number): string {
  return `${formatHourLabel(startHour)} - ${formatHourLabel(startHour + durationHours)}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateLabel(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function hoursOverlap(
  startA: number,
  durationA: number,
  startB: number,
  durationB: number
): boolean {
  const endA = startA + durationA;
  const endB = startB + durationB;
  return startA < endB && startB < endA;
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  BANK_TRANSFER: "Transfer Bank",
  E_WALLET: "E-Wallet",
  CREDIT_CARD: "Kartu Kredit/Debit",
};
