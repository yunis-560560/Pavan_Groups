"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToHash } from "@/components/SmoothScroll";

interface ProductItem {
  id: string;
  name: string;
  colors: string[];
  description: string;
  finishTags: string[];
  gradientPreview: string;
}

interface CompanySectionData {
  code: string;
  num: string;
  id: string;
  companyName: string;
  divisionName: string;
  speciality: string;
  tagline: string;
  summary: string;
  accentColor: string;
  badgeBg: string;
  thickness: string[];
  sizes: string[];
  applications: { title: string; category: string }[];
  products: ProductItem[];
  catalogSlug: string;
}

const COMPANIES_DATA: CompanySectionData[] = [
  {
    code: "2A",
    num: "01",
    id: "pavan-impex",
    companyName: "Pavan Impex",
    divisionName: "Natural Stone Exports",
    speciality: "Slate & Wall Cladding",
    tagline: "Metamorphic Foliated Textures & Hand-Calibrated Split Panels",
    summary:
      "Slate is a natural stone with rich texture and layers. It is quarried in Markapur and processed into tiles, ledgers, and mosaic pieces. It is the most popular stone for wall cladding and elevations worldwide.",
    accentColor: "#ff443a",
    badgeBg: "rgba(255, 68, 58, 0.12)",
    thickness: ["12mm", "15mm", "18mm", "20mm"],
    sizes: ["1x1 ft", "2x1 ft", "2x2 ft", "2x4 ft", "Random Sizes", "Ledgers"],
    applications: [
      { title: "Exterior Wall Cladding & Elevation Designs", category: "Exterior Facade" },
      { title: "Flooring (indoor & outdoor)", category: "High Traffic" },
      { title: "Garden Landscaping & Waterfalls", category: "Landscape & Water" },
      { title: "Feature Walls", category: "Interior Luxury" },
      { title: "Farmhouses, Hotels & Resorts", category: "Hospitality" },
    ],
    catalogSlug: "slate",
    products: [
      {
        id: "black-slate-stone",
        name: "Black Slate Stone",
        colors: ["Black", "Dark Grey", "Charcoal"],
        description:
          "Classic dark, bold look. Most popular for modern homes, feature walls, exterior elevations.",
        finishTags: ["Natural Cleft", "Calibrated", "Honed"],
        gradientPreview: "linear-gradient(135deg, #1c1f24 0%, #2a2d34 50%, #15171a 100%)",
      },
      {
        id: "indian-autumn-slate",
        name: "Indian Autumn Slate",
        colors: ["Brown", "Rust", "Copper", "Golden Shades"],
        description:
          "Warm earthy tones. Gives a rustic, natural feel. Great for farmhouses, garden walls, villas.",
        finishTags: ["Hand-Split", "Tumbled", "Natural Layered"],
        gradientPreview: "linear-gradient(135deg, #5a3424 0%, #874e31 50%, #3e2417 100%)",
      },
      {
        id: "california-gold-slate",
        name: "California Gold Slate",
        colors: ["Gold", "Brown", "Rust", "Earthy Tones"],
        description:
          "Premium golden appearance. Ideal for hotels, resorts, and luxury residential projects.",
        finishTags: ["Golden Sparkle", "Riven Surface", "Calibrated"],
        gradientPreview: "linear-gradient(135deg, #7a5423 0%, #a47638 50%, #4f3414 100%)",
      },
      {
        id: "black-slate-mosaic",
        name: "Black Slate Mosaic",
        colors: ["Black", "Charcoal Grey"],
        description:
          "Small pieces arranged in patterns. Decorative use for accent walls, pool surrounds, feature areas.",
        finishTags: ["Mesh Mounted", "Interlocking Panels", "3D Ledger"],
        gradientPreview: "linear-gradient(135deg, #18191c 0%, #2e3036 40%, #121316 100%)",
      },
    ],
  },
  {
    code: "2B",
    num: "02",
    id: "sai-balaji",
    companyName: "Sai Balaji Impex",
    divisionName: "Limestone Products",
    speciality: "Limestone Products",
    tagline: "Durable Outdoor Stone with Anti-Skid Surface",
    summary:
      "Limestone is a durable outdoor stone known for its anti-skid surface — making it perfect for areas around swimming pools, pathways, and driveways. It handles Australian outdoor conditions extremely well.",
    accentColor: "#ff6e8f",
    badgeBg: "rgba(255, 110, 143, 0.12)",
    thickness: ["15mm", "18mm", "20mm", "25mm"],
    sizes: ["1x1 ft", "2x1 ft", "2x2 ft", "Pavers", "Stepping Stones", "Custom Sizes"],
    applications: [
      { title: "Outdoor Flooring & Parking Areas", category: "Exterior Non-Slip" },
      { title: "Walkways & Garden Pathways", category: "Pedestrian" },
      { title: "Swimming Pool Areas (anti-skid surface — very important for safety)", category: "Wet Area Safety" },
      { title: "Farmhouses & Landscape Projects", category: "Landscape" },
    ],
    catalogSlug: "limestone",
    products: [
      {
        id: "cuddapah-black-limestone",
        name: "Cuddapah Black Limestone",
        colors: ["Black", "Dark Grey"],
        description:
          "Dark, premium-looking stone. Heavy-duty outdoor flooring, parking, commercial areas.",
        finishTags: ["Natural", "Honed", "Tumbled"],
        gradientPreview: "linear-gradient(135deg, #1b1d20 0%, #2b2e33 50%, #111214 100%)",
      },
      {
        id: "lime-yellow-limestone",
        name: "Lime Yellow Limestone",
        colors: ["Yellow", "Beige"],
        description:
          "Bright, warm tones. Cheerful look for garden paths, walkways, and outdoor entertaining areas.",
        finishTags: ["Brushed", "Antiqued", "Calibrated"],
        gradientPreview: "linear-gradient(135deg, #8a733e 0%, #b39a58 50%, #5d4d27 100%)",
      },
      {
        id: "lime-blue-limestone",
        name: "Lime Blue Limestone",
        colors: ["Blue Grey", "Ash Grey"],
        description:
          "Cool, sophisticated tones. Popular for pool surrounds, modern landscapes.",
        finishTags: ["Cobbled", "Calibrated Tiles", "Flamed"],
        gradientPreview: "linear-gradient(135deg, #37424d 0%, #536374 50%, #232a31 100%)",
      },
      {
        id: "limestone-pavers",
        name: "Limestone Pavers",
        colors: ["Natural Stone"],
        description:
          "Pre-cut paving pieces. Anti-skid surface, ideal for driveways, parking areas, pathways.",
        finishTags: ["Chiseled Edge", "Tumbled", "Heavy Duty"],
        gradientPreview: "linear-gradient(135deg, #444b54 0%, #616b77 50%, #2d333b 100%)",
      },
      {
        id: "stepping-stones",
        name: "Stepping Stones",
        colors: ["Natural Landscape"],
        description:
          "Individual stones placed in gardens for walking paths. Decorative and functional.",
        finishTags: ["Natural Surface", "Rustic Edge", "Landscape Grade"],
        gradientPreview: "linear-gradient(135deg, #534c44 0%, #766d62 50%, #3a342d 100%)",
      },
    ],
  },
  {
    code: "2C",
    num: "03",
    id: "pavan-granite",
    companyName: "Pavan Granite",
    divisionName: "Premium Granite",
    speciality: "Premium Granite",
    tagline: "Mirror-Polished Natural Hard Stone for Luxury Interiors",
    summary:
      "Granite is one of the hardest natural stones on Earth. It is polished to a mirror-like finish and is the top choice for kitchen countertops, commercial spaces, and luxury interiors.",
    accentColor: "#f4c430",
    badgeBg: "rgba(244, 196, 48, 0.12)",
    thickness: ["16mm", "18mm", "20mm", "30mm"],
    sizes: ["8x3 ft Slabs", "9x4 ft Slabs", "1x1 ft Tiles", "2x2 ft Tiles", "Custom"],
    applications: [
      { title: "Kitchen Countertops (most popular use)", category: "Culinary Top Choice" },
      { title: "Flooring & Staircases", category: "Heavy Traffic" },
      { title: "Wall Cladding (interior)", category: "Interior Facade" },
      { title: "Hotel & Commercial Interiors", category: "Prestige Spaces" },
      { title: "Table Tops", category: "Custom Fabrication" },
    ],
    catalogSlug: "granite",
    products: [
      {
        id: "black-galaxy-granite",
        name: "Black Galaxy Granite",
        colors: ["Deep Black background with Golden & Silver Speckles"],
        description:
          "The most prestigious granite variety from India. Stunning in kitchens, hotel lobbies, staircases. Gives a luxury, high-end finish unlike anything else.",
        finishTags: ["Mirror Polish", "Leathered", "Lapato"],
        gradientPreview: "linear-gradient(135deg, #0d0e10 0%, #1f2126 50%, #08090a 100%)",
      },
    ],
  },
];

export default function Products() {
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const activeCompany = COMPANIES_DATA[activeCompanyIndex];

  const handleContactScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#fcf8f1] border-t border-[#140d0a]/10"
    >
      {/* Ambient architectural grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,13,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,13,10,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── TOP SECTION BADGE & TITLE ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-5 pb-6 border-b border-[#140d0a]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#140d0a]/10 shadow-sm mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff443a] animate-pulse" />
              <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] font-semibold text-[#140d0a]">
                SECTION 2 — PRODUCTS IN FULL DETAIL
              </span>
            </div>
            <h2
              className="font-display font-light text-[#140d0a] leading-[1.08] tracking-[-0.015em]"
              style={{ fontSize: "clamp(28px, 3.4vw, 50px)" }}
            >
              Direct Quarry Extractions.
              <br />
              <span className="italic font-normal text-[#ff443a]">
                Slate, Limestone & Monolithic Granite.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleContactScroll}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[9.5px] uppercase tracking-[0.2em] font-semibold bg-[#ff443a] text-white hover:bg-[#e6352b] transition-all shadow-md cursor-pointer border-none"
            >
              <span>Get Custom Quote</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* ── 2-COLUMN SHOWCASE: Left Product Details + Right Bounded Floating Company Names ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-stretch relative">
          
          {/* ── LEFT COLUMN: ACTIVE COMPANY FULL PRODUCT DETAILS (9 Cols on md+) ── */}
          <div className="md:col-span-8 lg:col-span-9 order-2 md:order-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCompany.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* ── COMPANY BANNER ── */}
                <div className="bg-white p-6 sm:p-8 border border-[#140d0a]/10 shadow-sm relative overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-20"
                    style={{
                      background: `radial-gradient(circle at top right, ${activeCompany.accentColor} 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                      <span
                        className="px-2.5 py-1 text-[9.5px] font-mono font-bold tracking-wider uppercase text-white shadow-sm"
                        style={{ background: activeCompany.accentColor }}
                      >
                        {activeCompany.code}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#140d0a]/80">
                        {activeCompany.companyName} — {activeCompany.divisionName}
                      </span>
                      <span className="text-[#140d0a]/30">•</span>
                      <span className="text-[11px] font-semibold" style={{ color: activeCompany.accentColor }}>
                        {activeCompany.speciality}
                      </span>
                    </div>

                    <h3 className="font-display font-light text-2xl sm:text-3xl text-[#140d0a] mb-3">
                      {activeCompany.companyName} Natural Stone Exports — {activeCompany.speciality}
                    </h3>

                    <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#140d0a]/80 font-light">
                      {activeCompany.summary}
                    </p>
                  </div>
                </div>

                {/* ── 4 DETAILED PRODUCT CARDS (2x2 Grid) ── */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: activeCompany.accentColor }} />
                      <h4 className="font-display font-medium text-lg text-[#140d0a]">
                        {activeCompany.companyName} Materials Catalogue ({activeCompany.products.length} Products)
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-[#140d0a]/50 uppercase tracking-wider hidden sm:inline">
                      Markapur Quarry Extracted
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCompany.products.map((product, pIdx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: pIdx * 0.05, duration: 0.35 }}
                        className="bg-white border border-[#140d0a]/10 hover:border-[#ff443a]/50 hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Top Product Header */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <span className="text-[9.5px] font-mono text-[#140d0a]/40 font-semibold tracking-wider block mb-0.5">
                                PROD 0{pIdx + 1}
                              </span>
                              <h5 className="font-display text-base sm:text-lg font-medium text-[#140d0a] group-hover:text-[#ff443a] transition-colors">
                                {product.name}
                              </h5>
                            </div>

                            {/* Texture Color Palette Dot Preview */}
                            <div
                              className="w-8 h-8 rounded-sm border border-black/15 shadow-inner flex-none"
                              style={{ background: product.gradientPreview }}
                              title={`Visual sample: ${product.name}`}
                            />
                          </div>

                          {/* Available Colors Tags */}
                          <div className="mb-3.5">
                            <span className="text-[9px] uppercase font-mono tracking-wider text-[#140d0a]/50 block mb-1 font-semibold">
                              Available Colors:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {product.colors.map((color) => (
                                <span
                                  key={color}
                                  className="px-2 py-0.5 text-[9.5px] font-medium bg-[#fcf8f1] border border-[#140d0a]/15 text-[#140d0a]/85"
                                >
                                  {color}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* What It Looks Like / Best Use Description */}
                          <div className="p-3 bg-[#faf6ef] border-l-2 border-[#140d0a]/20 group-hover:border-[#ff443a] transition-colors mb-3.5">
                            <span className="text-[8.5px] uppercase font-mono tracking-wider text-[#140d0a]/55 font-bold block mb-0.5">
                              What It Looks Like / Best Use:
                            </span>
                            <p className="text-[12px] leading-relaxed text-[#140d0a]/80 font-normal">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        {/* Finishes & Request Action */}
                        <div className="pt-2.5 border-t border-[#140d0a]/10 flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex flex-wrap gap-1">
                            {product.finishTags.map((finish) => (
                              <span
                                key={finish}
                                className="text-[8.5px] uppercase tracking-wider px-1.5 py-0.5 bg-white border border-[#140d0a]/10 text-[#140d0a]/65"
                              >
                                {finish}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={handleContactScroll}
                            className="text-[9px] uppercase tracking-[0.16em] font-semibold text-[#ff443a] hover:underline cursor-pointer border-none bg-transparent"
                          >
                            Enquire Stone →
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ── TECHNICAL BLUEPRINT: THICKNESS, SIZES & APPLICATIONS ── */}
                <div className="bg-[#140d0a] text-white p-6 sm:p-8 shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Dimensions (7 Cols) */}
                    <div className="md:col-span-7 space-y-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-[#ff443a] font-bold block mb-1">
                          Fabrication Standards
                        </span>
                        <h4 className="font-display font-light text-xl sm:text-2xl text-white">
                          {activeCompany.companyName} Dimensions & Availability
                        </h4>
                      </div>

                      {/* Thickness Available */}
                      <div className="p-3.5 bg-white/5 border border-white/10">
                        <span className="text-[9.5px] font-mono uppercase tracking-wider text-white/60 block mb-1.5 font-semibold">
                          THICKNESS AVAILABLE:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeCompany.thickness.map((thick) => (
                            <span
                              key={thick}
                              className="px-2.5 py-1 text-xs font-mono font-semibold bg-white/10 border border-white/20 text-white"
                            >
                              {thick}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sizes Available */}
                      <div className="p-3.5 bg-white/5 border border-white/10">
                        <span className="text-[9.5px] font-mono uppercase tracking-wider text-white/60 block mb-1.5 font-semibold">
                          SIZES AVAILABLE:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeCompany.sizes.map((size) => (
                            <span
                              key={size}
                              className="px-2.5 py-1 text-xs font-mono font-semibold bg-white/10 border border-white/20 text-white"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Applications Checklist (5 Cols) */}
                    <div className="md:col-span-5 bg-white/5 border border-white/10 p-4 sm:p-5">
                      <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#ff443a] block mb-1.5 font-bold">
                        APPLICATIONS (WHERE THIS STONE IS USED):
                      </span>
                      <h5 className="font-display text-base text-white font-medium mb-3">
                        Architectural Use-Cases
                      </h5>

                      <ul className="space-y-2">
                        {activeCompany.applications.map((app, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2 text-xs text-white/85">
                            <span className="text-[#ff443a] text-xs leading-none mt-0.5">✔</span>
                            <div>
                              <span className="font-medium text-white text-[11.5px]">{app.title}</span>
                              <span className="text-[9.5px] font-mono text-white/45 block">
                                {app.category}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[9.5px] text-white/60">
                          Direct Quarry Processing
                        </span>
                        <button
                          onClick={handleContactScroll}
                          className="px-3 py-1.5 text-[8.5px] uppercase tracking-[0.16em] font-semibold bg-white text-[#140d0a] hover:bg-[#ff443a] hover:text-white transition-colors cursor-pointer border-none"
                        >
                          Request Sample Kit
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT COLUMN: STRICTLY SECTION-BOUNDED FLOATING COMPANY NAMES ── */}
          <div className="md:col-span-4 lg:col-span-3 order-1 md:order-2 relative h-full">
            <div className="md:sticky md:top-36 lg:top-40 z-30 py-2 md:py-4">
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-transparent"
              >
                {/* Clean Transparent Floating Items */}
                <div className="flex flex-col">
                  {COMPANIES_DATA.map((company, idx) => {
                    const isSelected = activeCompanyIndex === idx;

                    return (
                      <div key={company.id}>
                        {idx > 0 && (
                          <div className="h-px bg-[#140d0a]/15 my-3 sm:my-3.5 w-full" />
                        )}

                        <button
                          onClick={() => setActiveCompanyIndex(idx)}
                          className={`group w-full text-left transition-all duration-300 cursor-pointer bg-transparent border-none p-0 block ${
                            isSelected ? "translate-x-1" : "hover:translate-x-1"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span
                              className="font-mono text-[10.5px] tracking-wider font-semibold transition-colors"
                              style={{
                                color: isSelected ? company.accentColor : "rgba(20,13,10,0.4)",
                              }}
                            >
                              {company.num} · {company.code}
                            </span>

                            <span
                              className="text-xs transition-transform"
                              style={{
                                color: isSelected ? company.accentColor : "rgba(20,13,10,0.25)",
                                transform: isSelected ? "scale(1.2)" : "scale(1)",
                              }}
                            >
                              {isSelected ? "●" : "○"}
                            </span>
                          </div>

                          <h4
                            className={`font-display text-lg sm:text-xl lg:text-2xl leading-tight transition-colors ${
                              isSelected
                                ? "text-[#140d0a] font-medium"
                                : "text-[#140d0a]/45 group-hover:text-[#140d0a]"
                            }`}
                          >
                            {company.companyName}
                          </h4>

                          <p
                            className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] font-semibold transition-colors mt-0.5 truncate"
                            style={{
                              color: isSelected ? company.accentColor : "rgba(20,13,10,0.4)",
                            }}
                          >
                            {company.speciality}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
