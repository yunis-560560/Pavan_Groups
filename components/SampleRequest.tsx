"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StoneSpecimen {
  id: string;
  name: string;
  division: string;
  category: "slate" | "limestone" | "granite";
  gradient: string;
  origin: string;
  defaultFinishes: string[];
  recommendedThickness: string;
}

const SPECIMENS: StoneSpecimen[] = [
  {
    id: "black-galaxy-granite",
    name: "Black Galaxy Granite",
    division: "Pavan Granite",
    category: "granite",
    gradient: "linear-gradient(135deg, #090a0c 0%, #221f17 50%, #040506 100%)",
    origin: "Chimakurthy, AP",
    defaultFinishes: ["95+ Diamond Mirror Polish", "Leathered Velvet Touch", "Honed Matte"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "black-slate-stone",
    name: "Black Slate Stone",
    division: "Pavan Impex",
    category: "slate",
    gradient: "linear-gradient(135deg, #17191d 0%, #282b31 50%, #101114 100%)",
    origin: "Markapur, AP",
    defaultFinishes: ["Natural Cleft", "Calibrated Bottom", "Honed Smooth"],
    recommendedThickness: "15mm (5/8 in)",
  },
  {
    id: "cuddapah-black-limestone",
    name: "Cuddapah Black Limestone",
    division: "Sai Balaji Impex",
    category: "limestone",
    gradient: "linear-gradient(135deg, #151719 0%, #25282d 50%, #0d0e10 100%)",
    origin: "Cuddapah Basin, AP",
    defaultFinishes: ["Natural Non-Slip (R11)", "Honed Matte", "Tumbled Antique"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "indian-autumn-slate",
    name: "Indian Autumn Slate",
    division: "Pavan Impex",
    category: "slate",
    gradient: "linear-gradient(135deg, #532f1f 0%, #7d4428 50%, #3a1f13 100%)",
    origin: "Markapur, AP",
    defaultFinishes: ["Hand-Split Layered", "Tumbled Rustic", "Calibrated"],
    recommendedThickness: "18mm (3/4 in)",
  },
  {
    id: "lime-yellow-limestone",
    name: "Lime Yellow Limestone",
    division: "Sai Balaji Impex",
    category: "limestone",
    gradient: "linear-gradient(135deg, #7c6433 0%, #a48a4c 50%, #524220 100%)",
    origin: "Cuddapah, AP",
    defaultFinishes: ["Antiqued Velvet", "Brushed", "Calibrated"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "lime-blue-limestone",
    name: "Lime Blue Limestone",
    division: "Sai Balaji Impex",
    category: "limestone",
    gradient: "linear-gradient(135deg, #2e3842 0%, #475564 50%, #1e242b 100%)",
    origin: "Cuddapah, AP",
    defaultFinishes: ["Calibrated Coping", "Cobbled", "Flamed"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "california-gold-slate",
    name: "California Gold Slate",
    division: "Pavan Impex",
    category: "slate",
    gradient: "linear-gradient(135deg, #6c471c 0%, #96692f 50%, #442a0e 100%)",
    origin: "Markapur, AP",
    defaultFinishes: ["Golden Sparkle", "Riven Surface", "Calibrated"],
    recommendedThickness: "15mm (5/8 in)",
  },
  {
    id: "silver-sparkle-granite",
    name: "Silver Sparkle Granite",
    division: "Pavan Granite",
    category: "granite",
    gradient: "linear-gradient(135deg, #0e1012 0%, #22262b 50%, #090a0c 100%)",
    origin: "Chimakurthy, AP",
    defaultFinishes: ["Diamond Gloss", "Honed Matte", "Lapato"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "absolute-black-granite",
    name: "Absolute Black Granite",
    division: "Pavan Granite",
    category: "granite",
    gradient: "linear-gradient(135deg, #060607 0%, #111214 50%, #030304 100%)",
    origin: "South India Basin",
    defaultFinishes: ["Flawless Mirror Polish", "Flamed", "Water Jet"],
    recommendedThickness: "20mm (3/4 in)",
  },
];

const DESTINATION_PORTS = [
  "Sydney, Australia (Port Botany)",
  "Melbourne, Australia (Port of Melbourne)",
  "Brisbane, Australia (Port of Brisbane)",
  "Fremantle / Perth, Australia",
  "Auckland, New Zealand",
  "Dubai / Jebel Ali, UAE",
  "Dammam / Jeddah, Saudi Arabia",
  "Los Angeles / Long Beach, USA",
  "New York / New Jersey, USA",
  "London Gateway / Felixstowe, UK",
  "Hamburg, Germany",
  "Antwerp, Belgium",
  "Singapore, Port of Singapore",
  "Other International Sea Port",
];

export default function SampleRequest() {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>("black-galaxy-granite");
  const [selectedFinish, setSelectedFinish] = useState<string>("95+ Diamond Mirror Polish");
  const [selectedSize, setSelectedSize] = useState<string>("600 x 300 mm (2x1 ft)");
  const [selectedThickness, setSelectedThickness] = useState<string>("20mm (3/4 in)");
  const [estimatedVolume, setEstimatedVolume] = useState<string>("1 x 20ft FCL Container (~700-900 sqm)");
  const [destinationPort, setDestinationPort] = useState<string>("Sydney, Australia (Port Botany)");
  const [customPort, setCustomPort] = useState<string>("");

  const [companyName, setCompanyName] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [courierAddress, setCourierAddress] = useState<string>("");
  const [projectNotes, setProjectNotes] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");

  const currentSpecimen =
    SPECIMENS.find((s) => s.id === selectedSpecimenId) || SPECIMENS[0];

  const handleSpecimenSelect = (specimenId: string) => {
    setSelectedSpecimenId(specimenId);
    const spec = SPECIMENS.find((s) => s.id === specimenId);
    if (spec && spec.defaultFinishes.length > 0) {
      setSelectedFinish(spec.defaultFinishes[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `PAVAN-SMP-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceNumber(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section
      id="request-sample"
      className="relative py-24 md:py-36 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#fcf8f1] border-t border-[#747474]/15 overflow-hidden"
    >
      {/* Subtle Architectural Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(36,25,25,1) 1px, transparent 1px), linear-gradient(90deg, rgba(36,25,25,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white border border-[#747474]/20 shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#514a38] animate-pulse" />
            <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] font-bold text-[#3e352a]">
              SECTION 03 · THE PAVAN STONES SAMPLE ATELIER
            </span>
          </div>

          <h2
            className="font-display font-light text-[#241919] leading-[1.04] tracking-[-0.015em] mb-4"
            style={{ fontSize: "clamp(32px, 4.2vw, 58px)" }}
          >
            Bespoke Architectural Samples.
            <br />
            <span className="italic font-normal text-[#514a38]">
              Delivered Direct to Your Design Studio Worldwide.
            </span>
          </h2>

          <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#454545] font-light">
            Evaluate authentic calibrated stone specimens in your local lighting conditions. Every curated sample box contains genuine quarry specimen tiles, finish strips, geological ASTM test certificates, and a customized FOB/CIF freight schedule.
          </p>
        </div>

        {/* ── 2-COLUMN ATELIER LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── LEFT COLUMN: BESPOKE SAMPLE REQUEST CONCIERGE FORM (7 Cols) ── */}
          <div className="lg:col-span-7 bg-white border border-[#747474]/20 p-6 sm:p-10 shadow-lg relative">
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#fcf8f1] border-2 border-[#514a38] flex items-center justify-center mx-auto text-2xl text-[#514a38]">
                  ✔
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#514a38] block mb-2">
                    SAMPLE DISPATCH QUEUED SUCCESSFULLY
                  </span>
                  <h3 className="font-display text-3xl font-light text-[#241919] mb-2">
                    Thank You, {contactName || "Valued Client"}
                  </h3>
                  <p className="text-xs font-mono text-[#3e352a] font-semibold mb-4">
                    Sample Tracking ID: <span className="text-[#241919] bg-[#fcf8f1] px-3 py-1 border border-[#747474]/20">{referenceNumber}</span>
                  </p>
                  <p className="text-[14px] text-[#454545] font-light max-w-md mx-auto leading-relaxed">
                    Our export logistics desk has queued your curated <strong className="text-[#241919]">{currentSpecimen.name}</strong> sample kit for express air courier dispatch to <strong className="text-[#241919]">{destinationPort}</strong>.
                  </p>
                </div>

                <div className="p-4 bg-[#fcf8f1] border border-[#747474]/20 max-w-md mx-auto text-left space-y-2 text-xs font-mono text-[#454545]">
                  <div className="flex justify-between">
                    <span className="text-[#747474]">Stone Specimen:</span>
                    <span className="font-bold text-[#241919]">{currentSpecimen.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#747474]">Selected Finish:</span>
                    <span className="font-bold text-[#241919]">{selectedFinish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#747474]">Target Port:</span>
                    <span className="font-bold text-[#241919]">{destinationPort}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#747474]">Est. Dispatch:</span>
                    <span className="font-bold text-[#514a38]">Within 48 Hours (DHL/FedEx Air)</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-[#241919] text-white hover:bg-[#3e352a] text-[10.5px] font-mono uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer"
                  >
                    Submit Another Specimen Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* ── STEP 1: STONE SPECIMEN SELECTION ── */}
                <div className="space-y-4 pb-6 border-b border-[#747474]/15">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#241919] text-white font-mono text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <h3 className="font-display text-xl font-medium text-[#241919]">
                      Select Stone Variety & Surface Texture
                    </h3>
                  </div>

                  {/* Visual Specimen Swatch Grid */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-2">
                      Click Stone Specimen: *
                    </label>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SPECIMENS.map((spec) => {
                        const isSelected = selectedSpecimenId === spec.id;
                        return (
                          <button
                            key={spec.id}
                            type="button"
                            onClick={() => handleSpecimenSelect(spec.id)}
                            className={`p-2.5 border text-left transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                              isSelected
                                ? "bg-[#241919] text-white border-[#241919] shadow-md ring-1 ring-[#241919]"
                                : "bg-[#fcf8f1] hover:bg-white border-[#747474]/20 text-[#241919]"
                            }`}
                          >
                            <div
                              className="w-5 h-5 rounded-none border border-black/20 shadow-inner flex-none"
                              style={{ background: spec.gradient }}
                            />
                            <div className="min-w-0">
                              <span className="text-[11px] font-medium block leading-tight truncate">
                                {spec.name}
                              </span>
                              <span
                                className={`text-[8.5px] font-mono block truncate ${
                                  isSelected ? "text-[#d8c3a5]" : "text-[#747474]"
                                }`}
                              >
                                {spec.division.split(" ")[0]}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Surface Finish Chips */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-2">
                      Surface Finish Profile: *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {currentSpecimen.defaultFinishes.map((fin) => (
                        <button
                          key={fin}
                          type="button"
                          onClick={() => setSelectedFinish(fin)}
                          className={`px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                            selectedFinish === fin
                              ? "bg-[#241919] text-white border border-[#241919] font-bold shadow-xs"
                              : "bg-[#fcf8f1] border border-[#747474]/25 text-[#454545] hover:border-[#241919]"
                          }`}
                        >
                          {fin}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── STEP 2: DIMENSIONS & VOLUME ESTIMATE ── */}
                <div className="space-y-4 pb-6 border-b border-[#747474]/15">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#241919] text-white font-mono text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <h3 className="font-display text-xl font-medium text-[#241919]">
                      Target Sizing, Thickness & Project Scope
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                        Target Sizing / Form Factor:
                      </label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                      >
                        <option value="600 x 300 mm (2x1 ft)">600 x 300 mm (2x1 ft)</option>
                        <option value="600 x 600 mm (2x2 ft)">600 x 600 mm (2x2 ft)</option>
                        <option value="300 x 300 mm (1x1 ft)">300 x 300 mm (1x1 ft)</option>
                        <option value="1200 x 600 mm (4x2 ft)">1200 x 600 mm (4x2 ft)</option>
                        <option value="Jumbo Gangsaw Slabs (10x6 ft)">Jumbo Gangsaw Slabs (10x6 ft)</option>
                        <option value="Tumbled Pavers (200x100mm)">Tumbled Pavers (200x100mm)</option>
                        <option value="Custom Cut-to-Size">Custom Cut-to-Size (Architectural)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                        Target Thickness:
                      </label>
                      <select
                        value={selectedThickness}
                        onChange={(e) => setSelectedThickness(e.target.value)}
                        className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                      >
                        <option value="12mm (1/2 in)">12mm (1/2 in)</option>
                        <option value="15mm (5/8 in)">15mm (5/8 in)</option>
                        <option value="18mm (3/4 in)">18mm (3/4 in)</option>
                        <option value="20mm (3/4 in) [Most Popular]">20mm (3/4 in) [Standard]</option>
                        <option value="25mm (1 in)">25mm (1 in)</option>
                        <option value="30mm (1 3/16 in)">30mm (1 3/16 in)</option>
                        <option value="40mm (1 1/2 in) Paver">40mm (1 1/2 in) Paver</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                      Estimated Project Requirement: *
                    </label>
                    <select
                      value={estimatedVolume}
                      onChange={(e) => setEstimatedVolume(e.target.value)}
                      className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                      required
                    >
                      <option value="Trial Sample Evaluation (< 200 sqm)">Trial Sample Evaluation (&lt; 200 sqm)</option>
                      <option value="200 to 500 sqm (Partial Container)">200 to 500 sqm (Partial Container / LCL)</option>
                      <option value="1 x 20ft FCL Container (~700-900 sqm)">1 x 20ft FCL Container (~700-900 sqm)</option>
                      <option value="2 to 5 x 20ft FCL Containers (1,500 - 4,000 sqm)">2 to 5 x 20ft FCL Containers (1,500 - 4,000 sqm)</option>
                      <option value="5+ FCL Containers (Commercial Project Supply)">5+ FCL Containers (Commercial Project Supply)</option>
                    </select>
                  </div>
                </div>

                {/* ── STEP 3: DESTINATION SEA PORT ── */}
                <div className="space-y-4 pb-6 border-b border-[#747474]/15">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#241919] text-white font-mono text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <h3 className="font-display text-xl font-medium text-[#241919]">
                      Destination Sea Port (For CIF Freight Quotation)
                    </h3>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                      Nearest Port of Discharge: *
                    </label>
                    <select
                      value={destinationPort}
                      onChange={(e) => setDestinationPort(e.target.value)}
                      className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                      required
                    >
                      {DESTINATION_PORTS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {destinationPort.includes("Other") && (
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                        Specify Your Target Port / City:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Port of Rotterdam, Netherlands"
                        value={customPort}
                        onChange={(e) => setCustomPort(e.target.value)}
                        className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* ── STEP 4: COMPANY & COURIER DISPATCH DETAILS ── */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#241919] text-white font-mono text-xs flex items-center justify-center font-bold">
                      4
                    </span>
                    <h3 className="font-display text-xl font-medium text-[#241919]">
                      Company & Courier Delivery Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                        Company / Architectural Practice: *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Studio Arc Australia / Stone Direct Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                        Contact Person Name: *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. David Henderson"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                        Corporate Email Address: *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. procurement@studioarc.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                        Phone / WhatsApp (with Country Code): *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +61 412 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                      Sample Delivery Street Address (For DHL / FedEx Express): *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Suite 402, Level 4, 120 Collins Street, Melbourne VIC 3000, Australia"
                      value={courierAddress}
                      onChange={(e) => setCourierAddress(e.target.value)}
                      className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#3e352a] font-bold block mb-1.5">
                      Specific Architectural Requirements / Edge Profiles (Optional):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for pool coping pieces with bullnose edge profiles and matching outdoor pavers."
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      className="w-full bg-[#fcf8f1] border border-[#747474]/30 text-[#241919] p-3 text-sm focus:outline-none focus:border-[#241919]"
                    />
                  </div>
                </div>

                {/* ── SUBMIT BUTTON ── */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full p-4 bg-[#241919] hover:bg-[#3e352a] text-white text-[11.5px] font-mono uppercase tracking-[0.22em] font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Queuing Express Dispatch...</span>
                    ) : (
                      <>
                        <span>Submit Sample Kit Dispatch Request</span>
                        <span className="text-base">→</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] font-mono text-[#747474] text-center mt-2.5">
                    🔒 Compliant with ISO 9001:2015 standards. Dispatched directly from Markapur factory within 48-72 hours.
                  </p>
                </div>

              </form>
            )}

          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE SAMPLE ATELIER BOX VISUALIZER (5 Cols) ── */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3D-Feel Luxury Curated Sample Box Visualizer */}
            <div className="bg-white border border-[#747474]/20 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#747474]/15">
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#514a38] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#514a38] animate-pulse" />
                  LIVE ATELIER SPECIMEN
                </span>
                <span className="text-[10px] font-mono text-[#747474]">
                  {currentSpecimen.origin}
                </span>
              </div>

              {/* Dynamic Live Specimen Tile (Changes in Real Time) */}
              <div
                className="w-full h-44 mb-4 border border-black/20 shadow-inner flex flex-col justify-between p-4 relative overflow-hidden transition-all duration-500"
                style={{ background: currentSpecimen.gradient }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono uppercase px-2 py-1 bg-black/70 text-white backdrop-blur-xs">
                    {selectedFinish}
                  </span>
                  <span className="text-[9px] font-mono uppercase px-2 py-1 bg-[#d8c3a5] text-[#241919] font-bold">
                    {selectedThickness.split(" ")[0]}
                  </span>
                </div>

                <div className="bg-black/75 backdrop-blur-xs p-3 text-white">
                  <span className="text-sm font-mono font-bold block leading-tight">
                    {currentSpecimen.name}
                  </span>
                  <span className="text-[9.5px] font-mono text-[#d8c3a5] block mt-0.5">
                    Quarry Division: {currentSpecimen.division}
                  </span>
                </div>
              </div>

              {/* Live Specimen Summary Details */}
              <div className="p-3.5 bg-[#fcf8f1] border border-[#747474]/15 text-xs font-mono space-y-1.5 text-[#454545]">
                <div className="flex justify-between">
                  <span className="text-[#747474]">Target Port:</span>
                  <span className="font-bold text-[#241919]">{destinationPort.split("(")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#747474]">Project Scope:</span>
                  <span className="font-bold text-[#241919]">{estimatedVolume.split("(")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#747474]">Air Courier:</span>
                  <span className="font-bold text-[#514a38]">DHL / FedEx Priority</span>
                </div>
              </div>
            </div>

            {/* What is Included Inside the Pavan Groups Sample Box */}
            <div className="bg-[#241919] text-white p-6 sm:p-8 shadow-md">
              <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#d8c3a5] font-bold block mb-2">
                EXPRESS SAMPLE KIT CONTENTS
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-light text-white mb-4">
                What's Inside Your Atelier Sample Box
              </h4>

              <ul className="space-y-3 text-xs text-white/85 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#d8c3a5] font-bold mt-0.5">✔</span>
                  <span><strong>3x Calibrated Stone Specimens</strong> (150x150mm genuine quarry cut samples).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#d8c3a5] font-bold mt-0.5">✔</span>
                  <span><strong>Multi-Finish Surface Swatch Deck</strong> (Cleft, Honed, Polished & Tumbled).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#d8c3a5] font-bold mt-0.5">✔</span>
                  <span><strong>Full ASTM & ISO Physical Test Reports</strong> (Density, Compressive Strength, Slip R-ratings).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#d8c3a5] font-bold mt-0.5">✔</span>
                  <span><strong>Customized FOB & CIF Pricing Schedule</strong> calculated for your discharge sea port.</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-white/70">
                <span>DHL Express Dispatch</span>
                <span className="text-[#d8c3a5] font-bold">48-72 Hour Delivery</span>
              </div>
            </div>

            {/* Direct Export WhatsApp Hotline */}
            <div className="p-5 bg-white border border-[#747474]/20 flex items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474] block font-bold">
                  DIRECT EXPORT DESK HOTLINE:
                </span>
                <span className="text-xs font-mono font-bold text-[#241919]">
                  +91 94402 71559 · export@pavangroups.com
                </span>
              </div>

              <a
                href="https://wa.me/919440271559?text=Hello%2C%20I%20would%20like%20to%20request%20natural%20stone%20samples%20from%20Pavan%20Groups."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-[9.5px] font-mono uppercase tracking-wider font-bold shadow-xs transition-all flex-none flex items-center gap-1.5"
              >
                <span>WhatsApp</span>
                <span>↗</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
