import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SuccessView } from "@/components/booking/success-view";

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { court: true },
  });

  if (!booking || booking.status !== "PAID") {
    redirect("/booking");
  }

  return <SuccessView booking={booking} />;
}
