"use client";

import dynamic from "next/dynamic";
import { MouseProvider } from "./MouseContext";
import { ReactNode, Suspense } from "react";

const SpaceBackground = dynamic(() => import("./SpaceBackground"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-black" />
  ),
});

const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
});

const FloatingElements = dynamic(() => import("./FloatingElements"), {
  ssr: false,
});

export default function Scene3DWrapper({ children }: { children: ReactNode }) {
  return (
    <MouseProvider>
      <div className="relative min-h-screen">
        {/* Three.js space background */}
        <Suspense fallback={<div className="fixed inset-0 z-0 bg-black" />}>
          <SpaceBackground />
        </Suspense>

        {/* Canvas particle effects (click explosions, mouse trail, ambient particles) */}
        <ParticleField />

        {/* Floating emoji/code elements with parallax */}
        <FloatingElements />

        {/* Main content */}
        <div className="relative z-10">{children}</div>
      </div>
    </MouseProvider>
  );
}
