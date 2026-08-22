"use client";
import { motion } from "framer-motion";

const stats = [
  { num: "30+", label: "Years of Expertise", detail: "Quarrying since 1994" },
  { num: "120K", label: "Sq Ft Processing Yard", detail: "State-of-the-art facility" },
  { num: "2,400+", label: "Projects Delivered", detail: "Across residential & commercial" },
  { num: "40+", label: "Countries Served", detail: "On every continent" },
  { num: "7", label: "Active Quarry Sites", detail: "Rajasthan, Karnataka, A.P." },
  { num: "98%", label: "On-Time Delivery", detail: "Verified over 3 years" },
];

export default function Stats() {
  return (
    <section id="stats" className="py-24 md:py-32 px-6 md:px-14 lg:px-20" style={{ background: "#190806" }}>
      {/* Header */}
      <div className="max-w-xl mb-16">
        <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-4 block">
          By the Numbers
        </span>
        <h2
          className="font-display font-light leading-[1.1] tracking-[-0.01em] text-[#fcf8f1]"
          style={{ fontSize: "clamp(28px,3.2vw,50px)" }}
        >
          Scale that earns
          <br />
          <em className="not-italic text-[#ff443a]">your trust</em>
        </h2>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-px"
        style={{ background: "rgba(252,248,241,0.05)" }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-8 md:p-12 relative overflow-hidden"
            style={{ background: "#190806" }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(ellipse 80% 80% at 20% 80%, rgba(255,68,58,0.08) 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
              style={{ background: "#ff443a", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            />
            <span
              className="font-display font-light block leading-none mb-3"
              style={{ fontSize: "clamp(36px,4.5vw,68px)", color: "#ff443a" }}
            >
              {s.num}
            </span>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#fcf8f1]/70 mb-1 font-medium">{s.label}</p>
            <p className="text-[12px] text-[#fcf8f1]/30">{s.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
