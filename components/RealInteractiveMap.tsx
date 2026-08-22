"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";

interface PortCoord {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  transit: string;
  cost: string;
}

const CHENNAI_ORIGIN: { name: string; lat: number; lng: number } = {
  name: "Chennai Export Port (Origin)",
  lat: 13.0827,
  lng: 80.2707,
};

const PORTS_DATA: PortCoord[] = [
  {
    id: "perth",
    name: "Perth (Fremantle Port)",
    code: "AUFRE",
    lat: -32.0569,
    lng: 115.7439,
    transit: "12–18 days",
    cost: "USD $1,200–$2,000",
  },
  {
    id: "sydney",
    name: "Sydney (Port Botany)",
    code: "AUSYD",
    lat: -33.9500,
    lng: 151.2167,
    transit: "18–22 days",
    cost: "USD $1,500–$2,500",
  },
  {
    id: "melbourne",
    name: "Melbourne (Port of Melbourne)",
    code: "AUMEL",
    lat: -37.8136,
    lng: 144.9631,
    transit: "20–25 days",
    cost: "USD $1,500–$2,500",
  },
  {
    id: "brisbane",
    name: "Brisbane (Port of Brisbane)",
    code: "AUBNE",
    lat: -27.4698,
    lng: 153.0251,
    transit: "20–25 days",
    cost: "USD $1,800–$2,800",
  },
];

// Waypoint paths via Indian Ocean / Malacca-Sunda straits to realistic shipping lanes
const SHIPPING_WAYPOINTS: Record<string, [number, number][]> = {
  perth: [
    [13.0827, 80.2707], // Chennai
    [5.8, 90.0],        // Bay of Bengal South
    [-5.0, 95.0],       // Central Indian Ocean
    [-18.0, 105.0],     // WA Approaching waters
    [-32.0569, 115.7439], // Fremantle Port
  ],
  sydney: [
    [13.0827, 80.2707], // Chennai
    [5.8, 90.0],
    [-6.0, 105.5],      // Sunda Strait
    [-20.0, 115.0],     // North-West Cape
    [-38.0, 140.0],     // Bass Strait approach
    [-33.9500, 151.2167], // Port Botany
  ],
  melbourne: [
    [13.0827, 80.2707], // Chennai
    [5.8, 90.0],
    [-6.0, 105.5],      // Sunda Strait
    [-24.0, 115.0],     // South WA
    [-37.8136, 144.9631], // Port of Melbourne
  ],
  brisbane: [
    [13.0827, 80.2707], // Chennai
    [5.8, 90.0],
    [-8.0, 115.0],      // Lombok Strait
    [-15.0, 130.0],     // Arafura Sea
    [-20.0, 150.0],     // Coral Sea
    [-27.4698, 153.0251], // Port of Brisbane
  ],
};

interface RealInteractiveMapProps {
  selectedPortId: string;
  onSelectPort: (id: string) => void;
}

export default function RealInteractiveMap({
  selectedPortId,
  onSelectPort,
}: RealInteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polylinesRef = useRef<L.Polyline[]>([]);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double-init

    // Initialize real Leaflet interactive map centered between India and Australia
    const map = L.map(mapContainerRef.current, {
      center: [-10, 115],
      zoom: 3,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: false,
      attributionControl: false,
    });

    // Add luxury architectural cartography tile layer (CartoDB Voyager)
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    // Add clean zoom control top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Custom Origin Marker (Chennai)
    const originIcon = L.divIcon({
      className: "custom-origin-marker",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div style="width: 14px; height: 14px; border-radius: 50%; background: #140d0a; border: 2.5px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
            <div style="width: 4px; height: 4px; border-radius: 50%; background: #ff443a;"></div>
          </div>
          <div style="background: #140d0a; color: #ffffff; font-family: monospace; font-size: 8px; font-weight: bold; padding: 2px 6px; border-radius: 2px; margin-top: 2px; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
            ⚓ Chennai Origin
          </div>
        </div>
      `,
      iconSize: [80, 40],
      iconAnchor: [40, 7],
    });

    L.marker([CHENNAI_ORIGIN.lat, CHENNAI_ORIGIN.lng], { icon: originIcon })
      .bindPopup(
        `<div style="font-family: sans-serif; font-size: 11px;"><strong>${CHENNAI_ORIGIN.name}</strong><br>Markapur Factory Direct Loading Terminal</div>`
      )
      .addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update polylines and markers when selectedPortId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous polylines & port markers
    polylinesRef.current.forEach((pl) => pl.remove());
    polylinesRef.current = [];
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Draw all sealanes
    PORTS_DATA.forEach((port) => {
      const isSelected = port.id === selectedPortId;
      const waypoints = SHIPPING_WAYPOINTS[port.id] || [];

      // Sealane line
      const polyline = L.polyline(waypoints, {
        color: isSelected ? "#ff443a" : "#140d0a",
        weight: isSelected ? 3.5 : 1.5,
        opacity: isSelected ? 0.95 : 0.35,
        dashArray: isSelected ? "8, 6" : "4, 6",
      }).addTo(map);

      polylinesRef.current.push(polyline);

      // Port Destination Marker
      const portIcon = L.divIcon({
        className: `custom-port-marker-${port.id}`,
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <div style="width: ${isSelected ? "18px" : "14px"}; height: ${
          isSelected ? "18px" : "14px"
        }; border-radius: 50%; background: ${
          isSelected ? "#ff443a" : "#140d0a"
        }; border: 2.5px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; transition: all 0.3s;">
              <div style="width: 4px; height: 4px; border-radius: 50%; background: #ffffff;"></div>
            </div>
            <div style="background: ${
              isSelected ? "#ff443a" : "rgba(255,255,255,0.95)"
            }; color: ${
          isSelected ? "#ffffff" : "#140d0a"
        }; font-family: monospace; font-size: 8.5px; font-weight: bold; padding: 2px 6px; border-radius: 2px; margin-top: 2px; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.2); border: 1px solid rgba(20,13,10,0.15);">
              ${port.name.split(" ")[0]} (${port.code})
            </div>
          </div>
        `,
        iconSize: [100, 44],
        iconAnchor: [50, 7],
      });

      const marker = L.marker([port.lat, port.lng], { icon: portIcon })
        .on("click", () => {
          onSelectPort(port.id);
        })
        .bindPopup(
          `<div style="font-family: sans-serif; font-size: 11.5px; padding: 2px;">
            <strong style="color: #ff443a;">${port.name}</strong><br/>
            <span>Transit: <strong>${port.transit}</strong></span><br/>
            <span>20ft FCL: <strong>${port.cost}</strong></span>
          </div>`
        )
        .addTo(map);

      markersRef.current.push(marker);
    });

    // Fly camera smoothly to fit route bounds between Chennai and Selected Port
    const activePort = PORTS_DATA.find((p) => p.id === selectedPortId);
    if (activePort) {
      const bounds = L.latLngBounds([
        [CHENNAI_ORIGIN.lat, CHENNAI_ORIGIN.lng],
        [activePort.lat, activePort.lng],
      ]);
      map.flyToBounds(bounds, {
        padding: [60, 60],
        maxZoom: 5,
        duration: 1.2,
      });
    }
  }, [selectedPortId, onSelectPort]);

  const handleResetOverview = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([-12, 115], 3, { duration: 1.2 });
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col">
      {/* Real Interactive Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[380px] sm:min-h-[420px] z-10" />

      {/* Floating Map Controls HUD */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-2">
        <button
          onClick={handleResetOverview}
          className="px-3 py-1.5 bg-white/95 backdrop-blur-md border border-[#140d0a]/20 shadow-md text-[9.5px] font-mono font-bold text-[#140d0a] hover:bg-[#ff443a] hover:text-white transition-all cursor-pointer rounded-sm"
        >
          🔄 Reset Route Overview
        </button>

        <span className="px-2.5 py-1.5 bg-[#140d0a]/90 text-white text-[9px] font-mono rounded-sm shadow-sm hidden sm:inline-block">
          🌐 Live Real Map · Drag &amp; Scroll to Zoom
        </span>
      </div>
    </div>
  );
}
