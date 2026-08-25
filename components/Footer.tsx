"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { scrollToHash } from "@/components/SmoothScroll";
import {
  Globe2,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

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
      { label: "Stone Ecosystem", href: "#products" },
      { label: "Explore Collections", href: "#browse" },
      { label: "Why Buy From Pavan", href: "#why-us" },
      { label: "Global Shipping Radar", href: "#shipping" },
      { label: "Beginner's Stone Guide", href: "#guide" },
      { label: "Scale & Trust Metrics", href: "#stats" },
      { label: "Featured Projects", href: "#projects" },
    ],
  },
  {
    title: "Global Export Desks",
    links: [
      { label: "🇺🇸 United States (USNYC, USLAX)", href: "#shipping" },
      { label: "🇦🇺 Australia (Sydney, Melbourne)", href: "#shipping" },
      { label: "🇦🇪 UAE & Gulf (Jebel Ali, Khalifa)", href: "#shipping" },
      { label: "🇬🇧 United Kingdom (Felixstowe)", href: "#shipping" },
      { label: "🇪🇺 Europe (Rotterdam, Hamburg)", href: "#shipping" },
      { label: "Landed Freight Cost Radar", href: "#shipping" },
    ],
  },
  {
    title: "Compliance & Specs",
    links: [
      { label: "ISPM-15 Fumigated Wooden Crates", href: "#shipping" },
      { label: "ASTM C615 & EN 1341 Standards", href: "#shipping" },
      { label: "100% Pre-Shipment Dry-Lay", href: "#shipping" },
      { label: "FOB / CIF Trade Terms", href: "#shipping" },
      { label: "Request Architectural Sample Box", href: "#contact", isContact: true },
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

  // Live clocks for India HQ and Global client hubs
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
    <footer className="relative bg-[#faf6ef] text-[#241919] border-t border-[#747474]/20 overflow-hidden z-20">
      
      {/* Background Architectural Monogram Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center overflow-hidden">
        <span
          className="font-display uppercase tracking-widest text-[#241919] whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(120px, 22vw, 320px)" }}
        >
          PAVAN GROUPS
        </span>
      </div>

      {/* Top Banner: Global Trade Callout & Newsletter Specsheet Dispatch */}
      <div className="border-b border-[#747474]/15 px-6 sm:px-10 lg:px-16 py-12 md:py-16 relative z-10 bg-[#f4ede2]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#747474]/20 text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#8b4513] shadow-xs rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b4513] animate-pulse" />
              <span className="font-bold">DIRECT EXPORT &amp; ARCHITECTURAL SPECIFICATION DESK</span>
            </div>

            <h3
              className="font-display font-light text-[#241919] leading-tight"
              style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
            >
              Direct From Indian Quarries to{" "}
              <span className="italic text-[#8b4513] font-normal">Your Global Jobsite.</span>
            </h3>

            <p className="text-xs sm:text-[14.5px] text-[#454545] font-light leading-relaxed">
              Order calibrated slate, anti-skid limestone pavers, and monolithic granite slabs directly with guaranteed ISPM-15 export crating, 100% dry-lay inspection, and turnkey container port clearing worldwide.
            </p>
          </div>

          {/* Instant Specsheet Dispatch Input */}
          <div className="lg:max-w-md w-full p-6 bg-white border border-[#747474]/20 rounded-xl shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8b4513] font-bold block mb-1">
              REQUEST 2026 ARCHITECTURAL SPEC CATALOG
            </span>
            <p className="text-[12px] text-[#454545] mb-3 font-light">
              Receive container loading schedules, tolerance standards, and FOB/CIF freight indices.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#f7f2ea] border border-[#8b4513] text-xs font-mono text-[#8b4513] font-semibold flex items-center gap-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-[#8b4513]" />
                <span>Spec Catalog &amp; Export Index dispatched to your inbox!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="architect@domain.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-[#faf6ef] border border-[#747474]/25 text-xs font-mono text-[#241919] placeholder:text-[#747474] focus:outline-none focus:border-[#8b4513] rounded-lg"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-[10px] font-mono uppercase tracking-wider font-bold bg-[#241919] hover:bg-[#3e352a] text-[#f7f2ea] transition-all cursor-pointer border-none shadow-sm rounded-lg flex-none"
                >
                  Send Specs →
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Middle Grid: 3 Corporate Divisions Showcase (Hidden on Mobile) */}
      <div className="hidden md:block border-b border-[#747474]/15 px-6 sm:px-10 lg:px-16 py-12 relative z-10 bg-white/60">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-[9.5px] font-mono uppercase tracking-[0.28em] text-[#747474] block font-bold">
            PAVAN GROUPS · 3 INTEGRATED EXPORT DIVISIONS
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIVISIONS.map((div, idx) => (
              <div
                key={div.name}
                className="p-6 bg-white border border-[#747474]/20 hover:border-[#8b4513] hover:shadow-md transition-all duration-300 rounded-xl group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-[#f7f2ea] border border-[#8b4513]/30 text-[#8b4513] text-[9.5px] font-mono font-bold uppercase rounded">
                    0{idx + 1} · {div.focus}
                  </span>
                  <span className="text-[9px] font-mono text-[#747474] uppercase">
                    Direct Extraction
                  </span>
                </div>

                <h4 className="font-display text-xl text-[#241919] font-medium group-hover:text-[#8b4513] transition-colors mb-1">
                  {div.name}
                </h4>

                <span className="text-[11px] font-mono text-[#747474] block mb-3">
                  Quarry Hub: {div.origin}
                </span>

                <div className="space-y-1.5 pt-3 border-t border-[#747474]/15">
                  {div.products.map((p, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[12px] text-[#454545] font-light">
                      <span className="text-[#8b4513] text-sm leading-none">•</span>
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
      <div className="px-6 sm:px-10 lg:px-16 py-14 md:py-16 relative z-10 bg-[#faf6ef]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Identity & Global Factory Telemetry (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <Link href="/" className="inline-block mb-2 group">
                <span className="font-display text-2xl tracking-[0.2em] uppercase text-[#241919] group-hover:text-[#8b4513] transition-colors font-medium">
                  PAVAN GROUPS
                </span>
                <span className="text-[9.5px] font-mono uppercase tracking-[0.35em] text-[#747474] block mt-0.5">
                  Natural Stone Extraction &amp; Global Exports · Est. 1994
                </span>
              </Link>

              <p className="text-xs sm:text-[13px] text-[#454545] font-light leading-relaxed max-w-sm">
                Quarry owners, precision processors, and international exporters headquartered in Markapur, Andhra Pradesh, India. Shipping direct container loads to UAE, Europe, United States, United Kingdom, and Australia.
              </p>
            </div>

            {/* Live Dual-Time Telemetry Bar */}
            <div className="p-4 bg-white border border-[#747474]/20 rounded-xl shadow-xs space-y-3">
              <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#8b4513] font-bold block">
                LIVE LOGISTICS RADAR &amp; FACTORY STATUS
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#f7f2ea] border border-[#747474]/15 rounded-lg">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#747474] mb-0.5">
                    <span>🇮🇳 MARKAPUR HQ</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="font-mono text-sm font-bold text-[#241919] block">{istTime || "18:30 IST"}</span>
                  <span className="text-[8.5px] font-mono text-emerald-700 font-medium">Processing Plants Active</span>
                </div>

                <div className="p-3 bg-[#f7f2ea] border border-[#747474]/15 rounded-lg">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#747474] mb-0.5">
                    <span>🇦🇺 SYDNEY DESK</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="font-mono text-sm font-bold text-[#241919] block">{aestTime || "23:00 AEST"}</span>
                  <span className="text-[8.5px] font-mono text-[#747474]">Port Logistics Active</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-xs font-mono text-[#241919]">
              <div className="flex items-center gap-2">
                <span className="text-[#8b4513] font-bold">Direct Quarry Line:</span>
                <a href="tel:+919246462600" className="text-[#241919] hover:text-[#8b4513] hover:underline underline-offset-2">
                  +91 9246462600
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#8b4513] font-bold">Export Desk:</span>
                <a href="mailto:export@pavangroups.com" className="text-[#241919] hover:text-[#8b4513] hover:underline underline-offset-2">
                  export@pavangroups.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#747474]">
                <span>Dispatch Ocean Port:</span>
                <span className="text-[#241919] font-medium">Chennai Port (INMAA) &amp; Krishnapatnam</span>
              </div>
            </div>
          </div>

          {/* Navigation Columns (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {NAVIGATION_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8b4513] font-bold block pb-2 border-b border-[#747474]/20">
                  {col.title}
                </span>

                <ul className="space-y-2.5 p-0 m-0 list-none text-xs">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={handleNavClick(link.href, link.isContact)}
                        className="text-[#454545] hover:text-[#8b4513] hover:translate-x-1 transition-all duration-200 cursor-pointer border-none bg-transparent p-0 text-left block text-xs"
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
      <div className="border-t border-[#747474]/15 px-6 sm:px-10 lg:px-16 py-6 relative z-10 bg-[#f0e8dc]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#747474]">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-[#241919] font-medium">© {new Date().getFullYear()} Pavan Groups. All Rights Reserved.</span>
            <span className="hidden sm:inline-block text-[#747474]/40">•</span>
            <span>Registered ISO 9001:2015 &amp; ISPM-15 Biosecurity Certified</span>
          </div>

          {/* Interactive Smooth Back To Top Button */}
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#747474]/20 text-[10px] font-mono uppercase tracking-wider text-[#241919] hover:text-white hover:bg-[#241919] transition-all cursor-pointer shadow-2xs rounded group"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-3 h-3 text-[#8b4513] group-hover:text-white group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>

        </div>
      </div>

    </footer>
  );
}
