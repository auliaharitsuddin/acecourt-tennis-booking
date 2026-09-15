import { redirect } from "next/navigation";
import { PaymentForm } from "@/components/booking/payment-form";
import { DemoPaymentGate } from "@/components/booking/demo-gates";
import { STATIC_DEMO } from "@/lib/demo-data";

// Static export can only pre-render a fixed set of dynamic-segment values.
// The demo always uses the single id "demo" (see demo-storage.ts); the real
// app keeps its normal per-request dynamic rendering (dynamicParams stays
// true, so unlisted ids still resolve on the server as before).
export async function generateStaticParams() {
  return STATIC_DEMO ? [{ id: "demo" }] : [];
}

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (STATIC_DEMO) {
    return <DemoPaymentGate />;
  }

  const { id } = await params;

  const booking = await (await import("@/lib/prisma")).prisma.booking.findUnique({
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
