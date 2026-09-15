import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/booking-flow";
import { DemoBookingGate } from "@/components/booking/demo-gates";
import { STATIC_DEMO } from "@/lib/demo-data";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ court?: string }>;
}) {
  if (STATIC_DEMO) {
    return (
      <Suspense fallback={null}>
        <DemoBookingGate />
      </Suspense>
    );
  }

  const { court } = await searchParams;
  const courts = await (await import("@/lib/prisma")).prisma.court.findMany({ orderBy: { number: "asc" } });
  const initialCourtId = court && courts.some((c) => c.id === court) ? court : undefined;

  return <BookingFlow courts={courts} initialCourtId={initialCourtId} />;
}
