"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const [stage, setStage] = useState(0); // 0: enter, 1: shimmer, 2: exit, 3: done

  useEffect(() => {
    // Phase 1: Brand Typography & Emblem Rise
    const t1 = setTimeout(() => setStage(1), 600);

    // Phase 2: Shimmer & Horizon expansion
    const t2 = setTimeout(() => setStage(2), 1800);

    // Phase 3: Smooth Cinematic Shutter Reveal
    const t3 = setTimeout(() => {
      setStage(3);
      onDone?.();
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  if (stage === 3) return null;

  const isExiting = stage === 2;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden flex flex-col items-center justify-center bg-[#0d0909]">
      
      {/* ── TOP ARCHITECTURAL SHUTTER CURTAIN ── */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#0d0909] transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)]"
        style={{
          transform: isExiting ? "translateY(-100%)" : "translateY(0)",
          willChange: "transform",
        }}
      />

      {/* ── BOTTOM ARCHITECTURAL SHUTTER CURTAIN ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0d0909] transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)]"
        style={{
          transform: isExiting ? "translateY(100%)" : "translateY(0)",
          willChange: "transform",
        }}
      />

      {/* ── AMBIENT CINEMATIC WARM GLOW ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: isExiting ? 0 : 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(139,69,19,0.25) 0%, rgba(216,195,165,0.06) 45%, transparent 70%)",
        }}
      />

      {/* ── MAIN CINEMATIC BRAND SHOWCASE (GENEROUS SAFE BOUNDS) ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: isExiting ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-6 w-full max-w-6xl px-6 sm:px-12"
      >
        {/* Heritage Mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="flex items-center justify-center gap-2 sm:gap-4 text-[#d8c3a5] text-[9px] sm:text-[10.5px] font-mono uppercase font-semibold tracking-[0.2em] sm:tracking-[0.35em] whitespace-nowrap"
        >
          <span className="w-4 sm:w-8 h-px bg-[#d8c3a5]/40 flex-none" />
          <span>ESTABLISHED 1994 · INDIA</span>
          <span className="w-4 sm:w-8 h-px bg-[#d8c3a5]/40 flex-none" />
        </motion.div>

        {/* Grand Brand Title (Completely Unclipped) */}
        <div className="relative py-1 w-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light uppercase text-[#f7f2ea] leading-none select-none tracking-[0.14em] sm:tracking-[0.2em] whitespace-nowrap text-center"
            style={{
              fontSize: "clamp(22px, 5.2vw, 68px)",
              textShadow: "0 4px 25px rgba(0,0,0,0.8)",
            }}
          >
            PAVAN GROUPS
          </motion.h1>

          {/* Liquid Specular Light Sweep */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "150%" }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none opacity-35 mix-blend-overlay"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(216,195,165,0.9) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Expanding Golden Horizon Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 sm:w-48 h-px bg-gradient-to-r from-transparent via-[#d8c3a5] to-transparent origin-center"
        />

        {/* 3 Conglomerate Divisions Lineage */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="flex items-center justify-center gap-2 sm:gap-5 text-[9px] sm:text-[11px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase text-[#d8c3a5]/80 font-light whitespace-nowrap"
        >
          <span>SLATE</span>
          <span className="text-[#8b4513]">•</span>
          <span>LIMESTONE</span>
          <span className="text-[#8b4513]">•</span>
          <span>GRANITE</span>
        </motion.div>

        {/* Bottom Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="text-[8px] sm:text-[9.5px] font-mono tracking-[0.16em] sm:tracking-[0.32em] uppercase text-[#f7f2ea]/60 font-light pt-1 text-center"
        >
          QUARRIES · FABRICATION · GLOBAL EXPORTS
        </motion.p>

      </motion.div>

    </div>
  );
}
