-- CreateTable
CREATE TABLE "courts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surface" TEXT NOT NULL,
    "indoor" BOOLEAN NOT NULL DEFAULT false,
    "pricePerHour" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courtId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "startHour" INTEGER NOT NULL,
    "durationHours" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "notes" TEXT,
    "totalPrice" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" DATETIME,
    CONSTRAINT "bookings_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "courts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "courts_number_key" ON "courts"("number");

-- CreateIndex
CREATE INDEX "bookings_courtId_date_idx" ON "bookings"("courtId", "date");
