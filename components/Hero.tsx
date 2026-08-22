"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToHash } from "@/components/SmoothScroll";

const PARTICLES = 28;
const AUTO_PLAY_INTERVAL = 6000; // Exact 6 seconds per company slide

interface CompanyDivision {
  id: string;
  num: string;
  name: string;
  shortName: string;
  division: string;
  speciality: string;
  shortSpeciality: string;
  tagline: string;
  description: string;
  keyProducts: string[];
  bestFor: string[];
  accentColor: string;
  badgeBg: string;
  catalogCategory: string;
  videoUrl: string;
  posterImage?: string;
  locationTag: string;
}

const COMPANIES: CompanyDivision[] = [
  {
    id: "pavan-impex",
    num: "01",
    name: "Pavan Impex",
    shortName: "Pavan Impex",
    division: "Natural Stone Exports",
    speciality: "Slate Stones & Wall Cladding",
    shortSpeciality: "Slate & Cladding",
    tagline: "Natural Clefts & Tactile Wall Textures",
    description: "Quarrying and calibrating dense metamorphic slate formations into hand-split wall claddings, architectural elevations, and mosaic sheets.",
    keyProducts: [
      "Black Slate",
      "Indian Autumn Slate",
      "California Gold Slate",
      "Mosaic Tile Panels",
    ],
    bestFor: ["Wall Cladding", "Feature Walls", "Landscaping", "Luxury Hotels"],
    accentColor: "#ff443a",
    badgeBg: "rgba(255, 68, 58, 0.12)",
    catalogCategory: "slate",
    videoUrl: "/assets/Silver_jewellery_website_design_202607221307_2.mp4",
    locationTag: "Slate Quarry Division · Markapur, AP",
  },
  {
    id: "sai-balaji",
    num: "02",
    name: "Sai Balaji Impex",
    shortName: "Sai Balaji",
    division: "Limestone & Precision Pavers",
    speciality: "Limestone Products",
    shortSpeciality: "Limestone & Pavers",
    tagline: "Dense Calcareous Stone & Architectural Paving",
    description: "Fine-grained calcrete limestones, tumbled pavers, and stepping stones engineered for extreme weather resilience, pool decks, and heavy driveways.",
    keyProducts: [
      "Cuddapah Black",
      "Lime Yellow",
      "Lime Blue",
      "Driveway Pavers",
      "Stepping Stones",
    ],
    bestFor: ["Outdoor Flooring", "Pool Areas", "Driveways", "Garden Walkways"],
    accentColor: "#ff6e8f",
    badgeBg: "rgba(255, 110, 143, 0.12)",
    catalogCategory: "limestone",
    videoUrl: "/assets/Silver_jewellery_website_design_202607221307_2.mp4",
    locationTag: "Limestone Division · Markapur, AP",
  },
  {
    id: "pavan-granite",
    num: "03",
    name: "Pavan Granite",
    shortName: "Pavan Granite",
    division: "Premium Monolithic Granite",
    speciality: "Premium Granite",
    shortSpeciality: "Premium Granite",
    tagline: "Precambrian Bronzite Crystal Formations",
    description: "Deep obsidian black granites infused with glittering golden bronzite and silver sparkles, fabricated into zero-porosity monolithic slabs, staircases, and countertops.",
    keyProducts: [
      "Black Galaxy Granite",
      "Deep Black + Gold Speckles",
      "Silver Speckle Slabs",
      "Step Treads & Counters",
    ],
    bestFor: ["Kitchen Countertops", "Commercial Flooring", "Grand Staircases", "Hotels"],
    accentColor: "#f4c430",
    badgeBg: "rgba(244, 196, 48, 0.12)",
    catalogCategory: "granite",
    videoUrl: "/assets/Silver_jewellery_website_design_202607221307_2.mp4",
    locationTag: "Granite Division · Markapur, AP",
  },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const activeCompany = COMPANIES[currentIndex];

  const goToSlide = useCallback(
    (newIndex: number) => {
      setDirection(newIndex > currentIndex ? 1 : -1);
      setCurrentIndex(newIndex);
    },
    [currentIndex]
  );

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % COMPANIES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + COMPANIES.length) % COMPANIES.length);
  }, []);

  // Auto-play timer (Runs continuously every 6 seconds; cleanly restarts on user selection)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % COMPANIES.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Safe video playback handler (prevents unhandled play() interruption errors on unmount/slide-change)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Safe catch: autoplay was prevented or interrupted by slide transition
      });
    }
  }, [currentIndex, isMuted]);

  // Touch swipe support for 16:9 cinema screen
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  // Ambient particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: PARTICLES }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
      o: Math.random() * 0.3 + 0.08,
      color: Math.random() > 0.5 ? "255, 68, 58" : "20, 13, 10",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.o})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 68, 58, ${(1 - dist / 75) * 0.04})`;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Parallax subtle motion
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      gsap.set(".hero-bg-layer", { y: y * 0.14 });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-72px)] flex flex-col justify-between overflow-hidden bg-[#fcf8f1] pt-[84px] md:pt-[92px] pb-6 md:pb-10"
    >
      {/* Background layer */}
      <div className="hero-bg-layer absolute inset-0 z-0 pointer-events-none" style={{ willChange: "transform" }}>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #faf5ec 0%, #fcf8f1 50%, #f4ede1 100%)",
          }}
        />

        {/* Ambient warm glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 85% 20%, rgba(255,68,58,0.07) 0%, rgba(255,110,143,0.02) 45%, transparent 70%), radial-gradient(ellipse 55% 45% at 10% 80%, rgba(244,196,48,0.04) 0%, transparent 65%)",
          }}
        />

        {/* Subtle architectural grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,13,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,13,10,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] w-full h-full opacity-50 pointer-events-none"
      />

      {/* Main Container */}
      <div className="relative z-[3] px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto w-full my-auto flex-1 flex flex-col justify-center">
        
        {/* ── TOP BADGE & BRAND TAG ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-3 md:mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/95 border border-[#140d0a]/10 backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold text-[#140d0a]">
              Pavan Stones Group · Markapur, Andhra Pradesh
            </span>
          </div>
          <span className="hidden sm:inline-block w-6 h-px bg-[#140d0a]/20" />
          <span className="hidden sm:inline-block text-[10px] tracking-[0.2em] uppercase text-[#140d0a]/40">
            Est. 1994
          </span>
        </motion.div>

        {/* ── 2-COLUMN LUXURY SHOWCASE: Editorial Left + 16:9 Cinema Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* ── LEFT COLUMN: Brand Story & Interactive 3-Company Navigation (5 Cols) ── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light leading-[1.04] tracking-[-0.015em] text-[#140d0a] mb-3"
              style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}
            >
              Three Companies.
              <br />
              <span className="italic text-[#ff443a] font-normal">
                One Stone Mastery.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] sm:text-[14px] leading-[1.65] text-[#140d0a]/75 font-light mb-4"
            >
              <strong className="font-semibold text-[#140d0a]">Pavan Stones Group</strong> is a premier manufacturer, supplier, exporter & installer based in Markapur, AP. Select a division to view its active quarry & processing reel:
            </motion.p>

            {/* 3 Companies Interactive Selector Deck (Desktop Only - Hidden on Mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col gap-2 mb-5"
            >
              {COMPANIES.map((company, idx) => {
                const isActive = currentIndex === idx;

                return (
                  <button
                    key={company.id}
                    onClick={() => goToSlide(idx)}
                    className={`relative p-3 text-left border transition-all duration-300 cursor-pointer overflow-hidden ${
                      isActive
                        ? "bg-white border-[#ff443a] shadow-md -translate-x-1 pl-4 border-l-4"
                        : "bg-white/70 border-[#140d0a]/10 hover:bg-white hover:border-[#140d0a]/30"
                    }`}
                  >
                    {/* Active Progress Bar (Resets on Click) */}
                    {isActive && (
                      <motion.div
                        key={`progress-deck-${currentIndex}`}
                        className="absolute bottom-0 left-0 h-[2px] bg-[#ff443a]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
                      />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="font-display text-sm font-semibold"
                          style={{ color: isActive ? company.accentColor : "rgba(20,13,10,0.4)" }}
                        >
                          {company.num}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="font-display font-medium text-[15px] sm:text-[16px] text-[#140d0a]">
                              {company.name}
                            </h2>
                            <span
                              className="text-[8.5px] uppercase tracking-[0.16em] px-2 py-0.5 font-medium"
                              style={{
                                backgroundColor: company.badgeBg,
                                color: company.accentColor,
                              }}
                            >
                              {company.speciality}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#140d0a]/60 block truncate">
                            {company.tagline}
                          </span>
                        </div>
                      </div>

                      <span
                        className="text-base font-light transition-transform"
                        style={{
                          color: isActive ? company.accentColor : "rgba(20,13,10,0.25)",
                          transform: isActive ? "translateX(3px)" : "none",
                        }}
                      >
                        {isActive ? "▶" : "→"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* Desktop Action Triggers (Hidden on Mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center gap-2.5 flex-wrap"
            >
              <button
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[9.5px] font-medium tracking-[0.2em] uppercase text-white bg-[#ff443a] hover:bg-[#e6352b] transition-all shadow-md border-none cursor-pointer"
              >
                <span>Request Quotation</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1 5h8M6 2l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <Link
                href={`/products?category=${activeCompany.catalogCategory}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#140d0a]/20 text-[#140d0a] text-[9.5px] font-medium tracking-[0.18em] uppercase hover:bg-white transition-all shadow-sm"
              >
                Explore Catalogue
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: TRUE 16:9 CINEMA STAGE (7 Cols) ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full"
            >
              {/* 16:9 Aspect Ratio Container Frame */}
              <div
                className="relative w-full aspect-video rounded-sm overflow-hidden shadow-2xl border border-[#140d0a]/25 bg-[#0e0705]"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeCompany.id}
                    custom={direction}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* TRUE 16:9 VIDEO ELEMENT */}
                    <video
                      ref={videoRef}
                      key={activeCompany.id}
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onLoadedData={(e) => {
                        const p = e.currentTarget.play();
                        if (p !== undefined) {
                          p.catch(() => {});
                        }
                      }}
                      className="w-full h-full object-cover"
                    >
                      <source src={activeCompany.videoUrl} type="video/mp4" />
                    </video>

                    {/* Subtle Cinematic Vignette Scrim (Desktop only; clean unblocked video on mobile) */}
                    <div
                      className="hidden lg:block absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(14,7,5,0.7) 0%, rgba(14,7,5,0.15) 35%, rgba(14,7,5,0.2) 60%, rgba(14,7,5,0.92) 100%)",
                      }}
                    />

                    {/* ── TOP RIGHT AUDIO / MUTE BUTTON ONLY ── */}
                    <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="p-1.5 bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md cursor-pointer transition-colors text-xs"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? "🔇" : "🔊"}
                      </button>
                    </div>

                    {/* ── 16:9 BOTTOM GLASS SHOWCASE DRAWER (Desktop Only - Hidden on Mobile) ── */}
                    <div className="hidden lg:block absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-10">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
                        <div className="max-w-md">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: activeCompany.accentColor }}
                            />
                            <h3 className="font-display text-[15px] sm:text-[18px] text-white font-medium">
                              {activeCompany.name}
                            </h3>
                            <span className="text-[10px] text-white/60">·</span>
                            <span className="text-[10px] text-white/80 font-mono">
                              {activeCompany.locationTag}
                            </span>
                          </div>

                          {/* Key Products Chips inside 16:9 Stage */}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {activeCompany.keyProducts.slice(0, 3).map((prod) => (
                              <span
                                key={prod}
                                className="px-2 py-0.5 text-[9px] font-medium tracking-wide bg-white/15 border border-white/20 text-white rounded-none backdrop-blur-md"
                              >
                                {prod}
                              </span>
                            ))}
                            {activeCompany.keyProducts.length > 3 && (
                              <span className="px-1.5 py-0.5 text-[8.5px] text-white/70 bg-white/10 border border-white/10">
                                +{activeCompany.keyProducts.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Speciality Badge on Bottom-Right (Replaced Catalogue button) */}
                        <div className="flex items-center gap-2 flex-none">
                          <span
                            className="inline-flex items-center px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] font-medium text-white/95 bg-black/60 border border-white/25 backdrop-blur-md shadow-sm"
                            style={{
                              borderColor: `${activeCompany.accentColor}88`,
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mr-2"
                              style={{ background: activeCompany.accentColor }}
                            />
                            {activeCompany.speciality}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left & Right 16:9 Carousel Arrows (Desktop Only - Hidden on Mobile) */}
                <button
                  onClick={prevSlide}
                  className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 items-center justify-center bg-black/50 hover:bg-black/85 text-white border border-white/20 backdrop-blur-md cursor-pointer transition-all text-sm"
                  aria-label="Previous Division Reel"
                >
                  ‹
                </button>
                <button
                  onClick={nextSlide}
                  className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 items-center justify-center bg-black/50 hover:bg-black/85 text-white border border-white/20 backdrop-blur-md cursor-pointer transition-all text-sm"
                  aria-label="Next Division Reel"
                >
                  ›
                </button>
              </div>

              {/* Simple & Clean 3-Company Switcher Tabs on Mobile (Directly under 16:9 video) */}
              <div className="grid grid-cols-3 gap-1.5 mt-3 lg:hidden">
                {COMPANIES.map((c, idx) => {
                  const isActive = currentIndex === idx;

                  return (
                    <button
                      key={c.id}
                      onClick={() => goToSlide(idx)}
                      className={`relative py-2 px-1.5 text-center border transition-all duration-300 cursor-pointer overflow-hidden ${
                        isActive
                          ? "bg-white border-[#ff443a] text-[#ff443a] font-semibold shadow-sm"
                          : "bg-white/70 border-[#140d0a]/10 text-[#140d0a]/75 hover:bg-white"
                      }`}
                    >
                      {/* Active Progress Bar on Mobile Tab */}
                      {isActive && (
                        <motion.div
                          key={`m-progress-pill-${currentIndex}`}
                          className="absolute bottom-0 left-0 h-[2px] bg-[#ff443a]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
                        />
                      )}

                      <span className="text-[10.5px] block font-display truncate">
                        {c.num} · {c.shortName}
                      </span>
                      <span className="text-[8px] opacity-70 block truncate">
                        {c.shortSpeciality}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Action Triggers (Down Below the Carousel & Switcher) */}
              <div className="flex lg:hidden items-center gap-2.5 mt-3.5">
                <button
                  onClick={handleContactClick}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[9.5px] font-medium tracking-[0.2em] uppercase text-white bg-[#ff443a] hover:bg-[#e6352b] transition-all shadow-md border-none cursor-pointer text-center"
                >
                  <span>Request Quotation</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1 5h8M6 2l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <Link
                  href={`/products?category=${activeCompany.catalogCategory}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#140d0a]/20 text-[#140d0a] text-[9.5px] font-medium tracking-[0.18em] uppercase hover:bg-white transition-all shadow-sm text-center"
                >
                  Explore Catalogue
                </Link>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── BOTTOM CREDENTIALS & TRUST STRIP ── */}
        <div className="mt-5 pt-3 border-t border-[#140d0a]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#140d0a]/65 text-[10.5px] font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a]" />
            <span>Markapur, Andhra Pradesh HQ</span>
            <span className="text-[#140d0a]/30">•</span>
            <span>Direct Quarry to Installation</span>
          </div>

          <div className="flex items-center gap-4">
            <span>3 Dedicated Specialized Companies</span>
            <span className="text-[#140d0a]/30">•</span>
            <span>40+ Global Export Destinations</span>
          </div>
        </div>

      </div>
    </section>
  );
}
