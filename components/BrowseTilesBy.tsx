"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Layers, Palette, Ruler, Maximize2, ArrowRight } from "lucide-react";

type FilterTab = "stones" | "colors" | "sizes";

interface TileCard {
  id: string;
  name: string;
  category: string;
  gradient: string;
  linkHref: string;
}

interface SizeItem {
  id: string;
  label: string;
  linkHref: string;
}

const TILE_COLLECTIONS: Record<"stones" | "colors", TileCard[]> = {
  stones: [
    {
      id: "stone-slate",
      name: "Natural Slate",
      category: "Markapur Foliated Cleft",
      gradient: "linear-gradient(135deg, #1c1f24 0%, #2f343d 50%, #131518 100%)",
      linkHref: "/products?company=Pavan+Impex&stone=slate",
    },
    {
      id: "stone-granite",
      name: "Black Galaxy Granite",
      category: "Chimakurthy Gold Sparkle",
      gradient: "linear-gradient(135deg, #0a0b0d 0%, #221f17 50%, #040506 100%)",
      linkHref: "/products?company=Pavan+Granite&stone=granite",
    },
    {
      id: "stone-limestone",
      name: "Calcareous Limestone",
      category: "Cuddapah Anti-Skid Pavers",
      gradient: "linear-gradient(135deg, #2b2823 0%, #443c33 50%, #1c1915 100%)",
      linkHref: "/products?company=Sai+Balaji+Impex&stone=limestone",
    },
    {
      id: "stone-3d-cladding",
      name: "3D Ledger Cladding",
      category: "Stacked Interlocking Panels",
      gradient: "linear-gradient(135deg, #151618 0%, #2b2c31 40%, #0e0f11 100%)",
      linkHref: "/products?finish=3D+Ledger+Relief",
    },
    {
      id: "stone-pavers",
      name: "Tumbled Pavers",
      category: "Heavy Vehicular Cobble",
      gradient: "linear-gradient(135deg, #383e46 0%, #4f5762 50%, #24282d 100%)",
      linkHref: "/products?finish=Tumbled+Antique&size=200x100+mm+Pavers",
    },
  ],
  colors: [
    {
      id: "color-midnight-slate",
      name: "Midnight Black",
      category: "Markapur Pure Slate",
      gradient: "linear-gradient(135deg, #18191c 0%, #282b31 50%, #121316 100%)",
      linkHref: "/products?color=Midnight+Black",
    },
    {
      id: "color-gold-galaxy",
      name: "Gold Star Galaxy",
      category: "Precambrian Bronzite",
      gradient: "linear-gradient(135deg, #090a0c 0%, #242017 50%, #040506 100%)",
      linkHref: "/products?color=Gold+Bronzite",
    },
    {
      id: "color-autumn-copper",
      name: "Indian Autumn",
      category: "Rust & Terracotta Earth",
      gradient: "linear-gradient(135deg, #532f1f 0%, #7d4428 50%, #3a1f13 100%)",
      linkHref: "/products?color=Autumn+Copper",
    },
    {
      id: "color-california-gold",
      name: "California Gold",
      category: "Golden Bronze Mica",
      gradient: "linear-gradient(135deg, #6c471c 0%, #96692f 50%, #442a0e 100%)",
      linkHref: "/products?color=California+Gold",
    },
    {
      id: "color-lime-yellow",
      name: "Lime Yellow",
      category: "Warm Butterscotch Sand",
      gradient: "linear-gradient(135deg, #7c6433 0%, #a48a4c 50%, #524220 100%)",
      linkHref: "/products?color=Lime+Yellow",
    },
  ],
};

const SIZES_DATA: SizeItem[] = [
  { id: "s1", label: "119x280 cm-5.5 mm", linkHref: "/products?size=Jumbo+Gangsaw+Slabs" },
  { id: "s2", label: "119x240 cm", linkHref: "/products?size=Jumbo+Gangsaw+Slabs" },
  { id: "s3", label: "120x240 cm", linkHref: "/products?size=Jumbo+Gangsaw+Slabs" },
  { id: "s4", label: "120x180 cm", linkHref: "/products?size=1200x600+mm" },
  { id: "s5", label: "80x160 cm", linkHref: "/products?size=1200x600+mm" },
  { id: "s6", label: "120x120 cm", linkHref: "/products?size=600x600+mm" },
  { id: "s7", label: "100x100 cm", linkHref: "/products?size=600x600+mm" },
  { id: "s8", label: "80x260 cm-15mm", linkHref: "/products?size=Jumbo+Gangsaw+Slabs" },
  { id: "s9", label: "80x240 cm-15mm", linkHref: "/products?size=Jumbo+Gangsaw+Slabs" },
  { id: "s10", label: "60x120 cm", linkHref: "/products?size=1200x600+mm" },
  { id: "s11", label: "60x60 cm", linkHref: "/products?size=600x600+mm" },
  { id: "s12", label: "30x60 cm", linkHref: "/products?size=600x300+mm" },
];

export default function BrowseTilesBy() {
  const [activeTab, setActiveTab] = useState<FilterTab>("stones");

  return (
    <section
      id="browse-tiles"
      className="py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#ffffff] border-t border-[#747474]/15"
    >
      <div className="max-w-7xl mx-auto text-center">
        
        {/* ── CENTERED SECTION HEADER ── */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-10">
          <h2
            className="font-display font-light leading-[1.05] tracking-[-0.015em] mb-2.5"
            style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}
          >
            <span className="text-[#241919]">Explore Natural Stone</span>{" "}
            <span className="text-[#8b4513] italic font-normal">Collections</span>
          </h2>

          <p className="text-[14px] sm:text-[15.5px] leading-relaxed text-[#454545] font-light">
            Filter our direct quarry-extracted Slate, Limestone, and Granite by mineral variety, natural color tone, or calibrated architectural dimensions.
          </p>
        </div>

        {/* ── CENTERED FILTER PILL TABS (LUCIDE ICONS & SLEEK DEEP ESPRESSO / BRONZE ACCENT) ── */}
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#f5efe6] rounded-full mb-10 md:mb-14 border border-[#747474]/20 shadow-xs">
          
          {/* Tab 1: Stones */}
          <button
            type="button"
            onClick={() => setActiveTab("stones")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "stones"
                ? "bg-[#241919] text-[#f7f2ea] shadow-sm"
                : "text-[#454545] hover:text-[#241919] hover:bg-white/60"
            }`}
          >
            <Layers className={`w-3.5 h-3.5 ${activeTab === "stones" ? "text-[#d8c3a5]" : "text-[#747474]"}`} />
            <span>Stones</span>
          </button>

          {/* Tab 2: Colors */}
          <button
            type="button"
            onClick={() => setActiveTab("colors")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "colors"
                ? "bg-[#241919] text-[#f7f2ea] shadow-sm"
                : "text-[#454545] hover:text-[#241919] hover:bg-white/60"
            }`}
          >
            <Palette className={`w-3.5 h-3.5 ${activeTab === "colors" ? "text-[#d8c3a5]" : "text-[#747474]"}`} />
            <span>Colors</span>
          </button>

          {/* Tab 3: Sizes */}
          <button
            type="button"
            onClick={() => setActiveTab("sizes")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "sizes"
                ? "bg-[#241919] text-[#f7f2ea] shadow-sm"
                : "text-[#454545] hover:text-[#241919] hover:bg-white/60"
            }`}
          >
            <Ruler className={`w-3.5 h-3.5 ${activeTab === "sizes" ? "text-[#d8c3a5]" : "text-[#747474]"}`} />
            <span>Sizes</span>
          </button>

        </div>

        {/* ── CONDITIONAL DISPLAY: SIZES ARCHITECTURAL MATRIX vs VISUAL TILE CARDS ── */}
        <AnimatePresence mode="wait">
          {activeTab === "sizes" ? (
            /* ── SIZES TAB: CLEAN 4-COLUMN ARCHITECTURAL GRID WITH SEPARATOR LINES ── */
            <motion.div
              key="sizes-grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0 text-left mb-12 border-t border-[#747474]/20"
            >
              {SIZES_DATA.map((size) => (
                <Link
                  key={size.id}
                  href={size.linkHref}
                  className="flex items-center gap-3.5 py-4 border-b border-[#747474]/20 hover:bg-[#fcf8f1] px-2.5 transition-colors group cursor-pointer"
                >
                  {/* Lucide Maximize2 Dimension Icon in Warm Bronze */}
                  <div className="w-5 h-5 flex-none flex items-center justify-center text-[#9c6800] group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Size Label */}
                  <span className="text-[14.5px] sm:text-[15px] font-sans font-medium text-[#241919] group-hover:text-[#9c6800] transition-colors leading-none">
                    {size.label}
                  </span>
                </Link>
              ))}
            </motion.div>
          ) : (
            /* ── STONES / COLORS TABS: 5-CARD FULL-BLEED IMAGE ROW ── */
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-10"
            >
              {TILE_COLLECTIONS[activeTab].map((card) => (
                <Link
                  key={card.id}
                  href={card.linkHref}
                  className="group relative block aspect-[4/5] rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 border border-[#747474]/15"
                >
                  {/* Full-Bleed Tile Texture Surface */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-108"
                    style={{ background: card.gradient }}
                  />

                  {/* Bottom Shadow Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Bottom-Left Overlaid Text Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white z-10">
                    <span className="font-sans font-semibold text-base sm:text-lg block leading-tight text-white drop-shadow-md group-hover:text-[#d8c3a5] transition-colors">
                      {card.name}
                    </span>
                    <span className="text-[10px] font-mono text-white/70 block mt-0.5 truncate">
                      {card.category}
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOTTOM CENTERED ACTION BUTTON ── */}
        <div className="pt-2">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#241919] hover:bg-[#3e352a] text-[#f7f2ea] rounded-full text-xs font-sans font-medium transition-all shadow-md hover:shadow-lg hover:translate-y-[-1px] cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d8c3a5]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
