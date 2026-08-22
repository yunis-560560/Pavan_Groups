"use client";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import BeginnersGuide from "@/components/BeginnersGuide";
import ShippingAustralia from "@/components/ShippingAustralia";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Products />
      <BeginnersGuide />
      <ShippingAustralia />
      <Stats />
      <Projects />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
