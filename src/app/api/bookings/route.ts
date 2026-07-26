import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { CLOSE_HOUR, OPEN_HOUR, hoursOverlap, toDateKey } from "@/lib/booking";

const createBookingSchema = z.object({
  courtId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startHour: z.number().int().min(OPEN_HOUR).max(CLOSE_HOUR - 1),
  durationHours: z.union([z.literal(1), z.literal(2)]),
  customerName: z.string().trim().min(2, "Nama minimal 2 karakter").max(80),
  customerPhone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{8,20}$/, "Nomor telepon tidak valid"),
  customerEmail: z.string().trim().email("Email tidak valid"),
  notes: z.string().trim().max(300).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = createBookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data tidak valid", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.startHour + data.durationHours > CLOSE_HOUR) {
    return NextResponse.json(
      { error: "Durasi melebihi jam operasional lapangan" },
      { status: 400 }
    );
  }

  const todayKey = toDateKey(new Date());
  if (data.date < todayKey) {
    return NextResponse.json(
      { error: "Tanggal tidak boleh di masa lalu" },
      { status: 400 }
    );
  }

  const court = await prisma.court.findUnique({ where: { id: data.courtId } });
  if (!court) {
    return NextResponse.json({ error: "Lapangan tidak ditemukan" }, { status: 404 });
  }

  const existing = await prisma.booking.findMany({
    where: {
      courtId: data.courtId,
      date: data.date,
      status: { in: ["PENDING", "PAID"] },
    },
    select: { startHour: true, durationHours: true },
  });

  const hasConflict = existing.some((b) =>
    hoursOverlap(data.startHour, data.durationHours, b.startHour, b.durationHours)
  );

  if (hasConflict) {
    return NextResponse.json(
      { error: "Slot waktu ini baru saja dipesan orang lain. Silakan pilih jam lain." },
      { status: 409 }
    );
  }

  const totalPrice = court.pricePerHour * data.durationHours;

  const booking = await prisma.booking.create({
    data: {
      courtId: data.courtId,
      date: data.date,
      startHour: data.startHour,
      durationHours: data.durationHours,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      notes: data.notes || null,
      totalPrice,
    },
  });

  return NextResponse.json({ booking }, { status: 201 });
}
