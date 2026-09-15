import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CLOSE_HOUR, OPEN_HOUR } from "@/lib/booking";
import { CheckoutForm } from "@/components/booking/checkout-form";
import { DemoCheckoutGate } from "@/components/booking/demo-gates";
import { STATIC_DEMO } from "@/lib/demo-data";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ court?: string; date?: string; hour?: string; duration?: string }>;
}) {
  if (STATIC_DEMO) {
    return (
      <Suspense fallback={null}>
        <DemoCheckoutGate />
      </Suspense>
    );
  }

  const params = await searchParams;
  const courtId = params.court;
  const date = params.date;
  const hour = Number(params.hour);
  const duration = Number(params.duration);

  if (
    !courtId ||
    !date ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isInteger(hour) ||
    hour < OPEN_HOUR ||
    hour >= CLOSE_HOUR ||
    (duration !== 1 && duration !== 2)
  ) {
    redirect("/booking");
  }

  const court = await (await import("@/lib/prisma")).prisma.court.findUnique({ where: { id: courtId } });
  if (!court) {
    redirect("/booking");
  }

  return (
    <CheckoutForm
      court={court}
      date={date}
      startHour={hour}
      durationHours={duration as 1 | 2}
    />
  );
}
