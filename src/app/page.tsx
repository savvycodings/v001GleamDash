"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { World } from "@/components/globe";

export default function Home() {
  const globeconfig = {
    pointSize: 4,
    globeColor: "#FCE184",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#FCE184",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(106,90,205,0.7)",
    ambientLight: "#FCE184",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 100,
    arcLength: 0.09,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const data = [
    {
      order: 1,
      startLat: 1,
      startLng: 10,
      endLat: 1000,
      endLng: 2000,
      arcAlt: 8,
      color: "FCE184",
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="absolute z-0 flex flex-col items-end">
        <div className="text-24xl font-joystix font-bold text-white opacity-20">
          Gleam
        </div>
        <div className="text-sm font-bold  text-white">
          Let&apos;s be the responsible ones.
        </div>
      </div>
      <World globeConfig={globeconfig} data={data} />
      <div className="flex items-center justify-center absolute">
        <Link href="/dashboard">
          <Button variant="outline" className="z-10">
            Connect Wallet
          </Button>
        </Link>
      </div>
    </div>
  );
}
