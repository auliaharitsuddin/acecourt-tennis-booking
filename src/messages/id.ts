// Indonesian strings — the app's original/default language.
export const id = {
  common: {
    indoor: "Indoor",
    outdoor: "Outdoor",
    hour: "jam",
  },
  header: {
    nav: {
      courts: "Lapangan",
      howItWorks: "Cara Kerja",
      whyUs: "Kenapa Kami",
    },
    contact: "Hubungi Kami",
    bookNow: "Booking Sekarang",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
  },
  footer: {
    tagline:
      "Platform booking lapangan tenis online tepercaya. Pesan lapangan, pilih jam favoritmu, dan bayar langsung tanpa antre.",
    shareAria: "Bagikan AceCourt",
    navHeading: "Navigasi",
    contactHeading: "Kontak",
    address: "Jl. Ace Serve No. 15, Jakarta Selatan",
    phone: "+62 21 1234 5678",
    rights: "Semua hak dilindungi.",
  },
  hero: {
    badge: "Booking online · Konfirmasi instan",
    titleLine1: "Main Tenis Tanpa Ribet,",
    titleHighlight: "Booking Lapangan",
    titleLine2: "dalam Hitungan Detik",
    description:
      "Pilih lapangan favoritmu, tentukan tanggal dan jam, lalu bayar langsung online. Tidak perlu telepon, tidak perlu antre — slot lapangan terupdate secara real-time.",
    bookNow: "Booking Sekarang",
    seeHowItWorks: "Lihat Cara Kerja",
    stats: {
      courts: "Lapangan premium",
      bookings: "Booking selesai",
      hoursOpen: " jam",
      openDaily: "Buka setiap hari",
    },
    visual: {
      availableNow: "Tersedia sekarang",
      sixCourts: "6 Lapangan",
      instantBooking: "Booking instan",
      underTwoMinutes: "< 2 menit",
    },
  },
  howItWorks: {
    title: "Booking Semudah 3 Langkah",
    description:
      "Dari pilih lapangan sampai siap main, semua bisa selesai dalam waktu kurang dari dua menit.",
    steps: [
      {
        title: "Pilih Lapangan & Tanggal",
        description:
          "Jelajahi 6 lapangan dengan permukaan berbeda, lihat ketersediaan jam secara real-time.",
      },
      {
        title: "Tentukan Jam Bermain",
        description:
          "Pilih slot 1 atau 2 jam yang tersedia langsung dari grid interaktif, tanpa perlu konfirmasi manual.",
      },
      {
        title: "Bayar & Main",
        description:
          "Selesaikan pembayaran online melalui transfer, e-wallet, atau kartu, lalu tunjukkan bukti booking di lapangan.",
      },
    ],
  },
  courtShowcase: {
    title: "Lapangan Kami",
    description:
      "Enam lapangan dengan permukaan dan suasana berbeda, semua terawat dan siap dipesan.",
    seeAllSchedules: "Lihat Semua Jadwal",
    courtNumber: "Lapangan #",
    perHour: "/jam",
    book: "Booking →",
  },
  features: {
    title: "Kenapa Booking di AceCourt",
    description:
      "Dibangun untuk pemain tenis yang menghargai waktu — cepat, transparan, dan tanpa drama.",
    items: [
      {
        title: "Real-time Availability",
        description: "Jadwal lapangan selalu up-to-date, tidak ada risiko booking ganda.",
      },
      {
        title: "Pembayaran Fleksibel",
        description: "Transfer bank, e-wallet, atau kartu kredit — pilih yang paling nyaman.",
      },
      {
        title: "Konfirmasi Terjamin",
        description:
          "Setiap booking langsung mendapat bukti digital yang bisa ditunjukkan di lokasi.",
      },
      {
        title: "Dukungan Responsif",
        description: "Tim kami siap membantu jika ada perubahan jadwal atau pertanyaan lain.",
      },
    ],
  },
  cta: {
    title: "Siap Main Hari Ini?",
    description:
      "Cek jadwal lapangan yang masih kosong dan amankan slot favoritmu sebelum diambil orang lain.",
    button: "Booking Lapangan Sekarang",
  },
  flowHeader: {
    steps: ["Pilih Jadwal", "Data Diri", "Pembayaran", "Selesai"],
  },
  bookingFlow: {
    title: "Pilih Lapangan & Jadwal",
    description: "Ketersediaan jam diperbarui secara real-time berdasarkan booking lain.",
    step1: "1. Pilih Lapangan",
    step2: "2. Pilih Tanggal",
    step3: "3. Pilih Jam & Durasi",
    hourUnit: "Jam",
    legend: {
      available: "Tersedia",
      selected: "Dipilih",
      taken: "Terisi",
    },
    upTo: "s/d",
    selectCourtPrompt: "Pilih lapangan untuk memulai",
    continue: "Lanjutkan",
    loadError: "Gagal memuat ketersediaan jadwal.",
  },
  checkout: {
    title: "Lengkapi Data Diri",
    description: "Data ini digunakan untuk konfirmasi booking dan verifikasi di lapangan.",
    fullName: "Nama Lengkap",
    fullNamePlaceholder: "cth. Budi Santoso",
    whatsapp: "Nomor WhatsApp",
    whatsappPlaceholder: "08123456789",
    whatsappHint: "Bukti booking akan dikirim melalui nomor ini.",
    email: "Email",
    emailPlaceholder: "nama@email.com",
    notes: "Catatan (opsional)",
    notesPlaceholder: "cth. butuh sewa raket tambahan",
    continueToPayment: "Lanjutkan ke Pembayaran",
    errors: {
      name: "Nama minimal 2 karakter",
      phone: "Nomor telepon tidak valid",
      email: "Format email tidak valid",
    },
    demoNotice: "Mode demo — booking ini tidak disimpan ke server.",
    slotTaken: "Slot ini baru saja dipesan orang lain.",
    createFailed: "Gagal membuat booking. Coba lagi.",
    networkError: "Terjadi kesalahan jaringan. Coba lagi.",
  },
  orderSummary: {
    courtNumber: "Lapangan #",
    date: "Tanggal",
    time: "Jam",
    duration: "Durasi",
    hours: "jam",
    pricePerHour: "Harga / jam",
    total: "Total",
  },
  payment: {
    title: "Pilih Metode Pembayaran",
    description: "Simulasi pembayaran — tidak ada transaksi finansial sungguhan.",
    methods: {
      bankTransfer: { label: "Transfer Bank", description: "Virtual account BCA, Mandiri, BNI, BRI" },
      eWallet: { label: "E-Wallet", description: "GoPay, OVO, DANA, ShopeePay" },
      creditCard: { label: "Kartu Kredit/Debit", description: "Visa, Mastercard, JCB" },
    },
    bankTransfer: {
      heading: "Transfer ke Virtual Account",
      vaNumber: "Nomor Virtual Account",
      copy: "Salin",
      copied: "Nomor VA disalin",
      hint: "Transfer sesuai jumlah total melalui ATM, mobile banking, atau internet banking dari bank apa pun.",
    },
    eWallet: {
      heading: "Scan QRIS dengan aplikasi e-wallet",
      hint: "Mendukung GoPay, OVO, DANA, ShopeePay, dan aplikasi berlogo QRIS lainnya.",
    },
    creditCard: {
      heading: "Detail Kartu",
      cardNumberPlaceholder: "Nomor Kartu (contoh: 4111 1111 1111 1111)",
      expiryPlaceholder: "MM/YY",
      cvvPlaceholder: "CVV",
      hint: "Form simulasi — data kartu tidak dikirim atau disimpan di server.",
    },
    payNow: "Bayar Sekarang",
    processing: "Memproses...",
    demoNotice: "Mode demo — pembayaran disimulasikan, tidak ada transaksi nyata.",
    success: "Pembayaran berhasil dikonfirmasi!",
    failed: "Pembayaran gagal. Coba lagi.",
    networkError: "Terjadi kesalahan jaringan. Coba lagi.",
  },
  success: {
    title: "Booking Berhasil Dikonfirmasi!",
    description: "Tunjukkan kode booking berikut kepada petugas lapangan saat kamu tiba.",
    bookingCode: "Kode Booking",
    customerDetails: "Detail Pemesan",
    paymentMethod: "Metode Pembayaran",
    saveProof: "Simpan Bukti Booking",
    backHome: "Kembali ke Beranda",
  },
  paymentMethodLabels: {
    BANK_TRANSFER: "Transfer Bank",
    E_WALLET: "E-Wallet",
    CREDIT_CARD: "Kartu Kredit/Debit",
  },
};

export type Messages = typeof id;
