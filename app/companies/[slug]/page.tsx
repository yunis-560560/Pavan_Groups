"use client";
import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToHash } from "@/components/SmoothScroll";

interface ProductDetail {
  id: string;
  name: string;
  colors: string[];
  description: string;
  finishes: string[];
  gradient: string;
  recommendedUse: string;
  slipRating?: string;
  heatResistance?: string;
}

interface FinishInfo {
  name: string;
  texture: string;
  reflectivity: string;
  slipRating: string;
  bestFor: string;
  icon: string;
}

interface CompanyData {
  slug: string;
  num: string;
  code: string;
  name: string;
  tagline: string;
  divisionName: string;
  speciality: string;
  established: string;
  location: string;
  coordinates: string;
  accentColor: string;
  overview: string[];
  geologyStory: {
    title: string;
    description: string;
    points: string[];
  };
  products: ProductDetail[];
  finishesGuide: FinishInfo[];
  specifications: {
    thicknessesMetric: string[];
    thicknessesImperial: string[];
    standardSizesMetric: string[];
    standardSizesImperial: string[];
    densityMetric: string;
    densityImperial: string;
    waterAbsorption: string;
    compressiveStrengthMetric: string;
    compressiveStrengthImperial: string;
    exportStandards: string;
  };
  applications: {
    title: string;
    category: string;
    desc: string;
  }[];
  packaging: {
    crateType: string;
    safetyFeatures: string[];
    capacity: string;
    avgWeightPerSqm20mm: number; // kg
  };
}

const COMPANIES_DATABASE: Record<string, CompanyData> = {
  "pavan-impex": {
    slug: "pavan-impex",
    num: "01",
    code: "PI-SLATE",
    name: "Pavan Impex",
    tagline: "Metamorphic Slate Quarries & Hand-Split Wall Cladding",
    divisionName: "Natural Stone Exports Division",
    speciality: "Slate Stones & 3D Cladding Panels",
    established: "1994",
    location: "Markapur Quarry Belt, Prakasam District, Andhra Pradesh, India",
    coordinates: "15.7362° N · 79.2713° E · MARKAPUR",
    accentColor: "#3e352a",
    overview: [
      "Pavan Impex is the flagship natural slate export arm of Pavan Stones Group. Founded in 1994 in Markapur, Andhra Pradesh, we operate dedicated slate quarries and modern stone calibration facilities.",
      "Our natural slate is quarried from dense, fine-grained metamorphic geological formations. Hand-split along natural cleavage planes by master stonecraftsmen, our slates retain organic foliation textures while maintaining precise rear calibration for effortless architectural installation.",
      "From exterior rainscreen elevations and luxury villa feature walls to pool surrounds and 3D interlocking ledger panels, Pavan Impex supplies premium natural slate to architects, developers, and stone importers across 40+ countries.",
    ],
    geologyStory: {
      title: "The Markapur Slate Formation",
      description:
        "The Markapur slate belt in Andhra Pradesh is geologically celebrated as one of India's richest metamorphic stone reserves. Formed hundreds of millions of years ago through intense regional metamorphism of clay-rich sedimentary shale, this stone boasts exceptional structural integrity, zero porosity under weathering, and natural thermal insulation.",
      points: [
        "100% ethically sourced from licensed quarry faces in Markapur.",
        "Natural foliated grain provides superior tensile resistance.",
        "Zero chemical bleaching or artificial coloring — organic mineral pigments only.",
        "Naturally fire-resistant, frost-proof, and resilient against acid rain.",
      ],
    },
    finishesGuide: [
      {
        name: "Natural Cleft",
        texture: "Organic riven tactile surface with natural stratum relief",
        reflectivity: "Low Matte (Non-Reflective)",
        slipRating: "R12 (High Grip)",
        bestFor: "Exterior Facades, Accent Elevations & Feature Walls",
        icon: "⬡",
      },
      {
        name: "Calibrated Rear",
        texture: "Precision diamond-sawn back face for uniform adhesive bonding",
        reflectivity: "Machined Standard",
        slipRating: "N/A (Bonding Surface)",
        bestFor: "Fast, uniform thin-set mortar installation",
        icon: "◈",
      },
      {
        name: "Honed",
        texture: "Smooth satin matte finish with subtle stone grain clarity",
        reflectivity: "Semi-Matte Velvet",
        slipRating: "R10 (Comfort Non-Slip)",
        bestFor: "Interior Flooring, Hallways & Bathroom Walls",
        icon: "◎",
      },
      {
        name: "Tumbled Rustic",
        texture: "Softened antiqued edges and rounded corners",
        reflectivity: "Matte Organic",
        slipRating: "R11 (Slip-Resistant)",
        bestFor: "Courtyards, Garden Verandas & Heritage Patios",
        icon: "✦",
      },
    ],
    products: [
      {
        id: "black-slate-stone",
        name: "Black Slate Stone",
        colors: ["Jet Black", "Charcoal Grey", "Deep Anthracite"],
        description:
          "The global benchmark for contemporary dark facades and feature walls. Possesses a rich natural cleft texture that catches light with subtle tonal depth.",
        finishes: ["Natural Cleft", "Calibrated Bottom", "Honed", "Tumbled"],
        gradient: "linear-gradient(135deg, #1c1f24 0%, #2a2d34 50%, #15171a 100%)",
        recommendedUse: "Exterior building elevations, modern interior feature walls, and commercial accent columns.",
        slipRating: "R12",
        heatResistance: "Class A1 Fireproof",
      },
      {
        id: "indian-autumn-slate",
        name: "Indian Autumn Slate",
        colors: ["Warm Terracotta", "Rust Copper", "Golden Sand", "Earthy Ochre"],
        description:
          "A multi-tonal, warm natural slate featuring organic swaths of iron oxide russet and copper. Delivers an authentic rustic luxury ambiance to Mediterranean and contemporary spaces.",
        finishes: ["Hand-Split", "Tumbled", "Natural Layered"],
        gradient: "linear-gradient(135deg, #5a3424 0%, #874e31 50%, #3e2417 100%)",
        recommendedUse: "Luxury villa claddings, courtyard walls, fireplace surrounds, and resort landscape entries.",
        slipRating: "R11",
        heatResistance: "Class A1 Fireproof",
      },
      {
        id: "california-gold-slate",
        name: "California Gold Slate",
        colors: ["Golden Bronze", "Earthy Ochre", "Metallic Sheen"],
        description:
          "Infused with fine mica flecks that impart a subtle golden shimmer in sunlight. Highly sought after for five-star hotel lobbies and grand residential entries.",
        finishes: ["Golden Sparkle", "Riven Surface", "Calibrated"],
        gradient: "linear-gradient(135deg, #7a5423 0%, #a47638 50%, #4f3414 100%)",
        recommendedUse: "Feature entrance portals, hotel reception backdrops, and luxury pool perimeter walls.",
        slipRating: "R11",
        heatResistance: "Class A1 Fireproof",
      },
      {
        id: "black-slate-mosaic",
        name: "Black Slate 3D Ledger Panels",
        colors: ["Charcoal Black", "Midnight", "Ash"],
        description:
          "Precision-cut multi-depth slate strips interlocking seamlessly on reinforced mesh backing. Enables rapid, glue-down installation for monumental 3D textured walls.",
        finishes: ["Interlocking Z-Shape", "Mesh Mounted", "3D Riven Relief"],
        gradient: "linear-gradient(135deg, #18191c 0%, #2e3036 40%, #121316 100%)",
        recommendedUse: "Interior TV backdrop walls, outdoor waterfall features, and boundary accent pillars.",
        slipRating: "3D Textured",
        heatResistance: "Class A1 Fireproof",
      },
    ],
    specifications: {
      thicknessesMetric: ["12mm", "15mm", "18mm", "20mm", "25mm"],
      thicknessesImperial: ["1/2 in", "5/8 in", "3/4 in", "13/16 in", "1 in"],
      standardSizesMetric: ["300 x 300 mm", "600 x 300 mm", "600 x 600 mm", "1200 x 600 mm", "150 x 600 mm (Ledger)"],
      standardSizesImperial: ["12 x 12 in", "24 x 12 in", "24 x 24 in", "48 x 24 in", "6 x 24 in (Ledger)"],
      densityMetric: "2,750 kg/m³",
      densityImperial: "171.7 lbs/ft³",
      waterAbsorption: "< 0.30% (Zero Porosity Standard)",
      compressiveStrengthMetric: "165 MPa",
      compressiveStrengthImperial: "23,930 psi",
      exportStandards: "ISO 9001:2015 Certified · Fumigated ISPM-15 Hardwood Packing",
    },
    applications: [
      {
        title: "Exterior Architectural Cladding",
        category: "Exterior Facade",
        desc: "Weatherproof rainscreens and thermal insulating outer wall facades for commercial towers and residential complexes.",
      },
      {
        title: "Interior 3D Feature Walls",
        category: "Interior Luxury",
        desc: "High-relief textured focal points for reception lobbies, living rooms, and hospitality lounges.",
      },
      {
        title: "High-Traffic Stone Flooring",
        category: "Durable Paving",
        desc: "Non-slip, durable flooring suitable for covered verandas, hallways, and courtyard promenades.",
      },
      {
        title: "Water Features & Swimming Pools",
        category: "Landscape & Water",
        desc: "Chemical-resistant, non-calcifying stone walls for infinity pools, waterfalls, and spas.",
      },
    ],
    packaging: {
      crateType: "Heavy-Duty ISPM-15 Fumigated Pine & Hardwood Crates",
      safetyFeatures: ["High-density foam separation", "Plastic water-repellent shrink wrap", "Steel band strapping"],
      capacity: "20-Foot FCL Container (Approx. 750 to 900 sqm of 15mm slate)",
      avgWeightPerSqm20mm: 55, // 55 kg per sqm for 20mm
    },
  },

  "sai-balaji-impex": {
    slug: "sai-balaji-impex",
    num: "02",
    code: "SBI-LIMESTONE",
    name: "Sai Balaji Impex",
    tagline: "Limestone Products & Precision Architectural Pavers",
    divisionName: "Limestone & Precision Paver Division",
    speciality: "Dense Calcareous Limestone & Anti-Skid Pavers",
    established: "1998",
    location: "Markapur & Cuddapah Basin, Andhra Pradesh, India",
    coordinates: "14.4752° N · 78.8260° E · CUDDAPAH",
    accentColor: "#514a38",
    overview: [
      "Sai Balaji Impex is the specialized limestone processing and architectural paving division of Pavan Stones Group. We quarry, process, and export dense calcrete limestones renowned for their anti-skid safety, structural toughness, and climatic resilience.",
      "Originating from the mineral-rich Cuddapah sedimentary formations, our limestone is naturally fine-grained and dense, remaining comfortably cool underfoot even in intense sunlight — making it the primary choice for outdoor landscaping in Australia, Europe, and the Middle East.",
      "From tumbled driveway pavers and garden stepping stones to pool copings and pedestrian promenades, Sai Balaji Impex provides end-to-end containerized solutions with tight calibration tolerances.",
    ],
    geologyStory: {
      title: "The Cuddapah Calcrete Formations",
      description:
        "The Cuddapah basin hosts some of the world's most resilient microcrystalline limestone deposits. Unlike soft chalky limestones, our stones have undergone billions of years of compression, resulting in an ultra-hard, non-porous matrix that is naturally resistant to saltwater, pool chlorine, and freeze-thaw cycles.",
      points: [
        "Micro-textured surface provides natural anti-skid grip (R11 safety rating).",
        "Low solar absorption coefficient — stays significantly cooler than concrete or granite under harsh sun.",
        "Resistant to efflorescence and chemical weathering.",
        "Ideal for saltwater pools and high-moisture exterior environments.",
      ],
    },
    finishesGuide: [
      {
        name: "Natural Non-Slip",
        texture: "Fine grain non-slip surface with subtle natural texture",
        reflectivity: "Natural Matte",
        slipRating: "R11 (Wet Area Rated)",
        bestFor: "Swimming Pool Surrounds, Patios & Alfresco Verandas",
        icon: "⬡",
      },
      {
        name: "Tumbled Antique",
        texture: "Drum-tumbled weathered edges with historic cobble charm",
        reflectivity: "Soft Matte",
        slipRating: "R11 (Slip-Resistant)",
        bestFor: "Driveways, Heritage Walkways & Courtyards",
        icon: "◈",
      },
      {
        name: "Honed Smooth",
        texture: "Silky flat matte surface with zero gloss reflections",
        reflectivity: "Satin Smooth",
        slipRating: "R10 (Pedestrian Standard)",
        bestFor: "Interior Flooring, Kitchens & Corridors",
        icon: "◎",
      },
      {
        name: "Hand-Chiseled",
        texture: "Dressed edges for rugged architectural strength",
        reflectivity: "Rustic Texture",
        slipRating: "R12 (High Grip)",
        bestFor: "Stepping Stones, Garden Curbs & Retaining Edges",
        icon: "✦",
      },
    ],
    products: [
      {
        id: "cuddapah-black-limestone",
        name: "Cuddapah Black Limestone",
        colors: ["Deep Midnight Black", "Dark Charcoal"],
        description:
          "Dense, hard-wearing black limestone with zero surface calcination. The premier choice for modern commercial outdoor flooring and pool decks.",
        finishes: ["Natural", "Honed", "Tumbled", "Flamed"],
        gradient: "linear-gradient(135deg, #1b1d20 0%, #2b2e33 50%, #111214 100%)",
        recommendedUse: "Commercial parking plazas, heavy-foot-traffic walkways, and contemporary pool surrounds.",
        slipRating: "R11 Anti-Skid",
        heatResistance: "Cool Underfoot",
      },
      {
        id: "lime-yellow-limestone",
        name: "Lime Yellow Limestone",
        colors: ["Warm Butterscotch", "Golden Beige", "Sandstone Sand"],
        description:
          "Radiates warm, sun-kissed amber tones that enhance garden paths, alfresco dining terraces, and heritage courtyards.",
        finishes: ["Brushed", "Antiqued", "Calibrated"],
        gradient: "linear-gradient(135deg, #8a733e 0%, #b39a58 50%, #5d4d27 100%)",
        recommendedUse: "Outdoor entertaining patios, garden verandas, and luxury resort pathways.",
        slipRating: "R11 Anti-Skid",
        heatResistance: "Low Solar Absorption",
      },
      {
        id: "lime-blue-limestone",
        name: "Lime Blue Limestone",
        colors: ["Cool Steel Blue", "Ash Grey", "Charcoal Blue"],
        description:
          "Distinctive cool-toned grey-blue limestone. Celebrated for modern architectural pool copings that blend harmoniously with water reflections.",
        finishes: ["Cobbled", "Calibrated Tiles", "Flamed"],
        gradient: "linear-gradient(135deg, #37424d 0%, #536374 50%, #232a31 100%)",
        recommendedUse: "Swimming pool copings, modern villa walkways, and urban public plazas.",
        slipRating: "R11 Anti-Skid",
        heatResistance: "High UV Reflectance",
      },
      {
        id: "limestone-pavers",
        name: "Architectural Limestone Pavers",
        colors: ["Multi-Tonal Earthy Greys & Browns"],
        description:
          "Thick, heavy-duty paving blocks featuring tumbled or hand-chiseled edges. Engineered to support vehicular weight while providing a historic cobblestone charm.",
        finishes: ["Tumbled Edges", "Hand-Chiseled", "Flamed Heavy Duty"],
        gradient: "linear-gradient(135deg, #444b54 0%, #616b77 50%, #2d333b 100%)",
        recommendedUse: "Vehicular driveways, hotel entrance porte-cochères, and historic street restorations.",
        slipRating: "R12 Vehicular Grade",
        heatResistance: "Heavy Load Compressive",
      },
      {
        id: "stepping-stones",
        name: "Natural Garden Stepping Stones",
        colors: ["Organic Slate-Limestone Blends"],
        description:
          "Hand-shaped organic slabs designed for lawn walkways, Zen gardens, and tranquil water crossings.",
        finishes: ["Natural Riven Top", "Hand-Dressed Edges"],
        gradient: "linear-gradient(135deg, #534c44 0%, #766d62 50%, #3a342d 100%)",
        recommendedUse: "Botanical garden paths, villa lawns, and water-crossing stepping pads.",
        slipRating: "R12 Landscape",
        heatResistance: "Weatherproof",
      },
    ],
    specifications: {
      thicknessesMetric: ["15mm", "18mm", "20mm", "25mm", "30mm", "40mm"],
      thicknessesImperial: ["5/8 in", "3/4 in", "13/16 in", "1 in", "1 3/16 in", "1 1/2 in"],
      standardSizesMetric: ["300 x 300 mm", "600 x 300 mm", "600 x 600 mm", "600 x 900 mm", "200 x 100 mm"],
      standardSizesImperial: ["12 x 12 in", "24 x 12 in", "24 x 24 in", "24 x 36 in", "8 x 4 in"],
      densityMetric: "2,650 kg/m³",
      densityImperial: "165.4 lbs/ft³",
      waterAbsorption: "< 0.40%",
      compressiveStrengthMetric: "145 MPa",
      compressiveStrengthImperial: "21,030 psi",
      exportStandards: "Tested & Certified for Australian & European Slip Resistance Standards",
    },
    applications: [
      {
        title: "Swimming Pool Coping & Decks",
        category: "Wet Area Non-Slip",
        desc: "Certified anti-skid surfaces that remain safe and cool around domestic and commercial swimming pools.",
      },
      {
        title: "Heavy-Duty Driveways & Parking",
        category: "Vehicular Load",
        desc: "High-compressive calibrated pavers capable of bearing continuous vehicle and light truck traffic.",
      },
      {
        title: "Garden Walkways & Promenades",
        category: "Pedestrian Landscaping",
        desc: "Durable stepping paths and courtyard surfaces that age gracefully with zero surface degradation.",
      },
      {
        title: "Heritage & Resort Architecture",
        category: "Hospitality & Heritage",
        desc: "Tumbled antique limestone for boutique hotels, wine estates, and heritage restorations.",
      },
    ],
    packaging: {
      crateType: "Hardwood Export Crates with Corner Reinforcements",
      safetyFeatures: ["Polyethylene sheet wrapping", "Desiccant moisture absorbers", "Heavy strapping"],
      capacity: "20-Foot FCL Container (Approx. 650 to 800 sqm of 20mm limestone)",
      avgWeightPerSqm20mm: 53, // 53 kg per sqm for 20mm
    },
  },

  "pavan-granite": {
    slug: "pavan-granite",
    num: "03",
    code: "PG-GRANITE",
    name: "Pavan Granite",
    tagline: "Precambrian Black Galaxy Granite & Monolithic Slabs",
    divisionName: "Premium Monolithic Granite Processing Division",
    speciality: "Black Galaxy & Monolithic Gangsaw Slabs",
    established: "2002",
    location: "Chimakurthy & Markapur Processing Units, Andhra Pradesh, India",
    coordinates: "15.4290° N · 79.8640° E · CHIMAKURTHY",
    accentColor: "#241919",
    overview: [
      "Pavan Granite represents the apex of natural igneous stone processing within Pavan Stones Group. Operating advanced gangsaw machinery and multi-head line polishers in Andhra Pradesh, we process the world's most sought-after Indian granites.",
      "Our signature material — Black Galaxy Granite (also known globally as Star Galaxy) — is sourced directly from Chimakurthy's renowned deposits. Characterized by a pitch-black crystalline matrix embedded with sparkling golden bronzite minerals, it remains the worldwide standard for ultra-luxury kitchen surfaces and monumental hotel lobbies.",
      "We supply high-gloss jumbo gangsaw slabs, calibrated cut-to-size floor tiles, monolithic staircases with anti-slip grooves, and bespoke CNC-fabricated countertops.",
    ],
    geologyStory: {
      title: "Chimakurthy's Precambrian Igneous Formations",
      description:
        "Formed over 1.6 billion years ago during the Proterozoic eon, Black Galaxy granite is a rare pyroxenite gabbro. Deep within the Earth's crust, slow cooling permitted the crystallisation of Enstatite and Bronzite ((Mg,Fe)SiO3) minerals, creating golden and silver metallic flakes that produce a 3D starry sky effect under ambient lighting.",
      points: [
        "Zero porosity crystal lattice — highly impervious to oil, wine, and acidic kitchen stains.",
        "Mohs hardness of 6.5 to 7.0 — virtually scratch-proof under normal cutlery use.",
        "Withstands extreme heat up to 800°C without cracking or discoloration.",
        "90+ Mirror gloss level achieved through 16-head diamond polishing lines without epoxy resin coatings.",
      ],
    },
    finishesGuide: [
      {
        name: "Mirror Diamond Polish",
        texture: "Flawless glass-smooth surface with 90+ gloss reflectivity",
        reflectivity: "90+ High Gloss Mirror",
        slipRating: "Polished Interior",
        bestFor: "Kitchen Countertops, Island Benches & Hotel Lobbies",
        icon: "✦",
      },
      {
        name: "Leathered / Satin Touch",
        texture: "Textured tactile satin finish with closed pores and soft sheen",
        reflectivity: "Silky Low Sheen",
        slipRating: "R10 (Comfort Grip)",
        bestFor: "Contemporary Kitchen Islands & Vanity Tops",
        icon: "◈",
      },
      {
        name: "Honed Matte",
        texture: "Velvety smooth non-reflective matte finish",
        reflectivity: "Ultra Matte",
        slipRating: "R10 (Pedestrian Standard)",
        bestFor: "High-Traffic Commercial Flooring & Wall Panels",
        icon: "◎",
      },
      {
        name: "Flamed / Thermal",
        texture: "High-temperature thermal shock surface with rugged crystalline texture",
        reflectivity: "Zero Reflectivity",
        slipRating: "R12 (High Grip)",
        bestFor: "Exterior Paving, Stair Treads & Public Plazas",
        icon: "⬡",
      },
    ],
    products: [
      {
        id: "black-galaxy-granite",
        name: "Black Galaxy Granite (Star Galaxy)",
        colors: ["Deep Obsidian Black with Golden Bronzite Stars"],
        description:
          "India's most iconic luxury stone. Millions of golden-copper crystals shimmer in a deep black field, creating an unmatched celestial appearance.",
        finishes: ["Mirror Polish (95+ Gloss)", "Leathered Satin", "Honed Matte"],
        gradient: "linear-gradient(135deg, #0d0e10 0%, #24221c 50%, #08090a 100%)",
        recommendedUse: "Kitchen island countertops, luxury hotel reception desks, and monumental elevator surrounds.",
        slipRating: "95+ Gloss",
        heatResistance: "800°C Heat Proof",
      },
      {
        id: "silver-sparkle-granite",
        name: "Silver Sparkle Black Granite",
        colors: ["Ebony Black with Shimmering Silver Flakes"],
        description:
          "Dense black igneous matrix peppered with shimmering silver mica flecks. Highly versatile for contemporary minimalist interiors.",
        finishes: ["High Gloss", "Honed", "Lapato"],
        gradient: "linear-gradient(135deg, #121417 0%, #282d33 50%, #0e1013 100%)",
        recommendedUse: "Bathroom vanities, commercial bar tops, and grand staircase treads.",
        slipRating: "90+ Gloss",
        heatResistance: "Zero Porosity",
      },
      {
        id: "khammam-black-granite",
        name: "Absolute Black Granite",
        colors: ["Pure Solid Jet Black"],
        description:
          "Monolithic deep black granite with zero vein variance and tight grain consistency. The global standard for sleek modern countertops and memorial architecture.",
        finishes: ["Flawless Polish", "Flamed", "Water Jet"],
        gradient: "linear-gradient(135deg, #080809 0%, #151618 50%, #050506 100%)",
        recommendedUse: "Minimalist kitchen countertops, commercial flooring, and exterior monument cladding.",
        slipRating: "Mirror Polish",
        heatResistance: "Acid & Scratch Proof",
      },
      {
        id: "custom-countertops-granite",
        name: "Bespoke Countertops & Stair Treads",
        colors: ["Custom Galaxy & Pure Black Profiles"],
        description:
          "Factory-calibrated, CNC edge-profiled kitchen islands, waterfall edges, and single-piece stair treads ready for direct installation.",
        finishes: ["Full Bullnose", "Mitred Waterfall 45°", "Ogee Edge", "Beveled"],
        gradient: "linear-gradient(135deg, #1c1a16 0%, #302a20 50%, #11100d 100%)",
        recommendedUse: "Turnkey residential kitchens, commercial bars, and monumental staircase towers.",
        slipRating: "CNC Mitred",
        heatResistance: "Fabricated Edge Profiles",
      },
    ],
    specifications: {
      thicknessesMetric: ["16mm", "18mm", "20mm", "30mm"],
      thicknessesImperial: ["5/8 in", "3/4 in", "13/16 in", "1 3/16 in"],
      standardSizesMetric: [
        "Jumbo Gangsaw Slabs: 280-340 cm x 180-210 cm",
        "Cutter Slabs: 210-270 cm x 65-95 cm",
        "Standard Tiles: 305x305, 610x305, 600x600 mm",
        "Pre-Cut Countertops: 240x65 cm, 300x90 cm",
        "Stair Treads: 120-150 cm x 33 cm with Risers",
      ],
      standardSizesImperial: [
        "Jumbo Gangsaw Slabs: 110-134 in x 70-83 in",
        "Cutter Slabs: 83-106 in x 26-37 in",
        "Standard Tiles: 12x12, 24x12, 24x24 in",
        "Pre-Cut Countertops: 95x26 in, 118x35 in",
        "Stair Treads: 48-60 in x 13 in with Risers",
      ],
      densityMetric: "2,980 kg/m³",
      densityImperial: "186.0 lbs/ft³",
      waterAbsorption: "0.08% (Virtually Zero Absorption)",
      compressiveStrengthMetric: "215 MPa",
      compressiveStrengthImperial: "31,180 psi",
      exportStandards: "ISO 9001:2015 · Slab-by-Slab Photologging & Thickness Calibration",
    },
    applications: [
      {
        title: "Kitchen Countertops & Islands",
        category: "Culinary Luxury",
        desc: "Heat-proof, scratch-proof, zero-porosity work surfaces with seamless waterfall mitres.",
      },
      {
        title: "Five-Star Hotel Lobbies & Flooring",
        category: "Prestige Spaces",
        desc: "Mirror-finish high-traffic flooring that maintains deep gloss over decades of heavy footfall.",
      },
      {
        title: "Monolithic Staircases & Portals",
        category: "Structural Elegance",
        desc: "Single-piece continuous stair steps, risers, and monumental wall portals.",
      },
      {
        title: "Luxury Bathroom Vanities",
        category: "Wet Area Luxury",
        desc: "Zero-absorption vanity slabs resistant to soaps, hot water, and cosmetic oils.",
      },
    ],
    packaging: {
      crateType: "Heavy-Duty A-Frames and Closed Hardwood Bundle Boxes",
      safetyFeatures: ["Plastic film interleafing between slabs", "Timber bracing inside container", "Rubber padding"],
      capacity: "20-Foot FCL Container (Approx. 400 to 500 sqm of 20mm slabs)",
      avgWeightPerSqm20mm: 60, // 60 kg per sqm for 20mm
    },
  },
};

export default function CompanyDedicatedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const company = COMPANIES_DATABASE[resolvedParams.slug];

  if (!company) {
    notFound();
  }

  // Interactive UI States
  const [selectedFinishIdx, setSelectedFinishIdx] = useState(0);
  const [useImperialUnits, setUseImperialUnits] = useState(false);
  const [calcArea, setCalcArea] = useState<number>(500); // 500 sqm default
  const [selectedThickness, setSelectedThickness] = useState<number>(20); // 20mm default

  const handleContactScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  // Real-time container calculation
  const totalWeightKg = Math.round(calcArea * (company.packaging.avgWeightPerSqm20mm * (selectedThickness / 20)));
  const totalWeightTons = (totalWeightKg / 1000).toFixed(2);
  const fclContainersRequired = Math.max(1, Math.ceil(totalWeightKg / 26000)); // Max ~26 tons per 20ft container

  const activeFinish = company.finishesGuide[selectedFinishIdx];

  return (
    <div className="bg-[#fcf8f1] min-h-screen text-[#241919] selection:bg-[#514a38] selection:text-white">
      
      {/* ── CINEMATIC HERO SECTION ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 md:px-12 lg:px-16 border-b border-[#747474]/20 bg-white overflow-hidden">
        {/* Subtle Ambient Watermark Numeral */}
        <div className="absolute top-12 right-6 md:right-16 font-display text-[160px] md:text-[240px] font-extralight select-none pointer-events-none leading-none opacity-5 text-[#241919] tracking-tighter">
          {company.num}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#747474] mb-8">
            <Link href="/" className="hover:text-[#241919] transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/#about-companies" className="hover:text-[#241919] transition-colors">
              COMPANIES
            </Link>
            <span>/</span>
            <span className="text-[#514a38] font-semibold uppercase">{company.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#fcf8f1] border border-[#747474]/20 shadow-xs mb-5">
                <span className="w-2 h-2 rounded-full" style={{ background: company.accentColor }} />
                <span className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-[#3e352a]">
                  DIVISION {company.code} · ESTABLISHED {company.established}
                </span>
              </div>

              <h1
                className="font-display font-light text-[#241919] leading-[1.03] tracking-[-0.015em] mb-4"
                style={{ fontSize: "clamp(36px, 4.8vw, 68px)" }}
              >
                {company.name}
                <span className="block text-xl sm:text-2xl lg:text-3xl font-sans font-normal text-[#3e352a] mt-2">
                  {company.tagline}
                </span>
              </h1>

              <div className="flex items-center gap-4 text-xs font-mono text-[#747474] uppercase tracking-wider flex-wrap">
                <span>📍 {company.location}</span>
                <span className="text-[#747474]/40">•</span>
                <span className="text-[#514a38] font-bold">{company.coordinates}</span>
              </div>
            </div>

            {/* Top Action CTAs */}
            <div className="flex flex-wrap gap-3 flex-none">
              <a
                href="#contact"
                onClick={handleContactScroll}
                className="px-6 py-4 text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-white transition-all shadow-md hover:shadow-lg"
                style={{ background: company.accentColor }}
              >
                Request Quotation & Samples →
              </a>
              <a
                href="#materials"
                className="px-6 py-4 text-[11px] font-mono uppercase tracking-[0.2em] font-semibold bg-[#fcf8f1] hover:bg-white text-[#241919] border border-[#747474]/25 shadow-xs transition-all"
              >
                Inspect Materials ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── NARRATIVE & GEOLOGICAL FORMATION MATRIX ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 border-b border-[#747474]/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Comprehensive Story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#514a38] block">
              01 · DIVISION OVERVIEW & GEOLOGICAL HERITAGE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-[#241919] leading-tight">
              Quarrying {company.speciality} with Three Decades of Craftsmanship
            </h2>

            <div className="space-y-4 text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#454545] font-light">
              {company.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Geology & Mining Card */}
          <div className="lg:col-span-5 bg-white border border-[#747474]/20 p-6 sm:p-8 shadow-sm">
            <span className="text-[9.5px] font-mono uppercase tracking-wider font-bold text-[#514a38] block mb-2">
              GEOLOGICAL STRATUM & INTEGRITY
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-[#241919] mb-3">
              {company.geologyStory.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-[#454545] font-light mb-6">
              {company.geologyStory.description}
            </p>

            <ul className="space-y-3 pt-5 border-t border-[#747474]/15">
              {company.geologyStory.points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3 text-[13px] text-[#241919]">
                  <span className="text-xs text-[#514a38] mt-0.5 flex-none font-bold">✦</span>
                  <span className="font-light leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ── INTERACTIVE FINISHES & REFLECTIVITY VISUALIZER ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-white border-b border-[#747474]/15">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#747474]/15 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#514a38] block mb-1">
                02 · SURFACE FINISH ENGINEERING
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-[#241919]">
                Interactive Surface Finish Inspector
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#747474] tracking-wider">
              Click finishes to inspect tactile friction & reflectivity
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Finish Selection Buttons (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              {company.finishesGuide.map((finish, fIdx) => {
                const isSelected = selectedFinishIdx === fIdx;
                return (
                  <button
                    key={finish.name}
                    type="button"
                    onClick={() => setSelectedFinishIdx(fIdx)}
                    className={`w-full text-left p-4.5 sm:p-5 border transition-all duration-300 cursor-pointer block ${
                      isSelected
                        ? "bg-[#241919] text-white border-[#241919] shadow-md translate-x-1"
                        : "bg-[#fcf8f1] hover:bg-white border-[#747474]/20 text-[#241919]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono opacity-80">{finish.icon}</span>
                        <h4 className="font-display text-lg font-medium leading-none">
                          {finish.name}
                        </h4>
                      </div>
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 font-bold ${
                          isSelected ? "bg-white/15 text-[#d8c3a5]" : "bg-white border border-[#747474]/20 text-[#514a38]"
                        }`}
                      >
                        {finish.slipRating}
                      </span>
                    </div>
                    <p className={`text-[12px] leading-relaxed font-light ${isSelected ? "text-white/80" : "text-[#454545]"}`}>
                      {finish.texture}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Finish Detail Inspector Card (7 Cols) */}
            <div className="lg:col-span-7 bg-[#fcf8f1] border border-[#747474]/20 p-6 sm:p-10 flex flex-col justify-between shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFinish.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#747474]/20">
                    <div>
                      <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#514a38] font-bold block mb-1">
                        ACTIVE FINISH SPECIFICATION
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#241919]">
                        {activeFinish.name} Finish Profile
                      </h3>
                    </div>
                    <span className="text-3xl text-[#514a38]">{activeFinish.icon}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-[#747474]/15">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474] block mb-1">
                        Surface Reflectivity / Gloss:
                      </span>
                      <span className="font-mono text-sm font-bold text-[#241919]">
                        {activeFinish.reflectivity}
                      </span>
                    </div>

                    <div className="p-4 bg-white border border-[#747474]/15">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474] block mb-1">
                        Friction & Slip Resistance:
                      </span>
                      <span className="font-mono text-sm font-bold text-[#514a38]">
                        {activeFinish.slipRating}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border-l-2 border-[#514a38]">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474] block font-bold mb-1">
                      Ideal Architectural Specification:
                    </span>
                    <p className="text-[13px] text-[#241919] font-normal leading-relaxed">
                      {activeFinish.bestFor}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-6 border-t border-[#747474]/15 flex items-center justify-between flex-wrap gap-3 mt-6">
                <span className="text-[10px] font-mono text-[#747474]">
                  Need custom textured sample cards shipped to your design studio?
                </span>
                <a
                  href="#contact"
                  onClick={handleContactScroll}
                  className="px-4 py-2 bg-[#241919] text-white hover:bg-[#3e352a] text-[9.5px] font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer"
                >
                  Request Finish Swatch Kit →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FULL MATERIAL VARIETIES CATALOGUE ── */}
      <section id="materials" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 border-b border-[#747474]/15">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#747474]/15 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#514a38] block mb-1">
                03 · SIGNATURE MATERIAL VARIETIES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-[#241919]">
                {company.name} Materials ({company.products.length} Varieties)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#747474] uppercase tracking-wider">
              Calibrated Quarry Extractions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {company.products.map((prod, pIdx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: pIdx * 0.08, duration: 0.4 }}
                className="bg-white border border-[#747474]/20 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-mono font-semibold text-[#747474] tracking-wider block mb-1">
                        MATERIAL 0{pIdx + 1}
                      </span>
                      <h3 className="font-display text-2xl font-medium text-[#241919]">
                        {prod.name}
                      </h3>
                    </div>
                    <div
                      className="w-12 h-12 rounded-none border border-black/20 shadow-inner flex-none"
                      style={{ background: prod.gradient }}
                    />
                  </div>

                  {/* Colors Chips */}
                  <div className="mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474] block mb-1 font-semibold">
                      Color Palette:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prod.colors.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-0.5 text-[10px] bg-[#fcf8f1] border border-[#747474]/20 text-[#241919] font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[13.5px] leading-relaxed text-[#454545] font-light mb-4">
                    {prod.description}
                  </p>

                  <div className="p-3 bg-[#fcf8f1] border-l-2 border-[#514a38] mb-5">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474] block font-semibold mb-0.5">
                      Recommended Architectural Application:
                    </span>
                    <p className="text-[12px] text-[#241919] font-medium leading-snug">
                      {prod.recommendedUse}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#747474]/15 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-wrap gap-1">
                    {prod.finishes.map((f) => (
                      <span
                        key={f}
                        className="text-[9px] font-mono uppercase px-2 py-0.5 bg-[#fcf8f1] border border-[#747474]/20 text-[#747474]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={handleContactScroll}
                    className="text-[10px] font-mono uppercase tracking-[0.16em] font-semibold hover:underline"
                    style={{ color: company.accentColor }}
                  >
                    Enquire Material →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNICAL MATRIX WITH METRIC / IMPERIAL TOGGLE ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#241919] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/15">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#d8c3a5] font-bold block mb-2">
                04 · FABRICATION BLUEPRINT & PHYSICAL STANDARDS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-white">
                {company.name} Dimensional Matrix
              </h2>
            </div>

            {/* Interactive Unit Toggle Button */}
            <div className="flex items-center gap-2 bg-white/10 p-1 border border-white/20 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setUseImperialUnits(false)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-semibold transition-all ${
                  !useImperialUnits ? "bg-white text-[#241919]" : "text-white/70 hover:text-white"
                }`}
              >
                Metric (mm / MPa)
              </button>
              <button
                type="button"
                onClick={() => setUseImperialUnits(true)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-semibold transition-all ${
                  useImperialUnits ? "bg-white text-[#241919]" : "text-white/70 hover:text-white"
                }`}
              >
                Imperial (Inches / PSI)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Box 1: Sizing & Thickness */}
            <div className="bg-white/5 border border-white/15 p-6 sm:p-7">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#d8c3a5] block mb-3 font-semibold">
                DIMENSIONS & THICKNESSES
              </span>
              
              <div className="mb-4">
                <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block mb-1.5">
                  Available Thickness Standards:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(useImperialUnits
                    ? company.specifications.thicknessesImperial
                    : company.specifications.thicknessesMetric
                  ).map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs font-mono bg-white/10 border border-white/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block mb-1.5">
                  Standard Sizing Produced:
                </span>
                <ul className="space-y-1.5 text-xs text-white/80 font-mono">
                  {(useImperialUnits
                    ? company.specifications.standardSizesImperial
                    : company.specifications.standardSizesMetric
                  ).map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Box 2: Physical Lab Properties */}
            <div className="bg-white/5 border border-white/15 p-6 sm:p-7">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#d8c3a5] block mb-3 font-semibold">
                PHYSICAL LAB PROPERTIES
              </span>
              
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[9px] font-mono text-white/50 uppercase block mb-0.5">Apparent Density:</span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {useImperialUnits ? company.specifications.densityImperial : company.specifications.densityMetric}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-white/50 uppercase block mb-0.5">Water Absorption Rate:</span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {company.specifications.waterAbsorption}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-white/50 uppercase block mb-0.5">Compressive Strength:</span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {useImperialUnits
                      ? company.specifications.compressiveStrengthImperial
                      : company.specifications.compressiveStrengthMetric}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[9px] font-mono text-white/50 uppercase block mb-0.5">Quality Standards:</span>
                  <span className="text-xs text-white/90">{company.specifications.exportStandards}</span>
                </div>
              </div>
            </div>

            {/* Box 3: Packaging & Sea Export */}
            <div className="bg-white/5 border border-white/15 p-6 sm:p-7">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#d8c3a5] block mb-3 font-semibold">
                INTERNATIONAL EXPORT CRATING
              </span>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[9px] font-mono text-white/50 uppercase block mb-0.5">Crate Architecture:</span>
                  <p className="text-white/90 text-xs leading-relaxed">{company.packaging.crateType}</p>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-white/50 uppercase block mb-1">Protection Standards:</span>
                  <ul className="space-y-1 text-white/80 font-light">
                    {company.packaging.safetyFeatures.map((f, i) => (
                      <li key={i}>✔ {f}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-[9px] font-mono text-white/50 uppercase block mb-0.5">FCL Container Capacity:</span>
                  <span className="text-xs font-mono text-[#d8c3a5]">{company.packaging.capacity}</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── LIVE INTERACTIVE CONTAINER LOAD & WEIGHT CALCULATOR ── */}
          <div className="bg-white/5 border border-white/15 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#d8c3a5] font-bold block mb-1">
                  INTERACTIVE FREIGHT & CONTAINER ESTIMATOR
                </span>
                <h4 className="font-display text-xl sm:text-2xl text-white mb-2">
                  Calculate Estimated Gross Weight & Container Requirements
                </h4>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Adjust order area and slab thickness to get real-time freight metrics for sea-freight logistics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                {/* Area Input */}
                <div className="p-3.5 bg-white/10 border border-white/20">
                  <label className="text-[9px] font-mono uppercase text-white/60 block mb-1">
                    Project Area (sq. meters):
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    step="50"
                    value={calcArea}
                    onChange={(e) => setCalcArea(Number(e.target.value) || 0)}
                    className="w-full bg-black/40 border border-white/20 text-white font-mono text-sm px-2.5 py-1 focus:outline-none focus:border-[#d8c3a5]"
                  />
                </div>

                {/* Thickness Selector */}
                <div className="p-3.5 bg-white/10 border border-white/20">
                  <label className="text-[9px] font-mono uppercase text-white/60 block mb-1">
                    Thickness:
                  </label>
                  <select
                    value={selectedThickness}
                    onChange={(e) => setSelectedThickness(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/20 text-white font-mono text-sm px-2 py-1.5 focus:outline-none focus:border-[#d8c3a5]"
                  >
                    <option value={15}>15mm</option>
                    <option value={18}>18mm</option>
                    <option value={20}>20mm</option>
                    <option value={25}>25mm</option>
                    <option value={30}>30mm</option>
                  </select>
                </div>

                {/* Estimated Output */}
                <div className="p-3.5 bg-[#d8c3a5] text-[#241919]">
                  <span className="text-[9px] font-mono uppercase text-[#241919]/70 block font-bold mb-0.5">
                    Est. Weight & Containers:
                  </span>
                  <span className="font-mono text-base font-bold block leading-tight">
                    {totalWeightTons} Tons
                  </span>
                  <span className="text-[10px] font-mono text-[#241919]/80 block mt-0.5 font-semibold">
                    ~{fclContainersRequired} x 20ft FCL Containers
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SISTER COMPANIES DEDICATED PROFILES ── */}
      <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#fcf8f1] border-t border-[#747474]/15">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#514a38] block mb-6">
            EXPLORE OTHER PAVAN GROUPS DIVISIONS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.values(COMPANIES_DATABASE)
              .filter((c) => c.slug !== company.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`/companies/${other.slug}`}
                  className="bg-white border border-[#747474]/20 hover:border-[#3e352a] p-6 sm:p-8 flex flex-col justify-between group transition-all shadow-xs hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-[#514a38]">{other.num}</span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474]">{other.divisionName}</span>
                    </div>
                    <h4 className="font-display text-2xl font-light text-[#241919] group-hover:text-[#3e352a] transition-colors mb-1">
                      {other.name}
                    </h4>
                    <p className="text-xs font-mono text-[#514a38] font-semibold mb-3">{other.speciality}</p>
                    <p className="text-xs leading-relaxed text-[#454545] font-light">{other.overview[0]}</p>
                  </div>

                  <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] font-semibold text-[#241919] group-hover:text-[#514a38] transition-colors mt-6 pt-4 border-t border-[#747474]/15">
                    <span>View Dedicated {other.name} Profile</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

    </div>
  );
}
