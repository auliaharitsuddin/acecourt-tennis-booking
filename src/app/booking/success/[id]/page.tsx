import { redirect } from "next/navigation";
import { SuccessView } from "@/components/booking/success-view";
import { DemoSuccessGate } from "@/components/booking/demo-gates";
import { STATIC_DEMO } from "@/lib/demo-data";

export async function generateStaticParams() {
  return STATIC_DEMO ? [{ id: "demo" }] : [];
}

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (STATIC_DEMO) {
    return <DemoSuccessGate />;
  }

  const { id } = await params;

  const booking = await (await import("@/lib/prisma")).prisma.booking.findUnique({
    where: { id },
    include: { court: true },
  });

  if (!booking || booking.status !== "PAID") {
    redirect("/booking");
  }

  return <SuccessView booking={booking} />;
}
