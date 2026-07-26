import { prisma } from "@/lib/prisma";
import { BookingFlow } from "@/components/booking/booking-flow";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ court?: string }>;
}) {
  const { court } = await searchParams;
  const courts = await prisma.court.findMany({ orderBy: { number: "asc" } });
  const initialCourtId = court && courts.some((c) => c.id === court) ? court : undefined;

  return <BookingFlow courts={courts} initialCourtId={initialCourtId} />;
}
