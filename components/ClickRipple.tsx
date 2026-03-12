"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickPoint {
  id: number;
  x: number;
  y: number;
}

export default function ClickRipple() {
  const [points, setPoints] = useState<ClickPoint[]>([]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const rect = document.documentElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPoints((p) => [...p, { id: Date.now(), x, y }]);
    };
    window.addEventListener("click", handle);
    return () => window.removeEventListener("click", handle);
  }, []);

  useEffect(() => {
    if (points.length === 0) return;
    const timer = setTimeout(() => {
      setPoints((p) => p.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [points]);

  return (
    <AnimatePresence>
      {points.map(({ id, x, y }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0.6, scale: 0 }}
          animate={{ opacity: 0, scale: 2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none fixed w-8 h-8 bg-white rounded-full"
          style={{ left: x - 16, top: y - 16 }}
        />
      ))}
    </AnimatePresence>
  );
}
