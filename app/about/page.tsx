"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const milestones = [
  {
    year: "1994",
    title: "The Rajasthan Genesis",
    location: "Dholpur Basin",
    stone: "Sedimentary Buff Sandstone",
    era: "Founding Era",
    highlight: "Acquired first 15-hectare quarry lease with zero-compromise geological surveying.",
    story: "Founded on the conviction that Indian stone, quarry-managed with geological respect and precision, rivals any material extracted in Carrara or Verona. Our early days focused on supplying historic restorations and private Indian estates.",
    metrics: "Initial yield: 800 m³ / yr",
  },
  {
    year: "2003",
    title: "Peninsular Granite Veins",
    location: "Karnataka & Andhra Pradesh",
    stone: "Precambrian Plutonic Granite",
    era: "Export Expansion",
    highlight: "Discovered the deep-crystal Absolute Black and golden Bronzite Black Galaxy formations.",
    story: "Secured high-yield granite deposits in the Deccan plateau. Installed heavy extraction cranes and established direct container shipping channels through Chennai and Nhava Sheva ports to European distributors.",
    metrics: "Export reach: 14 countries",
  },
  {
    year: "2012",
    title: "The 120,000 Sq Ft Processing Hub",
    location: "Industrial Stone Corridor",
    stone: "Automated Gang Saw Lines",
    era: "Technological Leap",
    highlight: "Commissioned computerized 5-axis CNC bridge saws and multi-head resin treatment lines.",
    story: "Transformed raw block fabrication into a high-precision science. Achieved ±0.5mm slab calibration tolerances and integrated ultrasonic flaw detectors to inspect interior crystalline continuity.",
    metrics: "Capacity: 15,000 m² slabs / mo",
  },
  {
    year: "2019",
    title: "Circular Water & Reforestation",
    location: "All Active Leases",
    stone: "Eco-Quarrying Protocol",
    era: "Sustainable Modernity",
    highlight: "Pioneered closed-loop water filtration, recycling 88% of process slurry into paving bricks.",
    story: "Committed to progressive land rehabilitation. Every extracted bench is backfilled with organic topsoil and indigenous flora, setting the benchmark for ethical stone stewardship in South Asia.",
    metrics: "Recycled water: 450,000 L / day",
  },
  {
    year: "Present",
    title: "Global Architectural Vanguard",
    location: "40+ Sovereign Markets",
    stone: "Bespoke Monumental Supply",
    era: "Global Leadership",
    highlight: "Direct material partner to premier international architects, hotel groups, and civic precincts.",
    story: "From Singapore's waterfront to civic assemblies in Australia and desert towers in the Gulf, Pavan Groups provides turnkey quarry-to-port logistics for the world's most demanding projects.",
    metrics: "2,400+ landmarks completed",
  },
];

const quarries = [
  {
    id: "rajasthan",
    name: "North Basin Quarry",
    region: "Rajasthan",
    geology: "Calcitic Limestone & Dholpur Sandstone",
    depth: "48 meters",
    density: "2,600 kg/m³",
    mineral: "Quartz 92% · Iron Oxides 4%",
    featuredStones: ["Dholpur Beige", "Kota Blue", "Jaisalmer Gold"],
    yieldColor: "#ff443a",
  },
  {
    id: "karnataka",
    name: "Deccan Igneous Pluton",
    region: "Karnataka",
    geology: "Deep-crust Plutonic Absolute Black Granite",
    depth: "72 meters",
    density: "2,980 kg/m³",
    mineral: "Feldspar 65% · Pyroxene 25%",
    featuredStones: ["Absolute Black", "Galaxy Bronzite", "Ruby Red"],
    yieldColor: "#d94e34",
  },
  {
    id: "himachal",
    name: "Himalayan Slate Escarpment",
    region: "Himachal Pradesh",
    geology: "Foliated Metamorphic Clay Slate",
    depth: "35 meters (Bench Cut)",
    density: "2,750 kg/m³",
    mineral: "Mica 45% · Quartz 35%",
    featuredStones: ["Autumn Rustic", "Black Raj", "Silver Grey"],
    yieldColor: "#b37d36",
  },
  {
    id: "andhra",
    name: "Riverine Quartzite Fields",
    region: "Andhra Pradesh",
    geology: "Tumbled Basalt & Hard Cobblestone",
    depth: "Surface Alluvial Deposits",
    density: "2,900 kg/m³",
    mineral: "Microcrystalline Silica 95%",
    featuredStones: ["Charcoal Cobbles", "Teak Sandstone", "Pebbles"],
    yieldColor: "#c25e00",
  },
];

export default function AboutPage() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [activeQuarry, setActiveQuarry] = useState(0);
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/#contact");
  };

  return (
    <div className="bg-[#fcf8f1] text-[#140d0a] overflow-hidden min-h-screen">
      {/* ── Page Header / Editorial Hero ── */}
      <section className="pt-36 pb-20 md:pb-28 px-6 md:px-14 lg:px-20 border-b border-[#140d0a]/10 bg-gradient-to-b from-[#faf5ec] to-[#fcf8f1] relative">
        <div className="max-w-5xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-6 text-[10px] tracking-[0.28em] uppercase text-[#140d0a]/50">
            <Link href="/" className="hover:text-[#ff443a] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#ff443a] font-medium">About & Heritage</span>
          </div>

          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#ff443a]/10 border border-[#ff443a]/25 text-[#ff443a] text-[10px] tracking-[0.24em] uppercase font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a] animate-pulse" />
            <span>Three Decades of Natural Stone Mastery</span>
          </div>

          <h1
            className="font-display font-light leading-[1.05] tracking-[-0.015em] mb-8 text-[#140d0a]"
            style={{ fontSize: "clamp(40px, 6vw, 86px)" }}
          >
            Formed by Earth over Millennia.
            <br />
            <span className="font-display italic text-[#ff443a]">
              Mastered by Craft since 1994.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-6 border-t border-[#140d0a]/10">
            <p className="md:col-span-8 text-[16px] md:text-[18px] leading-[1.8] text-[#140d0a]/75">
              Pavan Groups was established in Rajasthan with a singular mission: to supply the world’s most demanding architectural projects with genuine, ethically extracted Indian natural stones — guaranteeing uncompromising density, mineral stability, and micron-level precision.
            </p>
            <div className="md:col-span-4 p-5 bg-white border border-[#140d0a]/10 shadow-sm">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#140d0a]/50 block mb-1">
                Active Leases & Presence
              </span>
              <span className="font-display text-2xl text-[#140d0a] font-light block mb-2">
                3 Companies · Markapur HQ
              </span>
              <span className="text-[11px] text-[#140d0a]/60 leading-relaxed block">
                Direct quarry-to-port chain handling full and breakbulk shipments to 40+ nations.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Identity & Four Pillars (Carved from the Heart of India) ── */}
      <section className="py-24 md:py-32 px-6 md:px-14 lg:px-20 bg-[#fcf8f1] border-b border-[#140d0a]/10 relative overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(20,13,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,13,10,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Brand Story & Founding Heritage (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#140d0a]/10 shadow-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-[#ff443a]" />
              <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] font-semibold text-[#140d0a]">
                ABOUT PAVAN GROUPS
              </span>
            </div>

            <h2
              className="font-display font-light leading-[1.08] tracking-[-0.015em] mb-6 text-[#140d0a]"
              style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}
            >
              Carved from the
              <br />
              <span className="font-display italic font-normal text-[#ff443a]">
                heart of India.
              </span>
            </h2>

            <p className="text-[#140d0a]/75 leading-[1.85] mb-5 text-[15px] font-light">
              Headquartered in <strong className="font-semibold text-[#140d0a]">Markapur, Andhra Pradesh since 1994</strong>, Pavan Stones Group began with a single conviction: that natural stone, handled with respect and expertise, transforms spaces into timeless architectural legacies.
            </p>

            <p className="text-[#140d0a]/75 leading-[1.85] mb-8 text-[15px] font-light">
              Operating through <strong className="font-semibold text-[#140d0a]">Pavan Impex</strong> (Natural Slate & Cladding), <strong className="font-semibold text-[#140d0a]">Sai Balaji Impex</strong> (Limestone Products), and <strong className="font-semibold text-[#140d0a]">Pavan Granite</strong> (Premium Monolithic Granite), we manage quarrying, custom processing, export, and installation for architects across 40+ countries.
            </p>

            {/* Founding Badge */}
            <div className="inline-flex items-center gap-5 p-4 bg-white border border-[#140d0a]/10 shadow-sm border-l-4 border-l-[#ff443a]">
              <span className="font-display text-4xl sm:text-5xl font-light text-[#ff443a] leading-none">
                1994
              </span>
              <div className="border-l border-[#140d0a]/10 pl-4">
                <span className="text-[10px] tracking-[0.24em] uppercase font-mono font-bold text-[#140d0a] block">
                  YEAR FOUNDED
                </span>
                <span className="text-[11px] text-[#140d0a]/60">
                  Markapur, Andhra Pradesh, India
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Architectural Pillars Grid (6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "⬡",
                title: "Origin Traceability",
                desc: "Every block traced to its quarry face. GPS-tagged, ethically sourced, and certified.",
                accent: "#ff443a",
              },
              {
                icon: "◎",
                title: "30+ Year Mastery",
                desc: "Three decades of geological expertise, precision calibration, and finishing craftsmanship.",
                accent: "#ff5860",
              },
              {
                icon: "✦",
                title: "ISO 9001 Certified",
                desc: "Quality management systems ensuring flawless dimension tolerance across every slab.",
                accent: "#ff6e8f",
              },
              {
                icon: "◈",
                title: "Global Logistics",
                desc: "40+ countries served. Full container load to breakbulk. Port customs handled end-to-end.",
                accent: "#f4c430",
              },
            ].map((pillar, pIdx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: pIdx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 sm:p-7 bg-white border border-[#140d0a]/10 hover:border-[#ff443a]/40 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Active hover accent strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: pillar.accent }}
                />

                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center text-xl mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${pillar.accent}15`, color: pillar.accent }}
                >
                  {pillar.icon}
                </div>

                <h3 className="font-display text-lg font-medium text-[#140d0a] mb-2 leading-tight">
                  {pillar.title}
                </h3>

                <p className="text-[12.5px] leading-relaxed text-[#140d0a]/65">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Interactive Heritage Journey (Split Editorial Slider) ── */}
      <section className="py-24 md:py-32 px-6 md:px-14 lg:px-20 bg-[#f2ece2] border-b border-[#140d0a]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-3 block">
              Historical Trajectory
            </span>
            <h2
              className="font-display font-light text-[#140d0a] leading-[1.1]"
              style={{ fontSize: "clamp(30px, 4vw, 56px)" }}
            >
              The Chronicles of
              <br />
              <em className="not-italic text-[#ff443a]">Geological Craft</em>
            </h2>
          </div>
          <p className="text-[14px] text-[#140d0a]/60 max-w-md leading-relaxed">
            Click across our milestone eras to explore how three decades of continuous innovation transformed a local quarry into an international export powerhouse.
          </p>
        </div>

        {/* Milestone Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {milestones.map((m, idx) => (
            <button
              key={m.year}
              onClick={() => setActiveMilestone(idx)}
              className={`p-5 text-left transition-all duration-300 border cursor-pointer ${
                activeMilestone === idx
                  ? "bg-white border-[#ff443a] shadow-md -translate-y-1"
                  : "bg-white/60 border-[#140d0a]/10 hover:bg-white hover:border-[#140d0a]/30"
              }`}
            >
              <span
                className={`font-display text-2xl md:text-3xl font-light block mb-1 ${
                  activeMilestone === idx ? "text-[#ff443a]" : "text-[#140d0a]/70"
                }`}
              >
                {m.year}
              </span>
              <span className="text-[10px] tracking-[0.16em] uppercase font-medium text-[#140d0a]/60 truncate block">
                {m.era}
              </span>
            </button>
          ))}
        </div>

        {/* Milestone Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-8 md:p-14 bg-white border border-[#140d0a]/10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] tracking-[0.24em] uppercase px-3 py-1 bg-[#ff443a]/10 text-[#ff443a] font-medium border border-[#ff443a]/30">
                  {milestones[activeMilestone].location}
                </span>
                <span className="text-[11px] text-[#140d0a]/40 uppercase tracking-[0.18em]">
                  {milestones[activeMilestone].stone}
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-light text-[#140d0a] mb-4">
                {milestones[activeMilestone].title}
              </h3>

              <p className="text-[15px] leading-[1.8] text-[#140d0a]/75 mb-6">
                {milestones[activeMilestone].story}
              </p>

              <div className="p-4 bg-[#fcf8f1] border-l-2 border-[#ff443a] text-[13px] text-[#140d0a]/80 italic">
                "{milestones[activeMilestone].highlight}"
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-[#fcf8f1] border border-[#140d0a]/10 h-full">
              <div>
                <span className="text-[9px] uppercase tracking-[0.26em] text-[#140d0a]/40 block mb-2">
                  Era Impact Metric
                </span>
                <span className="font-display text-3xl md:text-4xl text-[#ff443a] font-light block mb-6">
                  {milestones[activeMilestone].metrics}
                </span>
              </div>
              <div className="border-t border-[#140d0a]/10 pt-6 space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#140d0a]/50">Extraction Standard:</span>
                  <span className="font-medium text-[#140d0a]">Diamond-Wire Cut</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#140d0a]/50">Quality Verification:</span>
                  <span className="font-medium text-[#140d0a]">ISO 9001:2015</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Geological Quarry Explorer (Interactive Depth & Mineral Gauge) ── */}
      <section className="py-24 md:py-32 px-6 md:px-14 lg:px-20 bg-[#faf5ec] border-b border-[#140d0a]/10">
        <div className="max-w-3xl mb-16">
          <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-3 block">
            Direct-From-Origin Leases
          </span>
          <h2
            className="font-display font-light text-[#140d0a] leading-[1.1]"
            style={{ fontSize: "clamp(30px, 4vw, 56px)" }}
          >
            Geological profiles of our
            <br />
            <em className="not-italic text-[#ff443a]">active extraction faces</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Quarry Nav */}
          <div className="lg:col-span-4 space-y-3">
            {quarries.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setActiveQuarry(idx)}
                className={`w-full p-6 text-left border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                  activeQuarry === idx
                    ? "bg-white border-[#ff443a] shadow-md border-l-4"
                    : "bg-white/60 border-[#140d0a]/10 hover:bg-white"
                }`}
              >
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#ff443a] font-medium block">
                    {q.region}
                  </span>
                  <h4 className="font-display text-xl font-light text-[#140d0a]">
                    {q.name}
                  </h4>
                </div>
                <span className="text-xl text-[#140d0a]/30 font-light">
                  {activeQuarry === idx ? "→" : "+"}
                </span>
              </button>
            ))}
          </div>

          {/* Right Quarry Deep-Dive Display */}
          <div className="lg:col-span-8 p-8 md:p-12 bg-white border border-[#140d0a]/10 shadow-sm">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-8 pb-6 border-b border-[#140d0a]/10">
              <div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#ff443a] font-medium block mb-1">
                  {quarries[activeQuarry].region} Province
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-light text-[#140d0a]">
                  {quarries[activeQuarry].name}
                </h3>
              </div>
              <span className="text-[12px] font-medium text-[#140d0a]/60 px-3.5 py-1.5 bg-[#fcf8f1] border border-[#140d0a]/10">
                Active Extraction Face
              </span>
            </div>

            <p className="text-[15px] leading-relaxed text-[#140d0a]/75 mb-8">
              Geological Formation: <strong className="text-[#140d0a] font-medium">{quarries[activeQuarry].geology}</strong>. Mined using continuous diamond loop technology to protect crystal lattices from concussion fractures.
            </p>

            {/* Geological Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-5 bg-[#fcf8f1] border border-[#140d0a]/10">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#140d0a]/50 block mb-1">
                  Mining Depth
                </span>
                <span className="font-display text-2xl text-[#140d0a] font-light">
                  {quarries[activeQuarry].depth}
                </span>
              </div>
              <div className="p-5 bg-[#fcf8f1] border border-[#140d0a]/10">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#140d0a]/50 block mb-1">
                  Material Density
                </span>
                <span className="font-display text-2xl text-[#ff443a] font-light">
                  {quarries[activeQuarry].density}
                </span>
              </div>
              <div className="p-5 bg-[#fcf8f1] border border-[#140d0a]/10">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#140d0a]/50 block mb-1">
                  Mineral Analysis
                </span>
                <span className="text-[12px] font-medium text-[#140d0a] leading-tight block mt-1">
                  {quarries[activeQuarry].mineral}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#140d0a]/50 font-medium block mb-3">
                Featured Stones Extracted From This Site:
              </span>
              <div className="flex flex-wrap gap-2">
                {quarries[activeQuarry].featuredStones.map((s) => (
                  <span
                    key={s}
                    className="px-3.5 py-1.5 bg-white border border-[#140d0a]/15 text-[11px] font-medium text-[#140d0a] tracking-[0.1em]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Craftsmanship & Workshop Philosophy (Asymmetrical Magazine Grid) ── */}
      <section className="py-24 md:py-32 px-6 md:px-14 lg:px-20 bg-[#fcf8f1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium block">
              Master Craftsmanship
            </span>
            <h2
              className="font-display font-light text-[#140d0a] leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3.8vw, 54px)" }}
            >
              Where cutting-edge CNC meets
              <br />
              <em className="not-italic text-[#ff443a]">generational stonemasonry</em>
            </h2>
            <p className="text-[15px] leading-[1.8] text-[#140d0a]/70">
              A computer can cut to a millimeter, but only a master mason’s hand can feel the hidden grain fissures, the natural cleavage plane, and the way ambient light diffuses through a honed crystalline surface.
            </p>

            <div className="space-y-4 pt-4">
              {[
                { title: "5-Axis CNC Water Jet Profiling", desc: "Complex 3D sculptural curves, intricate jali screens, and fluted column cladding with micro tolerances." },
                { title: "Multi-Stage Honing & Antiquing", desc: "Seven automated polishing heads followed by traditional brushed river washes to achieve velvety soft tactile touch." },
                { title: "Dry-Lay Pre-Assembly Inspection", desc: "Every project's critical floor slabs and wall panels are pre-laid in our 120,000 sq ft yard to verify color harmony before crating." },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-white border border-[#140d0a]/10 shadow-sm">
                  <h4 className="font-display text-lg font-medium text-[#140d0a] mb-1">{item.title}</h4>
                  <p className="text-[13px] text-[#140d0a]/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-8 md:p-14 bg-[#f2ece2] border border-[#140d0a]/10 relative">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#ff443a] font-medium block mb-4">
              Quality Assurance Lab
            </span>
            <h3 className="font-display text-3xl font-light text-[#140d0a] mb-6">
              Rigorous Laboratory Certification with Every Dispatch
            </h3>
            <p className="text-[14px] text-[#140d0a]/70 leading-relaxed mb-8">
              We provide full traceability. Each shipment includes third-party lab documentation verifying flexural modulus, compressive strength, and slip resistance.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { code: "ISO 9001:2015", title: "Manufacturing Standard" },
                { code: "CE Certified", title: "European Safety Mark" },
                { code: "ASTM C615", title: "Granite Dimension Standard" },
                { code: "ASTM C503", title: "Calcite Marble Standard" },
              ].map((cert) => (
                <div key={cert.code} className="p-4 bg-white border border-[#140d0a]/10">
                  <span className="font-display text-lg font-medium text-[#ff443a] block">
                    {cert.code}
                  </span>
                  <span className="text-[11px] text-[#140d0a]/50">{cert.title}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#140d0a]/10 flex justify-between items-center">
              <span className="text-[12px] text-[#140d0a]/60">Need custom laboratory test certs?</span>
              <button
                onClick={handleContactClick}
                className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#ff443a] hover:underline bg-transparent border-none cursor-pointer"
              >
                Inquire With Quality Head →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Light Action Banner ── */}
      <section className="py-16 px-6 md:px-14 lg:px-20 border-t border-[#140d0a]/10 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-2 block">
              Architectural Collaboration
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-light text-[#140d0a]">
              Specify Pavan Groups natural stone for your next landmark
            </h3>
          </div>
          <button
            onClick={handleContactClick}
            className="px-8 py-4 bg-[#ff443a] text-white text-[10px] tracking-[0.24em] uppercase font-medium hover:bg-[#e6352b] transition-colors border-none cursor-pointer flex-none flex items-center gap-3 shadow-md"
          >
            <span>Consult Our Geologists</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
