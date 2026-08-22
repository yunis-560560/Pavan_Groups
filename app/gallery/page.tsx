"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type GalleryItem = {
  id: string;
  title: string;
  category: "Facades" | "Flooring" | "Quarries" | "Custom" | "Landscape";
  stoneType: string;
  finish: string;
  location: string;
  colSpan: "col-span-1" | "col-span-1 md:col-span-2";
  aspect: string;
  swatchTone: string;
  caption: string;
  technicalNote: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Monolithic Dry-Hung Facade Slabs",
    category: "Facades",
    stoneType: "Absolute Black Granite",
    finish: "Flamed & Brushed",
    location: "Kuwait City Tower",
    colSpan: "col-span-1 md:col-span-2",
    aspect: "h-[420px]",
    swatchTone: "#140d0a",
    caption: "30mm calibrated granite panels engineered with undercut anchor pockets for seismic compliance.",
    technicalNote: "Flexural Strength: 24.2 MPa · Tested to ASTM C880",
  },
  {
    id: "g2",
    title: "Continuous Bookmatched Royal Atrium",
    category: "Flooring",
    stoneType: "Makrana White Marble",
    finish: "Diamond Gloss Polish",
    location: "New Delhi Palace",
    colSpan: "col-span-1",
    aspect: "h-[420px]",
    swatchTone: "#ede7de",
    caption: "400 square meters of seamless mirrored crystalline calcite marble veining.",
    technicalNote: "Calcitic Purity: 98.4% · Zero Iron Staining",
  },
  {
    id: "g3",
    title: "Bench Extraction Face #3",
    category: "Quarries",
    stoneType: "Dholpur Beige Sandstone",
    finish: "Raw Diamond-Wire Cut",
    location: "Rajasthan Quarry Face",
    colSpan: "col-span-1",
    aspect: "h-[360px]",
    swatchTone: "#e5d4be",
    caption: "Slicing 28-tonne monolithic sandstone benches with continuous high-pressure water cooling.",
    technicalNote: "Bench Tolerance: ±2mm across 12-meter face",
  },
  {
    id: "g4",
    title: "Waterfront Radial Cobblestone Fan",
    category: "Landscape",
    stoneType: "Grey Kota Limestone & Basalt Cobbles",
    finish: "Tumbled & Natural Cleft",
    location: "Marina Bay Promenade",
    colSpan: "col-span-1 md:col-span-2",
    aspect: "h-[360px]",
    swatchTone: "#d6cfc5",
    caption: "Interlocking fan pavers designed for tropical stormwater run-off and intense pedestrian traffic.",
    technicalNote: "Slip Resistance: PTV > 55 (Wet)",
  },
  {
    id: "g5",
    title: "5-Axis CNC Perforated Jali Screens",
    category: "Custom",
    stoneType: "Jaisalmer Yellow Marble",
    finish: "Honed & Micro-Carved",
    location: "Heritage Resort Jaipur",
    colSpan: "col-span-1 md:col-span-2",
    aspect: "h-[400px]",
    swatchTone: "#e4b977",
    caption: "Traditional Rajasthani geometric latticework moderating solar thermal gain and glare.",
    technicalNote: "Carving Tolerance: ±0.5mm on 50mm slab",
  },
  {
    id: "g6",
    title: "Rustic Pool Decking & Bullnosed Coping",
    category: "Landscape",
    stoneType: "Autumn Rustic Slate",
    finish: "Natural Split Cleft",
    location: "Costa del Sol Villa",
    colSpan: "col-span-1",
    aspect: "h-[400px]",
    swatchTone: "#ab6b51",
    caption: "Naturally textured multi-hued slate slabs surrounding a saltwater infinity pool.",
    technicalNote: "Water Absorption: 0.28% · Salt-Resistant",
  },
];

const categories = ["All Gallery", "Facades", "Flooring", "Quarries", "Custom", "Landscape"];

export default function GalleryPage() {
  const [selectedCat, setSelectedCat] = useState("All Gallery");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const router = useRouter();

  const filteredItems = useMemo(() => {
    if (selectedCat === "All Gallery") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCat);
  }, [selectedCat]);

  const handleContactClick = () => {
    router.push("/#contact");
  };

  return (
    <div className="bg-[#fcf8f1] text-[#140d0a] overflow-hidden min-h-screen">
      {/* ── Page Header ── */}
      <section className="pt-36 pb-20 md:pb-24 px-6 md:px-14 lg:px-20 border-b border-[#140d0a]/10 bg-gradient-to-b from-[#faf5ec] to-[#fcf8f1]">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-6 text-[10px] tracking-[0.28em] uppercase text-[#140d0a]/50">
            <Link href="/" className="hover:text-[#ff443a] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#ff443a] font-medium">Visual Gallery</span>
          </div>

          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#ff443a]/10 border border-[#ff443a]/25 text-[#ff443a] text-[10px] tracking-[0.24em] uppercase font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a] animate-pulse" />
            <span>Textures, Light & Craft</span>
          </div>

          <h1
            className="font-display font-light leading-[1.05] tracking-[-0.015em] mb-6 text-[#140d0a]"
            style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
          >
            The Tactile Spectrum of
            <br />
            <span className="font-display italic text-[#ff443a]">
              Natural Stone in Light & Architecture
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#140d0a]/75 max-w-3xl">
            A photographic study of raw quarry strata, diamond-polished crystal planes, flamed anti-slip pavers, and CNC carved bespoke facades.
          </p>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <section className="py-12 px-6 md:px-14 lg:px-20 bg-white border-b border-[#140d0a]/10 sticky top-[72px] z-30 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-200 border cursor-pointer ${
                selectedCat === cat
                  ? "bg-[#ff443a] text-white border-[#ff443a]"
                  : "bg-[#fcf8f1] text-[#140d0a]/70 border-[#140d0a]/10 hover:border-[#ff443a]/40 hover:text-[#140d0a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Staggered Masonry Mosaic ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 bg-[#fcf8f1]">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActiveLightbox(item)}
                className={`${item.colSpan} bg-white border border-[#140d0a]/10 p-8 shadow-sm hover:border-[#ff443a]/50 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Top Swatch Tone Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-[#140d0a]/20 flex-none"
                      style={{ background: item.swatchTone }}
                    />
                    <span className="text-[10px] tracking-[0.22em] uppercase text-[#ff443a] font-medium">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#140d0a]/40">
                    {item.location}
                  </span>
                </div>

                {/* Central Focus */}
                <div className="my-6">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#140d0a]/50 block mb-1">
                    {item.stoneType} · {item.finish}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-[#140d0a] group-hover:text-[#ff443a] transition-colors duration-300 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#140d0a]/70">
                    {item.caption}
                  </p>
                </div>

                {/* Footer Technical Note */}
                <div className="border-t border-[#140d0a]/10 pt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#140d0a]/50 italic">
                    {item.technicalNote}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#ff443a] font-medium group-hover:translate-x-1 transition-transform">
                    Inspect →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Lightbox Preview Modal ── */}
      {activeLightbox && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#140d0a]/20 p-8 md:p-12 max-w-2xl w-full relative shadow-2xl">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-6 right-6 text-[#140d0a]/40 hover:text-[#140d0a] bg-transparent border-none text-2xl cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-2 block">
              Texture & Application Inspection · {activeLightbox.category}
            </span>

            <h2 className="font-display text-3xl font-light text-[#140d0a] mb-2">
              {activeLightbox.title}
            </h2>

            <p className="text-[13px] text-[#ff443a] font-medium mb-6">
              Stone: {activeLightbox.stoneType} · Finish: {activeLightbox.finish} · Location: {activeLightbox.location}
            </p>

            <div className="space-y-4 text-[14px] text-[#140d0a]/75 leading-relaxed mb-8">
              <div className="p-4 bg-[#faf5ec] border border-[#140d0a]/10">
                <strong className="text-[#140d0a] block mb-1">Architectural Scope:</strong>
                {activeLightbox.caption}
              </div>
              <div className="p-4 bg-[#faf5ec] border border-[#140d0a]/10">
                <strong className="text-[#140d0a] block mb-1">Laboratory Metric:</strong>
                {activeLightbox.technicalNote}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-[#140d0a]/10 pt-6">
              <button
                onClick={() => {
                  setActiveLightbox(null);
                  handleContactClick();
                }}
                className="px-8 py-3.5 bg-[#ff443a] text-white text-[10px] tracking-[0.24em] uppercase font-medium hover:bg-[#e6352b] transition-colors border-none cursor-pointer shadow-md"
              >
                Inquire For This Stone & Finish
              </button>
              <button
                onClick={() => setActiveLightbox(null)}
                className="px-6 py-3.5 border border-[#140d0a]/20 text-[#140d0a]/70 text-[10px] tracking-[0.2em] uppercase font-medium bg-transparent hover:text-[#140d0a] cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
