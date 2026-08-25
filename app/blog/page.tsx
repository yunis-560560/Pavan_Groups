"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type BlogPost = {
  id: string;
  title: string;
  category: "Architecture" | "Quarrying" | "Material Guides" | "Sustainability" | "Technical";
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  accent: string;
  excerpt: string;
  content: string;
};

const blogPosts: BlogPost[] = [
  {
    id: "granite-vs-quartz",
    title: "Natural Granite vs. Engineered Quartz: The 50-Year Architectural Perspective",
    category: "Material Guides",
    date: "August 2024",
    readTime: "6 min read",
    author: "Dr. Vikramaditya Seth",
    authorRole: "Chief Geologist",
    accent: "#ff443a",
    excerpt: "Why natural igneous stone outlasts resin-bonded synthetics in high-UV exterior applications, thermal cycling, and high-footfall commercial plazas.",
    content: "Engineered quartz surfaces have gained residential popularity, but commercial architects understand that polymer resin binders degrade under solar UV radiation and high ambient temperatures. In contrast, Precambrian natural granites like Absolute Black have resisted millions of years of tectonic pressure, providing permanent thermal stability and scratch resistance that no synthetic resin matrix can replicate.",
  },
  {
    id: "diamond-wire-sawing",
    title: "Inside the Quarry: The Science of Diamond-Wire Block Extraction",
    category: "Quarrying",
    date: "July 2024",
    readTime: "8 min read",
    author: "Pavan R. Choudhary",
    authorRole: "Managing Director",
    accent: "#d94e34",
    excerpt: "How transitioning from explosive blasting to continuous diamond wire looping reduced quarry micro-fissuring by 94% and increased usable slab yield.",
    content: "Traditional quarrying relied on explosive disruption, which created hidden micro-fractures inside the stone block that would only appear during final polishing. By utilizing diamond-impregnated steel wire saws running under constant high-pressure water coolant, we slice monolithic 30-tonne benches with millimeter precision, guaranteeing intact structural crystal lattices for every slab.",
  },
  {
    id: "limestone-coastal-architecture",
    title: "Specifying Limestone for Coastal & Marine Environments",
    category: "Architecture",
    date: "June 2024",
    readTime: "5 min read",
    author: "Ananya P. Choudhary",
    authorRole: "Director of International Projects",
    accent: "#b37d36",
    excerpt: "A deep dive into water absorption rates, salt crystallization resistance, and the optimal honed finishes for seaside resorts and infinity pools.",
    content: "Designing for marine environments requires careful mineral evaluation. Salt spray can penetrate high-porosity stones and crystallize, exerting internal pressure. Our Kota Blue Limestone and select compact sandstones exhibit exceptionally low water absorption (<0.4%), making them impervious to salt exfoliation and tropical humidity when sealed with breathable penetrating siloxanes.",
  },
  {
    id: "closed-loop-water-recycling",
    title: "Zero-Waste Stonework: Closed-Loop Water Recycling in Industrial Stone Fabrication",
    category: "Sustainability",
    date: "May 2024",
    readTime: "7 min read",
    author: "Karan Verma",
    authorRole: "Plant Operations Lead",
    accent: "#c25e00",
    excerpt: "Discover the multi-chamber filter press technology allowing our 120,000 sq ft facility to reuse 88% of daily processing water while converting stone slurry into eco-bricks.",
    content: "Cutting stone generates fine mineral slurry. Rather than discharging this into local waterways, our centralized settling silos separate clear water from calcium and silica fines. The recovered water is returned to our diamond saws, while the dried filter cakes are supplied to local construction manufacturers as raw material for interlocking paving bricks.",
  },
  {
    id: "astm-stone-standards",
    title: "Understanding ASTM C615 & C503: The International Stone Specifier's Guide",
    category: "Technical",
    date: "April 2024",
    readTime: "9 min read",
    author: "Dr. Vikramaditya Seth",
    authorRole: "Chief Geologist",
    accent: "#ff443a",
    excerpt: "Demystifying compressive strength, flexural rigidity, modulus of rupture, and abrasion resistance numbers on international stone test certificates.",
    content: "When architects review supplier submittals, understanding ASTM C615 (Standard Specification for Granite Dimension Stone) is crucial. We break down the required minimums (131 MPa compressive strength, 11 MPa flexural strength) and explain how Pavan Groups tests exceed international building code requirements by over 40%.",
  },
];

const categories = ["All Insights", "Material Guides", "Quarrying", "Architecture", "Sustainability", "Technical"];

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState("All Insights");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const router = useRouter();

  const filteredPosts = useMemo(() => {
    if (selectedCat === "All Insights") return blogPosts;
    return blogPosts.filter((p) => p.category === selectedCat);
  }, [selectedCat]);

  const handleContactClick = () => {
    router.push("/#contact");
  };

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
            <span className="text-[#ff443a] font-medium">The Stone Journal</span>
          </div>

          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#ff443a]/10 border border-[#ff443a]/25 text-[#ff443a] text-[10px] tracking-[0.24em] uppercase font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff443a] animate-pulse" />
            <span>Architectural White Papers & Quarry Insights</span>
          </div>

          <h1
            className="font-display font-light leading-[1.05] tracking-[-0.015em] mb-6 text-[#140d0a]"
            style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
          >
            Geological Insights &
            <br />
            <span className="font-display italic text-[#ff443a]">
              Architectural Specifications
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#140d0a]/75 max-w-3xl">
            Authored by our senior petrologists, quarry operators, and international project directors. Discover the technical sciences behind lasting natural stone.
          </p>
        </div>
      </section>

      {/* ── Featured Cover Story (Magazine Hero) ── */}
      <section className="py-16 px-6 md:px-14 lg:px-20 bg-[#f2ece2] border-b border-[#140d0a]/10">
        <div
          onClick={() => setActiveArticle(blogPosts[0])}
          className="p-8 md:p-14 bg-white border border-[#140d0a]/10 shadow-md cursor-pointer group hover:border-[#ff443a]/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[10px] tracking-[0.24em] uppercase px-3 py-1 bg-[#ff443a] text-white font-medium">
                Lead White Paper
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#140d0a]/50">
                {blogPosts[0].date} · {blogPosts[0].readTime}
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-light text-[#140d0a] group-hover:text-[#ff443a] transition-colors duration-300 mb-4 leading-tight">
              {blogPosts[0].title}
            </h2>

            <p className="text-[15px] leading-relaxed text-[#140d0a]/75 mb-6 max-w-2xl">
              {blogPosts[0].excerpt}
            </p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ff443a]/15 text-[#ff443a] flex items-center justify-center font-display font-medium text-sm">
                V
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#140d0a]">{blogPosts[0].author}</p>
                <p className="text-[10px] text-[#140d0a]/50">{blogPosts[0].authorRole}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 bg-[#faf5ec] border border-[#140d0a]/10 flex flex-col justify-between h-full">
            <div>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#140d0a]/40 block mb-1">
                Category
              </span>
              <span className="font-display text-2xl text-[#140d0a] font-light block mb-4">
                {blogPosts[0].category}
              </span>
            </div>
            <span className="text-[10px] tracking-[0.22em] uppercase font-medium text-[#140d0a] flex items-center gap-2 group-hover:text-[#ff443a]">
              <span>Read Full White Paper</span>
              <span>→</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <section className="py-12 px-6 md:px-14 lg:px-20 bg-white border-b border-[#140d0a]/10 sticky top-[72px] z-30 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-200 border cursor-pointer ${
                selectedCat === cat
                  ? "bg-[#ff443a] text-white border-[#ff443a]"
                  : "bg-[#fcf8f1] text-[#140d0a]/70 border-[#140d0a]/10 hover:border-[#ff443a]/40 hover:text-[#140d0a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Editorial Journal Grid ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 bg-[#fcf8f1]">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActiveArticle(post)}
                className="bg-white border border-[#140d0a]/10 p-8 md:p-10 shadow-sm hover:border-[#ff443a]/50 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] tracking-[0.24em] uppercase px-2.5 py-1 bg-[#fcf8f1] border border-[#140d0a]/10 text-[#ff443a] font-medium">
                      {post.category}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-[#140d0a]/40">
                      {post.date} · {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-light text-[#140d0a] group-hover:text-[#ff443a] transition-colors duration-300 mb-3 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-[13px] leading-relaxed text-[#140d0a]/70 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#140d0a]/10 pt-4 mt-auto">
                  <span className="text-[11px] text-[#140d0a]/50">By {post.author}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#ff443a] font-medium">
                    Read Article →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Newsletter Subscription Bar ── */}
      <section className="py-20 px-6 md:px-14 lg:px-20 bg-[#faf5ec] border-t border-[#140d0a]/10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-3 block">
            Stay Updated
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-[#140d0a] mb-4">
            Receive The Architectural Stone Quarterly
          </h2>
          <p className="text-[14px] text-[#140d0a]/65 mb-8 leading-relaxed">
            Curated technical data sheets, international quarry reports, and stone specification trends delivered directly to your inbox.
          </p>

          {!subscribed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your work email address"
                className="px-5 py-3.5 bg-white border border-[#140d0a]/15 text-[#140d0a] text-[13px] focus:outline-none focus:border-[#ff443a] flex-1 shadow-sm"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#ff443a] text-white text-[10px] tracking-[0.24em] uppercase font-medium hover:bg-[#e6352b] transition-colors border-none cursor-pointer shadow-md"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="p-4 bg-white border border-[#ff443a]/30 inline-block shadow-sm">
              <span className="text-[13px] text-[#ff443a] font-medium">
                ✓ Thank you for subscribing to Pavan Groups Architectural Journal.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── Article Reader Modal ── */}
      {activeArticle && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#140d0a]/20 p-8 md:p-12 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 text-[#140d0a]/40 hover:text-[#140d0a] bg-transparent border-none text-2xl cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[9px] tracking-[0.32em] uppercase text-[#ff443a] font-medium mb-2 block">
              {activeArticle.category} · {activeArticle.readTime}
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-light text-[#140d0a] mb-4 leading-tight">
              {activeArticle.title}
            </h2>

            <div className="flex items-center gap-3 border-b border-[#140d0a]/10 pb-6 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#ff443a]/15 text-[#ff443a] flex items-center justify-center font-display font-medium">
                {activeArticle.author[0]}
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#140d0a]">{activeArticle.author}</p>
                <p className="text-[10px] text-[#140d0a]/50">{activeArticle.authorRole} · {activeArticle.date}</p>
              </div>
            </div>

            <div className="text-[15px] text-[#140d0a]/80 leading-[1.8] space-y-4 mb-8">
              <p className="font-display text-xl text-[#140d0a] italic leading-relaxed">
                "{activeArticle.excerpt}"
              </p>
              <p>{activeArticle.content}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-[#140d0a]/10 pt-6">
              <button
                onClick={() => {
                  setActiveArticle(null);
                  handleContactClick();
                }}
                className="px-8 py-3.5 bg-[#ff443a] text-white text-[10px] tracking-[0.24em] uppercase font-medium hover:bg-[#e6352b] transition-colors border-none cursor-pointer shadow-md"
              >
                Discuss Material Specifications
              </button>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-3.5 border border-[#140d0a]/20 text-[#140d0a]/70 text-[10px] tracking-[0.2em] uppercase font-medium bg-transparent hover:text-[#140d0a] cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
