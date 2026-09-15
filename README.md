# AceCourt

A tennis court booking app. Browse six courts, pick a date and time slot, check out, and pay — all in one flow, backed by a real database.

**Live demo:** https://auliaharitsuddin.github.io/acecourt-tennis-booking/ (static build with seeded sample data — bookings and payments are simulated, nothing writes to a real server)

## What it does

AceCourt runs a full booking cycle for a tennis facility with six courts of different surfaces (hard, clay, grass) and settings (indoor, outdoor). A customer checks court availability by date, selects an open hour slot, fills in contact details, chooses a payment method, and gets a confirmed booking.

## Features

- **Court catalog** — six courts, each with its own surface type, price per hour, indoor/outdoor status, and description.
- **Availability check** — slot picker shows which hours (6:00–22:00) are open for a chosen date and court, blocking hours already booked.
- **Booking flow** — select date, start hour, and duration (1 or 2 hours), then enter customer name, phone, and email.
- **Checkout** — review the booking summary and total price before confirming.
- **Payment simulation** — choose bank transfer, e-wallet, or credit card; booking status moves from pending to paid.
- **Booking management API** — REST endpoints to list courts, check availability, create a booking, fetch a booking by ID, and mark it paid.

## Glossary

- **Court** — a physical tennis court, identified by number, with its own surface and price.
- **Slot** — a one-hour block of availability, from 6:00 to 22:00.
- **Booking status** — `PENDING` (created, not yet paid), `PAID` (payment confirmed), or `CANCELLED`.

## Running it

Requires Node.js and npm.

```bash
npm install
npx prisma generate
npm run db:seed
npm run dev
```

The app starts on `http://localhost:3001`. `npm run db:seed` populates the SQLite database with the six sample courts.

For a production build: `npm run build` then `npm run start`.

## Tech stack

Next.js, React, Prisma with a SQLite adapter, Tailwind CSS, and shadcn-based UI components.

---

## Bahasa Indonesia

Aplikasi pemesanan lapangan tenis. Jelajahi enam lapangan, pilih tanggal dan jam, lakukan checkout, dan bayar — semua dalam satu alur, dengan database sungguhan di baliknya.

**Demo live:** https://auliaharitsuddin.github.io/acecourt-tennis-booking/ (versi statis dengan data contoh — booking dan pembayaran hanya simulasi, tidak ada yang tersimpan ke server nyata)

## Fungsi

AceCourt menjalankan siklus pemesanan penuh untuk fasilitas tenis dengan enam lapangan berbeda permukaan (hard, clay, rumput) dan setting (indoor, outdoor). Pelanggan mengecek ketersediaan lapangan berdasarkan tanggal, memilih jam kosong, mengisi data kontak, memilih metode pembayaran, lalu mendapat booking terkonfirmasi.

## Semua fitur

- **Katalog lapangan** — enam lapangan, masing-masing dengan jenis permukaan, harga per jam, status indoor/outdoor, dan deskripsi sendiri.
- **Cek ketersediaan** — pemilih slot menampilkan jam mana (6:00–22:00) yang kosong untuk tanggal dan lapangan yang dipilih, jam yang sudah dibooking otomatis terkunci.
- **Alur booking** — pilih tanggal, jam mulai, dan durasi (1 atau 2 jam), lalu isi nama, telepon, dan email pelanggan.
- **Checkout** — tinjau ringkasan booking dan total harga sebelum konfirmasi.
- **Simulasi pembayaran** — pilih transfer bank, e-wallet, atau kartu kredit; status booking berubah dari pending ke paid.
- **API manajemen booking** — endpoint REST untuk daftar lapangan, cek ketersediaan, buat booking, ambil booking berdasarkan ID, dan tandai lunas.

## Istilah

- **Court** — lapangan tenis fisik, diidentifikasi dengan nomor, punya permukaan dan harga sendiri.
- **Slot** — blok ketersediaan satu jam, dari 6:00 sampai 22:00.
- **Status booking** — `PENDING` (dibuat, belum dibayar), `PAID` (pembayaran terkonfirmasi), atau `CANCELLED`.

## Cara menjalankan

Butuh Node.js dan npm.

```bash
npm install
npx prisma generate
npm run db:seed
npm run dev
```

Aplikasi berjalan di `http://localhost:3001`. `npm run db:seed` mengisi database SQLite dengan enam lapangan contoh.

Untuk build produksi: `npm run build` lalu `npm run start`.

## Tumpukan teknologi

Next.js, React, Prisma dengan adapter SQLite, Tailwind CSS, dan komponen UI berbasis shadcn.
