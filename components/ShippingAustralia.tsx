"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToHash } from "@/components/SmoothScroll";

// Real Leaflet Interactive Map loaded purely on the client
const RealInteractiveMap = dynamic(() => import("./RealInteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-[#ece5d8] flex items-center justify-center text-xs font-mono text-[#140d0a]/60">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#ff443a] animate-ping" />
        <span>Loading Real Interactive Map...</span>
      </div>
    </div>
  ),
});

// ── 1. THE 8-STEP JOURNEY DATA ──
interface JourneyStep {
  stepNum: number;
  title: string;
  subtitle: string;
  timeframe: string;
  description: string;
  location: string;
  icon: string;
  tag: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    stepNum: 1,
    title: "Order Confirmed",
    subtitle: "Spec & Volume Lock",
    timeframe: "Day 0",
    description: "Buyer places order, we confirm specs, thickness, size, quantity.",
    location: "Markapur HQ",
    icon: "📋",
    tag: "Commercial Agreement",
  },
  {
    stepNum: 2,
    title: "Production",
    subtitle: "Precision Quarry Fabrication",
    timeframe: "3–10 days",
    description: "Stones are cut, finished, quality checked at our factory in Markapur.",
    location: "Markapur Processing Yard",
    icon: "⚙️",
    tag: "ISO Quality Inspection",
  },
  {
    stepNum: 3,
    title: "Packing",
    subtitle: "Biosecurity Compliance",
    timeframe: "1–2 days",
    description: "Stones packed in ISPM-15 certified wooden crates (biosecurity compliant).",
    location: "Packaging Facility",
    icon: "📦",
    tag: "ISPM-15 Certified",
  },
  {
    stepNum: 4,
    title: "Inland Transport",
    subtitle: "Quarry to Ocean Terminal",
    timeframe: "1–2 days",
    description: "Truck from Markapur to Chennai Port (~500 km).",
    location: "Chennai Corridor",
    icon: "🚚",
    tag: "~500 km Highway",
  },
  {
    stepNum: 5,
    title: "Port & Loading",
    subtitle: "Customs & Vessel Stowing",
    timeframe: "2–5 days",
    description: "Export documentation prepared, container loaded onto ship at Chennai.",
    location: "Chennai Ocean Port",
    icon: "⚓",
    tag: "Customs Cleared",
  },
  {
    stepNum: 6,
    title: "Sea Freight",
    subtitle: "Indian Ocean Transit",
    timeframe: "12–25 days",
    description: "Ship travels Indian Ocean to Australia (depends on destination port).",
    location: "Indian Ocean Sealane",
    icon: "🚢",
    tag: "Direct Vessel Route",
  },
  {
    stepNum: 7,
    title: "Australian Port",
    subtitle: "Biosecurity & Clearance",
    timeframe: "3–7 days",
    description: "Ship arrives, biosecurity inspection, customs clearance.",
    location: "Australian Destination Port",
    icon: "🛃",
    tag: "DAFF / Customs Gate",
  },
  {
    stepNum: 8,
    title: "Local Delivery",
    subtitle: "Direct to Project Site",
    timeframe: "1–3 days",
    description: "Truck from port to buyer's project site in Australia.",
    location: "Buyer Site / Jobsite",
    icon: "🏗️",
    tag: "Jobsite Unloading",
  },
];

// ── 2. AUSTRALIA PORTS & ROUTES DATA ──
interface PortRoute {
  id: string;
  city: string;
  code: string;
  state: string;
  cost20ft: string;
  cost40ft: string;
  transitTime: string;
  buyerNote: string;
  nauticalMiles: string;
  description: string;
}

const AUSTRALIAN_PORTS: PortRoute[] = [
  {
    id: "perth",
    city: "Perth",
    code: "AUFRE",
    state: "Western Australia (WA)",
    cost20ft: "USD $1,200–$2,000",
    cost40ft: "USD $2,500–$4,500",
    transitTime: "12–18 days",
    nauticalMiles: "~3,400 nmi",
    buyerNote: "Closest Aus port to India — fastest ocean transit.",
    description: "Direct shipping line from Chennai via Sunda Strait to Fremantle Port, serving Perth, Margaret River & WA architectural developments.",
  },
  {
    id: "sydney",
    city: "Sydney",
    code: "AUSYD",
    state: "New South Wales (NSW)",
    cost20ft: "USD $1,500–$2,500",
    cost40ft: "USD $2,500–$4,500",
    transitTime: "18–22 days",
    nauticalMiles: "~4,850 nmi",
    buyerNote: "For NSW buyers — high volume container frequency.",
    description: "Servicing Sydney Metro, Greater Western Sydney, Newcastle, and regional NSW luxury residential developments via Port Botany.",
  },
  {
    id: "melbourne",
    city: "Melbourne",
    code: "AUMEL",
    state: "Victoria (VIC)",
    cost20ft: "USD $1,500–$2,500",
    cost40ft: "USD $2,500–$4,500",
    transitTime: "20–25 days",
    nauticalMiles: "~4,600 nmi",
    buyerNote: "For Victoria buyers — key hub for architectural limestone.",
    description: "Discharging at Port of Melbourne with swift metropolitan container transport across Victoria, Mornington Peninsula and Geelong.",
  },
  {
    id: "brisbane",
    city: "Brisbane",
    code: "AUBNE",
    state: "Queensland (QLD)",
    cost20ft: "USD $1,800–$2,800",
    cost40ft: "USD $2,500–$4,500",
    transitTime: "20–25 days",
    nauticalMiles: "~4,950 nmi",
    buyerNote: "For Queensland buyers — ideal for resort & pool projects.",
    description: "Direct access to Brisbane, Gold Coast and Sunshine Coast pool paving, limestone terraces, and luxury resort projects.",
  },
];

// ── 3. FULL LANDED COST BREAKDOWN ITEMS ──
interface LandedCostItem {
  id: number;
  item: string;
  costRange: string;
  paidByNotes: string;
  stage: "india" | "ocean" | "aus";
  stageLabel: string;
  icon: string;
}

const LANDED_COST_ITEMS: LandedCostItem[] = [
  { id: 1, item: "Stone Product (FOB India)", costRange: "USD $8–$35 per sqm", paidByNotes: "Depends on stone type & finish", stage: "india", stageLabel: "Quarry & Fabrication", icon: "🏛️" },
  { id: 2, item: "Inland Transport (India)", costRange: "USD $100–$200", paidByNotes: "Factory to Chennai port (truck)", stage: "india", stageLabel: "Inland Logistics", icon: "🚚" },
  { id: 3, item: "Sea Freight (20ft FCL)", costRange: "USD $1,500–$2,500", paidByNotes: "India to Australian port", stage: "ocean", stageLabel: "Ocean Sealane", icon: "🚢" },
  { id: 4, item: "Marine Insurance", costRange: "~0.5–1% of cargo value", paidByNotes: "Strongly recommended", stage: "ocean", stageLabel: "Cargo Protection", icon: "🛡️" },
  { id: 5, item: "Australian Port Handling (THC)", costRange: "AUD $400–$800", paidByNotes: "Terminal fee at destination port", stage: "aus", stageLabel: "Port Terminal", icon: "⚓" },
  { id: 6, item: "Biosecurity Inspection (DAFF)", costRange: "AUD $200–$600", paidByNotes: "Mandatory government inspection", stage: "aus", stageLabel: "DAFF Inspection", icon: "🔬" },
  { id: 7, item: "Australian Customs Duty", costRange: "0–5% of cargo value", paidByNotes: "Most natural stone = 0% duty", stage: "aus", stageLabel: "Customs Tariff", icon: "🛃" },
  { id: 8, item: "GST (Australia)", costRange: "10% of total landed cost", paidByNotes: "Paid by Australian importer (claimable)", stage: "aus", stageLabel: "Australian Tax", icon: "🧾" },
  { id: 9, item: "Local Delivery (port to site)", costRange: "AUD $300–$800", paidByNotes: "Truck from port to buyer's site", stage: "aus", stageLabel: "Direct Site Haulage", icon: "🏗️" },
];

// ── 4. TRADE INCOTERMS DATA ──
interface TradeTerm {
  code: string;
  title: string;
  summary: string;
  responsibility: string;
  idealFor: string;
  pavanHandles: string[];
  buyerHandles: string[];
}

const TRADE_TERMS: TradeTerm[] = [
  {
    code: "FOB",
    title: "Free On Board",
    summary: "Our price includes goods + loading onto the ship in India. Buyer manages international shipping and local clearance.",
    responsibility: "Split at Indian Port Loading Line",
    idealFor: "Experienced importers who have their own preferred freight forwarder and customs broker.",
    pavanHandles: ["Quarry Fabrication & QC", "ISPM-15 Crating", "Inland Transport to Chennai", "Port Loading & Export Docs"],
    buyerHandles: ["Ocean Sea Freight", "Marine Insurance", "Australian Customs & Biosecurity", "Local Site Delivery Trucking"],
  },
  {
    code: "CIF",
    title: "Cost Insurance Freight",
    summary: "Our price includes goods + sea freight + insurance to Australian port. Buyer pays for customs + local delivery only.",
    responsibility: "Handed over at Australian Destination Port",
    idealFor: "Buyers who want competitive ocean shipping arranged by us, but handle their own domestic customs clearing.",
    pavanHandles: ["Fabrication & Crating", "Inland Transport to Chennai", "Ocean Sea Freight to Aus Port", "Marine Transit Insurance"],
    buyerHandles: ["Australian Port Terminal Fees (THC)", "Customs Duty & Biosecurity", "Final Trucking to Project Site"],
  },
  {
    code: "DDP",
    title: "Delivered Duty Paid",
    summary: "We handle EVERYTHING. Buyer just receives goods at their site. Most convenient, zero hassle.",
    responsibility: "100% End-to-End Pavan Stones Turnkey",
    idealFor: "Architects, builders, and homeowners who want a completely hassle-free turnkey delivery right to their jobsite.",
    pavanHandles: ["Quarry Extraction & Packaging", "Ocean Transit & Insurance", "Australian Customs & Biosecurity", "Direct Jobsite Delivery Offloading"],
    buyerHandles: ["Simply receive crates at jobsite — Zero paperwork or logistics"],
  },
];

const ESTIMATOR_STONE_OPTIONS = [
  { id: "slate", name: "Natural Slate Stone", avgRateUsd: 14, category: "Pavan Impex" },
  { id: "limestone", name: "Calcareous Limestone", avgRateUsd: 22, category: "Sai Balaji Impex" },
  { id: "granite", name: "Monolithic Granite", avgRateUsd: 32, category: "Pavan Granite" },
];

export default function ShippingAustralia() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [selectedPortId, setSelectedPortId] = useState<string>("sydney");
  const [containerSize, setContainerSize] = useState<"20ft" | "40ft">("20ft");
  const [activeIncoterm, setActiveIncoterm] = useState<string>("DDP");
  
  // Phase 3 Landed Cost Estimator State
  const [orderSqmInput, setOrderSqmInput] = useState<number>(300);
  const [selectedStoneSpec, setSelectedStoneSpec] = useState<string>("slate");
  const [costStageFilter, setCostStageFilter] = useState<"all" | "india" | "ocean" | "aus">("all");

  const activeStep = JOURNEY_STEPS[activeStepIndex];
  const selectedPort = AUSTRALIAN_PORTS.find((p) => p.id === selectedPortId) || AUSTRALIAN_PORTS[1];
  const currentIncoterm = TRADE_TERMS.find((t) => t.code === activeIncoterm) || TRADE_TERMS[2];
  const currentStone = ESTIMATOR_STONE_OPTIONS.find((s) => s.id === selectedStoneSpec) || ESTIMATOR_STONE_OPTIONS[0];

  // Dynamic calculations
  const estimatedContainers20ft = Math.max(1, Math.ceil(orderSqmInput / 325));
  const materialCostAud = Math.round(orderSqmInput * currentStone.avgRateUsd * 1.52);
  const freightCostAud = Math.round(estimatedContainers20ft * (selectedPortId === "perth" ? 2200 : 2900));
  const portHandlingAud = Math.round(estimatedContainers20ft * 650 + 400); // THC + DAFF
  const gstAud = Math.round((materialCostAud + freightCostAud + portHandlingAud) * 0.1);
  const localTruckAud = Math.round(estimatedContainers20ft * 550);
  const totalLandedAud = materialCostAud + freightCostAud + portHandlingAud + gstAud + localTruckAud;
  const landedRatePerSqmAud = Math.round(totalLandedAud / orderSqmInput);

  const filteredCostItems = costStageFilter === "all"
    ? LANDED_COST_ITEMS
    : LANDED_COST_ITEMS.filter((i) => i.stage === costStageFilter);

  const handleContactScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <section
      id="shipping"
      className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#fcf8f1] text-[#140d0a] border-t border-[#140d0a]/10 overflow-hidden"
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

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 md:space-y-24">
        
        {/* ── SECTION 4 HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#140d0a]/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#140d0a]/10 shadow-sm mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff443a] animate-pulse" />
              <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] font-semibold text-[#140d0a]">
                SECTION 4 — AUSTRALIA DIRECT EXPORT &amp; LOGISTICS
              </span>
            </div>

            <h2
              className="font-display font-light text-[#140d0a] leading-[1.08] tracking-[-0.015em]"
              style={{ fontSize: "clamp(30px, 3.8vw, 54px)" }}
            >
              Shipping to Australia —{" "}
              <span className="italic font-normal text-[#ff443a]">Full Breakdown.</span>
            </h2>

            <p className="text-[13.5px] sm:text-[15px] text-[#140d0a]/75 font-light mt-2 max-w-2xl leading-relaxed">
              Transparent factory-to-jobsite logistics from Markapur quarries to major Australian ports. Inspect timelines, interactive sea routes, freight rates, and landed cost models.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleContactScroll}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[9.5px] uppercase tracking-[0.2em] font-semibold bg-[#ff443a] text-white hover:bg-[#e6352b] transition-all shadow-sm cursor-pointer border-none"
            >
              <span>Get Freight &amp; Port Quote</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PHASE 1: THE JOURNEY — FACTORY TO BUYER'S SITE (INTERACTIVE TIMELINE)
        ══════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#140d0a]/10">
            <div>
              <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#ff443a] font-bold block mb-1">
                STEP-BY-STEP LOGISTICS PIPELINE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#140d0a] font-light">
                1. The Journey: Factory to Buyer&apos;s Site
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#faf6ef] border border-[#140d0a]/10 text-xs font-mono">
              <span className="text-[#ff443a] font-bold">TOTAL DURATION:</span>
              <span className="font-semibold text-[#140d0a]">30–45 Days Typical</span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;

              return (
                <button
                  key={step.stepNum}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 text-left transition-all border cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? "bg-white border-[#ff443a] shadow-md ring-1 ring-[#ff443a]"
                      : isPast
                      ? "bg-[#faf6ef] border-[#140d0a]/20 hover:bg-white"
                      : "bg-white/60 border-[#140d0a]/10 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 ${
                        isActive ? "bg-[#ff443a] text-white" : "bg-[#140d0a]/10 text-[#140d0a]"
                      }`}
                    >
                      0{step.stepNum}
                    </span>
                    <span className="text-xs">{step.icon}</span>
                  </div>

                  <div>
                    <h4 className="font-display text-xs font-medium text-[#140d0a] leading-tight truncate">
                      {step.title}
                    </h4>
                    <span className="text-[9px] font-mono text-[#140d0a]/60 block mt-0.5">
                      {step.timeframe}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Showcase Panel */}
          <motion.div
            key={activeStep.stepNum}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 bg-white border border-[#140d0a]/10 shadow-sm relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-1 text-[9.5px] font-mono font-bold bg-[#ff443a] text-white uppercase">
                    STEP 0{activeStep.stepNum} OF 08
                  </span>
                  <span className="text-xs font-mono text-[#140d0a]/60">
                    Location: <strong>{activeStep.location}</strong>
                  </span>
                  <span className="text-[#140d0a]/30">•</span>
                  <span className="px-2 py-0.5 bg-[#faf6ef] border border-[#140d0a]/10 text-[9.5px] font-mono font-bold text-[#140d0a]">
                    ⏱ {activeStep.timeframe}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#140d0a] font-medium">
                  {activeStep.title} — {activeStep.subtitle}
                </h3>

                <p className="text-[14px] text-[#140d0a]/85 leading-relaxed font-light">
                  {activeStep.description}
                </p>

                <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#140d0a]/70">
                  <span className="text-[#ff443a]">✔ Standard Operating Procedure:</span>
                  <span>{activeStep.tag}</span>
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="md:col-span-4 p-5 bg-[#faf6ef] border border-[#140d0a]/10 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[9px] font-mono uppercase text-[#140d0a]/50 block font-bold mb-1">
                    PIPELINE CONTROLS
                  </span>
                  <span className="text-xs font-medium text-[#140d0a]">
                    Click steps above or jump to next stage
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                    disabled={activeStepIndex === 0}
                    className="px-3 py-1.5 text-xs font-mono border border-[#140d0a]/15 bg-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={() => setActiveStepIndex(Math.min(JOURNEY_STEPS.length - 1, activeStepIndex + 1))}
                    disabled={activeStepIndex === JOURNEY_STEPS.length - 1}
                    className="px-4 py-1.5 text-xs font-mono bg-[#140d0a] text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex-1"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PHASE 2: REAL INTERACTIVE LEAFLET MAP & PORT FREIGHT EXPLORER
        ══════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#140d0a]/10">
            <div>
              <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#ff443a] font-bold block mb-1">
                REAL GEOGRAPHIC SEALANE RADAR &amp; DIRECT FREIGHT
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#140d0a] font-light">
                2. Shipping Routes &amp; Estimated Freight Costs (India → Australia)
              </h3>
            </div>

            {/* 20ft vs 40ft Container Toggle */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-[#140d0a]/10 shadow-sm">
              <span className="text-[9px] font-mono text-[#140d0a]/60 uppercase px-2 font-bold">
                CONTAINER SPEC:
              </span>
              <button
                onClick={() => setContainerSize("20ft")}
                className={`px-3 py-1 text-xs font-mono font-bold cursor-pointer border-none transition-all ${
                  containerSize === "20ft"
                    ? "bg-[#ff443a] text-white shadow-sm"
                    : "bg-transparent text-[#140d0a]/70 hover:text-[#140d0a]"
                }`}
              >
                20ft FCL (~300–350 sqm)
              </button>
              <button
                onClick={() => setContainerSize("40ft")}
                className={`px-3 py-1 text-xs font-mono font-bold cursor-pointer border-none transition-all ${
                  containerSize === "40ft"
                    ? "bg-[#ff443a] text-white shadow-sm"
                    : "bg-transparent text-[#140d0a]/70 hover:text-[#140d0a]"
                }`}
              >
                40ft FCL (~650–700 sqm)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Real Leaflet Map UI (7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-[#140d0a]/10 shadow-sm overflow-hidden flex flex-col">
              
              {/* Map Browser Window Header */}
              <div className="px-4 py-3 bg-[#140d0a] text-white flex items-center justify-between border-b border-[#140d0a]/10 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[10px] font-mono text-white/80 font-bold ml-2">
                    🌍 LIVE MAP · CHENNAI (IN) ➔ AUSTRALIA PORTS
                  </span>
                </div>

                <div className="text-[9.5px] font-mono text-[#ff443a] font-bold">
                  ● ACTIVE SEALANE: {selectedPort.city.toUpperCase()} ({selectedPort.code})
                </div>
              </div>

              {/* Real Interactive Leaflet Map Canvas */}
              <div className="w-full h-96 sm:h-[420px] relative bg-[#ece5d8] overflow-hidden">
                <RealInteractiveMap
                  selectedPortId={selectedPortId}
                  onSelectPort={setSelectedPortId}
                />
              </div>

              {/* Note Footer */}
              <div className="p-3.5 bg-[#faf6ef] border-t border-[#140d0a]/10 text-xs text-[#140d0a]/80 flex items-center justify-between flex-wrap gap-2">
                <span>
                  <strong>Container Volume: </strong>1×20ft FCL holds ~300–350 sqm · 1×40ft FCL holds ~650–700 sqm
                </span>
                <span className="text-[10px] font-mono text-[#ff443a] font-semibold">
                  Click any port pin on map to switch route
                </span>
              </div>
            </div>

            {/* Right: Selected Port Specifications & Rates (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Port Selector Chips */}
              <div className="grid grid-cols-2 gap-2">
                {AUSTRALIAN_PORTS.map((port) => {
                  const isSelected = selectedPortId === port.id;
                  return (
                    <button
                      key={port.id}
                      onClick={() => setSelectedPortId(port.id)}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white border-[#ff443a] shadow-sm ring-1 ring-[#ff443a]"
                          : "bg-white/60 border-[#140d0a]/10 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-display font-medium text-[#140d0a]">{port.city}</span>
                        <span className="text-[9px] font-mono text-[#ff443a] font-bold">{port.code}</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#140d0a]/50 block truncate">{port.state}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Port Rate Card */}
              <div className="p-6 bg-white border border-[#140d0a]/10 shadow-sm space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#ff443a] font-bold">
                      DESTINATION SPECIFICATIONS
                    </span>
                    <span className="px-2 py-0.5 bg-[#faf6ef] border border-[#140d0a]/10 text-[9px] font-mono font-bold">
                      {selectedPort.state}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl text-[#140d0a] font-medium mt-1">
                    Port of {selectedPort.city} ({selectedPort.code})
                  </h4>

                  <p className="text-xs leading-relaxed text-[#140d0a]/80 font-light mt-1">
                    {selectedPort.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#140d0a]/10">
                  <div className="p-3 bg-[#faf6ef] border border-[#140d0a]/10">
                    <span className="text-[9px] font-mono uppercase text-[#140d0a]/50 block font-bold mb-0.5">
                      {containerSize} FREIGHT COST:
                    </span>
                    <span className="font-mono text-base font-bold text-[#ff443a]">
                      {containerSize === "20ft" ? selectedPort.cost20ft : selectedPort.cost40ft}
                    </span>
                  </div>

                  <div className="p-3 bg-[#faf6ef] border border-[#140d0a]/10">
                    <span className="text-[9px] font-mono uppercase text-[#140d0a]/50 block font-bold mb-0.5">
                      OCEAN TRANSIT TIME:
                    </span>
                    <span className="font-mono text-base font-bold text-[#140d0a]">
                      {selectedPort.transitTime}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#faf6ef] border border-[#140d0a]/10 text-xs text-[#140d0a]/85">
                  <strong className="text-[#140d0a]">Regional Guidance: </strong>
                  {selectedPort.buyerNote}
                </div>

                <button
                  onClick={handleContactScroll}
                  className="w-full py-2.5 text-[9.5px] uppercase tracking-[0.2em] font-semibold bg-[#140d0a] text-white hover:bg-[#ff443a] transition-all cursor-pointer border-none shadow-sm text-center block"
                >
                  Request {selectedPort.city} Port Booking →
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PHASE 3: REDESIGNED LUXURY LANDED COST BREAKDOWN & LIVE STUDIO
        ══════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#140d0a]/10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-white border border-[#140d0a]/10 shadow-sm mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a]" />
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-[#ff443a]">
                  INTERACTIVE CAPITAL ESTIMATOR STUDIO
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#140d0a] font-light">
                3. Full Landed Cost Breakdown — What the Australian Buyer Actually Pays
              </h3>
            </div>

            {/* Stage Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-white border border-[#140d0a]/10 shadow-sm flex-wrap">
              <button
                onClick={() => setCostStageFilter("all")}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer border-none transition-all ${
                  costStageFilter === "all" ? "bg-[#ff443a] text-white font-bold shadow-sm" : "bg-transparent text-[#140d0a]/60 hover:text-[#140d0a]"
                }`}
              >
                All 9 Pillars
              </button>
              <button
                onClick={() => setCostStageFilter("india")}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer border-none transition-all ${
                  costStageFilter === "india" ? "bg-[#ff443a] text-white font-bold shadow-sm" : "bg-transparent text-[#140d0a]/60 hover:text-[#140d0a]"
                }`}
              >
                🇮🇳 Origin (1-2)
              </button>
              <button
                onClick={() => setCostStageFilter("ocean")}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer border-none transition-all ${
                  costStageFilter === "ocean" ? "bg-[#ff443a] text-white font-bold shadow-sm" : "bg-transparent text-[#140d0a]/60 hover:text-[#140d0a]"
                }`}
              >
                🚢 Ocean (3-4)
              </button>
              <button
                onClick={() => setCostStageFilter("aus")}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer border-none transition-all ${
                  costStageFilter === "aus" ? "bg-[#ff443a] text-white font-bold shadow-sm" : "bg-transparent text-[#140d0a]/60 hover:text-[#140d0a]"
                }`}
              >
                🇦🇺 Aus Border (5-9)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Enhanced 9-Pillar Schedule Cards (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredCostItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-[#140d0a]/10 hover:border-[#ff443a]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 bg-[#faf6ef] border border-[#140d0a]/10 text-[9px] font-mono font-bold text-[#140d0a]">
                          Pillar 0{item.id} · {item.stageLabel}
                        </span>
                        <span className="text-base">{item.icon}</span>
                      </div>

                      <h4 className="font-display text-base text-[#140d0a] font-medium group-hover:text-[#ff443a] transition-colors mb-1">
                        {item.item}
                      </h4>

                      <p className="text-xs text-[#140d0a]/70 font-light leading-relaxed">
                        {item.paidByNotes}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#140d0a]/10 flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase text-[#140d0a]/40">
                        ESTIMATED RANGE
                      </span>
                      <span className="font-mono text-xs font-bold text-[#ff443a]">
                        {item.costRange}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duty & Tax Summary Alert */}
              <div className="p-4 bg-[#faf6ef] border-l-3 border-[#ff443a] text-xs text-[#140d0a]/80 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#140d0a] uppercase text-[9.5px]">
                    🏛️ Australian Free-Trade &amp; Duty Exemption Note
                  </span>
                </div>
                <p className="text-[11.5px] leading-relaxed">
                  Under the Australia-India Comprehensive Economic Cooperation Agreement (ECTA), <strong>most natural slate, granite, and limestone imports enjoy 0% Customs Duty</strong>. Standard 10% GST is fully claimable by ABN-registered builders and businesses.
                </p>
              </div>
            </div>

            {/* Right: Live Interactive Landed Cost Calculator Studio (5 Cols) */}
            <div className="lg:col-span-5 p-6 bg-white border border-[#140d0a]/10 shadow-md space-y-5 sticky top-24">
              
              {/* Studio Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#140d0a]/10">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#ff443a] font-bold block mb-0.5">
                    LIVE CLIENT CALCULATOR
                  </span>
                  <h4 className="font-display text-xl text-[#140d0a] font-medium">
                    Landed Project Cost Studio
                  </h4>
                </div>
                <span className="px-2 py-1 bg-[#140d0a] text-white text-[9px] font-mono font-bold">
                  AUD Direct
                </span>
              </div>

              {/* 1. Stone Material Choice */}
              <div>
                <span className="text-[9.5px] font-mono uppercase text-[#140d0a]/60 block font-bold mb-1.5">
                  1. Select Stone Material Specimen:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {ESTIMATOR_STONE_OPTIONS.map((st) => {
                    const isSelected = selectedStoneSpec === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStoneSpec(st.id)}
                        className={`p-2 text-left border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#140d0a] text-white border-[#140d0a] shadow-sm"
                            : "bg-[#faf6ef] text-[#140d0a]/80 border-[#140d0a]/10 hover:border-[#140d0a]/30"
                        }`}
                      >
                        <span className="text-[10px] font-display font-medium block truncate leading-tight">
                          {st.name}
                        </span>
                        <span className={`text-[8.5px] font-mono block mt-0.5 ${isSelected ? "text-[#ff443a]" : "text-[#140d0a]/50"}`}>
                          ~${st.avgRateUsd}/sqm
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Destination Port Selector */}
              <div>
                <span className="text-[9.5px] font-mono uppercase text-[#140d0a]/60 block font-bold mb-1.5">
                  2. Destination Australian Port:
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {AUSTRALIAN_PORTS.map((pt) => {
                    const isSelected = selectedPortId === pt.id;
                    return (
                      <button
                        key={pt.id}
                        onClick={() => setSelectedPortId(pt.id)}
                        className={`py-1.5 px-1 text-center text-xs font-mono font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#ff443a] text-white border-[#ff443a] shadow-sm"
                            : "bg-[#faf6ef] text-[#140d0a]/75 border-[#140d0a]/10 hover:border-[#140d0a]/30"
                        }`}
                      >
                        {pt.city}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Interactive Volume Slider */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9.5px] font-mono uppercase text-[#140d0a]/60 font-bold">
                    3. Project Area:
                  </span>
                  <span className="font-mono font-bold text-sm text-[#ff443a]">
                    {orderSqmInput} SQM
                  </span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={orderSqmInput}
                  onChange={(e) => setOrderSqmInput(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#140d0a]/10 rounded-lg appearance-none cursor-pointer accent-[#ff443a]"
                />

                {/* Quick Presets */}
                <div className="flex items-center justify-between gap-1 mt-2">
                  {[150, 300, 600, 1000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setOrderSqmInput(preset)}
                      className={`px-2 py-0.5 text-[9px] font-mono border cursor-pointer transition-all ${
                        orderSqmInput === preset
                          ? "bg-[#140d0a] text-white border-[#140d0a]"
                          : "bg-[#faf6ef] text-[#140d0a]/70 border-[#140d0a]/10 hover:border-[#140d0a]/30"
                      }`}
                    >
                      {preset}m²
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Investment Card */}
              <div className="p-4 bg-[#faf6ef] border border-[#140d0a]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase text-[#140d0a]/50 font-bold">
                    ESTIMATED TOTAL LANDED INVESTMENT:
                  </span>
                  <span className="px-1.5 py-0.5 bg-white border border-[#140d0a]/10 text-[8.5px] font-mono font-bold text-[#ff443a]">
                    ~{estimatedContainers20ft} × 20ft FCL
                  </span>
                </div>

                <div>
                  <span className="font-mono text-3xl font-bold text-[#140d0a] tracking-tight block">
                    AUD ${totalLandedAud.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-[#ff443a] font-semibold mt-0.5 block">
                    ≈ AUD ${landedRatePerSqmAud} / m² all-inclusive landed in {selectedPort.city}
                  </span>
                </div>

                {/* Cost Breakdown Progress Bar */}
                <div className="space-y-1.5 pt-2 border-t border-[#140d0a]/10">
                  <div className="h-2 w-full flex overflow-hidden rounded-xs bg-[#140d0a]/10">
                    <div style={{ width: `${(materialCostAud / totalLandedAud) * 100}%` }} className="bg-[#140d0a]" title="Stone Material" />
                    <div style={{ width: `${(freightCostAud / totalLandedAud) * 100}%` }} className="bg-[#ff443a]" title="Sea Freight" />
                    <div style={{ width: `${(portHandlingAud / totalLandedAud) * 100}%` }} className="bg-[#ff6e8f]" title="Port THC & DAFF" />
                    <div style={{ width: `${(gstAud / totalLandedAud) * 100}%` }} className="bg-[#d97706]" title="GST (10%)" />
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-[9.5px] font-mono text-[#140d0a]/70">
                    <div>▪ Material: ${materialCostAud.toLocaleString()}</div>
                    <div>▪ Sea Freight: ${freightCostAud.toLocaleString()}</div>
                    <div>▪ Port Handling: ${portHandlingAud.toLocaleString()}</div>
                    <div>▪ GST (10%): ${gstAud.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContactScroll}
                className="w-full py-3 text-[9.5px] uppercase tracking-[0.2em] font-semibold bg-[#ff443a] text-white hover:bg-[#e6352b] transition-all cursor-pointer border-none shadow-sm text-center block"
              >
                Get Formal Proforma Invoice for {orderSqmInput}m² →
              </button>

            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PHASE 4: TRADE TERMS EXPLAINED (FOB vs CIF vs DDP)
        ══════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#140d0a]/10">
            <div>
              <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#ff443a] font-bold block mb-1">
                INTERNATIONAL INCOTERMS COMPARISON
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#140d0a] font-light">
                4. Trade Terms Explained (FOB, CIF, DDP)
              </h3>
            </div>

            {/* Incoterm Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-[#140d0a]/10 shadow-sm">
              {TRADE_TERMS.map((term) => (
                <button
                  key={term.code}
                  onClick={() => setActiveIncoterm(term.code)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold cursor-pointer border-none transition-all ${
                    activeIncoterm === term.code
                      ? "bg-[#ff443a] text-white shadow-sm"
                      : "bg-transparent text-[#140d0a]/70 hover:text-[#140d0a]"
                  }`}
                >
                  {term.code} ({term.title})
                </button>
              ))}
            </div>
          </div>

          {/* 3 Interactive Incoterm Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRADE_TERMS.map((term) => {
              const isSelected = activeIncoterm === term.code;

              return (
                <div
                  key={term.code}
                  onClick={() => setActiveIncoterm(term.code)}
                  className={`p-6 transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#ff443a] shadow-md ring-1 ring-[#ff443a]"
                      : "bg-[#faf6ef] border-[#140d0a]/10 hover:border-[#140d0a]/30 hover:bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="px-2 py-0.5 bg-[#140d0a] text-white font-mono font-bold text-xs uppercase">
                        {term.code}
                      </span>
                      <span className="text-[10px] font-mono text-[#ff443a] font-bold">
                        {isSelected ? "● ACTIVE SELECTION" : "CLICK TO CHOOSE"}
                      </span>
                    </div>

                    <h4 className="font-display text-xl text-[#140d0a] font-medium mb-1">
                      {term.title}
                    </h4>

                    <p className="text-xs leading-relaxed text-[#140d0a]/75 font-light mb-4">
                      {term.summary}
                    </p>

                    <div className="space-y-2 border-t border-[#140d0a]/10 pt-3 text-xs">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-[#ff443a] font-bold block mb-1">
                          ✔ WHAT PAVAN STONES HANDLES:
                        </span>
                        <ul className="space-y-1 text-[#140d0a]/80">
                          {term.pavanHandles.map((h, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[11.5px]">
                              <span className="text-[#ff443a] text-xs">✔</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="text-[9px] font-mono uppercase text-[#140d0a]/50 font-bold block mb-1">
                          👤 BUYER RESPONSIBILITY:
                        </span>
                        <ul className="space-y-1 text-[#140d0a]/70">
                          {term.buyerHandles.map((b, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[11.5px]">
                              <span>•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#140d0a]/10">
                    <span className="text-[9px] font-mono uppercase text-[#140d0a]/50 block">
                      BEST SUITED FOR:
                    </span>
                    <span className="text-[11.5px] text-[#140d0a] font-medium">
                      {term.idealFor}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Incoterm Final Guidance */}
          <div className="p-6 bg-white border border-[#140d0a]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#ff443a] font-bold block mb-0.5">
                RECOMMENDED TRADE CONTRACT: {currentIncoterm.code} ({currentIncoterm.title})
              </span>
              <p className="text-xs text-[#140d0a]/80 font-light max-w-2xl leading-relaxed">
                {currentIncoterm.summary} We quote all shipments in AUD or USD with guaranteed packing integrity and full export compliance.
              </p>
            </div>

            <button
              onClick={handleContactScroll}
              className="px-6 py-2.5 text-[9.5px] uppercase tracking-[0.2em] font-semibold bg-[#ff443a] text-white hover:bg-[#e6352b] transition-all cursor-pointer border-none shadow-sm flex-none"
            >
              Order under {currentIncoterm.code} Terms →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
