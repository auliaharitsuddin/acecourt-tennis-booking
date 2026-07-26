"use client";

import { motion } from "motion/react";
import { CalendarCheck, MapPin } from "lucide-react";

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-[4/5] w-full max-w-md"
    >
      {/* Court card */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-b from-primary to-[#0f4c27] shadow-2xl shadow-primary/20">
        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 h-full w-full opacity-90"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect x="40" y="40" width="320" height="420" rx="8" fill="none" stroke="#f8fafc" strokeWidth="3" opacity="0.85" />
          <line x1="40" y1="250" x2="360" y2="250" stroke="#f8fafc" strokeWidth="2.5" opacity="0.85" />
          <rect x="90" y="40" width="220" height="420" fill="none" stroke="#f8fafc" strokeWidth="2" opacity="0.7" />
          <line x1="90" y1="130" x2="310" y2="130" stroke="#f8fafc" strokeWidth="2" opacity="0.7" />
          <line x1="90" y1="370" x2="310" y2="370" stroke="#f8fafc" strokeWidth="2" opacity="0.7" />
          <line x1="200" y1="130" x2="200" y2="370" stroke="#f8fafc" strokeWidth="2" opacity="0.7" />
        </svg>

        {/* Net */}
        <div className="absolute inset-x-10 top-1/2 h-8 -translate-y-1/2 rounded-sm border border-white/50 bg-white/10 backdrop-blur-sm" />

        {/* Bouncing ball */}
        <motion.div
          className="absolute left-1/2 size-9 -translate-x-1/2 rounded-full bg-lime shadow-lg shadow-black/20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), transparent 45%)",
          }}
          animate={{
            top: ["18%", "72%", "18%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating badge: available now */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-10 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <MapPin className="size-4.5" />
        </span>
        <div>
          <p className="text-xs text-muted-foreground">Tersedia sekarang</p>
          <p className="text-sm font-semibold text-foreground">6 Lapangan</p>
        </div>
      </motion.div>

      {/* Floating badge: instant booking */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-4 bottom-14 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-lime text-lime-foreground">
          <CalendarCheck className="size-4.5" />
        </span>
        <div>
          <p className="text-xs text-muted-foreground">Booking instan</p>
          <p className="text-sm font-semibold text-foreground">&lt; 2 menit</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
