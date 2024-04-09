"use client";
import Link from "next/link";

import { World } from "@/components/globe";

import { Button } from "@/components/ui/button";

export default function Home() {
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
