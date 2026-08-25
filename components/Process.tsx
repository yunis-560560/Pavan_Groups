"use client";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Geological Sourcing",
    desc: "Our geologists evaluate each quarry for mineralogical composition, vein consistency, and structural integrity before a single block is extracted.",
  },
  {
    num: "02",
    title: "Quarry Extraction",
    desc: "Diamond-wire saws cut large benches with minimal vibration, preserving the stone's natural crystalline structure and reducing wastage below 12%.",
  },
  {
    num: "03",
    title: "Precision Processing",
    desc: "CNC bridge-saws, edge-polishers, and calibration lines work to ±0.5mm tolerances. Every batch sample-tested before dispatch.",
  },
  {
    num: "04",
    title: "Quality Certification",
    desc: "Third-party lab testing for flexural strength, water absorption, and slip resistance. ISO 9001:2015 documentation issued with every shipment.",
  },
  {
    num: "05",
    title: "Global Logistics",
    desc: "Full and partial containers. Fumigated crates, sea-worthy strapping, GPS tracking. Our team handles customs documentation end-to-end.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ background: "#190806" }}>
      {/* Header */}
      <div className="max-w-xl mb-20">
        <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-4 block">
          Our Process
        </span>
        <h2
          className="font-display font-light leading-[1.1] tracking-[-0.01em] text-[#fcf8f1]"
          style={{ fontSize: "clamp(28px,3.2vw,50px)" }}
        >
          From quarry face
          <br />
          <em className="not-italic text-[#ff443a]">to your site</em>
        </h2>
      </div>

      {/* Steps */}
      <div className="space-y-0 border-t" style={{ borderColor: "rgba(252,248,241,0.06)" }}>
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 py-8 border-b items-start cursor-default"
            style={{ borderColor: "rgba(252,248,241,0.06)" }}
          >
            {/* Num */}
            <span
              className="font-display text-4xl md:text-5xl font-light group-hover:text-[#ff443a] transition-colors duration-300 tabular-nums pt-1"
              style={{ color: "rgba(255,68,58,0.25)" }}
            >
              {s.num}
            </span>

            {/* Title */}
            <h4 className="font-display font-light text-xl md:text-2xl text-[#fcf8f1] group-hover:text-[#ff443a] transition-colors duration-500 leading-tight mt-1">
              {s.title}
            </h4>

            {/* Desc */}
            <p className="text-[13px] leading-relaxed col-span-2 md:col-span-1 md:mt-1" style={{ color: "rgba(252,248,241,0.45)" }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
