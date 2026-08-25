"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Factory, Layers, Building2, ArrowRight } from "lucide-react";

interface CompanyCollection {
  num: string;
  name: string;
  slug: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  accentLine: string;
  titleColor: string;
  cardBg: string;
  description: string;
  buttonBg: string;
  buttonTextColor: string;
  buttonBorderColor: string;
  buttonShadow: string;
  bgGradient: string;
}

const COLLECTIONS: CompanyCollection[] = [
  {
    num: "01",
    name: "Pavan Impex",
    slug: "pavan-impex",
    tag: "NATURAL SLATE & 3D CLADDING",
    tagColor: "#8b4513",
    tagBg: "rgba(139, 69, 19, 0.08)",
    accentLine: "linear-gradient(90deg, #8b4513 0%, #c86432 60%, transparent 100%)",
    titleColor: "#1e1614",
    cardBg: "#f6eee3",
    description:
      "Bring natural sophistication indoors and outdoors with Pavan Impex, our natural slate stone extracted directly from Markapur reserves. Ideal for timeless elevations, feature walls, and bespoke architectural detailing.",
    buttonBg: "#1e1614",
    buttonTextColor: "#ffffff",
    buttonBorderColor: "#8b4513",
    buttonShadow: "rgba(139, 69, 19, 0.25)",
    bgGradient: "linear-gradient(135deg, #1c1f24 0%, #2e343d 50%, #15171a 100%)",
  },
  {
    num: "02",
    name: "Sai Balaji Impex",
    slug: "sai-balaji-impex",
    tag: "CALCAREOUS LIMESTONE & PAVERS",
    tagColor: "#9c6800",
    tagBg: "rgba(156, 104, 0, 0.09)",
    accentLine: "linear-gradient(90deg, #9c6800 0%, #d49b27 60%, transparent 100%)",
    titleColor: "#3d2b18",
    cardBg: "#f7f1e5",
    description:
      "Engineered for luxury pool copings, alfresco entertaining terraces, and heavy-duty driveways with Sai Balaji Impex. Dense, fine-grained calcrete limestones with certified anti-skid safety, remaining comfortably cool underfoot in sun-drenched outdoor climates.",
    buttonBg: "#3d2b18",
    buttonTextColor: "#ffffff",
    buttonBorderColor: "#9c6800",
    buttonShadow: "rgba(156, 104, 0, 0.25)",
    bgGradient: "linear-gradient(135deg, #2b2823 0%, #443c33 50%, #1c1915 100%)",
  },
  {
    num: "03",
    name: "Pavan Granite",
    slug: "pavan-granite",
    tag: "PREMIUM BLACK GALAXY GRANITE",
    tagColor: "#b8860b",
    tagBg: "rgba(30, 24, 20, 0.06)",
    accentLine: "linear-gradient(90deg, #b8860b 0%, #e0b44c 60%, transparent 100%)",
    titleColor: "#141212",
    cardBg: "#f3ece0",
    description:
      "Experience the pinnacle of natural stone luxury with Pavan Granite. Featuring world-renowned Chimakurthy Black Galaxy with golden bronzite crystals, fabricated into zero-porosity jumbo gangsaw slabs, bespoke kitchen countertops, and grand staircases.",
    buttonBg: "#141212",
    buttonTextColor: "#e6c374",
    buttonBorderColor: "#b8860b",
    buttonShadow: "rgba(184, 134, 11, 0.3)",
    bgGradient: "linear-gradient(135deg, #121316 0%, #22211c 50%, #090a0c 100%)",
  },
];

// Smooth Animated Number Counter Component
function AnimatedCounter({
  target,
  duration = 2.0,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const startValue = 0;
    let animationFrameId: number;

    const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = startValue + (target - startValue) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function Products() {
  return (
    <section
      id="products"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#ffffff] text-[#241919] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        
        {/* ── UNIFIED PAVAN GROUPS ECOSYSTEM & CAPACITY CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-[#747474]/20 p-8 sm:p-12 lg:p-14 shadow-xs space-y-10 will-change-transform"
        >
          {/* Top Row: Grand Title & Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 border-b border-[#747474]/15">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#514a38] text-white shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d8c3a5] animate-pulse" />
                <span className="text-[9.5px] font-mono tracking-[0.24em] uppercase font-bold">
                  EST. 1994 · THREE OPERATING ENTITIES
                </span>
              </div>

              <h2
                className="font-display font-light leading-[0.96] tracking-[-0.02em]"
                style={{ fontSize: "clamp(48px, 6.5vw, 92px)" }}
              >
                <span className="text-[#241919]">Pavan</span>{" "}
                <span className="text-[#8b4513] italic font-normal">Groups</span>
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-end space-y-2.5 pb-1">
              <p className="text-[14px] sm:text-[14.5px] text-[#454545] font-light leading-relaxed">
                South India&apos;s premier natural stone conglomerate, extracting and processing finest Slate, Limestone, and Granite from Markapur, Cuddapah, and Chimakurthy reserves for landmark projects worldwide.
              </p>
              <div className="flex items-center gap-4 text-[10px] font-mono text-[#514a38] font-semibold uppercase tracking-wider">
                <span>● 30+ Years Extraction</span>
                <span>● 40+ Destination Ports</span>
              </div>
            </div>
          </div>

          {/* Bottom Integrated 3-Stat Animated Metric Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            
            {/* Stat 1: Annual Production Capacity */}
            <div className="flex items-start gap-4">
              <div className="w-13 h-13 rounded-full border border-[#8b6508]/30 flex items-center justify-center flex-none bg-[#fcf8f1] text-[#8b6508] p-2.5 shadow-2xs">
                <Factory className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans font-bold tracking-tight text-3xl sm:text-[38px] text-[#241919] leading-none">
                    <AnimatedCounter target={150} suffix="k+" />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#747474] uppercase tracking-wider">
                    SQM / YR
                  </span>
                </div>
                <span className="text-[10.5px] font-mono tracking-[0.16em] uppercase font-bold text-[#241919] block mt-1.5 mb-1">
                  ANNUAL CAPACITY
                </span>
                <p className="text-[12.5px] text-[#747474] font-light leading-relaxed">
                  Annual stone extraction &amp; calibration capacity across gangsaw &amp; tile facilities.
                </p>
              </div>
            </div>

            {/* Stat 2: Natural Stone Varieties */}
            <div className="flex items-start gap-4">
              <div className="w-13 h-13 rounded-full border border-[#8b6508]/30 flex items-center justify-center flex-none bg-[#fcf8f1] text-[#8b6508] p-2.5 shadow-2xs">
                <Layers className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans font-bold tracking-tight text-3xl sm:text-[38px] text-[#241919] leading-none">
                    <AnimatedCounter target={120} suffix="+" />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#747474] uppercase tracking-wider">
                    VARIETIES
                  </span>
                </div>
                <span className="text-[10.5px] font-mono tracking-[0.16em] uppercase font-bold text-[#241919] block mt-1.5 mb-1">
                  STONE VARIETIES &amp; FINISHES
                </span>
                <p className="text-[12.5px] text-[#747474] font-light leading-relaxed">
                  Authentic Slates, Calcrete Limestones, and Black Galaxy Granites.
                </p>
              </div>
            </div>

            {/* Stat 3: Operating Divisions */}
            <div className="flex items-start gap-4">
              <div className="w-13 h-13 rounded-full border border-[#8b6508]/30 flex items-center justify-center flex-none bg-[#fcf8f1] text-[#8b6508] p-2.5 shadow-2xs">
                <Building2 className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans font-bold tracking-tight text-3xl sm:text-[38px] text-[#241919] leading-none">
                    <AnimatedCounter target={3} />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#747474] uppercase tracking-wider">
                    DIVISIONS
                  </span>
                </div>
                <span className="text-[10.5px] font-mono tracking-[0.16em] uppercase font-bold text-[#241919] block mt-1.5 mb-1">
                  OPERATING ENTITIES
                </span>
                <p className="text-[12.5px] text-[#747474] font-light leading-relaxed">
                  Pavan Impex, Sai Balaji Impex, and Pavan Granite managing direct quarries.
                </p>
              </div>
            </div>

          </div>

        </motion.div>

        {/* ── 3 COMPANY SHOWCASES ── */}
        <div className="space-y-8 md:space-y-10">
          {COLLECTIONS.map((col, idx) => {
            const isReversed = idx === 1; // Alternating layout for Sai Balaji Impex

            return (
              <motion.div
                key={col.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ delay: idx * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: col.cardBg }}
                className="border border-[#747474]/15 shadow-sm overflow-hidden will-change-transform relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[380px] lg:min-h-[440px] relative z-10">
                  
                  {/* ── TEXT CONTENT COLUMN ── */}
                  <div
                    className={`md:col-span-6 lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center ${
                      isReversed ? "order-2 md:order-2" : "order-2 md:order-1"
                    }`}
                  >
                    {/* Eyebrow Pill */}
                    <div className="mb-3">
                      <span
                        style={{
                          backgroundColor: col.tagBg,
                          color: col.tagColor,
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-[0.24em] uppercase font-bold"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: col.tagColor }}
                        />
                        {col.tag}
                      </span>
                    </div>

                    {/* Company Title */}
                    <h3
                      className="font-display font-light leading-[1.02] tracking-[-0.015em] mb-3 transition-colors"
                      style={{
                        fontSize: "clamp(40px, 5vw, 62px)",
                        color: col.titleColor,
                      }}
                    >
                      {col.name}
                    </h3>

                    {/* Accent Line */}
                    <div
                      className="w-20 h-[2px] mb-5"
                      style={{ background: col.accentLine }}
                    />

                    {/* Editorial Narrative */}
                    <p className="text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#454545] font-light mb-8 max-w-lg">
                      {col.description}
                    </p>

                    {/* Distinct Action Button */}
                    <div className="pt-2">
                      <Link
                        href={`/companies/${col.slug}`}
                        style={{
                          backgroundColor: col.buttonBg,
                          color: col.buttonTextColor,
                          borderColor: col.buttonBorderColor,
                          boxShadow: `0 4px 14px ${col.buttonShadow}`,
                        }}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border"
                      >
                        <span>Explore {col.name} Catalog</span>
                        <ArrowRight className="w-4 h-4 text-[#d8c3a5]" />
                      </Link>
                    </div>

                  </div>

                  {/* ── VISUAL ART COLUMN ── */}
                  <div
                    className={`md:col-span-6 lg:col-span-7 relative min-h-[260px] md:min-h-full overflow-hidden ${
                      isReversed ? "order-1 md:order-1" : "order-1 md:order-2"
                    }`}
                    style={{ background: col.bgGradient }}
                  >
                    {/* Background Stone Texture Glow */}
                    <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />

                    {/* Center Industrial Entity Mark */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 space-y-4">
                      <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 font-mono text-sm font-bold bg-black/20 backdrop-blur-xs">
                        {col.num}
                      </span>
                      <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f7f2ea] tracking-[0.15em] uppercase font-light drop-shadow-md">
                        {col.name}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#d8c3a5] font-semibold">
                        DIRECT MINING RESERVE · MARKAPUR, AP
                      </span>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
