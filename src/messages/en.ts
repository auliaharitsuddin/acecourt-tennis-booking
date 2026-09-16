import type { Messages } from "./id";

export const en: Messages = {
  common: {
    indoor: "Indoor",
    outdoor: "Outdoor",
    hour: "hour",
  },
  header: {
    nav: {
      courts: "Courts",
      howItWorks: "How It Works",
      whyUs: "Why Us",
    },
    contact: "Contact Us",
    bookNow: "Book Now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  footer: {
    tagline:
      "A trusted online tennis court booking platform. Book a court, pick your favorite time, and pay instantly with no queue.",
    shareAria: "Share AceCourt",
    navHeading: "Navigation",
    contactHeading: "Contact",
    address: "Jl. Ace Serve No. 15, South Jakarta",
    phone: "+62 21 1234 5678",
    rights: "All rights reserved.",
  },
  hero: {
    badge: "Online booking · Instant confirmation",
    titleLine1: "Play Tennis Hassle-Free,",
    titleHighlight: "Book a Court",
    titleLine2: "in Seconds",
    description:
      "Pick your favorite court, choose a date and time, then pay online right away. No calls, no queueing — court slots update in real time.",
    bookNow: "Book Now",
    seeHowItWorks: "See How It Works",
    stats: {
      courts: "Premium courts",
      bookings: "Bookings completed",
      hoursOpen: "h",
      openDaily: "Open every day",
    },
    visual: {
      availableNow: "Available now",
      sixCourts: "6 Courts",
      instantBooking: "Instant booking",
      underTwoMinutes: "< 2 minutes",
    },
  },
  howItWorks: {
    title: "Booking in 3 Easy Steps",
    description:
      "From picking a court to being ready to play, it all takes less than two minutes.",
    steps: [
      {
        title: "Pick a Court & Date",
        description:
          "Browse 6 courts with different surfaces and see real-time hourly availability.",
      },
      {
        title: "Choose Your Play Time",
        description:
          "Pick an available 1- or 2-hour slot directly from the interactive grid, no manual confirmation needed.",
      },
      {
        title: "Pay & Play",
        description:
          "Complete your payment online via transfer, e-wallet, or card, then show your booking proof at the court.",
      },
    ],
  },
  courtShowcase: {
    title: "Our Courts",
    description:
      "Six courts with different surfaces and atmospheres, all well-maintained and ready to book.",
    seeAllSchedules: "See All Schedules",
    courtNumber: "Court #",
    perHour: "/hour",
    book: "Book →",
  },
  features: {
    title: "Why Book With AceCourt",
    description:
      "Built for tennis players who value their time — fast, transparent, and hassle-free.",
    items: [
      {
        title: "Real-time Availability",
        description: "Court schedules are always up to date, no risk of double booking.",
      },
      {
        title: "Flexible Payment",
        description: "Bank transfer, e-wallet, or credit card — pick whatever's easiest.",
      },
      {
        title: "Guaranteed Confirmation",
        description:
          "Every booking instantly gets a digital proof you can show on site.",
      },
      {
        title: "Responsive Support",
        description: "Our team is ready to help with schedule changes or any other questions.",
      },
    ],
  },
  cta: {
    title: "Ready to Play Today?",
    description:
      "Check which court slots are still open and secure your favorite spot before someone else does.",
    button: "Book a Court Now",
  },
  flowHeader: {
    steps: ["Pick Schedule", "Your Details", "Payment", "Done"],
  },
  bookingFlow: {
    title: "Pick a Court & Schedule",
    description: "Hourly availability updates in real time based on other bookings.",
    step1: "1. Pick a Court",
    step2: "2. Pick a Date",
    step3: "3. Pick a Time & Duration",
    hourUnit: "Hour",
    legend: {
      available: "Available",
      selected: "Selected",
      taken: "Taken",
    },
    upTo: "to",
    selectCourtPrompt: "Pick a court to get started",
    continue: "Continue",
    loadError: "Failed to load schedule availability.",
  },
  checkout: {
    title: "Complete Your Details",
    description: "This information is used to confirm the booking and verify you at the court.",
    fullName: "Full Name",
    fullNamePlaceholder: "e.g. Budi Santoso",
    whatsapp: "WhatsApp Number",
    whatsappPlaceholder: "08123456789",
    whatsappHint: "Your booking proof will be sent to this number.",
    email: "Email",
    emailPlaceholder: "name@email.com",
    notes: "Notes (optional)",
    notesPlaceholder: "e.g. need an extra racket rental",
    continueToPayment: "Continue to Payment",
    errors: {
      name: "Name must be at least 2 characters",
      phone: "Invalid phone number",
      email: "Invalid email format",
    },
    demoNotice: "Demo mode — this booking is not saved to a server.",
    slotTaken: "This slot was just booked by someone else.",
    createFailed: "Failed to create booking. Please try again.",
    networkError: "A network error occurred. Please try again.",
  },
  orderSummary: {
    courtNumber: "Court #",
    date: "Date",
    time: "Time",
    duration: "Duration",
    hours: "hours",
    pricePerHour: "Price / hour",
    total: "Total",
  },
  payment: {
    title: "Choose a Payment Method",
    description: "Payment simulation — no real financial transaction takes place.",
    methods: {
      bankTransfer: { label: "Bank Transfer", description: "BCA, Mandiri, BNI, BRI virtual account" },
      eWallet: { label: "E-Wallet", description: "GoPay, OVO, DANA, ShopeePay" },
      creditCard: { label: "Credit/Debit Card", description: "Visa, Mastercard, JCB" },
    },
    bankTransfer: {
      heading: "Transfer to Virtual Account",
      vaNumber: "Virtual Account Number",
      copy: "Copy",
      copied: "VA number copied",
      hint: "Transfer the exact total amount via ATM, mobile banking, or internet banking from any bank.",
    },
    eWallet: {
      heading: "Scan the QRIS code with your e-wallet app",
      hint: "Supports GoPay, OVO, DANA, ShopeePay, and other QRIS-enabled apps.",
    },
    creditCard: {
      heading: "Card Details",
      cardNumberPlaceholder: "Card Number (e.g. 4111 1111 1111 1111)",
      expiryPlaceholder: "MM/YY",
      cvvPlaceholder: "CVV",
      hint: "Simulated form — card data is never sent to or stored on the server.",
    },
    payNow: "Pay Now",
    processing: "Processing...",
    demoNotice: "Demo mode — payment is simulated, no real transaction occurs.",
    success: "Payment confirmed successfully!",
    failed: "Payment failed. Please try again.",
    networkError: "A network error occurred. Please try again.",
  },
  success: {
    title: "Booking Confirmed!",
    description: "Show the booking code below to the court staff when you arrive.",
    bookingCode: "Booking Code",
    customerDetails: "Customer Details",
    paymentMethod: "Payment Method",
    saveProof: "Save Booking Proof",
    backHome: "Back to Home",
  },
  paymentMethodLabels: {
    BANK_TRANSFER: "Bank Transfer",
    E_WALLET: "E-Wallet",
    CREDIT_CARD: "Credit/Debit Card",
  },
};
