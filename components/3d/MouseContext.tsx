"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

const MouseContext = createContext<MousePosition>({
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
});

export function MouseProvider({ children }: { children: ReactNode }) {
  const [mouse, setMouse] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
      normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
      normalizedY: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <MouseContext.Provider value={mouse}>{children}</MouseContext.Provider>
  );
}

export function useMouse() {
  return useContext(MouseContext);
}
