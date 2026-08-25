"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AUTO_PLAY_INTERVAL = 6000; // 6 seconds per company slide

interface CompanyDivision {
  id: string;
  num: string;
  name: string;
  shortName: string;
  speciality: string;
  catalogCategory: string;
  videoUrl: string;
  locationTag: string;
}

const COMPANIES: CompanyDivision[] = [
  {
    id: "pavan-impex",
    num: "01",
    name: "Pavan Impex",
    shortName: "Pavan Impex",
    speciality: "Slate Stones & Wall Cladding",
    catalogCategory: "slate",
    videoUrl: "/assets/Silver_jewellery_website_design_202607221307_2.mp4",
    locationTag: "Slate Quarry Division · Markapur, AP",
  },
  {
    id: "sai-balaji",
    num: "02",
    name: "Sai Balaji Impex",
    shortName: "Sai Balaji",
    speciality: "Limestone Products",
    catalogCategory: "limestone",
    videoUrl: "/assets/Silver_jewellery_website_design_202607221307_2.mp4",
    locationTag: "Limestone Division · Markapur, AP",
  },
  {
    id: "pavan-granite",
    num: "03",
    name: "Pavan Granite",
    shortName: "Pavan Granite",
    speciality: "Premium Granite",
    catalogCategory: "granite",
    videoUrl: "/assets/Silver_jewellery_website_design_202607221307_2.mp4",
    locationTag: "Granite Division · Markapur, AP",
  },
];

const MARQUEE_ITEMS = [
  "Granite", "·", "Limestone", "·", "Slate", "·", "Cobbles",
  "·", "Quartzite", "·", "Sandstone", "·", "Basalt", "·",
  "Granite", "·", "Limestone", "·", "Slate", "·", "Cobbles",
  "·", "Quartzite", "·", "Sandstone", "·", "Basalt", "·",
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeCompany = COMPANIES[currentIndex];

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % COMPANIES.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => { });
    }
  }, [currentIndex]);

  return (
    <section
      id="home"
      className="relative w-full aspect-video md:aspect-auto md:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0a0604] mt-[72px] md:mt-0 md:pt-[72px]"
    >
      {/* ── BACKGROUND VIDEO LAYER (16:9 Aspect Ratio on Mobile) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCompany.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              ref={videoRef}
              key={activeCompany.id}
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
              className="w-full h-full object-cover aspect-video"
            >
              <source src={activeCompany.videoUrl} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>

        {/* ── SUBTLE CINEMATIC HAZE LAYER (Clean slight black opacity, NO blur) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.42) 100%)",
          }}
        />
      </div>

      {/* ── HERO CONTENT (Moved upward for elevated placement) ── */}
      <div className="relative z-10 px-3 sm:px-8 md:px-14 lg:px-20 max-w-7xl mx-auto w-full flex flex-col items-center text-center -translate-y-3 sm:-translate-y-12 md:-translate-y-36">
        {/* Minimal Hero Title with Refined Reduced Font Scale and Extra Light Weight */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extralight text-white leading-[1.05] tracking-[0.04em] max-w-xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]"
          style={{ fontSize: "clamp(24px, 4.5vw, 60px)", fontWeight: 200 }}
        >
          PAVAN GROUPS
        </motion.h1>
      </div>

      {/* ── BOTTOM TRANSPARENT MARQUEE (Crisp, transparent over video with NO blur) ── */}
      <div className="absolute bottom-0 inset-x-0 z-10 overflow-hidden py-1.5 sm:py-2.5 md:py-3.5 border-t border-white/15 bg-black/20 pointer-events-none">
        <div className="marquee-track flex whitespace-nowrap gap-6 sm:gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`text-[8.5px] sm:text-[9.5px] md:text-[11px] tracking-[0.32em] uppercase flex-none font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] ${
                item === "·" ? "text-[#c25e3e]" : "text-white/90"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
