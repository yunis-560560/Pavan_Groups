"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type StoneItem = {
  id: string;
  name: string;
  category: "granite" | "limestone" | "slate" | "cobbles" | "marble" | "sandstone";
  colorFamily: "black" | "white" | "yellow" | "blue" | "earthy" | "grey";
  origin: string;
  colorName: string;
  accent: string;
  density: string;
  waterAbs: string;
  compressive: string;
  finishes: string[];
  bestUse: string;
  description: string;
};

const allStones: StoneItem[] = [
  {
    id: "abs-black",
    name: "Absolute Black Granite",
    category: "granite",
    colorFamily: "black",
    origin: "Karnataka & Andhra Pradesh",
    colorName: "Deep Obsidian Black",
    accent: "#ff443a",
    density: "2,980 kg/m³",
    waterAbs: "0.08%",
    compressive: "215 MPa",
    finishes: ["Polished", "Flamed", "Honed", "Leathered", "Bush-Hammered"],
    bestUse: "High-Traffic Lobbies, Exterior Rainscreen Facades, Kitchen Slabs",
    description: "Renowned for its zero-porosity crystal matrix, uniform deep black field, and mirror gloss polish retention over decades of exterior weathering.",
  },
  {
    id: "black-galaxy",
    name: "Black Galaxy Granite",
    category: "granite",
    colorFamily: "black",
    origin: "Ongole, Andhra Pradesh",
    colorName: "Starry Black with Golden Bronzite",
    accent: "#d94e34",
    density: "2,960 kg/m³",
    waterAbs: "0.09%",
    compressive: "205 MPa",
    finishes: ["Polished", "Honed", "Leathered"],
    bestUse: "Luxury Hospitality Suites, Feature Reception Walls, Elevator Portals",
    description: "Star-studded natural igneous stone bearing glittering golden-yellow flakes of bronzite mineral embedded in a pitch-black matrix.",
  },
  {
    id: "kashmir-white",
    name: "Kashmir White Granite",
    category: "granite",
    colorFamily: "white",
    origin: "Rajasthan & Tamil Nadu",
    colorName: "Alabaster White with Garnet Accents",
    accent: "#b37d36",
    density: "2,650 kg/m³",
    waterAbs: "0.22%",
    compressive: "185 MPa",
    finishes: ["Polished", "Honed", "Flamed"],
    bestUse: "Commercial Flooring, Wall Cladding, Monumental Steps",
    description: "Luminous white field with delicate silver veining and tiny burgundy mineral garnets evenly distributed throughout the formation.",
  },
  {
    id: "kota-blue",
    name: "Kota Blue Limestone",
    category: "limestone",
    colorFamily: "blue",
    origin: "Kota, Rajasthan",
    colorName: "Steel Blue-Grey",
    accent: "#ff6e8f",
    density: "2,600 kg/m³",
    waterAbs: "0.40%",
    compressive: "145 MPa",
    finishes: ["Natural Cleft", "Honed", "Polished", "Tumbled", "Brushed"],
    bestUse: "Pool Decks, Marine Walkways, Courtyards, Interior Corridors",
    description: "Tough, fine-grained calcrete limestone famed for cool undertones and superior non-slip properties in humid environments.",
  },
  {
    id: "jaisalmer-yellow",
    name: "Jaisalmer Yellow Stone",
    category: "limestone",
    colorFamily: "yellow",
    origin: "Jaisalmer, Rajasthan",
    colorName: "Warm Desert Gold",
    accent: "#c25e00",
    density: "2,550 kg/m³",
    waterAbs: "0.65%",
    compressive: "125 MPa",
    finishes: ["Honed", "Polished", "Antique", "Sandblasted"],
    bestUse: "Palace Restorations, Jali Screenwork, Carved Columns",
    description: "The imperial 'Golden Stone' of Rajasthan, delivering majestic sun-drenched warmth to historic and modern architectural spaces.",
  },
  {
    id: "autumn-slate",
    name: "Autumn Rustic Slate",
    category: "slate",
    colorFamily: "earthy",
    origin: "Kangra Valley, Himachal Pradesh",
    colorName: "Terracotta, Copper & Charcoal",
    accent: "#ff443a",
    density: "2,750 kg/m³",
    waterAbs: "0.35%",
    compressive: "160 MPa",
    finishes: ["Natural Split", "Honed", "Brushed"],
    bestUse: "Roofing Shingles, Terraces, Fireplace Surrounds, Garden Walks",
    description: "Naturally layered metamorphic stone with high thermal resistance and organic multi-tonal clefting.",
  },
  {
    id: "charcoal-cobbles",
    name: "Basalt & Granite Cobbles",
    category: "cobbles",
    colorFamily: "grey",
    origin: "Andhra Pradesh & Karnataka",
    colorName: "Charcoal & Granite Grey",
    accent: "#5a4f4b",
    density: "2,900 kg/m³",
    waterAbs: "0.12%",
    compressive: "220 MPa",
    finishes: ["Hand Cut", "Tumbled", "Flamed Top", "Split Face"],
    bestUse: "Vehicular Driveways, Public Plazas, Waterfront Promenades",
    description: "Heavy-duty tumbled and cropped stone cubes engineered to withstand continuous vehicle axle loads and heavy pedestrian flow.",
  },
  {
    id: "makrana-white",
    name: "Makrana Pure White Marble",
    category: "marble",
    colorFamily: "white",
    origin: "Makrana, Rajasthan",
    colorName: "Pristine Crystalline White",
    accent: "#d94e34",
    density: "2,710 kg/m³",
    waterAbs: "0.04%",
    compressive: "155 MPa",
    finishes: ["High Polish", "Honed", "Hand Carved"],
    bestUse: "Monuments, Luxury Villa Lobbies, Sacred Sanctuaries",
    description: "The historical marble of the Taj Mahal. Exceptional calcitic purity with 98% calcium carbonate yielding luminous depth and zero yellowing over centuries.",
  },
  {
    id: "dholpur-beige",
    name: "Dholpur Beige Sandstone",
    category: "sandstone",
    colorFamily: "yellow",
    origin: "Dholpur, Rajasthan",
    colorName: "Warm Buff & Cream",
    accent: "#b37d36",
    density: "2,420 kg/m³",
    waterAbs: "1.10%",
    compressive: "110 MPa",
    finishes: ["Natural Cleft", "Honed", "Sandblasted", "Shotblasted"],
    bestUse: "Exterior Facades, Jali Perforations, Cornices, Monumental Cladding",
    description: "Uniform fine-grained quartz sandstone favored by imperial architects for centuries due to easy workability and high weather resistance.",
  },
];

const categoryOptions = [
  { label: "All Stones", value: "all" },
  { label: "Granite", value: "granite" },
  { label: "Limestone", value: "limestone" },
  { label: "Slate", value: "slate" },
  { label: "Cobbles", value: "cobbles" },
  { label: "Marble", value: "marble" },
  { label: "Sandstone", value: "sandstone" },
];

const colorOptions = [
  { label: "All Hues", value: "all" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Yellow / Gold", value: "yellow" },
  { label: "Blue / Grey", value: "blue" },
  { label: "Earthy Terracotta", value: "earthy" },
];

export default function ProductsPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [activeFinish, setActiveFinish] = useState("Polished");
  const [sampleModalStone, setSampleModalStone] = useState<StoneItem | null>(null);
  const [sampleRequested, setSampleRequested] = useState(false);
  const router = useRouter();

  const filteredStones = useMemo(() => {
    return allStones.filter((s) => {
      const matchCat = selectedCat === "all" || s.category === selectedCat;
      const matchColor = selectedColor === "all" || s.colorFamily === selectedColor;
      return matchCat && matchColor;
    });
  }, [selectedCat, selectedColor]);

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
            <span className="text-[#ff443a] font-medium">Stone Archive</span>
          </div>

          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#ff443a]/10 border border-[#ff443a]/25 text-[#ff443a] text-[10px] tracking-[0.24em] uppercase font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a] animate-pulse" />
            <span>The Geological Collection</span>
          </div>

          <h1
            className="font-display font-light leading-[1.05] tracking-[-0.015em] mb-6 text-[#140d0a]"
            style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
          >
            Curated Indian Stones for
            <br />
            <span className="font-display italic text-[#ff443a]">
              Master Architects & Builders
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#140d0a]/75 max-w-3xl">
            Direct from our 7 quarry formations. Available in raw monolithic blocks, calibrated gang saw slabs, cut-to-size floor tiles, and custom CNC architectural elements.
          </p>
        </div>
      </section>

      {/* ── Interactive Showroom & Filter Hub ── */}
      <section className="py-14 px-6 md:px-14 lg:px-20 bg-white border-b border-[#140d0a]/10 sticky top-[72px] z-30 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCat(cat.value)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-200 border cursor-pointer ${
                  selectedCat === cat.value
                    ? "bg-[#ff443a] text-white border-[#ff443a] shadow-sm"
                    : "bg-[#fcf8f1] text-[#140d0a]/70 border-[#140d0a]/10 hover:border-[#ff443a]/40 hover:text-[#140d0a]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Color Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/50 font-medium mr-1">
              Tone:
            </span>
            {colorOptions.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                className={`px-3 py-1.5 text-[9px] tracking-[0.16em] uppercase transition-all duration-200 border cursor-pointer ${
                  selectedColor === c.value
                    ? "bg-[#140d0a] text-white border-[#140d0a]"
                    : "bg-white text-[#140d0a]/60 border-[#140d0a]/10 hover:text-[#140d0a]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stone Catalog Showroom Grid ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 bg-[#fcf8f1]">
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-[#140d0a]/10">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#140d0a]/60 font-medium">
            Displaying {filteredStones.length} Architectural Stones
          </span>
          <span className="text-[11px] text-[#140d0a]/50">
            All blocks tested to ASTM & EN standards
          </span>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredStones.map((stone) => (
              <motion.div
                key={stone.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-[#140d0a]/10 shadow-sm flex flex-col justify-between overflow-hidden group hover:border-[#ff443a]/50 hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Top Swatch Bar */}
                  <div className="p-6 bg-[#f7f2ea] border-b border-[#140d0a]/10 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] tracking-[0.26em] uppercase text-[#ff443a] font-medium block">
                        {stone.category}
                      </span>
                      <span className="text-[11px] text-[#140d0a]/50 uppercase tracking-[0.14em]">
                        {stone.origin}
                      </span>
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 bg-white border border-[#140d0a]/10 text-[#140d0a]/70 font-medium">
                      {stone.colorName}
                    </span>
                  </div>

                  <div className="p-8">
                    <h3 className="font-display text-2xl md:text-3xl font-light text-[#140d0a] group-hover:text-[#ff443a] transition-colors duration-300 mb-3">
                      {stone.name}
                    </h3>

                    <p className="text-[13px] leading-relaxed text-[#140d0a]/70 mb-6">
                      {stone.description}
                    </p>

                    {/* Technical Parameter Chips */}
                    <div className="p-4 bg-[#fcf8f1] border border-[#140d0a]/10 space-y-2 mb-6">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#140d0a]/50 uppercase tracking-[0.14em]">Density</span>
                        <span className="font-medium text-[#140d0a]">{stone.density}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#140d0a]/50 uppercase tracking-[0.14em]">Water Absorption</span>
                        <span className="font-medium text-[#ff443a]">{stone.waterAbs}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#140d0a]/50 uppercase tracking-[0.14em]">Compressive Strength</span>
                        <span className="font-medium text-[#140d0a]">{stone.compressive}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#140d0a]/40 block mb-2 font-medium">
                        Supported Finishes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {stone.finishes.map((f) => (
                          <span
                            key={f}
                            className="text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 bg-white border border-[#140d0a]/10 text-[#140d0a]/80"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 bg-[#faf5ec] border-t border-[#140d0a]/10 flex items-center justify-between">
                  <button
                    onClick={() => setSampleModalStone(stone)}
                    className="text-[10px] tracking-[0.22em] uppercase text-[#ff443a] font-medium hover:underline bg-transparent border-none cursor-pointer flex items-center gap-2"
                  >
                    <span>Request Swatch Set</span>
                    <span>→</span>
                  </button>

                  <button
                    onClick={handleContactClick}
                    className="text-[10px] tracking-[0.18em] uppercase text-[#140d0a]/60 hover:text-[#140d0a] bg-transparent border-none cursor-pointer"
                  >
                    Get Volume Rate
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Architectural Dimension & Sizing Matrix ── */}
      <section className="py-24 md:py-32 px-6 md:px-14 lg:px-20 bg-[#f2ece2] border-t border-[#140d0a]/10">
        <div className="max-w-3xl mb-16">
          <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-3 block">
            Fabrication Specifications
          </span>
          <h2
            className="font-display font-light text-[#140d0a] leading-[1.1]"
            style={{ fontSize: "clamp(30px, 4vw, 56px)" }}
          >
            Calibrated formats tailored to
            <br />
            <em className="not-italic text-[#ff443a]">your construction schedule</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Gang Saw Monolithic Slabs",
              sizes: "2800–3400 x 1600–2100 mm",
              thickness: "20mm, 30mm, 40mm (±1mm)",
              app: "Lobby bookmatched walls, hotel reception desks, architectural facades",
            },
            {
              title: "Calibrated Flooring Tiles",
              sizes: "300x300, 600x300, 600x600, 1200x600 mm",
              thickness: "10mm, 15mm, 20mm (±0.5mm)",
              app: "Commercial concourses, retail mall floors, residential suites",
            },
            {
              title: "Hand-Cut Cobbles & Pavers",
              sizes: "100x100, 140x140, 200x100 mm",
              thickness: "40mm, 50mm, 80mm, 100mm",
              app: "Driveways, urban plazas, public boardwalks, pool surrounds",
            },
          ].map((fmt) => (
            <div key={fmt.title} className="p-8 bg-white border border-[#140d0a]/10 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display text-xl font-medium text-[#140d0a] mb-4 pb-3 border-b border-[#140d0a]/10">
                  {fmt.title}
                </h4>
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#140d0a]/50 block">Dimensions</span>
                    <span className="text-[13px] font-medium text-[#140d0a]">{fmt.sizes}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#140d0a]/50 block">Thickness Standard</span>
                    <span className="text-[13px] font-medium text-[#ff443a]">{fmt.thickness}</span>
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-[#140d0a]/60 pt-4 border-t border-[#140d0a]/5">
                <strong className="text-[#140d0a]">Recommended:</strong> {fmt.app}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sample Request Modal ── */}
      {sampleModalStone && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#140d0a]/20 p-8 md:p-10 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => {
                setSampleModalStone(null);
                setSampleRequested(false);
              }}
              className="absolute top-6 right-6 text-[#140d0a]/40 hover:text-[#140d0a] bg-transparent border-none text-2xl cursor-pointer"
            >
              ✕
            </button>

            {!sampleRequested ? (
              <div>
                <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-2 block">
                  International Specifier Box
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-light text-[#140d0a] mb-2">
                  Request Sample: {sampleModalStone.name}
                </h3>
                <p className="text-[13px] text-[#140d0a]/60 mb-6">
                  We courier 15x15cm calibrated sample sets with polished, flamed, and honed finish swatches worldwide via DHL Express.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSampleRequested(true);
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name / Architectural Firm"
                    className="w-full px-4 py-3 bg-[#fcf8f1] border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Official Work Email"
                    className="w-full px-4 py-3 bg-[#fcf8f1] border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Courier Delivery Address & Country"
                    className="w-full px-4 py-3 bg-[#fcf8f1] border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#ff443a] text-white text-[10px] tracking-[0.24em] uppercase font-medium hover:bg-[#e6352b] transition-colors border-none cursor-pointer shadow-md"
                  >
                    Dispatch Sample Box
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-4xl text-[#ff443a] block mb-4">✓</span>
                <h3 className="font-display text-2xl font-light text-[#140d0a] mb-2">
                  Sample Box Dispatched
                </h3>
                <p className="text-[13px] text-[#140d0a]/60 mb-6">
                  Our export coordinator will email your DHL tracking number for {sampleModalStone.name} within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setSampleModalStone(null);
                    setSampleRequested(false);
                  }}
                  className="px-6 py-2.5 bg-[#140d0a] text-white text-[10px] tracking-[0.2em] uppercase font-medium cursor-pointer border-none"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
