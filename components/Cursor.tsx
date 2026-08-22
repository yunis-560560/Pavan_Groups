"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: "none" });
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.45, ease: "power2.out" });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [role='button'], input, select, textarea, .cursor-hover")) {
        gsap.to(dot, { scale: 2.2, duration: 0.25 });
        gsap.to(ring, { scale: 1.6, opacity: 0.35, borderColor: "#ff443a", duration: 0.25 });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [role='button'], input, select, textarea, .cursor-hover")) {
        gsap.to(dot, { scale: 1, duration: 0.25 });
        gsap.to(ring, { scale: 1, opacity: 1, borderColor: "rgba(255, 68, 58, 0.45)", duration: 0.25 });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ transform: "translate(-50%,-50%)" }} />
      <div ref={ringRef} className="cursor-ring" style={{ transform: "translate(-50%,-50%)" }} />
    </>
  );
}
