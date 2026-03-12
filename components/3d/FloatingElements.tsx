"use client";

import { motion } from "framer-motion";
import { useMouse } from "./MouseContext";

const floatingItems = [
  { icon: "⚛️", size: 40, x: "8%", y: "15%", depth: 0.02, delay: 0 },
  { icon: "🚀", size: 35, x: "85%", y: "20%", depth: 0.03, delay: 0.5 },
  { icon: "💎", size: 30, x: "12%", y: "60%", depth: 0.015, delay: 1 },
  { icon: "⚡", size: 32, x: "90%", y: "55%", depth: 0.025, delay: 1.5 },
  { icon: "🎯", size: 28, x: "50%", y: "8%", depth: 0.02, delay: 2 },
  { icon: "🔮", size: 36, x: "75%", y: "80%", depth: 0.018, delay: 2.5 },
  { icon: "✨", size: 24, x: "20%", y: "85%", depth: 0.022, delay: 3 },
  { icon: "🌟", size: 26, x: "65%", y: "12%", depth: 0.028, delay: 0.3 },
  { icon: "</>", size: 28, x: "35%", y: "90%", depth: 0.02, delay: 1.2, isCode: true },
  { icon: "{}", size: 24, x: "92%", y: "40%", depth: 0.015, delay: 1.8, isCode: true },
];

export default function FloatingElements() {
  const mouse = useMouse();

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: item.x,
            top: item.y,
            fontSize: item.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.4,
            scale: 1,
            x: mouse.normalizedX * item.depth * 800,
            y: -mouse.normalizedY * item.depth * 800,
          }}
          transition={{
            opacity: { delay: item.delay, duration: 1 },
            scale: { delay: item.delay, duration: 1, type: "spring" },
            x: { type: "spring", stiffness: 50, damping: 20 },
            y: { type: "spring", stiffness: 50, damping: 20 },
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={item.isCode ? "font-mono text-purple-400/40 font-bold" : ""}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          left: "10%",
          top: "30%",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: mouse.normalizedX * 30,
          y: -mouse.normalizedY * 30,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 30, damping: 20 },
          y: { type: "spring", stiffness: 30, damping: 20 },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          right: "5%",
          top: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: mouse.normalizedX * -20,
          y: -mouse.normalizedY * -20,
          scale: [1, 1.3, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 25, damping: 20 },
          y: { type: "spring", stiffness: 25, damping: 20 },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full"
        style={{
          left: "50%",
          bottom: "10%",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, transparent 70%)",
          filter: "blur(35px)",
        }}
        animate={{
          x: mouse.normalizedX * 25,
          y: -mouse.normalizedY * -25,
          scale: [1, 1.15, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 35, damping: 20 },
          y: { type: "spring", stiffness: 35, damping: 20 },
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </div>
  );
}
