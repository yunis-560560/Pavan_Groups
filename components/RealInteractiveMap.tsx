"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import {
  GLOBAL_PORTS_DATA,
  CHENNAI_ORIGIN,
  PortCoord,
} from "@/lib/portsData";

// Waypoint paths via realistic international nautical sealanes
const GLOBAL_SHIPPING_WAYPOINTS: Record<string, [number, number][]> = {
  // Australia
  perth: [
    [13.0827, 80.2707],
    [5.8, 90.0],
    [-5.0, 95.0],
    [-18.0, 105.0],
    [-32.0569, 115.7439],
  ],
  sydney: [
    [13.0827, 80.2707],
    [5.8, 90.0],
    [-6.0, 105.5],
    [-20.0, 115.0],
    [-38.0, 140.0],
    [-33.9500, 151.2167],
  ],
  melbourne: [
    [13.0827, 80.2707],
    [5.8, 90.0],
    [-6.0, 105.5],
    [-24.0, 115.0],
    [-37.8136, 144.9631],
  ],
  brisbane: [
    [13.0827, 80.2707],
    [5.8, 90.0],
    [-8.0, 115.0],
    [-15.0, 130.0],
    [-20.0, 150.0],
    [-27.4698, 153.0251],
  ],

  // UAE
  dubai: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [15.0, 68.0],
    [23.5, 59.5],
    [26.0, 56.5],
    [25.0113, 55.0612],
  ],
  abudhabi: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [15.0, 68.0],
    [23.5, 59.5],
    [26.0, 56.5],
    [24.8860, 54.6730],
  ],

  // UK & Europe via Suez Canal
  felixstowe: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [12.0, 50.0],
    [12.5, 43.5],
    [22.0, 38.0],
    [30.0, 32.5],
    [34.0, 25.0],
    [36.0, -5.5],
    [48.0, -6.0],
    [51.9617, 1.3513],
  ],
  southampton: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [12.0, 50.0],
    [12.5, 43.5],
    [22.0, 38.0],
    [30.0, 32.5],
    [34.0, 25.0],
    [36.0, -5.5],
    [49.5, -3.0],
    [50.9097, -1.4044],
  ],
  rotterdam: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [12.0, 50.0],
    [12.5, 43.5],
    [22.0, 38.0],
    [30.0, 32.5],
    [34.0, 25.0],
    [36.0, -5.5],
    [48.0, -5.0],
    [51.9244, 4.4777],
  ],
  hamburg: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [12.0, 50.0],
    [12.5, 43.5],
    [22.0, 38.0],
    [30.0, 32.5],
    [34.0, 25.0],
    [36.0, -5.5],
    [51.0, 2.0],
    [53.5511, 9.9937],
  ],
  genoa: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [12.0, 50.0],
    [12.5, 43.5],
    [22.0, 38.0],
    [30.0, 32.5],
    [35.0, 20.0],
    [40.0, 12.0],
    [44.4056, 8.9463],
  ],

  // USA
  newyork: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [12.0, 50.0],
    [12.5, 43.5],
    [22.0, 38.0],
    [30.0, 32.5],
    [36.0, -5.5],
    [38.0, -40.0],
    [40.7128, -74.0060],
  ],
  savannah: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [12.0, 50.0],
    [12.5, 43.5],
    [22.0, 38.0],
    [30.0, 32.5],
    [36.0, -5.5],
    [32.0, -45.0],
    [32.0809, -81.0912],
  ],
  houston: [
    [13.0827, 80.2707],
    [7.5, 77.0],
    [12.0, 50.0],
    [12.5, 43.5],
    [22.0, 38.0],
    [30.0, 32.5],
    [36.0, -5.5],
    [25.0, -60.0],
    [23.0, -85.0],
    [29.7604, -95.3698],
  ],
  losangeles: [
    [13.0827, 80.2707],
    [5.8, 90.0],
    [3.0, 100.0],
    [12.0, 115.0],
    [22.0, 130.0],
    [30.0, 170.0],
    [33.7701, -118.1937],
  ],
};

interface RealInteractiveMapProps {
  selectedPortId: string;
  onSelectPort: (id: string) => void;
  filteredPorts: PortCoord[];
}

export default function RealInteractiveMap({
  selectedPortId,
  onSelectPort,
  filteredPorts,
}: RealInteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polylinesRef = useRef<L.Polyline[]>([]);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize real Leaflet interactive map centered on international trade routes
    const map = L.map(mapContainerRef.current, {
      center: [22, 50],
      zoom: 3,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: false,
      attributionControl: false,
    });

    // CartoDB Positron / Light luxury clean tile layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    // Zoom control in bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Origin Marker (Chennai Port) with pulsating glow
    const originIcon = L.divIcon({
      className: "origin-pulse-marker",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div style="position: relative; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: rgba(139, 69, 19, 0.35); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="width: 14px; height: 14px; border-radius: 50%; background: #241919; border: 2.5px solid #d8c3a5; box-shadow: 0 4px 10px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
              <div style="width: 4px; height: 4px; border-radius: 50%; background: #ffffff;"></div>
            </div>
          </div>
          <div style="background: #241919; color: #f7f2ea; font-family: monospace; font-size: 9px; font-weight: 700; padding: 2.5px 8px; border-radius: 4px; margin-top: 3px; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.25); border: 1px solid #d8c3a5;">
            ⚓ CHENNAI ORIGIN (INMAA)
          </div>
        </div>
      `,
      iconSize: [140, 48],
      iconAnchor: [70, 11],
    });

    L.marker([CHENNAI_ORIGIN.lat, CHENNAI_ORIGIN.lng], { icon: originIcon })
      .bindPopup(
        `<div style="font-family: sans-serif; font-size: 12px; padding: 2px;">
          <strong style="color: #8b4513;">${CHENNAI_ORIGIN.name}</strong><br/>
          <span>Pavan Groups Central Ocean Dispatch Terminal</span>
        </div>`
      )
      .addTo(map);

    mapInstanceRef.current = map;

    // Recalculate dimensions to avoid blank tiles
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update polylines and markers whenever selectedPortId or filteredPorts change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.invalidateSize();

    // Clear previous polylines & markers
    polylinesRef.current.forEach((pl) => pl.remove());
    polylinesRef.current = [];
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Render sealanes and markers
    filteredPorts.forEach((port) => {
      const isSelected = port.id === selectedPortId;
      const waypoints = GLOBAL_SHIPPING_WAYPOINTS[port.id] || [];

      // Draw polyline for sealane
      const polyline = L.polyline(waypoints, {
        color: isSelected ? "#8b4513" : "#747474",
        weight: isSelected ? 3.5 : 1.2,
        opacity: isSelected ? 0.95 : 0.25,
        dashArray: isSelected ? "6, 6" : "3, 6",
      }).addTo(map);

      polylinesRef.current.push(polyline);

      // Clean, elegant marker: Only the ACTIVE port shows an expanded floating card
      const markerHtml = isSelected
        ? `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; z-index: 50;">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: #8b4513; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(139,69,19,0.5); display: flex; align-items: center; justify-content: center; transform: scale(1.1); transition: all 0.3s;">
              <div style="width: 5px; height: 5px; border-radius: 50%; background: #ffffff;"></div>
            </div>
            <div style="background: #241919; color: #f7f2ea; font-family: sans-serif; font-size: 10px; font-weight: 700; padding: 4px 9px; border-radius: 6px; margin-top: 4px; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.3); border: 1.5px solid #d8c3a5; display: flex; align-items: center; gap: 4px;">
              <span>● ${port.name.split(" ")[0]}</span>
              <span style="color: #d8c3a5; font-family: monospace; font-size: 9px;">(${port.code})</span>
            </div>
          </div>
        `
        : `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s;" onmouseenter="this.style.transform='scale(1.25)'" onmouseleave="this.style.transform='scale(1)'">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #241919; border: 2px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
              <div style="width: 3px; height: 3px; border-radius: 50%; background: #d8c3a5;"></div>
            </div>
          </div>
        `;

      const portIcon = L.divIcon({
        className: `custom-marker-${port.id}`,
        html: markerHtml,
        iconSize: isSelected ? [140, 52] : [24, 24],
        iconAnchor: isSelected ? [70, 10] : [12, 12],
      });

      const marker = L.marker([port.lat, port.lng], { icon: portIcon })
        .on("click", () => {
          onSelectPort(port.id);
        })
        .bindTooltip(
          `<strong>${port.name}</strong><br/><span style="font-size:10px; color:#8b4513;">${port.transit} · ${port.cost20ft}</span>`,
          { direction: "top", offset: [0, -10] }
        )
        .addTo(map);

      markersRef.current.push(marker);
    });

    // Smoothly fly camera to fit bounds of selected route
    const activePort = GLOBAL_PORTS_DATA.find((p) => p.id === selectedPortId);
    if (activePort) {
      const bounds = L.latLngBounds([
        [CHENNAI_ORIGIN.lat, CHENNAI_ORIGIN.lng],
        [activePort.lat, activePort.lng],
      ]);
      map.flyToBounds(bounds, {
        padding: [80, 80],
        maxZoom: 5,
        duration: 1.2,
      });
    }
  }, [selectedPortId, onSelectPort, filteredPorts]);

  const handleResetOverview = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([22, 50], 3, { duration: 1.2 });
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col">
      {/* Map DOM Element attached absolutely to fill 100% of container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10" />

      {/* Floating Map Controls HUD */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={handleResetOverview}
          className="px-3.5 py-2 bg-white/95 backdrop-blur-md border border-[#747474]/20 shadow-md text-[10px] font-mono font-bold text-[#241919] hover:bg-[#241919] hover:text-white transition-all cursor-pointer rounded"
        >
          🔄 Global View
        </button>

        <span className="px-3 py-2 bg-[#241919]/90 text-white text-[10px] font-mono rounded shadow-sm hidden sm:inline-block">
          Click any destination node to view sealane
        </span>
      </div>
    </div>
  );
}
