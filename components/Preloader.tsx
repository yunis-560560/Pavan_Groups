"use client";
import { useEffect, useState } from "react";

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let currentPct = 0;
    const interval = setInterval(() => {
      // Smooth natural increment
      currentPct += Math.random() * 5 + 3.2;

      if (currentPct >= 100) {
        currentPct = 100;
        clearInterval(interval);
        setPct(100);

        // Smooth exit delay
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setDone(true);
            onDone?.();
          }, 600);
        }, 350);
      } else {
        setPct(Math.min(100, Math.floor(currentPct)));
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onDone]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-auto overflow-hidden select-none"
      style={{
        background: "linear-gradient(155deg, #180705 0%, #2a0b0b 45%, #150504 100%)",
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
        transition: exiting ? "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        willChange: "transform",
      }}
    >
      {/* Ambient background glow orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255,68,58,0.22) 0%, rgba(255,110,143,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(252,248,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(252,248,241,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-5xl px-6 w-full">
        {/* Top Tagline */}
        <div className="flex items-center gap-3 mb-6 opacity-60">
          <span className="w-6 h-px bg-[#ff443a]" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#fcf8f1] font-medium">
            Natural Stone Excellence · Est. 1994
          </span>
          <span className="w-6 h-px bg-[#ff443a]" />
        </div>

        {/* ── PIXEL-PERFECT OUTLINE + FILL OVERLAY (NO MULTI-LINE COLLISION) ── */}
        <div className="relative inline-block text-center mb-6 max-w-full">
          {/* Base Layer: White Stroked Text */}
          <h1
            className="font-display font-light uppercase tracking-[0.16em] sm:tracking-[0.22em] leading-none text-transparent whitespace-nowrap"
            style={{
              fontSize: "clamp(26px, 6.8vw, 96px)",
              WebkitTextStroke: "1.5px rgba(252, 248, 241, 0.85)",
            }}
          >
            Pavan Groups
          </h1>

          {/* Fill Layer: Left-to-Right Animated Pink/Coral Fill (Locked at left-0 top-0) */}
          <div
            className="absolute left-0 top-0 bottom-0 overflow-hidden pointer-events-none"
            style={{
              width: `${pct}%`,
              transition: "width 0.05s linear",
            }}
          >
            <h1
              className="font-display font-light uppercase tracking-[0.16em] sm:tracking-[0.22em] leading-none whitespace-nowrap absolute left-0 top-0"
              style={{
                fontSize: "clamp(26px, 6.8vw, 96px)",
                background: "linear-gradient(90deg, #ff443a 0%, #ff6e8f 50%, #ff8958 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 25px rgba(255, 68, 58, 0.65))",
              }}
            >
              Pavan Groups
            </h1>

            {/* Diamond Sparkle Light on leading fill edge */}
            <div
              className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 text-white sparkle-anim pointer-events-none"
              style={{
                fontSize: "20px",
                filter: "drop-shadow(0 0 10px #ffffff) drop-shadow(0 0 20px #ff6e8f)",
              }}
            >
              ✦
            </div>
          </div>
        </div>

        {/* Progress Metric & Sleek Track */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff443a] via-[#ff6e8f] to-white"
              style={{
                width: `${pct}%`,
                transition: "width 0.05s linear",
                boxShadow: "0 0 12px rgba(255, 68, 58, 0.8)",
              }}
            />
          </div>

          <div className="flex justify-between items-center w-full text-[10px] tracking-[0.28em] text-[#fcf8f1]/50 tabular-nums font-mono">
            <span className="uppercase text-[9px] text-[#ff443a]">Direct Quarry Extractions</span>
            <span>{String(pct).padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
