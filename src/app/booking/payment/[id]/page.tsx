import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PaymentForm } from "@/components/booking/payment-form";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { court: true },
  });

  if (!booking) {
    redirect("/booking");
  }

  if (booking.status === "PAID") {
    redirect(`/booking/success/${booking.id}`);
  }

  if (booking.status === "CANCELLED") {
    redirect("/booking");
  }

  return <PaymentForm booking={booking} />;
}
