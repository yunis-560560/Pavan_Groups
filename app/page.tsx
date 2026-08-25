import Hero from "@/components/Hero";
import Products from "@/components/Products";
import BrowseTilesBy from "@/components/BrowseTilesBy";
import WhyChooseUs from "@/components/WhyChooseUs";
import BeginnersGuide from "@/components/BeginnersGuide";
import ShippingAustralia from "@/components/ShippingAustralia";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <BrowseTilesBy />
      <WhyChooseUs />
      <ShippingAustralia />
      <BeginnersGuide />
      <Stats />
      <CTA />
    </>
  );
}
