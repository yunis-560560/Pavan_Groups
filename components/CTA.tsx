"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-6 md:px-14 lg:px-20 relative overflow-hidden"
      style={{ background: "#190806" }}
    >
      {/* Glow orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 80% 50%, rgba(255,68,58,0.12) 0%, rgba(246,99,60,0.05) 45%, transparent 70%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(252,248,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(252,248,241,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-6 block">
          Start Your Project
        </span>
        <h2
          className="font-display font-light italic leading-[1.06] tracking-[-0.015em] text-[#fcf8f1] mb-8"
          style={{ fontSize: "clamp(34px,4.5vw,72px)" }}
        >
          Let&apos;s build something
          <br />
          <span style={{ color: "#ff443a" }}>extraordinary</span>
        </h2>
        <p className="text-[15px] leading-[1.8] mb-12 max-w-xl" style={{ color: "rgba(252,248,241,0.5)" }}>
          Whether you are an architect specifying materials, a developer sourcing at scale, or a
          homeowner seeking something singular — our team is here to guide you from selection
          to delivery.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:info@pavangroups.com"
            className="inline-flex items-center gap-3 px-10 py-4 text-[10px] font-medium tracking-[0.26em] uppercase text-white hover:bg-[#e83530] transition-colors duration-300"
            style={{ background: "#ff443a" }}
          >
            Request a Quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-3 px-10 py-4 border text-[10px] font-medium tracking-[0.26em] uppercase transition-all duration-300"
            style={{ borderColor: "rgba(252,248,241,0.18)", color: "rgba(252,248,241,0.65)" }}
          >
            +91 98765 43210
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap gap-8 items-center">
          {["ISO 9001:2015", "SGS Certified", "MSME Registered", "Export Excellence Award 2023"].map((b) => (
            <span key={b} className="text-[9px] tracking-[0.24em] uppercase" style={{ color: "rgba(252,248,241,0.22)" }}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
