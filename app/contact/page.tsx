"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedStone, setSelectedStone] = useState("Absolute Black Granite");
  const [selectedFinish, setSelectedFinish] = useState("Polished Mirror");

  const faqs = [
    {
      q: "What is your Minimum Order Quantity (MOQ) for international container shipments?",
      a: "Our standard minimum export volume is one 20ft container (approx. 350–450 m² of 20mm calibrated slabs or 27 metric tonnes of raw/cut stone). For specialized bespoke projects, we support mixed-material consolidated containers with custom crating.",
    },
    {
      q: "Which international maritime ports do you operate from?",
      a: "North Indian sandstone and limestone dispatches through Mundra Port (Gujarat) and JNPT / Nhava Sheva (Mumbai). South Indian granites ship via Chennai Port and Krishnapatnam. All crates are ISPM-15 fumigated with reinforced sea-worthy steel strapping.",
    },
    {
      q: "Can architectural teams and clients inspect the quarries and processing yard in person?",
      a: "Absolutely. We host international architectural specifiers, developers, and project managers at our Rajasthan and Karnataka quarry sites. We provide local transit, guided quarry face visits, and slab dry-lay inspections.",
    },
    {
      q: "What is the standard production timeline for cut-to-size architectural orders?",
      a: "Standard gang saw slab containers dispatch in 2–3 weeks from order confirmation. Complex 5-axis CNC water-jet work, carved cornices, or curved facade panels require 3–5 weeks depending on drawing approval.",
    },
  ];

  return (
    <div className="bg-[#fcf8f1] text-[#140d0a] overflow-hidden min-h-screen">
      {/* ── Page Header ── */}
      <section className="pt-36 pb-20 md:pb-24 px-6 md:px-14 lg:px-20 border-b border-[#140d0a]/10 bg-gradient-to-b from-[#faf5ec] to-[#fcf8f1]">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-6 text-[10px] tracking-[0.28em] uppercase text-[#140d0a]/50">
            <Link href="/" className="hover:text-[#ff443a] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#ff443a] font-medium">Contact & Studio Hub</span>
          </div>

          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#ff443a]/10 border border-[#ff443a]/25 text-[#ff443a] text-[10px] tracking-[0.24em] uppercase font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a] animate-pulse" />
            <span>Direct Access to Export Desk</span>
          </div>

          <h1
            className="font-display font-light leading-[1.05] tracking-[-0.015em] mb-6 text-[#140d0a]"
            style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
          >
            Start Your Architectural
            <br />
            <span className="font-display italic text-[#ff443a]">
              Stone Consultation
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#140d0a]/75 max-w-3xl">
            Whether you are an architect preparing material submittals, a developer sourcing at container scale, or an interior designer seeking custom calibrated marble.
          </p>
        </div>
      </section>

      {/* ── Main Studio Inquiries & Configurator Grid ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 bg-white border-b border-[#140d0a]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-[#faf5ec] border border-[#140d0a]/10 shadow-sm">
            <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-2 block">
              Architectural Quotation Request
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#140d0a] mb-6">
              Project Specification Form
            </h2>

            {!formSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/60 mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Vasquez"
                      className="w-full px-4 py-3.5 bg-white border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/60 mb-2 font-medium">
                      Organization / Architectural Studio
                    </label>
                    <input
                      type="text"
                      placeholder="Studio / Developer Name"
                      className="w-full px-4 py-3.5 bg-white border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/60 mb-2 font-medium">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@architecture.com"
                      className="w-full px-4 py-3.5 bg-white border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/60 mb-2 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3.5 bg-white border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/60 mb-2 font-medium">
                      Primary Stone Interest
                    </label>
                    <select
                      value={selectedStone}
                      onChange={(e) => setSelectedStone(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                    >
                      <option value="Absolute Black Granite">Absolute Black Granite</option>
                      <option value="Black Galaxy Granite">Black Galaxy Granite</option>
                      <option value="Kota Blue Limestone">Kota Blue Limestone</option>
                      <option value="Jaisalmer Yellow Stone">Jaisalmer Yellow Stone</option>
                      <option value="Autumn Rustic Slate">Autumn Rustic Slate</option>
                      <option value="Makrana Pure White Marble">Makrana Pure White Marble</option>
                      <option value="Dholpur Sandstone">Dholpur Beige Sandstone</option>
                      <option value="Cobbles & Pavers">Basalt & Granite Cobbles</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/60 mb-2 font-medium">
                      Destination Port / City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hamburg / Singapore / Sydney"
                      className="w-full px-4 py-3.5 bg-white border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/60 mb-2 font-medium">
                    Estimated Dimensions & Volume
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide estimated square footage, required slab thickness (20mm/30mm), preferred surface finish, or project delivery schedule..."
                    className="w-full px-4 py-3.5 bg-white border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#ff443a] text-white text-[10px] tracking-[0.26em] uppercase font-medium hover:bg-[#e6352b] transition-colors border-none cursor-pointer shadow-md"
                >
                  Submit Inquiry to Export Desk
                </button>
              </form>
            ) : (
              <div className="text-center py-16 bg-white border border-[#ff443a]/40 p-8 shadow-sm">
                <span className="text-5xl text-[#ff443a] block mb-4">✓</span>
                <h3 className="font-display text-3xl font-light text-[#140d0a] mb-3">
                  Inquiry Received
                </h3>
                <p className="text-[14px] text-[#140d0a]/70 max-w-md mx-auto mb-8 leading-relaxed">
                  Our export desk is analyzing your specifications for {selectedStone}. We will provide full FOB/CIF pricing within 6 business hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-[#140d0a] text-white text-[10px] tracking-[0.2em] uppercase font-medium cursor-pointer border-none"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Right Direct Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="p-8 bg-[#faf5ec] border border-[#140d0a]/10 shadow-sm space-y-6">
              <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium block">
                Direct Channels
              </span>

              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/50 block mb-1">
                  Export Desk Hotline
                </span>
                <a
                  href="tel:+919876543210"
                  className="font-display text-2xl md:text-3xl text-[#140d0a] hover:text-[#ff443a] transition-colors block font-light"
                >
                  +91 98765 43210
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/50 block mb-1">
                  Official Email Address
                </span>
                <a
                  href="mailto:export@pavangroups.com"
                  className="text-[15px] text-[#140d0a] hover:text-[#ff443a] transition-colors block font-medium"
                >
                  export@pavangroups.com
                </a>
                <span className="text-[11px] text-[#140d0a]/50">info@pavangroups.com</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#140d0a]/50 block mb-2">
                  Instant Messaging
                </span>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-[#25D366]/20 transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Operating Facilities */}
            <div className="p-8 bg-[#faf5ec] border border-[#140d0a]/10 shadow-sm space-y-4">
              <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium block">
                Operating Facilities
              </span>

              <div>
                <h4 className="font-display text-lg font-medium text-[#140d0a]">
                  Corporate Head Office
                </h4>
                <p className="text-[12px] text-[#140d0a]/70 leading-relaxed">
                  Pavan Stones Group Complex, Industrial Stone Zone, Markapur, Andhra Pradesh 523316, India
                </p>
              </div>

              <div className="pt-2 border-t border-[#140d0a]/10">
                <h4 className="font-display text-lg font-medium text-[#140d0a]">
                  Processing Yard & Export Center
                </h4>
                <p className="text-[12px] text-[#140d0a]/70 leading-relaxed">
                  Export Stone Hub, Markapur Industrial Corridor, Andhra Pradesh, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logistics FAQ Accordion ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 bg-[#f2ece2] border-t border-[#140d0a]/10">
        <div className="max-w-3xl mb-14">
          <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-3 block">
            Common Logistics Questions
          </span>
          <h2
            className="font-display font-light text-[#140d0a] leading-[1.1]"
            style={{ fontSize: "clamp(28px, 3.5vw, 50px)" }}
          >
            Everything you need to know about
            <br />
            <em className="not-italic text-[#ff443a]">quarry supply & global shipping</em>
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="border border-[#140d0a]/10 bg-white p-6 cursor-pointer shadow-sm transition-all"
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-display text-xl font-light text-[#140d0a]">
                  {faq.q}
                </h4>
                <span className="text-xl text-[#ff443a] flex-none ml-4 font-light">
                  {activeFaq === i ? "−" : "+"}
                </span>
              </div>
              {activeFaq === i && (
                <p className="text-[14px] text-[#140d0a]/70 leading-relaxed mt-4 pt-4 border-t border-[#140d0a]/5">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
