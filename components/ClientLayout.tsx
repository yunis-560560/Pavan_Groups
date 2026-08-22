"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Preloader rendered from frame 0 with dark pink/wine theme */}
      <Preloader />

      {/* Grain overlay */}
      <div className="grain" />

      {/* Custom cursor (desktop only, mounted client-side) */}
      {mounted && (
        <div className="hidden md:block">
          <Cursor />
        </div>
      )}

      {/* Smooth scroll & layout shell */}
      <SmoothScroll>
        <Navigation />
        <PageTransition>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
      </SmoothScroll>
    </>
  );
}
