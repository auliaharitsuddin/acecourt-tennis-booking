// Static-export ("GitHub Pages demo") data source. Only used when the app is
// built with next.config.pages.ts (STATIC_DEMO=true, no server/DB available).
// Mirrors prisma/seed.ts so the demo shows the same courts as the real app.
import type { Court } from "@/generated/prisma/client";

export const STATIC_DEMO = process.env.STATIC_DEMO === "1";
const BASE_PATH = process.env.BASE_PATH ?? "";

export const demoCourts: Court[] = [
  {
    id: "court-1",
    number: 1,
    name: "Center Court",
    surface: "Hard Court",
    indoor: false,
    pricePerHour: 150000,
    imageUrl: `${BASE_PATH}/courts/court-1.svg`,
    description: "Lapangan utama dengan pencahayaan terbaik, cocok untuk pertandingan kompetitif.",
  },
  {
    id: "court-2",
    number: 2,
    name: "Garden Court",
    surface: "Clay Court",
    indoor: false,
    pricePerHour: 130000,
    imageUrl: `${BASE_PATH}/courts/court-2.svg`,
    description: "Permukaan clay yang lembut untuk lutut, dikelilingi taman hijau.",
  },
  {
    id: "court-3",
    number: 3,
    name: "Indoor Arena A",
    surface: "Hard Court",
    indoor: true,
    pricePerHour: 180000,
    imageUrl: `${BASE_PATH}/courts/court-3.svg`,
    description: "Lapangan indoor ber-AC, bebas cuaca, tersedia sepanjang hari.",
  },
  {
    id: "court-4",
    number: 4,
    name: "Indoor Arena B",
    surface: "Hard Court",
    indoor: true,
    pricePerHour: 180000,
    imageUrl: `${BASE_PATH}/courts/court-4.svg`,
    description: "Lapangan indoor kembar Arena A dengan sound system untuk turnamen.",
  },
  {
    id: "court-5",
    number: 5,
    name: "Grass Court",
    surface: "Grass Court",
    indoor: false,
    pricePerHour: 200000,
    imageUrl: `${BASE_PATH}/courts/court-5.svg`,
    description: "Satu-satunya lapangan rumput di kota, pengalaman ala Wimbledon.",
  },
  {
    id: "court-6",
    number: 6,
    name: "Sunset Court",
    surface: "Hard Court",
    indoor: false,
    pricePerHour: 140000,
    imageUrl: `${BASE_PATH}/courts/court-6.svg`,
    description: "Favorit untuk sesi sore, menghadap area lounge outdoor.",
  },
];

export function getDemoCourt(id: string): Court | undefined {
  return demoCourts.find((c) => c.id === id);
}

// Deterministic "already booked" slots per date so the availability grid
// isn't empty in the demo. Not random — same date always shows the same
// pattern, derived from a tiny string hash.
function hashDate(date: string): number {
  let h = 0;
  for (let i = 0; i < date.length; i++) h = (h * 31 + date.charCodeAt(i)) >>> 0;
  return h;
}

export function getDemoAvailability(
  date: string
): { courtId: string; startHour: number; durationHours: number }[] {
  const h = hashDate(date);
  return demoCourts.slice(0, 3).map((court, i) => ({
    courtId: court.id,
    startHour: 9 + ((h >> (i * 4)) % 9), // within 6-21 bookable range
    durationHours: ((h >> (i * 2 + 1)) % 2) + 1,
  }));
}
