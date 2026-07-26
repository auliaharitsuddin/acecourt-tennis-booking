import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Parameter 'date' wajib diisi dengan format YYYY-MM-DD" },
      { status: 400 }
    );
  }

  const bookings = await prisma.booking.findMany({
    where: {
      date,
      status: { in: ["PENDING", "PAID"] },
    },
    select: {
      id: true,
      courtId: true,
      startHour: true,
      durationHours: true,
      status: true,
    },
  });

  return NextResponse.json({ bookings });
}
