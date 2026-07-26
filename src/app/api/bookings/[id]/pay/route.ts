import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const paySchema = z.object({
  paymentMethod: z.enum(["BANK_TRANSFER", "E_WALLET", "CREDIT_CARD"]),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = paySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Metode pembayaran tidak valid" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) {
    return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });
  }

  if (booking.status === "PAID") {
    return NextResponse.json({ booking });
  }

  if (booking.status === "CANCELLED") {
    return NextResponse.json({ error: "Booking ini sudah dibatalkan" }, { status: 400 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: {
      status: "PAID",
      paymentMethod: parsed.data.paymentMethod,
      paidAt: new Date(),
    },
  });

  return NextResponse.json({ booking: updated });
}
