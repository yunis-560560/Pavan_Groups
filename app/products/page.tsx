"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid3x3,
  Grid2x2,
  List,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ProductStone {
  id: string;
  name: string;
  company: "Pavan Impex" | "Sai Balaji Impex" | "Pavan Granite";
  companySlug: string;
  category: "slate" | "limestone" | "granite" | "cladding" | "pavers";
  area: ("elevation" | "flooring" | "pool" | "countertop" | "driveway")[];
  finish: string;
  color: string;
  availableSizes: string[];
  thickness: string;
  availableFinishes: string[];
  gradient: string;
  description: string;
  origin: string;
  density: string;
  compressive: string;
  waterAbs: string;
}

const PRODUCTS_DATABASE: ProductStone[] = [
  {
    id: "markapur-black-slate",
    name: "Markapur Midnight Black Slate",
    company: "Pavan Impex",
    companySlug: "pavan-impex",
    category: "slate",
    area: ["elevation", "flooring"],
    finish: "Natural Cleft",
    color: "Midnight Black",
    availableSizes: ["600x300 mm", "600x600 mm", "300x300 mm", "1200x600 mm"],
    thickness: "12 - 15 mm (±1mm)",
    availableFinishes: ["Natural Cleft", "Honed Matte", "Brushed", "Tumbled"],
    gradient: "linear-gradient(135deg, #1c1f24 0%, #2f343d 50%, #131518 100%)",
    description: "Extracted directly from Markapur reserves with authentic hand-split clefted texture, ideal for luxury exterior rainscreen cladding and interior accents.",
    origin: "Markapur, Andhra Pradesh",
    density: "2,780 kg/m³",
    compressive: "165 MPa",
    waterAbs: "0.24%",
  },
  {
    id: "black-galaxy-granite",
    name: "Chimakurthy Black Galaxy Granite",
    company: "Pavan Granite",
    companySlug: "pavan-granite",
    category: "granite",
    area: ["countertop", "flooring", "elevation"],
    finish: "95+ Mirror Polish",
    color: "Gold Bronzite",
    availableSizes: ["Jumbo Gangsaw Slabs", "1200x600 mm", "600x600 mm", "600x300 mm"],
    thickness: "20 mm / 30 mm / 40 mm",
    availableFinishes: ["95+ Mirror Polish", "Honed Matte", "Leathered Velvet", "Flamed"],
    gradient: "linear-gradient(135deg, #090a0c 0%, #221f17 50%, #040506 100%)",
    description: "World-famous star galaxy igneous granite containing golden-yellow bronzite crystals embedded in a mirror-polished pitch-black matrix.",
    origin: "Chimakurthy, Andhra Pradesh",
    density: "2,980 kg/m³",
    compressive: "210 MPa",
    waterAbs: "0.08%",
  },
  {
    id: "cuddapah-black-limestone",
    name: "Cuddapah Calcareous Limestone",
    company: "Sai Balaji Impex",
    companySlug: "sai-balaji-impex",
    category: "limestone",
    area: ["pool", "flooring", "driveway"],
    finish: "Anti-Skid R11",
    color: "Midnight Black",
    availableSizes: ["600x600 mm", "600x300 mm", "200x100 mm Pavers", "300x300 mm"],
    thickness: "20 mm / 25 mm / 30 mm",
    availableFinishes: ["Anti-Skid R11", "Natural Cleft", "Honed", "Tumbled Antique"],
    gradient: "linear-gradient(135deg, #2b2823 0%, #443c33 50%, #1c1915 100%)",
    description: "Fine-grained, heavy-duty calcareous calcrete stone engineered for pool copings and outdoor terraces, remaining cool under intense sun.",
    origin: "Cuddapah, Andhra Pradesh",
    density: "2,620 kg/m³",
    compressive: "148 MPa",
    waterAbs: "0.38%",
  },
  {
    id: "indian-autumn-slate",
    name: "Indian Autumn Rustic Slate",
    company: "Pavan Impex",
    companySlug: "pavan-impex",
    category: "slate",
    area: ["elevation", "flooring"],
    finish: "Natural Cleft",
    color: "Autumn Copper",
    availableSizes: ["600x300 mm", "300x300 mm", "600x600 mm"],
    thickness: "12 - 15 mm (±1mm)",
    availableFinishes: ["Natural Cleft", "Honed Matte", "Rustic Antique"],
    gradient: "linear-gradient(135deg, #532f1f 0%, #7d4428 50%, #3a1f13 100%)",
    description: "Rich copper, terracotta, and dark slate variegations delivering organic warmth to exterior feature walls and patio walk areas.",
    origin: "Markapur Belt, Andhra Pradesh",
    density: "2,740 kg/m³",
    compressive: "158 MPa",
    waterAbs: "0.32%",
  },
  {
    id: "3d-stacked-ledger",
    name: "3D Interlocking Slate Ledger",
    company: "Pavan Impex",
    companySlug: "pavan-impex",
    category: "cladding",
    area: ["elevation"],
    finish: "3D Ledger Relief",
    color: "Midnight Black",
    availableSizes: ["600x150 mm", "600x300 mm", "Z-Shape Corner Sets"],
    thickness: "15 - 25 mm Relief",
    availableFinishes: ["3D Natural Split", "Layered Relief", "Interlocking"],
    gradient: "linear-gradient(135deg, #151618 0%, #2b2c31 40%, #0e0f11 100%)",
    description: "Precision Z-shape mesh-backed ledger panels assembled from stepped slate strips for seamless architectural column and facade cladding.",
    origin: "Markapur, Andhra Pradesh",
    density: "2,760 kg/m³",
    compressive: "160 MPa",
    waterAbs: "0.28%",
  },
  {
    id: "tumbled-limestone-paver",
    name: "Tumbled Calcareous Pavers",
    company: "Sai Balaji Impex",
    companySlug: "sai-balaji-impex",
    category: "pavers",
    area: ["driveway", "pool", "flooring"],
    finish: "Tumbled Antique",
    color: "Midnight Black",
    availableSizes: ["200x100 mm Pavers", "300x300 mm", "140x140 mm Cobbles"],
    thickness: "30 mm / 40 mm / 50 mm",
    availableFinishes: ["Tumbled Antique", "Hand-Chiseled Edge", "Flamed Top"],
    gradient: "linear-gradient(135deg, #383e46 0%, #4f5762 50%, #24282d 100%)",
    description: "Aged tumbled edges with soft antique texture for vehicular driveways, courtyard plazas, and pool surrounds.",
    origin: "Cuddapah, Andhra Pradesh",
    density: "2,640 kg/m³",
    compressive: "152 MPa",
    waterAbs: "0.35%",
  },
  {
    id: "california-gold-slate",
    name: "California Gold Natural Slate",
    company: "Pavan Impex",
    companySlug: "pavan-impex",
    category: "slate",
    area: ["elevation", "flooring"],
    finish: "Natural Cleft",
    color: "California Gold",
    availableSizes: ["600x300 mm", "600x600 mm", "300x300 mm"],
    thickness: "12 - 15 mm (±1mm)",
    availableFinishes: ["Natural Cleft", "Honed Matte", "Brushed Satin"],
    gradient: "linear-gradient(135deg, #6c471c 0%, #96692f 50%, #442a0e 100%)",
    description: "Golden bronze, ochre, and shimmering mica flecks running through deep slate stratum for luxury hotel lobbies and facade accents.",
    origin: "Markapur, Andhra Pradesh",
    density: "2,750 kg/m³",
    compressive: "162 MPa",
    waterAbs: "0.30%",
  },
  {
    id: "steel-grey-granite",
    name: "Steel Grey Architectural Granite",
    company: "Pavan Granite",
    companySlug: "pavan-granite",
    category: "granite",
    area: ["countertop", "flooring", "elevation"],
    finish: "Leathered Velvet",
    color: "Lime Blue",
    availableSizes: ["Jumbo Gangsaw Slabs", "1200x600 mm", "600x600 mm"],
    thickness: "20 mm / 30 mm",
    availableFinishes: ["Leathered Velvet", "95+ Polish", "Honed", "Flamed"],
    gradient: "linear-gradient(135deg, #2e3842 0%, #475564 50%, #1e242b 100%)",
    description: "Consistent medium-grey crystalline granite available in leathered and flamed finishes for heavy commercial floor installations.",
    origin: "Prakasam, Andhra Pradesh",
    density: "2,940 kg/m³",
    compressive: "200 MPa",
    waterAbs: "0.10%",
  },
  {
    id: "lime-yellow-stone",
    name: "Lime Yellow Calcareous Stone",
    company: "Sai Balaji Impex",
    companySlug: "sai-balaji-impex",
    category: "limestone",
    area: ["pool", "flooring"],
    finish: "Honed Matte",
    color: "Lime Yellow",
    availableSizes: ["600x600 mm", "600x300 mm", "300x300 mm"],
    thickness: "20 mm / 25 mm",
    availableFinishes: ["Honed Matte", "Natural Cleft", "Tumbled Antique", "Brushed"],
    gradient: "linear-gradient(135deg, #7c6433 0%, #a48a4c 50%, #524220 100%)",
    description: "Sunlit desert gold and warm butterscotch tone for Mediterranean and tropical resort courtyards.",
    origin: "Tandur / Cuddapah Belt",
    density: "2,580 kg/m³",
    compressive: "135 MPa",
    waterAbs: "0.55%",
  },
];

function ProductsContent() {
  const searchParams = useSearchParams();

  // Filter States
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // UI States
  const [viewMode, setViewMode] = useState<"grid3" | "grid2" | "list">("grid3");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [imageIndex, setImageIndex] = useState<Record<string, number>>({});

  // Initialize and Sync Filters from URL Query Params (Homepage Clicks)
  useEffect(() => {
    const companyParam = searchParams.get("company");
    const stoneParam = searchParams.get("stone");
    const colorParam = searchParams.get("color");
    const sizeParam = searchParams.get("size");
    const finishParam = searchParams.get("finish");
    const areaParam = searchParams.get("area");

    if (companyParam) {
      if (companyParam.toLowerCase().includes("pavan impex") || companyParam === "pavan-impex") {
        setSelectedCompanies(["Pavan Impex"]);
      } else if (companyParam.toLowerCase().includes("sai balaji") || companyParam === "sai-balaji-impex") {
        setSelectedCompanies(["Sai Balaji Impex"]);
      } else if (companyParam.toLowerCase().includes("pavan granite") || companyParam === "pavan-granite") {
        setSelectedCompanies(["Pavan Granite"]);
      } else {
        setSelectedCompanies([companyParam]);
      }
    } else if (stoneParam) {
      if (stoneParam === "slate") setSelectedCompanies(["Pavan Impex"]);
      if (stoneParam === "limestone") setSelectedCompanies(["Sai Balaji Impex"]);
      if (stoneParam === "granite") setSelectedCompanies(["Pavan Granite"]);
    }

    if (colorParam) {
      const decodedColor = decodeURIComponent(colorParam);
      if (decodedColor.toLowerCase().includes("midnight") || decodedColor === "black-slate") {
        setSelectedColors(["Midnight Black"]);
      } else if (decodedColor.toLowerCase().includes("gold") || decodedColor === "black-galaxy" || decodedColor.toLowerCase().includes("bronzite")) {
        setSelectedColors(["Gold Bronzite"]);
      } else if (decodedColor.toLowerCase().includes("autumn") || decodedColor.toLowerCase().includes("copper")) {
        setSelectedColors(["Autumn Copper"]);
      } else if (decodedColor.toLowerCase().includes("california")) {
        setSelectedColors(["California Gold"]);
      } else if (decodedColor.toLowerCase().includes("lime yellow") || decodedColor === "lime-yellow") {
        setSelectedColors(["Lime Yellow"]);
      } else {
        setSelectedColors([decodedColor]);
      }
    }

    if (sizeParam) {
      const decodedSize = decodeURIComponent(sizeParam);
      setSelectedSizes([decodedSize]);
    }

    if (finishParam) {
      const decodedFinish = decodeURIComponent(finishParam);
      setSelectedFinishes([decodedFinish]);
    }

    if (areaParam) {
      const decodedArea = decodeURIComponent(areaParam);
      setSelectedAreas([decodedArea]);
    }
  }, [searchParams]);

  // Accordion Expand States for Filter Sections
  const [openSection, setOpenSection] = useState<{
    area: boolean;
    company: boolean;
    finish: boolean;
    size: boolean;
    color: boolean;
  }>({
    area: true,
    company: true,
    finish: true,
    size: true,
    color: true,
  });

  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedAreas([]);
    setSelectedCompanies([]);
    setSelectedFinishes([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSearchQuery("");
  };

  // Compute active filter count
  const activeFilterChips = useMemo(() => {
    const chips: { label: string; remove: () => void }[] = [];

    selectedAreas.forEach((area) =>
      chips.push({
        label: area,
        remove: () => setSelectedAreas((prev) => prev.filter((a) => a !== area)),
      })
    );
    selectedCompanies.forEach((company) =>
      chips.push({
        label: company,
        remove: () => setSelectedCompanies((prev) => prev.filter((c) => c !== company)),
      })
    );
    selectedFinishes.forEach((finish) =>
      chips.push({
        label: finish,
        remove: () => setSelectedFinishes((prev) => prev.filter((f) => f !== finish)),
      })
    );
    selectedSizes.forEach((size) =>
      chips.push({
        label: size,
        remove: () => setSelectedSizes((prev) => prev.filter((s) => s !== size)),
      })
    );
    selectedColors.forEach((color) =>
      chips.push({
        label: color,
        remove: () => setSelectedColors((prev) => prev.filter((col) => col !== color)),
      })
    );

    return chips;
  }, [selectedAreas, selectedCompanies, selectedFinishes, selectedSizes, selectedColors]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATABASE.filter((product) => {
      // Search
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Area
      if (
        selectedAreas.length > 0 &&
        !product.area.some((a) => selectedAreas.includes(a))
      ) {
        return false;
      }
      // Company
      if (
        selectedCompanies.length > 0 &&
        !selectedCompanies.includes(product.company)
      ) {
        return false;
      }
      // Finish
      if (
        selectedFinishes.length > 0 &&
        !product.availableFinishes.some((f) => selectedFinishes.includes(f))
      ) {
        return false;
      }
      // Sizes
      if (
        selectedSizes.length > 0 &&
        !product.availableSizes.some((s) => selectedSizes.includes(s))
      ) {
        return false;
      }
      // Colors
      if (
        selectedColors.length > 0 &&
        !selectedColors.includes(product.color)
      ) {
        return false;
      }
      return true;
    });
  }, [
    searchQuery,
    selectedAreas,
    selectedCompanies,
    selectedFinishes,
    selectedSizes,
    selectedColors,
  ]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNextImage = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % 3 }));
  };

  const handlePrevImage = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) - 1 + 3) % 3 }));
  };

  return (
    <div className="bg-[#ffffff] text-[#241919] min-h-screen pt-24 pb-20">
      
      {/* ── BREADCRUMB & HEADER SECTION ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#747474] mb-4">
          <Link href="/" className="hover:text-[#241919] transition-colors">
            Home
          </Link>
          <span>›</span>
          <span className="text-[#241919] font-medium">Natural Stones & Tiles</span>
        </div>

        {/* Counter */}
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#747474] mb-2 font-medium">
          Showing {filteredProducts.length * 12 + 24} results ({filteredProducts.length} verified quarry specimens)
        </p>

        {/* Title */}
        <h1
          className="font-display font-light text-[#241919] leading-[1.04] tracking-[-0.015em] mb-4"
          style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}
        >
          Tiles & Natural Stones
        </h1>

        {/* Collapsible Editorial Description */}
        <div className="max-w-4xl text-[14px] leading-relaxed text-[#454545] font-light">
          <p>
            Natural stone tiles and calibrated slabs are the premier choice for luxury indoor floors, architectural rainscreen elevations, and heavy-duty outdoor terraces thanks to their high compressive strength, thermal mass, and ease of lifetime maintenance. Pavan Groups extracts and custom-fabricates genuine Markapur Slate, Cuddapah Limestone, and world-renowned Chimakurthy Black Galaxy Granite direct from quarry faces.
          </p>

          {isDescriptionExpanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 text-[#454545]"
            >
              All stone blocks are calibrated to international ASTM C615 and EN 1341 standards, available in monolithic gangsaw slabs, 600x300mm cladding formats, 200x100mm tumbled pavers, and bespoke CNC architectural detailing with worldwide DHL express sample dispatch.
            </motion.p>
          )}

          <button
            type="button"
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-[#8b4513] font-medium text-xs hover:underline mt-2 inline-block cursor-pointer"
          >
            {isDescriptionExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* ── FILTER CHIPS BAR & CONTROLS ── */}
        <div className="mt-6 pt-6 border-t border-[#747474]/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Active Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {activeFilterChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f5efe6] border border-[#747474]/20 rounded-full text-xs font-sans text-[#241919]"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={chip.remove}
                  className="w-3.5 h-3.5 flex items-center justify-center text-[#747474] hover:text-[#241919] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {activeFilterChips.length > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-sans font-semibold text-[#8b4513] hover:underline ml-2 cursor-pointer"
              >
                Clear All Filters X
              </button>
            )}
          </div>

          {/* View Switcher Icons */}
          <div className="flex items-center gap-1 bg-[#f5efe6] p-1 rounded-md border border-[#747474]/15 flex-none">
            <button
              type="button"
              onClick={() => setViewMode("grid3")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "grid3" ? "bg-white shadow-xs text-[#241919]" : "text-[#747474] hover:text-[#241919]"
              }`}
              title="3 Column Grid"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("grid2")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "grid2" ? "bg-white shadow-xs text-[#241919]" : "text-[#747474] hover:text-[#241919]"
              }`}
              title="2 Column Grid"
            >
              <Grid2x2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "list" ? "bg-white shadow-xs text-[#241919]" : "text-[#747474] hover:text-[#241919]"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* ── MAIN CONTENT: SIDEBAR + PRODUCT GRID ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT SIDEBAR FILTERS (3 Cols) ── */}
          <aside className="lg:col-span-3 space-y-4">
            
            {/* Top Primary Clear Button */}
            <button
              type="button"
              onClick={clearAllFilters}
              className="w-full py-3 bg-[#241919] hover:bg-[#3e352a] text-[#f7f2ea] text-xs font-sans font-semibold uppercase tracking-wider rounded-md shadow-xs transition-all cursor-pointer"
            >
              Clear All Filters
            </button>

            {/* Filter Section 1: Tile Area */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, area: !prev.area }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Tile Area</span>
                {openSection.area ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.area && (
                <div className="p-4 space-y-2.5">
                  {[
                    { key: "elevation", label: "Elevation & Facades" },
                    { key: "flooring", label: "Living Room & Flooring" },
                    { key: "pool", label: "Pool Decks & Wet Areas" },
                    { key: "countertop", label: "Kitchen Countertops" },
                    { key: "driveway", label: "Driveways & Pavers" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes(item.key)}
                        onChange={() => toggleFilter(selectedAreas, setSelectedAreas, item.key)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Section 2: Operating Division / Stone Type */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, company: !prev.company }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Stone Type</span>
                {openSection.company ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.company && (
                <div className="p-4 space-y-2.5">
                  {[
                    { key: "Pavan Impex", label: "Natural Slate (Pavan Impex)" },
                    { key: "Sai Balaji Impex", label: "Limestone (Sai Balaji)" },
                    { key: "Pavan Granite", label: "Black Galaxy (Pavan Granite)" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(item.key)}
                        onChange={() => toggleFilter(selectedCompanies, setSelectedCompanies, item.key)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Section 3: Surface Finishes */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, finish: !prev.finish }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Surface Finish</span>
                {openSection.finish ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.finish && (
                <div className="p-4 space-y-2.5">
                  {[
                    "Natural Cleft",
                    "95+ Mirror Polish",
                    "Honed Matte",
                    "Tumbled Antique",
                    "3D Ledger Relief",
                    "Anti-Skid R11",
                    "Leathered Velvet",
                  ].map((finish) => (
                    <label key={finish} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFinishes.includes(finish)}
                        onChange={() => toggleFilter(selectedFinishes, setSelectedFinishes, finish)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{finish}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Section 4: Tile Size */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, size: !prev.size }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Tile Size</span>
                {openSection.size ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.size && (
                <div className="p-4 space-y-2.5">
                  {[
                    "600x300 mm",
                    "600x600 mm",
                    "1200x600 mm",
                    "300x300 mm",
                    "Jumbo Gangsaw Slabs",
                    "200x100 mm Pavers",
                    "600x150 mm",
                  ].map((size) => (
                    <label key={size} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleFilter(selectedSizes, setSelectedSizes, size)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Section 5: Color Tone */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, color: !prev.color }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Color Tone</span>
                {openSection.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.color && (
                <div className="p-4 space-y-2.5">
                  {[
                    "Midnight Black",
                    "Gold Bronzite",
                    "Autumn Copper",
                    "California Gold",
                    "Lime Yellow",
                    "Lime Blue",
                  ].map((col) => (
                    <label key={col} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(col)}
                        onChange={() => toggleFilter(selectedColors, setSelectedColors, col)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{col}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </aside>

          {/* ── RIGHT PRODUCT GRID (9 Cols) ── */}
          <main className="lg:col-span-9">
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#f7f2ea] border border-[#747474]/15 rounded-lg p-8">
                <p className="text-base font-sans text-[#241919] mb-3">
                  No matching natural stone tiles found for your selected filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#241919] hover:bg-[#3e352a] text-white rounded-md text-xs font-sans font-medium cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid3"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : viewMode === "grid2"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist[product.id];
                  const curImgIdx = imageIndex[product.id] || 0;

                  return (
                    <div
                      key={product.id}
                      className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                    >
                      {/* Image Frame with Wishlist Heart & Carousel Arrows */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141619]">
                        {/* Dynamic Surface Gradient / Mockup */}
                        <div
                          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                          style={{ background: product.gradient }}
                        />

                        {/* Top-Left Wishlist Heart Icon */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#241919] shadow-sm transition-all cursor-pointer z-10"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              isWishlisted ? "fill-[#d94e34] text-[#d94e34]" : "text-[#747474]"
                            }`}
                          />
                        </button>

                        {/* Left / Right Carousel Slider Arrows */}
                        <button
                          type="button"
                          onClick={(e) => handlePrevImage(product.id, e)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleNextImage(product.id, e)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Image Counter Badge */}
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 rounded text-[9px] font-mono text-white/80">
                          {curImgIdx + 1}/3
                        </div>
                      </div>

                      {/* Product Content Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Company / Category Tag */}
                          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-1.5">
                            <span className="text-[#8b4513] font-semibold">{product.company}</span>
                            <span className="text-[#747474]">{product.origin}</span>
                          </div>

                          {/* Stone Name */}
                          <h3 className="font-sans font-bold text-[15px] sm:text-[16px] text-[#241919] leading-snug mb-3 group-hover:text-[#8b4513] transition-colors">
                            {product.name}
                          </h3>

                          {/* ── 3 KEY SPECIFICATIONS: SIZES, THICKNESS, FINISHES ── */}
                          <div className="space-y-2.5 py-3 my-2 border-y border-[#747474]/15 bg-[#faf6f0]/60 p-3 rounded">
                            
                            {/* 1) Available Sizes */}
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block">
                                1) Available Sizes:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {product.availableSizes.map((sz) => (
                                  <span
                                    key={sz}
                                    className="px-2 py-0.5 bg-white border border-[#747474]/20 rounded text-[10.5px] font-sans font-medium text-[#241919]"
                                  >
                                    {sz}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* 2) Thickness */}
                            <div className="flex items-center justify-between pt-1 border-t border-[#747474]/10">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold">
                                2) Thickness:
                              </span>
                              <span className="text-[11.5px] font-mono font-bold text-[#8b4513]">
                                {product.thickness}
                              </span>
                            </div>

                            {/* 3) Available Finishes */}
                            <div className="pt-1 border-t border-[#747474]/10">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block">
                                3) Available Finishes:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {product.availableFinishes.map((fn) => (
                                  <span
                                    key={fn}
                                    className="px-2 py-0.5 bg-white border border-[#747474]/20 rounded text-[10.5px] font-sans text-[#454545]"
                                  >
                                    {fn}
                                  </span>
                                ))}
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Quick Action Footer */}
                        <div className="pt-3 flex items-center justify-between gap-2">
                          <Link
                            href="/request-sample"
                            className="flex-1 text-center py-2.5 px-3 bg-[#f5efe6] hover:bg-[#e8decb] text-[#241919] rounded text-[11px] font-sans font-semibold uppercase tracking-wider transition-colors"
                          >
                            Sample
                          </Link>

                          <Link
                            href="/#contact"
                            className="flex-1 text-center py-2.5 px-3 bg-[#241919] hover:bg-[#3e352a] text-white rounded text-[11px] font-sans font-semibold uppercase tracking-wider transition-colors"
                          >
                            Enquire
                          </Link>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-32 text-center text-sm font-mono text-[#747474]">Loading Stone Catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
