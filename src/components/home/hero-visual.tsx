"use client";

import { motion } from "motion/react";
import { CalendarCheck, MapPin } from "lucide-react";

// A simulated rally: every point strictly alternates between the near
// side (top > 50%, below the net) and the far side (top < 50%, above the
// net), so each "shot" actually crosses the net like a real point being
// played, instead of bouncing back and forth on the same side. The last
// point repeats the first so the loop closes seamlessly.
const BALL_LEFT = ["35%", "68%", "58%", "28%", "48%", "74%", "26%", "52%", "35%"];
const BALL_TOP = ["78%", "20%", "70%", "22%", "80%", "18%", "72%", "26%", "78%"];
const BALL_TIMES = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
const BALL_ROTATE = [0, 135, 270, 405, 540, 675, 810, 945, 1080];
// Shadow sits a touch below the ball and pulses smaller/fainter between
// bounces to sell the illusion of height as the ball crosses the net.
const SHADOW_TOP = BALL_TOP.map((v) => `${parseFloat(v) + 5}%`);
const SHADOW_SCALE = [1.15, 0.55, 1.15, 0.55, 1.15, 0.55, 1.15, 0.55, 1.15];
const SHADOW_OPACITY = [0.55, 0.16, 0.55, 0.16, 0.55, 0.16, 0.55, 0.16, 0.55];
const BALL_DURATION = 10;

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

        {/* Ball shadow */}
        <motion.div
          className="absolute h-3.5 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black blur-[2px]"
          animate={{
            left: BALL_LEFT,
            top: SHADOW_TOP,
            scale: SHADOW_SCALE,
            opacity: SHADOW_OPACITY,
          }}
          transition={{
            duration: BALL_DURATION,
            repeat: Infinity,
            ease: "easeInOut",
            times: BALL_TIMES,
          }}
        />

        {/* Wandering, bouncing ball */}
        <motion.div
          className="absolute size-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-lg shadow-black/20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), transparent 45%)",
          }}
          animate={{
            left: BALL_LEFT,
            top: BALL_TOP,
            rotate: BALL_ROTATE,
          }}
          transition={{
            duration: BALL_DURATION,
            repeat: Infinity,
            ease: "easeInOut",
            times: BALL_TIMES,
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
