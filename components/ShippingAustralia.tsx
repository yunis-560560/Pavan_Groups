"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  FileCheck,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  Anchor,
  Truck,
  Sparkles,
  Route,
  Table as TableIcon,
  Globe,
  Compass,
} from "lucide-react";
import { GLOBAL_PORTS_DATA } from "@/lib/portsData";
import { scrollToHash } from "@/components/SmoothScroll";

// Dynamically import Leaflet map to prevent SSR window issues
const RealInteractiveMap = dynamic(
  () => import("@/components/RealInteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[440px] flex flex-col items-center justify-center bg-[#f7f2ea] text-[#747474] font-mono text-xs gap-3">
        <div className="w-7 h-7 border-2 border-[#8b4513] border-t-transparent rounded-full animate-spin" />
        <span className="tracking-wider uppercase font-semibold text-[#8b4513]">
          INITIALIZING GLOBAL MARITIME RADAR...
        </span>
      </div>
    ),
  }
);

// ── RICH 8-STAGE FACTORY TO JOBSITE SUPPLY CHAIN DATA ──
const JOURNEY_STEPS_RICH = [
  {
    num: "01",
    stepNumber: 1,
    phaseGroup: "Quarry & Order Engineering",
    title: "Order Finalization & Technical Specification",
    subtitle: "Stone Extraction Batch Approval",
    icon: FileCheck,
    timeframe: "1–3 Days",
    location: "Markapur & Chimakurthy Quarry Offices",
    description:
      "Client approves architectural bill of quantities (BOQ), mineral finishes, caliper thickness (+/-1mm tolerance), and stone lot color variation parameters.",
    sopStandard: "IS:1121 & ASTM C615 Stone Testing",
    deliverables: ["Signed Tech Spec Sheet", "Approved Color Master Samples", "Lot Allocation Number"],
  },
  {
    num: "02",
    stepNumber: 2,
    phaseGroup: "Quarry & Order Engineering",
    title: "Precision Quarry Extraction & CNC Calibration",
    subtitle: "Gangsaw Slicing & Edge Profiling",
    icon: Layers,
    timeframe: "7–14 Days",
    location: "Pavan Group Gangsaw & CNC Units",
    description:
      "Blocks sliced on multi-blade gangsaw frames, calibrated to exact mm thickness, precision edge-profiled, and given specified surface finish (Cleft, Honed, Polished, or Tumbled).",
    sopStandard: "Digital Caliper & Surface Flatness QC",
    deliverables: ["Precision Sized Slabs/Tiles", "Calibrated Edge Profiles", "Batch Uniformity Audit"],
  },
  {
    num: "03",
    stepNumber: 3,
    phaseGroup: "Quarry & Order Engineering",
    title: "100% Dry-Lay Staging & Quality Audit",
    subtitle: "Pre-Pack Visual & Dimension Verification",
    icon: Sparkles,
    timeframe: "2–3 Days",
    location: "Covered Dry-Lay Staging Facility",
    description:
      "Entire shipment dry-laid across factory staging floor to verify tonal harmony, pattern blend, and zero hairline fissures before crating.",
    sopStandard: "4K Video & High-Res Photo Dossier",
    deliverables: ["Full Lot Layout Photos", "Client Video Walkthrough", "Pre-Shipment Signoff"],
  },
  {
    num: "04",
    stepNumber: 4,
    phaseGroup: "Export Logistics & Packing",
    title: "Export Packing & ISPM-15 Fumigation",
    subtitle: "Seaworthy Heavy-Duty Timber Crates",
    icon: Package,
    timeframe: "2–3 Days",
    location: "Factory Loading & Packing Bay",
    description:
      "Tiles packed with high-density thermocol separators, moisture-proof plastic wrap, and heavy-duty ISPM-15 certified heat-treated pinewood crates with steel strapping.",
    sopStandard: "ISPM-15 Phytosanitary Compliance",
    deliverables: ["ISPM-15 Heat-Treatment Stamp", "Reinforced Steel Corner Straps", "Fumigation Certificate"],
  },
  {
    num: "05",
    stepNumber: 5,
    phaseGroup: "Export Logistics & Packing",
    title: "Container Stuffing & Chennai Port Dispatch",
    subtitle: "Direct Highway Transit & Terminal Gate-In",
    icon: Truck,
    timeframe: "2–4 Days",
    location: "Chennai / Krishnapatnam Ocean Terminal",
    description:
      "Crates stuffed into 20ft/40ft ocean containers with pneumatic dunnage air bags, customs cleared, and sealed with tamper-evident container bolt seal.",
    sopStandard: "ISO 17712 High-Security Bolt Seal",
    deliverables: ["Container Stuffing Photos", "Port Gate-In Pass", "Shipping Bill & Bill of Lading"],
  },
  {
    num: "06",
    stepNumber: 6,
    phaseGroup: "Ocean & Jobsite Handover",
    title: "Ocean Transit to Destination Port",
    subtitle: "Global Maritime Container Freight",
    icon: Ship,
    timeframe: "12–28 Days",
    location: "International Ocean Shipping Lanes",
    description:
      "Container vessel navigates designated maritime sealanes directly to destination ports across UAE (6–9d), Europe (20–26d), UK (20–25d), USA (22–30d), or Australia (12–22d).",
    sopStandard: "Bonded Marine Cargo Insurance",
    deliverables: ["Direct Ocean Freight Lines", "Continuous Satellite Tracking", "Comprehensive Transit Cover"],
  },
  {
    num: "07",
    stepNumber: 7,
    phaseGroup: "Ocean & Jobsite Handover",
    title: "Destination Port Customs & Quarantine",
    subtitle: "Terminal Handling & Clearance",
    icon: ShieldCheck,
    timeframe: "3–7 Days",
    location: "Destination Ocean Container Terminal",
    description:
      "Vessel arrives and offloads container; local customs authorities and biosecurity officers inspect documentation and release cargo from terminal.",
    sopStandard: "Local Customs & Quarantine Release",
    deliverables: ["Terminal Handling (THC)", "Quarantine / Biosecurity Clear", "Commercial Release Gate Pass"],
  },
  {
    num: "08",
    stepNumber: 8,
    phaseGroup: "Ocean & Jobsite Handover",
    title: "Direct Jobsite Delivery & Handover",
    subtitle: "Final Offloading at Project Site",
    icon: Building2,
    timeframe: "1–3 Days",
    location: "Buyer Project / Construction Site",
    description:
      "Flatbed truck transports crates from port terminal directly to buyer's residential or commercial jobsite for immediate installation.",
    sopStandard: "Turnkey Final Jobsite Handover",
    deliverables: ["Direct-to-Site Haulage", "Safe Ground-Level Offloading", "Final Material Verification"],
  },
];

type RegionKey = "all" | "australia" | "uae" | "uk" | "europe" | "usa";

interface RegionTab {
  key: RegionKey;
  label: string;
  flag: string;
}

const REGION_TABS: RegionTab[] = [
  { key: "all", label: "All Ports", flag: "🌍" },
  { key: "australia", label: "Australia", flag: "🇦🇺" },
  { key: "uae", label: "UAE & Gulf", flag: "🇦🇪" },
  { key: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { key: "europe", label: "Europe", flag: "🇪🇺" },
  { key: "usa", label: "United States", flag: "🇺🇸" },
];

export default function ShippingAustralia() {
  const [selectedPortId, setSelectedPortId] = useState<string>("syd");
  const [containerSize, setContainerSize] = useState<"20ft" | "40ft">("20ft");
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("all");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [journeyViewMode, setJourneyViewMode] = useState<"visual" | "grid">("visual");

  const activeStep = JOURNEY_STEPS_RICH[activeStepIndex];

  const filteredPorts = useMemo(() => {
    if (selectedRegion === "all") return GLOBAL_PORTS_DATA;
    return GLOBAL_PORTS_DATA.filter((p) => p.region === selectedRegion);
  }, [selectedRegion]);

  const selectedPort =
    GLOBAL_PORTS_DATA.find((p) => p.id === selectedPortId) || GLOBAL_PORTS_DATA[0];

  const handleContactScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <section
      id="shipping"
      className="relative py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#ffffff] text-[#241919] border-t border-[#747474]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-12 md:space-y-16">
        
        {/* ── SECTION HEADER & EXECUTIVE MARITIME STATS ── */}
        <div className="space-y-8 pb-8 border-b border-[#747474]/15">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#514a38] text-white shadow-xs rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d8c3a5] animate-pulse" />
                <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] font-bold">
                  GLOBAL MARITIME DISPATCH · EST. 1994
                </span>
              </div>

              <h2
                className="font-display font-light text-[#241919] leading-[1.02] tracking-[-0.015em]"
                style={{ fontSize: "clamp(36px, 4.6vw, 58px)" }}
              >
                <span className="text-[#241919]">Shipping Routes &amp; Freight Rates</span>{" "}
                <span className="text-[#8b4513] italic font-normal">(India ➔ Worldwide)</span>
              </h2>

              <p className="text-[14px] sm:text-[15.5px] text-[#454545] font-light leading-relaxed">
                Direct factory-to-port ocean container logistics from Chennai and Krishnapatnam terminals to 40+ key sea ports across <strong>UAE, Europe, United Kingdom, United States, and Australia</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-none">
              <button
                type="button"
                onClick={handleContactScroll}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold bg-[#241919] hover:bg-[#3e352a] text-[#f7f2ea] transition-all shadow-md cursor-pointer border-none rounded"
              >
                <span>Request Custom FOB/CIF Rate</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d8c3a5]" />
              </button>
            </div>
          </div>

          {/* Executive 4-Point Maritime Trust KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 bg-[#fcfaf7] border border-[#747474]/15 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#241919] text-[#d8c3a5] flex items-center justify-center flex-none text-xs">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#241919] block">40+ Sea Ports</span>
                <span className="text-[10px] text-[#747474]">Direct Destination Calls</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#fcfaf7] border border-[#747474]/15 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#241919] text-[#d8c3a5] flex items-center justify-center flex-none text-xs">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#241919] block">12–28 Days</span>
                <span className="text-[10px] text-[#747474]">Direct Ocean Transit</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#fcfaf7] border border-[#747474]/15 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#241919] text-[#d8c3a5] flex items-center justify-center flex-none text-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#241919] block">ISPM-15 Certified</span>
                <span className="text-[10px] text-[#747474]">Heat-Treated Timber</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#fcfaf7] border border-[#747474]/15 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#241919] text-[#d8c3a5] flex items-center justify-center flex-none text-xs">
                <Anchor className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#241919] block">100% Insured</span>
                <span className="text-[10px] text-[#747474]">All-Risk Marine Cargo</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            GLOBAL FREIGHT CONSOLE: CONTROLS + INTERACTIVE MAP + PROFILE
        ══════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          
          {/* Top Integrated Control Bar */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-3 bg-[#f7f2ea] rounded-xl border border-[#747474]/20 shadow-xs">
            
            {/* Region Filter Segmented Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {REGION_TABS.map((tab) => {
                const isActive = selectedRegion === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setSelectedRegion(tab.key);
                      const firstOfRegion =
                        tab.key === "all"
                          ? GLOBAL_PORTS_DATA[0]
                          : GLOBAL_PORTS_DATA.find((p) => p.region === tab.key);
                      if (firstOfRegion) setSelectedPortId(firstOfRegion.id);
                    }}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#241919] text-[#f7f2ea] shadow-sm font-semibold"
                        : "text-[#454545] hover:text-[#241919] hover:bg-white/70"
                    }`}
                  >
                    <span>{tab.flag}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Container Specification Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#747474]/20 self-start xl:self-auto shadow-2xs">
              <span className="text-[9px] font-mono text-[#747474] uppercase px-2 font-bold">
                VOLUME:
              </span>
              <button
                type="button"
                onClick={() => setContainerSize("20ft")}
                className={`px-3 py-1.5 text-xs font-mono font-bold cursor-pointer rounded-md transition-all ${
                  containerSize === "20ft"
                    ? "bg-[#241919] text-white shadow-xs"
                    : "bg-transparent text-[#454545] hover:text-[#241919]"
                }`}
              >
                20ft FCL (~350 sqm)
              </button>
              <button
                type="button"
                onClick={() => setContainerSize("40ft")}
                className={`px-3 py-1.5 text-xs font-mono font-bold cursor-pointer rounded-md transition-all ${
                  containerSize === "40ft"
                    ? "bg-[#241919] text-white shadow-xs"
                    : "bg-transparent text-[#454545] hover:text-[#241919]"
                }`}
              >
                40ft FCL (~700 sqm)
              </button>
            </div>

          </div>

          {/* Main 2-Column Console Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Interactive Map Canvas (7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-[#747474]/20 rounded-xl shadow-xs overflow-hidden flex flex-col min-h-[520px]">
              
              {/* Map Canvas Container */}
              <div className="w-full flex-1 min-h-[460px] relative bg-[#f7f2ea] overflow-hidden">
                <RealInteractiveMap
                  selectedPortId={selectedPortId}
                  onSelectPort={setSelectedPortId}
                  filteredPorts={filteredPorts}
                />
              </div>

              {/* Bottom Live Route Status Bar */}
              <div className="p-4 bg-[#faf6ef] border-t border-[#747474]/15 flex items-center justify-between text-xs text-[#241919] flex-wrap gap-2 flex-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8b4513] animate-pulse" />
                  <span className="font-mono text-[11px]">
                    <strong>Origin:</strong> Chennai Port (INMAA) ➔ <strong>Destination:</strong> {selectedPort.name}
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8b4513] font-bold">
                  {selectedPort.transit} Ocean Transit
                </span>
              </div>

            </div>

            {/* Right Column: Destination Hubs & Port Logistics Profile (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              
              {/* Destination Port Selectors (Clean Horizontal Pills) */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#747474] block">
                  SELECT DESTINATION PORT ({filteredPorts.length} AVAILABLE):
                </span>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 bg-[#f7f2ea] rounded-lg border border-[#747474]/15">
                  {filteredPorts.map((port) => {
                    const isSelected = selectedPortId === port.id;
                    return (
                      <button
                        key={port.id}
                        type="button"
                        onClick={() => setSelectedPortId(port.id)}
                        className={`p-3 text-left border rounded-lg transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#241919] text-white border-[#241919] shadow-sm"
                            : "bg-white text-[#241919] border-[#747474]/20 hover:border-[#8b4513]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-sans font-bold leading-tight truncate">
                            {port.name.split(" ")[0]}
                          </span>
                          <span
                            className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              isSelected
                                ? "bg-[#d8c3a5] text-[#241919]"
                                : "bg-[#f7f2ea] text-[#8b4513]"
                            }`}
                          >
                            {port.code}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-mono block truncate ${
                            isSelected ? "text-white/70" : "text-[#747474]"
                          }`}
                        >
                          {port.country} · {port.transit}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Port Detailed Logistics Dossier */}
              <div className="p-6 bg-white border border-[#747474]/20 rounded-xl shadow-xs space-y-5 flex-1 flex flex-col justify-between">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8b4513] font-bold">
                      PORT LOGISTICS PROFILE
                    </span>
                    <span className="px-2.5 py-1 bg-[#f7f2ea] border border-[#747474]/20 text-[9.5px] font-mono font-bold text-[#241919] rounded">
                      {selectedPort.country} · {selectedPort.code}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-[26px] text-[#241919] font-medium leading-snug">
                    {selectedPort.name}
                  </h3>

                  <p className="text-xs leading-relaxed text-[#454545] font-light">
                    {selectedPort.description}
                  </p>
                </div>

                {/* 2 Key Metric Boxes (Price & Days) */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#747474]/15">
                  
                  <div className="p-3.5 bg-[#f7f2ea] border border-[#747474]/15 rounded-lg space-y-1">
                    <span className="text-[9px] font-mono uppercase text-[#747474] block font-bold">
                      {containerSize} FREIGHT ESTIMATE:
                    </span>
                    <span className="font-mono text-base font-bold text-[#8b4513] block">
                      {containerSize === "20ft" ? selectedPort.cost20ft : selectedPort.cost40ft}
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#f7f2ea] border border-[#747474]/15 rounded-lg space-y-1">
                    <span className="text-[9px] font-mono uppercase text-[#747474] block font-bold">
                      OCEAN TRANSIT TIME:
                    </span>
                    <span className="font-mono text-base font-bold text-[#241919] block">
                      {selectedPort.transit}
                    </span>
                  </div>

                </div>

                {/* Logistics Key Points */}
                <div className="space-y-1.5 text-xs text-[#454545]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8b4513] flex-none" />
                    <span>Weekly scheduled container vessel sailings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8b4513] flex-none" />
                    <span>In-house Master Bill of Lading &amp; Customs clearance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8b4513] flex-none" />
                    <span>ISPM-15 fumigated seaworthy wooden crate packaging</span>
                  </div>
                </div>

                {/* Big Action Button */}
                <button
                  type="button"
                  onClick={handleContactScroll}
                  className="w-full py-3.5 px-4 text-xs font-mono uppercase tracking-wider font-bold bg-[#241919] hover:bg-[#3e352a] text-[#f7f2ea] transition-all cursor-pointer border-none rounded-lg shadow-sm text-center flex items-center justify-center gap-2"
                >
                  <span>Request CIF/FOB Rate to {selectedPort.name.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4 text-[#d8c3a5]" />
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            WORLD-CLASS "FACTORY TO BUYER'S SITE" LOGISTICS PIPELINE
        ══════════════════════════════════════════════════════════════ */}
        <div className="space-y-10 pt-10 border-t border-[#747474]/15">
          
          {/* Header Bar with Total Lead-Time & Mode Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#747474]/15">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-sm bg-[#8b4513]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8b4513] font-bold">
                  8-STAGE SUPPLY CHAIN PROTOCOL
                </span>
              </div>

              <h3
                className="font-display font-light text-[#241919] leading-tight"
                style={{ fontSize: "clamp(30px, 3.8vw, 48px)" }}
              >
                The Journey: <span className="text-[#8b4513] italic font-normal">Factory to Buyer&apos;s Site</span>
              </h3>
            </div>

            {/* Total Duration Banner & Desktop View Mode Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#f7f2ea] border border-[#747474]/20 rounded-lg text-xs font-mono shadow-2xs">
                <Clock className="w-4 h-4 text-[#8b4513]" />
                <span className="text-[#8b4513] font-bold">TOTAL TIME:</span>
                <span className="font-bold text-[#241919]">30–45 Days Typical</span>
              </div>

              {/* Desktop-only view switcher */}
              <div className="hidden lg:flex items-center gap-1 bg-[#f7f2ea] p-1 rounded-lg border border-[#747474]/20">
                <button
                  type="button"
                  onClick={() => setJourneyViewMode("visual")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${
                    journeyViewMode === "visual"
                      ? "bg-[#241919] text-[#f7f2ea] shadow-xs"
                      : "text-[#454545] hover:text-[#241919]"
                  }`}
                >
                  <Route className="w-3.5 h-3.5 text-[#d8c3a5]" />
                  <span>Interactive Flow</span>
                </button>

                <button
                  type="button"
                  onClick={() => setJourneyViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${
                    journeyViewMode === "grid"
                      ? "bg-[#241919] text-[#f7f2ea] shadow-xs"
                      : "text-[#454545] hover:text-[#241919]"
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5 text-[#d8c3a5]" />
                  <span>Schedule Matrix</span>
                </button>
              </div>
            </div>

          </div>

          {/* ── 1. MOBILE/TABLET VIEW: CONTINUOUS VERTICAL ARCHITECTURAL TIMELINE STORYLINE ── */}
          <div className="block lg:hidden space-y-6">
            <div className="relative pl-12 sm:pl-14 space-y-8">
              
              {/* Continuous Golden Trackway Line */}
              <div className="absolute left-4 sm:left-5 top-4 bottom-4 w-[2px] bg-[#d8c3a5] -translate-x-1/2 pointer-events-none" />

              {JOURNEY_STEPS_RICH.map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.num} className="relative group">
                    
                    {/* Centered Milestone Pin on the Vertical Track */}
                    <div className="absolute left-[-32px] sm:left-[-36px] top-2 w-8 h-8 rounded-full bg-[#241919] border-2 border-[#d8c3a5] flex items-center justify-center text-[#f7f2ea] text-xs font-mono font-bold shadow-md z-10 -translate-x-1/2">
                      {step.num}
                    </div>

                    {/* Step Card */}
                    <div className="bg-[#fcfaf7] border border-[#747474]/20 p-5 rounded-xl shadow-xs space-y-3">
                      
                      {/* Top Bar: Icon + Stage Title + Duration */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#241919] text-[#d8c3a5] flex items-center justify-center flex-none">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#8b4513] font-bold block">
                              STAGE {step.num} · {step.phaseGroup}
                            </span>
                            <h4 className="font-sans font-bold text-sm sm:text-base text-[#241919] leading-tight">
                              {step.title}
                            </h4>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 bg-white border border-[#747474]/20 rounded-md text-[10px] font-mono font-bold text-[#8b4513] whitespace-nowrap shadow-2xs">
                          ⏱ {step.timeframe}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[13px] leading-relaxed text-[#454545] font-light">
                        {step.description}
                      </p>

                      {/* Location & Deliverables Badges */}
                      <div className="pt-2 border-t border-[#747474]/15 space-y-2">
                        <div className="text-[11px] font-mono text-[#514a38] flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#8b4513] flex-none" />
                          <span>{step.location}</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {step.deliverables.map((deliv) => (
                            <span
                              key={deliv}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-[#747474]/15 rounded text-[10.5px] font-sans text-[#241919]"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#8b4513]" />
                              <span>{deliv}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Mobile Bottom Total Lead-Time Summary Banner */}
            <div className="p-5 bg-[#241919] text-[#f7f2ea] rounded-xl shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#d8c3a5] font-bold">
                  TOTAL SUPPLY CHAIN LEAD-TIME
                </span>
                <span className="font-mono text-xs font-bold text-[#d8c3a5]">
                  30–45 Days
                </span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed font-light">
                From specification lock to final ground-level offloading at your jobsite with full FOB/CIF documentation.
              </p>

              <button
                type="button"
                onClick={handleContactScroll}
                className="w-full py-3 text-xs font-mono uppercase tracking-wider font-bold bg-[#d8c3a5] text-[#1e1614] rounded-lg shadow-sm text-center block"
              >
                Request Custom Timeline &amp; Quote →
              </button>
            </div>

          </div>

          {/* ── 2. DESKTOP VIEW: INTERACTIVE FLOW vs SCHEDULE MATRIX ── */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              {journeyViewMode === "visual" ? (
                /* ── VIEW 1: INTERACTIVE ARCHITECTURAL PIPELINE TRACKWAY ── */
                <motion.div
                  key="visual-pipeline"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  {/* 8-Step Interactive Milestone Strip */}
                  <div className="grid grid-cols-8 gap-3 relative">
                    {JOURNEY_STEPS_RICH.map((step, idx) => {
                      const isSelected = activeStepIndex === idx;
                      const isPast = activeStepIndex > idx;
                      const Icon = step.icon;

                      return (
                        <button
                          key={step.num}
                          type="button"
                          onClick={() => setActiveStepIndex(idx)}
                          className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group relative ${
                            isSelected
                              ? "bg-[#241919] text-white border-[#241919] shadow-lg ring-2 ring-[#8b4513]"
                              : isPast
                              ? "bg-[#fcf8f1] border-[#8b4513]/30 text-[#241919] hover:bg-white"
                              : "bg-white border-[#747474]/20 text-[#241919] hover:border-[#8b4513]/40"
                          }`}
                        >
                          {/* Top Step Icon & Step Number */}
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "bg-[#8b4513] text-white"
                                  : "bg-[#f7f2ea] text-[#8b4513] border border-[#747474]/15"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>

                            <span
                              className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? "bg-[#d8c3a5] text-[#241919]"
                                  : "bg-[#241919]/5 text-[#747474]"
                              }`}
                            >
                              {step.num}
                            </span>
                          </div>

                          {/* Title & Timeframe */}
                          <div>
                            <h4
                              className={`font-sans font-bold text-xs leading-tight mb-1 truncate ${
                                isSelected ? "text-white" : "text-[#241919]"
                              }`}
                            >
                              {step.title}
                            </h4>

                            <span
                              className={`text-[10px] font-mono block font-medium ${
                                isSelected ? "text-[#d8c3a5]" : "text-[#8b4513]"
                              }`}
                            >
                              {step.timeframe}
                            </span>
                          </div>

                          {/* Active Arrow Indicator */}
                          {isSelected && (
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#241919] rotate-45 border-r border-b border-[#8b4513]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Step Master Dossier Card */}
                  <motion.div
                    key={activeStep.num}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 sm:p-10 bg-[#faf6ef] border border-[#747474]/20 rounded-2xl shadow-sm relative overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-8 items-center">
                      
                      {/* Left: Milestone Narrative & Deliverables (8 cols) */}
                      <div className="col-span-8 space-y-4">
                        
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="px-3 py-1 text-[10px] font-mono font-bold bg-[#8b4513] text-white uppercase rounded-md shadow-2xs">
                            STAGE {activeStep.num} OF 08 · {activeStep.phaseGroup}
                          </span>

                          <span className="px-3 py-1 bg-white border border-[#747474]/20 text-[10.5px] font-mono font-bold text-[#241919] rounded-md">
                            ⏱ Duration: {activeStep.timeframe}
                          </span>

                          <span className="text-xs font-mono text-[#747474]">
                            Facility: <strong>{activeStep.location}</strong>
                          </span>
                        </div>

                        <h4 className="font-display text-2xl sm:text-3xl text-[#241919] font-medium leading-tight">
                          {activeStep.title} —{" "}
                          <span className="text-[#8b4513] italic font-normal">{activeStep.subtitle}</span>
                        </h4>

                        <p className="text-[14px] sm:text-[15px] text-[#454545] leading-relaxed font-light">
                          {activeStep.description}
                        </p>

                        {/* Verified Deliverables Badges */}
                        <div className="pt-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                            VERIFIED QA OUTPUTS:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {activeStep.deliverables.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#747474]/20 rounded-md text-xs font-sans font-medium text-[#241919]"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#8b4513]" />
                                <span>{item}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Right: Stage Control Panel & Quick Next (4 cols) */}
                      <div className="col-span-4 p-6 bg-white border border-[#747474]/20 rounded-xl flex flex-col justify-between gap-5 shadow-xs">
                        
                        <div>
                          <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#747474] block font-bold mb-1">
                            PIPELINE CONTROLS
                          </span>
                          <span className="text-xs text-[#241919] font-medium block">
                            Standard Operating Procedure:
                          </span>
                          <span className="text-xs font-mono text-[#8b4513] font-bold block mt-0.5">
                            {activeStep.sopStandard}
                          </span>
                        </div>

                        {/* Step Controls */}
                        <div className="flex items-center gap-2 pt-2 border-t border-[#747474]/15">
                          <button
                            type="button"
                            onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                            disabled={activeStepIndex === 0}
                            className="px-4 py-2.5 text-xs font-mono border border-[#747474]/20 bg-[#faf6ef] rounded-lg disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed text-[#241919] font-bold transition-colors hover:bg-white"
                          >
                            ← Prev
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setActiveStepIndex(
                                Math.min(JOURNEY_STEPS_RICH.length - 1, activeStepIndex + 1)
                              )
                            }
                            disabled={activeStepIndex === JOURNEY_STEPS_RICH.length - 1}
                            className="px-5 py-2.5 text-xs font-mono bg-[#241919] hover:bg-[#3e352a] text-white rounded-lg disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex-1 font-bold text-center transition-colors"
                          >
                            Next Stage →
                          </button>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                /* ── VIEW 2: EXECUTIVE ARCHITECTURAL SCHEDULE MATRIX ── */
                <motion.div
                  key="grid-schedule"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-4 gap-4"
                >
                  {JOURNEY_STEPS_RICH.map((step) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.num}
                        className="p-6 bg-white border border-[#747474]/20 hover:border-[#8b4513]/50 rounded-xl shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-lg bg-[#f7f2ea] text-[#8b4513] flex items-center justify-center group-hover:bg-[#241919] group-hover:text-[#f7f2ea] transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>

                            <span className="px-2.5 py-1 bg-[#f7f2ea] border border-[#747474]/15 rounded text-[10px] font-mono font-bold text-[#8b4513]">
                              {step.timeframe}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block">
                              STEP {step.num}
                            </span>
                            <h4 className="font-sans font-bold text-[15px] text-[#241919] leading-snug group-hover:text-[#8b4513] transition-colors">
                              {step.title}
                            </h4>
                          </div>

                          <p className="text-xs text-[#454545] leading-relaxed font-light">
                            {step.description}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#747474]/15 text-[11px] font-mono text-[#514a38]">
                          📍 {step.location}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
