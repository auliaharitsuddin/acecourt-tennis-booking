import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { court: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ booking });
}
