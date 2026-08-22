"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { scrollToHash } from "@/components/SmoothScroll";

const DIVISIONS = [
  {
    name: "Pavan Impex",
    focus: "Slate & Wall Cladding",
    products: ["Black Slate Stone", "Indian Autumn Slate", "California Gold Slate", "3D Ledgers & Mosaics"],
    origin: "Markapur Quarry Basin",
  },
  {
    name: "Sai Balaji Impex",
    focus: "Limestone Products",
    products: ["Cuddapah Black Limestone", "Lime Yellow", "Lime Blue", "Pool Pavers & Stepping Stones"],
    origin: "Andhra Calcareous Belt",
  },
  {
    name: "Pavan Granite",
    focus: "Monolithic Granite",
    products: ["Black Galaxy Granite", "Mirror Slabs (8x3 ft / 9x4 ft)", "Custom Architectural Tiles"],
    origin: "Chimakurthy Magma Field",
  },
];

const NAVIGATION_COLUMNS = [
  {
    title: "Quick Navigation",
    links: [
      { label: "Products & Divisions", href: "#products" },
      { label: "Beginner's Stone Guide", href: "#guide" },
      { label: "Shipping to Australia", href: "#shipping" },
      { label: "Scale & Trust Metrics", href: "#stats" },
      { label: "Featured Projects", href: "#projects" },
    ],
  },
  {
    title: "Australian Port Desks",
    links: [
      { label: "Port of Sydney (AUSYD)", href: "#shipping" },
      { label: "Port of Melbourne (AUMEL)", href: "#shipping" },
      { label: "Port of Fremantle / Perth (AUFRE)", href: "#shipping" },
      { label: "Port of Brisbane (AUBNE)", href: "#shipping" },
      { label: "Landed Cost Estimator", href: "#shipping" },
    ],
  },
  {
    title: "Compliance & Specs",
    links: [
      { label: "ISPM-15 Certified Crating", href: "#shipping" },
      { label: "DAFF Biosecurity Protocol", href: "#shipping" },
      { label: "ECTA 0% Duty Guidance", href: "#shipping" },
      { label: "Incoterms (FOB / CIF / DDP)", href: "#shipping" },
      { label: "Request Sample Kit", href: "#contact", isContact: true },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [istTime, setIstTime] = useState("");
  const [aestTime, setAestTime] = useState("");

  // Live clocks for India HQ and Australian buyer hubs
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setAestTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Australia/Sydney",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (href: string, isContact = false) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (isContact || href === "#contact") {
      scrollToHash("#contact", 1.6);
      window.history.replaceState(null, "", "#contact");
      return;
    }

    if (href.startsWith("#")) {
      scrollToHash(href, 1.4);
      window.history.replaceState(null, "", href);
    } else {
      router.push(href);
    }
  };

  const handleScrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.history.replaceState(null, "", window.location.pathname);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-[#fcf8f1] text-[#140d0a] border-t border-[#140d0a]/10 overflow-hidden z-20">
      
      {/* Background Architectural Monogram Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center overflow-hidden">
        <span
          className="font-display uppercase tracking-widest text-[#140d0a] whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(120px, 22vw, 320px)" }}
        >
          PAVAN STONES
        </span>
      </div>

      {/* Top Banner: Global Trade Callout & Newsletter Specsheet Dispatch */}
      <div className="border-b border-[#140d0a]/10 px-6 sm:px-10 lg:px-16 py-12 md:py-16 relative z-10 bg-[#faf6ef]/60">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#140d0a]/10 text-[9px] font-mono uppercase tracking-[0.24em] text-[#ff443a] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a] animate-pulse" />
              <span>DIRECT EXPORT &amp; PROJECT SPECIFICATION DESK</span>
            </div>

            <h3
              className="font-display font-light text-[#140d0a] leading-tight"
              style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
            >
              Direct From Indian Quarries to{" "}
              <span className="italic text-[#ff443a]">Your Jobsite.</span>
            </h3>

            <p className="text-xs sm:text-[13.5px] text-[#140d0a]/70 font-light leading-relaxed">
              Order calibrated slate, anti-skid limestone pavers, and monolithic granite slabs directly with guaranteed ISPM-15 export crating and Australian port clearing.
            </p>
          </div>

          {/* Instant Specsheet Dispatch Input */}
          <div className="lg:max-w-md w-full p-6 bg-white border border-[#140d0a]/10 shadow-sm">
            <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#ff443a] font-bold block mb-1">
              REQUEST 2026 ARCHITECTURAL SPEC SHEET
            </span>
            <p className="text-[11.5px] text-[#140d0a]/70 mb-3 font-light">
              Receive container loading schedules, tolerance standards, and pricing indices.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#ff443a]/10 border border-[#ff443a] text-xs font-mono text-[#ff443a] font-semibold flex items-center gap-2">
                <span>✔ Spec Sheet &amp; Export Index dispatched to your inbox!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="architect@domain.com.au"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-[#faf6ef] border border-[#140d0a]/20 text-xs font-mono text-[#140d0a] placeholder:text-[#140d0a]/40 focus:outline-none focus:border-[#ff443a]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-[9.5px] uppercase tracking-wider font-semibold bg-[#ff443a] text-white hover:bg-[#e6352b] transition-all cursor-pointer border-none shadow-sm flex-none"
                >
                  Send Specs →
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Middle Grid: 3 Corporate Divisions Showcase */}
      <div className="border-b border-[#140d0a]/10 px-6 sm:px-10 lg:px-16 py-12 relative z-10 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <span className="text-[9.5px] font-mono uppercase tracking-[0.28em] text-[#140d0a]/50 block mb-6 font-bold">
            PAVAN STONES GROUP · 3 INTEGRATED EXPORT DIVISIONS
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIVISIONS.map((div, idx) => (
              <div
                key={div.name}
                className="p-6 bg-white border border-[#140d0a]/10 hover:border-[#ff443a]/50 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-[#ff443a]/10 text-[#ff443a] text-[9px] font-mono font-bold uppercase">
                    0{idx + 1} · {div.focus}
                  </span>
                  <span className="text-[9px] font-mono text-[#140d0a]/45 uppercase">
                    Direct Extraction
                  </span>
                </div>

                <h4 className="font-display text-xl text-[#140d0a] font-medium group-hover:text-[#ff443a] transition-colors mb-1">
                  {div.name}
                </h4>

                <span className="text-[10.5px] font-mono text-[#140d0a]/55 block mb-3">
                  Quarry Hub: {div.origin}
                </span>

                <div className="space-y-1.5 pt-2.5 border-t border-[#140d0a]/10">
                  {div.products.map((p, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 text-[11.5px] text-[#140d0a]/75 font-light">
                      <span className="text-[#ff443a] text-xs leading-none">•</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation & Telemetry Hub */}
      <div className="px-6 sm:px-10 lg:px-16 py-14 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Identity & Global Factory Telemetry (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <Link href="/" className="inline-block mb-2 group">
                <span className="font-display text-2xl tracking-[0.2em] uppercase text-[#140d0a] group-hover:text-[#ff443a] transition-colors font-medium">
                  PAVAN STONES GROUP
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#140d0a]/50 block">
                  Natural Stone Extraction &amp; Global Exports · Est. 1994
                </span>
              </Link>

              <p className="text-xs text-[#140d0a]/70 font-light leading-relaxed max-w-sm">
                Quarry owners, precision processors, and international exporters headquartered in Markapur, Andhra Pradesh, India. Shipping direct container loads to Australia, North America, and Europe.
              </p>
            </div>

            {/* Live Dual-Time Telemetry Bar */}
            <div className="p-4 bg-white border border-[#140d0a]/10 shadow-sm space-y-3">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#ff443a] font-bold block">
                LIVE LOGISTICS RADAR &amp; FACTORY STATUS
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-[#faf6ef] border border-[#140d0a]/10">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#140d0a]/55 mb-0.5">
                    <span>🇮🇳 MARKAPUR HQ</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="font-mono text-sm font-bold text-[#140d0a] block">{istTime || "18:30 IST"}</span>
                  <span className="text-[8.5px] font-mono text-emerald-600 font-medium">Processing Yard Active</span>
                </div>

                <div className="p-2.5 bg-[#faf6ef] border border-[#140d0a]/10">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#140d0a]/55 mb-0.5">
                    <span>🇦🇺 SYDNEY DESK</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="font-mono text-sm font-bold text-[#140d0a] block">{aestTime || "23:00 AEST"}</span>
                  <span className="text-[8.5px] font-mono text-[#140d0a]/60">Port Logistics Active</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-1.5 text-xs font-mono text-[#140d0a]/80">
              <div>
                <span className="text-[#ff443a] font-bold">Direct Quarry Line: </span>
                <a href="tel:+919246462600" className="hover:text-[#ff443a] transition-colors underline-offset-2">
                  +91 9246462600
                </a>
              </div>
              <div>
                <span className="text-[#ff443a] font-bold">Export Desk: </span>
                <a href="mailto:export@pavangroups.com" className="hover:text-[#ff443a] transition-colors underline-offset-2">
                  export@pavangroups.com
                </a>
              </div>
              <div>
                <span className="text-[#140d0a]/50">Dispatch Terminal: </span>
                <span>Chennai Ocean Port (INMAA)</span>
              </div>
            </div>
          </div>

          {/* Navigation Columns (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {NAVIGATION_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-4">
                <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#ff443a] font-bold block pb-2 border-b border-[#140d0a]/10">
                  {col.title}
                </span>

                <ul className="space-y-2.5 p-0 m-0 list-none text-xs">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={handleNavClick(link.href, link.isContact)}
                        className="text-[#140d0a]/70 hover:text-[#ff443a] hover:translate-x-1 transition-all duration-200 cursor-pointer border-none bg-transparent p-0 text-left block text-xs"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright, Compliance, and Smooth Back to Top */}
      <div className="border-t border-[#140d0a]/10 px-6 sm:px-10 lg:px-16 py-6 relative z-10 bg-[#f2ece2]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#140d0a]/60">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Pavan Stones Group. All Rights Reserved.</span>
            <span className="hidden sm:inline-block text-[#140d0a]/30">•</span>
            <span>Registered ISO 9001:2015 &amp; ISPM-15 Certified</span>
          </div>

          {/* Interactive Smooth Back To Top Button */}
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#140d0a]/15 text-[9.5px] uppercase tracking-wider text-[#140d0a] hover:text-white hover:bg-[#ff443a] hover:border-[#ff443a] transition-all cursor-pointer shadow-sm group"
          >
            <span>Back To Top</span>
            <span className="text-[#ff443a] group-hover:text-white group-hover:-translate-y-0.5 transition-transform duration-200">↑</span>
          </button>

        </div>
      </div>

    </footer>
  );
}
