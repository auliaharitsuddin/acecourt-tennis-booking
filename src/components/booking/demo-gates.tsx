"use client";

// Client-side wrappers used only by the static-export ("GitHub Pages") demo
// build. They replace server-side searchParams/prisma reads (unsupported by
// `output: export`) with client-side URL/sessionStorage reads, so the same
// UI components (BookingFlow, CheckoutForm, PaymentForm, SuccessView) can
// render from a "fake DB" instead of the real one.
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Booking, Court } from "@/generated/prisma/client";
import { demoCourts, getDemoCourt } from "@/lib/demo-data";
import { loadDemoBooking, type DemoBooking } from "@/lib/demo-storage";
import { CLOSE_HOUR, OPEN_HOUR } from "@/lib/booking";
import { BookingFlow } from "@/components/booking/booking-flow";
import { CheckoutForm } from "@/components/booking/checkout-form";
import { PaymentForm } from "@/components/booking/payment-form";
import { SuccessView } from "@/components/booking/success-view";

function asBooking(booking: DemoBooking, court: Court) {
  // Structurally compatible with Booking & { court: Court } for the fields
  // these read-only views actually use (id/date/hour/duration/status/etc).
  return { ...booking, court } as unknown as Booking & { court: Court };
}

export function DemoBookingGate() {
  const searchParams = useSearchParams();
  const court = searchParams.get("court");
  const initialCourtId = court && demoCourts.some((c) => c.id === court) ? court : undefined;
  return <BookingFlow courts={demoCourts} initialCourtId={initialCourtId} />;
}

export function DemoCheckoutGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courtId = searchParams.get("court");
  const date = searchParams.get("date");
  const hour = Number(searchParams.get("hour"));
  const duration = Number(searchParams.get("duration"));
  const court = courtId ? getDemoCourt(courtId) : undefined;

  const valid =
    court &&
    date &&
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    Number.isInteger(hour) &&
    hour >= OPEN_HOUR &&
    hour < CLOSE_HOUR &&
    (duration === 1 || duration === 2);

  useEffect(() => {
    if (!valid) router.replace("/booking");
  }, [valid, router]);

  if (!valid || !court) return null;
  return <CheckoutForm court={court} date={date!} startHour={hour} durationHours={duration as 1 | 2} />;
}

export function DemoPaymentGate() {
  const router = useRouter();
  const [booking, setBooking] = useState<DemoBooking | null>(null);

  useEffect(() => {
    const b = loadDemoBooking();
    if (!b || b.status === "CANCELLED") {
      router.replace("/booking");
      return;
    }
    if (b.status === "PAID") {
      router.replace("/booking/success/demo");
      return;
    }
    setBooking(b);
  }, [router]);

  if (!booking) return null;
  const court = getDemoCourt(booking.courtId);
  if (!court) return null;
  return <PaymentForm booking={asBooking(booking, court)} />;
}

export function DemoSuccessGate() {
  const router = useRouter();
  const [booking, setBooking] = useState<DemoBooking | null>(null);

  useEffect(() => {
    const b = loadDemoBooking();
    if (!b || b.status !== "PAID") {
      router.replace("/booking");
      return;
    }
    setBooking(b);
  }, [router]);

  if (!booking) return null;
  const court = getDemoCourt(booking.courtId);
  if (!court) return null;
  return <SuccessView booking={asBooking(booking, court)} />;
}
