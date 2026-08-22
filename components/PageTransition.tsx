"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Skip full curtain animation on initial page mount (let preloader handle it)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayChildren(children);
      return;
    }

    const overlay = overlayRef.current;
    const line = lineRef.current;
    const text = textRef.current;
    const content = contentRef.current;

    if (!overlay || !line || !text || !content) {
      setDisplayChildren(children);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: "none" });
        },
      });

      // Show overlay and block interactions during transition
      gsap.set(overlay, { pointerEvents: "auto" });

      // Phase 1: Slide overlay down to cover screen
      tl.to(overlay, {
        yPercent: 0,
        duration: 0.5,
        ease: "power3.inOut",
      })
        .to(
          text,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          line,
          {
            scaleX: 1,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=0.2"
        )
        // Swap route content midway
        .add(() => {
          setDisplayChildren(children);
          window.scrollTo(0, 0);
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
          }
        })
        // Phase 2: Fade text & line, slide overlay away upward
        .to(
          [text, line],
          {
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
          },
          "+=0.1"
        )
        .to(overlay, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        })
        .set(overlay, { yPercent: 100 })
        .set([line, text], { opacity: 0, scaleX: 0, y: 15 });

      // Stagger entrance of new page content
      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", clearProps: "transform" },
          "-=0.4"
        );
      }
    });

    return () => ctx.revert();
  }, [pathname, children]);

  return (
    <>
      {/* Luxury Curtain Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[999] pointer-events-none flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(145deg, #190806 0%, #2d0e0e 50%, #150605 100%)",
          transform: "translateY(100%)",
          willChange: "transform",
        }}
      >
        {/* Subtle grid pattern inside overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(252,248,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(252,248,241,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Coral ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,68,58,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div
            ref={textRef}
            className="flex flex-col items-center gap-1.5 opacity-0"
            style={{ transform: "translateY(15px)" }}
          >
            <span className="font-display text-2xl md:text-3xl font-light tracking-[0.35em] text-[#fcf8f1] uppercase">
              Pavan Groups
            </span>
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#ff443a] font-medium">
              Natural Stone Excellence
            </span>
          </div>

          <div className="w-48 h-px bg-[#fcf8f1]/15 relative overflow-hidden">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-[#ff443a] origin-left opacity-0"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>

      {/* Main Page Container */}
      <div ref={contentRef} className="w-full">
        {displayChildren}
      </div>
    </>
  );
}
