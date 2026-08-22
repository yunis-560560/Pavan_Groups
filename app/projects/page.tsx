"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type ProjectItem = {
  id: string;
  title: string;
  location: string;
  country: string;
  category: "Hospitality" | "Commercial" | "Residential" | "Civic" | "Urban Landscape";
  materials: string;
  volume: string;
  year: string;
  architect: string;
  highlight: string;
  description: string;
  featured?: boolean;
};

const allProjects: ProjectItem[] = [
  {
    id: "leela-palace",
    title: "The Leela Palace Portico & Atrium",
    location: "New Delhi",
    country: "India",
    category: "Hospitality",
    materials: "Makrana White Marble & Absolute Black Granite",
    volume: "18,500 m² Calibrated Slabs + 40 Hand-Carved Jali Screens",
    year: "2023",
    architect: "Wimberly Allison Tong & Goo (WATG)",
    highlight: "Grand imperial entrance portico & custom bookmatched marble lobby suites.",
    description: "A monumental homage to North Indian royal architecture. Every slab was hand-inspected for zero grain deviation across the grand central atrium and presidential wings.",
    featured: true,
  },
  {
    id: "marina-bay",
    title: "Marina Bay Waterfront Promenade",
    location: "Downtown Core",
    country: "Singapore",
    category: "Urban Landscape",
    materials: "Tumbled Grey Limestone & Flamed Black Basalt Cobblestones",
    volume: "34,000 m² High-Durability Pedestrian Paving",
    year: "2022",
    architect: "Cox Architecture & Urban Redevelopment Authority",
    highlight: "Anti-slip flamed finish with high marine salt resistance.",
    description: "Engineered to withstand millions of annual footsteps in a tropical coastal environment. Tested under 0.1% water absorption to guarantee zero marine discoloration.",
    featured: true,
  },
  {
    id: "al-hamra",
    title: "Al Hamra Tower Commercial Podium",
    location: "Kuwait City",
    country: "Kuwait",
    category: "Commercial",
    materials: "Absolute Black Granite & Honed Beige Limestone",
    volume: "12,200 m² Exterior Rainscreen Facade Slabs",
    year: "2023",
    architect: "Skidmore, Owings & Merrill (SOM)",
    highlight: "Precision dry-hung ventilated facade system tested up to 55°C ambient thermal load.",
    description: "Fabricated with ±0.5mm strict tolerances for an advanced structural facade system resistant to extreme desert sun exposure and sandstorms.",
  },
  {
    id: "marbella-villa",
    title: "Seaview Villa Estate",
    location: "Marbella, Costa del Sol",
    country: "Spain",
    category: "Residential",
    materials: "Autumn Rustic Slate & Kota Blue Pool Copings",
    volume: "6,400 m² Multi-Level Terrace Paving & Infinity Edges",
    year: "2024",
    architect: "ARK Architects",
    highlight: "Seamless indoor-to-outdoor organic transition with bullnosed hand-honed coping.",
    description: "An ultra-luxury Mediterranean private estate fusing warm rustic slate textures with cool honed limestone pool decking.",
  },
  {
    id: "parliament-quarter",
    title: "Parliamentary Civic Quarter",
    location: "Canberra",
    country: "Australia",
    category: "Civic",
    materials: "Pink Granite Slabs & Charcoal Cobblestone Pavers",
    volume: "22,000 m² Monumental Plaza Paving",
    year: "2022",
    architect: "National Capital Authority & Hassell",
    highlight: "Heritage grade stone certified for 100-year public infrastructure lifecycle.",
    description: "Monolithic stone paving and heavy granite bollards custom cut for the federal civic precinct, compliant with stringent Australian slip and compressive standards.",
  },
  {
    id: "bkc-financial",
    title: "Bandra Kurla Complex Financial Tower",
    location: "Mumbai",
    country: "India",
    category: "Commercial",
    materials: "Black Galaxy Granite & Kashmir White Granite",
    volume: "16,800 m² High-Speed Elevator Portals & Executive Floors",
    year: "2024",
    architect: "Hafeez Contractor & Gensler",
    highlight: "Polished diamond gloss finish reflecting panoramic financial district skyline.",
    description: "High-spec interior stone fitout across 28 storeys, delivering dramatic architectural contrast between deep starry Black Galaxy granite and ethereal Kashmir White.",
  },
  {
    id: "kyoto-sanctuary",
    title: "Kyoto Zen Wellness Pavilion",
    location: "Kyoto",
    country: "Japan",
    category: "Hospitality",
    materials: "River Tumbled Cobbles & Bush-Hammered Basalt",
    volume: "4,200 m² Meditative Rock Gardens and Thermal Onsen Baths",
    year: "2023",
    architect: "Kengo Kuma & Associates",
    highlight: "Tactile thermal stone retaining volcanic mineral integrity in hot spring waters.",
    description: "Natural organic stonework calibrated for water immersion, tactile barefoot comfort, and timeless Japanese aesthetic philosophy.",
  },
  {
    id: "zurich-plaza",
    title: "Lake Zurich Corporate Center",
    location: "Zurich",
    country: "Switzerland",
    category: "Commercial",
    materials: "Grey Kota Limestone & Flamed Black Granite",
    volume: "9,800 m² Frost-Resistant Exterior Plaza",
    year: "2023",
    architect: "Foster + Partners",
    highlight: "50-cycle European freeze-thaw certified stone (EN 12371 standards).",
    description: "High-latitude architectural application engineered to resist severe Alpine winter freezes, road de-icing salts, and heavy pedestrian traffic.",
  },
];

const sectors = ["All Sectors", "Hospitality", "Commercial", "Residential", "Civic", "Urban Landscape"];

export default function ProjectsPage() {
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);
  const router = useRouter();

  const filteredProjects = useMemo(() => {
    if (selectedSector === "All Sectors") return allProjects;
    return allProjects.filter((p) => p.category === selectedSector);
  }, [selectedSector]);

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
            <span className="text-[#ff443a] font-medium">Landmark Portfolio</span>
          </div>

          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#ff443a]/10 border border-[#ff443a]/25 text-[#ff443a] text-[10px] tracking-[0.24em] uppercase font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a] animate-pulse" />
            <span>International Architectural Archive</span>
          </div>

          <h1
            className="font-display font-light leading-[1.05] tracking-[-0.015em] mb-6 text-[#140d0a]"
            style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
          >
            Stone that Shapes
            <br />
            <span className="font-display italic text-[#ff443a]">
              Global Architectural Icons
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#140d0a]/75 max-w-3xl">
            From premier luxury resort destinations and sovereign government buildings to private Mediterranean estates, discover how our natural stone defines lasting places.
          </p>
        </div>
      </section>

      {/* ── Featured Panoramic Case Study (Hero Project Banner) ── */}
      <section className="py-16 px-6 md:px-14 lg:px-20 bg-[#f2ece2] border-b border-[#140d0a]/10">
        <div
          onClick={() => setActiveModal(allProjects[0])}
          className="p-8 md:p-14 bg-white border border-[#140d0a]/10 shadow-md cursor-pointer group hover:border-[#ff443a]/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[10px] tracking-[0.24em] uppercase px-3 py-1 bg-[#ff443a] text-white font-medium">
                Featured Case Study
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#140d0a]/50">
                {allProjects[0].category} · {allProjects[0].year}
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-light text-[#140d0a] group-hover:text-[#ff443a] transition-colors duration-300 mb-4 leading-tight">
              {allProjects[0].title}
            </h2>

            <p className="text-[15px] leading-relaxed text-[#140d0a]/75 mb-6 max-w-2xl">
              {allProjects[0].description}
            </p>

            <div className="space-y-2 border-t border-[#140d0a]/10 pt-4 text-[13px]">
              <div>
                <strong className="text-[#140d0a]">Material Specification:</strong>{" "}
                <span className="text-[#140d0a]/70">{allProjects[0].materials}</span>
              </div>
              <div>
                <strong className="text-[#140d0a]">Lead Architect:</strong>{" "}
                <span className="text-[#140d0a]/70">{allProjects[0].architect}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 bg-[#faf5ec] border border-[#140d0a]/10 flex flex-col justify-between h-full">
            <div>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#140d0a]/40 block mb-1">
                Delivered Volume
              </span>
              <span className="font-display text-2xl md:text-3xl font-light text-[#ff443a] block mb-6">
                18,500 m²
              </span>
            </div>
            <span className="text-[10px] tracking-[0.22em] uppercase font-medium text-[#140d0a] flex items-center gap-2 group-hover:text-[#ff443a]">
              <span>Inspect Full Case Study</span>
              <span>→</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── Sector Filter Bar ── */}
      <section className="py-12 px-6 md:px-14 lg:px-20 bg-white border-b border-[#140d0a]/10 sticky top-[72px] z-30 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-200 border cursor-pointer ${
                selectedSector === sec
                  ? "bg-[#ff443a] text-white border-[#ff443a]"
                  : "bg-[#fcf8f1] text-[#140d0a]/70 border-[#140d0a]/10 hover:border-[#ff443a]/40 hover:text-[#140d0a]"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </section>

      {/* ── Asymmetrical Project Grid ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 bg-[#fcf8f1]">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((p, idx) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActiveModal(p)}
                className="bg-white border border-[#140d0a]/10 p-8 md:p-10 shadow-sm hover:border-[#ff443a]/50 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] tracking-[0.26em] uppercase px-3 py-1 bg-[#fcf8f1] border border-[#140d0a]/10 text-[#ff443a] font-medium">
                      {p.category}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-[#140d0a]/40">
                      {p.year} · {p.country}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-light text-[#140d0a] group-hover:text-[#ff443a] transition-colors duration-300 mb-2">
                    {p.title}
                  </h3>

                  <p className="text-[12px] text-[#ff443a] font-medium mb-4">
                    {p.location}, {p.country}
                  </p>

                  <p className="text-[14px] leading-relaxed text-[#140d0a]/70 mb-6">
                    {p.description}
                  </p>

                  <div className="p-4 bg-[#faf5ec] border border-[#140d0a]/10 space-y-1.5 mb-6 text-[12px]">
                    <div>
                      <span className="text-[#140d0a]/50 uppercase tracking-[0.14em] text-[10px] block">
                        Specified Stone:
                      </span>
                      <span className="font-medium text-[#140d0a]">{p.materials}</span>
                    </div>
                    <div>
                      <span className="text-[#140d0a]/50 uppercase tracking-[0.14em] text-[10px] block">
                        Scope of Supply:
                      </span>
                      <span className="text-[#140d0a]/75">{p.volume}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#140d0a]/10 pt-4">
                  <span className="text-[11px] text-[#140d0a]/40">Architect: {p.architect}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#ff443a] font-medium">
                    View Specs →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Case Study Modal ── */}
      {activeModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#140d0a]/20 p-8 md:p-12 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-[#140d0a]/40 hover:text-[#140d0a] bg-transparent border-none text-2xl cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-2 block">
              Architectural Case Study · {activeModal.category}
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-light text-[#140d0a] mb-2">
              {activeModal.title}
            </h2>
            <p className="text-[13px] text-[#ff443a] font-medium mb-6">
              {activeModal.location}, {activeModal.country} · Completed {activeModal.year}
            </p>

            <div className="space-y-6 text-[14px] text-[#140d0a]/75 leading-relaxed mb-8">
              <div className="p-4 bg-[#faf5ec] border-l-2 border-[#ff443a]">
                <strong className="text-[#140d0a] block mb-1">Architectural Scope of Supply:</strong>
                {activeModal.volume}
              </div>

              <div>
                <strong className="text-[#140d0a] block mb-1">Material Integrity & Finish:</strong>
                <p>{activeModal.materials}</p>
              </div>

              <div>
                <strong className="text-[#140d0a] block mb-1">Technical Highlight:</strong>
                <p>{activeModal.highlight}</p>
              </div>

              <div>
                <strong className="text-[#140d0a] block mb-1">Project Context:</strong>
                <p>{activeModal.description}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-[#140d0a]/10 pt-6">
              <button
                onClick={() => {
                  setActiveModal(null);
                  handleContactClick();
                }}
                className="px-8 py-3.5 bg-[#ff443a] text-white text-[10px] tracking-[0.24em] uppercase font-medium hover:bg-[#e6352b] transition-colors border-none cursor-pointer text-center shadow-md"
              >
                Inquire For Similar Scale Project
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-3.5 border border-[#140d0a]/20 text-[#140d0a]/70 text-[10px] tracking-[0.2em] uppercase font-medium bg-transparent hover:text-[#140d0a] cursor-pointer"
              >
                Close Case Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
