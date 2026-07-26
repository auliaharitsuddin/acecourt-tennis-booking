import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const courts = [
  {
    number: 1,
    name: "Center Court",
    surface: "Hard Court",
    indoor: false,
    pricePerHour: 150000,
    imageUrl: "/courts/court-1.svg",
    description: "Lapangan utama dengan pencahayaan terbaik, cocok untuk pertandingan kompetitif.",
  },
  {
    number: 2,
    name: "Garden Court",
    surface: "Clay Court",
    indoor: false,
    pricePerHour: 130000,
    imageUrl: "/courts/court-2.svg",
    description: "Permukaan clay yang lembut untuk lutut, dikelilingi taman hijau.",
  },
  {
    number: 3,
    name: "Indoor Arena A",
    surface: "Hard Court",
    indoor: true,
    pricePerHour: 180000,
    imageUrl: "/courts/court-3.svg",
    description: "Lapangan indoor ber-AC, bebas cuaca, tersedia sepanjang hari.",
  },
  {
    number: 4,
    name: "Indoor Arena B",
    surface: "Hard Court",
    indoor: true,
    pricePerHour: 180000,
    imageUrl: "/courts/court-4.svg",
    description: "Lapangan indoor kembar Arena A dengan sound system untuk turnamen.",
  },
  {
    number: 5,
    name: "Grass Court",
    surface: "Grass Court",
    indoor: false,
    pricePerHour: 200000,
    imageUrl: "/courts/court-5.svg",
    description: "Satu-satunya lapangan rumput di kota, pengalaman ala Wimbledon.",
  },
  {
    number: 6,
    name: "Sunset Court",
    surface: "Hard Court",
    indoor: false,
    pricePerHour: 140000,
    imageUrl: "/courts/court-6.svg",
    description: "Favorit untuk sesi sore, menghadap area lounge outdoor.",
  },
];

async function main() {
  for (const court of courts) {
    await prisma.court.upsert({
      where: { number: court.number },
      update: court,
      create: court,
    });
  }
  console.log(`Seeded ${courts.length} courts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
