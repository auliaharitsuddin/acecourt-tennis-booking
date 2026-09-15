"use client";

// sessionStorage-backed "fake DB" for a single booking, used only in the
// static-export demo (no server/API available on GitHub Pages).
export type DemoBookingStatus = "PENDING" | "PAID" | "CANCELLED";

export type DemoBooking = {
  id: string;
  courtId: string;
  date: string;
  startHour: number;
  durationHours: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string | null;
  totalPrice: number;
  status: DemoBookingStatus;
  paymentMethod: "BANK_TRANSFER" | "E_WALLET" | "CREDIT_CARD" | null;
  createdAt: string;
  paidAt: string | null;
};

const KEY = "acecourt-demo-booking";

export function saveDemoBooking(booking: DemoBooking) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(booking));
  } catch {
    // ignore (private browsing / storage disabled) — demo still works,
    // it just won't survive navigation.
  }
}

export function loadDemoBooking(): DemoBooking | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DemoBooking) : null;
  } catch {
    return null;
  }
}
