"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  points: number;
  speed: number;
  angle: number;
}

const ORB_COLORS = [
  { color: "#a78bfa", points: 1 },
  { color: "#60a5fa", points: 2 },
  { color: "#f472b6", points: 3 },
  { color: "#34d399", points: 5 },
  { color: "#fbbf24", points: 10 },
];

export default function OrbCatcher() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [highScore, setHighScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [pops, setPops] = useState<{ id: number; x: number; y: number; points: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbIdRef = useRef(0);
  const popIdRef = useRef(0);

  const spawnOrb = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const colorConfig = ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)];
    const size = 20 + Math.random() * 25;
    const orb: Orb = {
      id: orbIdRef.current++,
      x: Math.random() * (rect.width - size * 2) + size,
      y: Math.random() * (rect.height - size * 2) + size,
      size,
      color: colorConfig.color,
      points: colorConfig.points,
      speed: 0.5 + Math.random() * 1.5,
      angle: Math.random() * Math.PI * 2,
    };
    setOrbs((prev) => [...prev.slice(-12), orb]); // max 13 orbs
  }, []);

  const catchOrb = useCallback((orb: Orb, e: React.MouseEvent) => {
    e.stopPropagation();
    setScore((prev) => prev + orb.points);
    setOrbs((prev) => prev.filter((o) => o.id !== orb.id));
    setPops((prev) => [
      ...prev,
      { id: popIdRef.current++, x: orb.x, y: orb.y, points: orb.points },
    ]);
    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== popIdRef.current - 1));
    }, 800);
  }, []);

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(spawnOrb, 600);
    const moveInterval = setInterval(() => {
      setOrbs((prev) =>
        prev.map((orb) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return orb;
          let newX = orb.x + Math.cos(orb.angle) * orb.speed;
          let newY = orb.y + Math.sin(orb.angle) * orb.speed;
          let newAngle = orb.angle;

          if (newX < orb.size || newX > rect.width - orb.size) {
            newAngle = Math.PI - newAngle;
            newX = Math.max(orb.size, Math.min(rect.width - orb.size, newX));
          }
          if (newY < orb.size || newY > rect.height - orb.size) {
            newAngle = -newAngle;
            newY = Math.max(orb.size, Math.min(rect.height - orb.size, newY));
          }

          return { ...orb, x: newX, y: newY, angle: newAngle };
        })
      );
    }, 30);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          setShowResult(true);
          setHighScore((hs) => Math.max(hs, score));
          clearInterval(spawnInterval);
          clearInterval(moveInterval);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
      clearInterval(timer);
    };
  }, [isPlaying, spawnOrb, score]);

  const startGame = () => {
    setScore(0);
    setOrbs([]);
    setTimeLeft(15);
    setShowResult(false);
    setIsPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto px-6 mt-16"
    >
      <div className="text-center mb-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1 text-sm rounded-xl font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md"
        >
          🎮 Mini Game
        </motion.span>
        <h3 className="text-xl font-bold mt-3 text-white">Catch the Orbs!</h3>
        <p className="text-gray-400 text-sm mt-1">Click the floating orbs before time runs out</p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[300px] md:h-[350px] rounded-2xl overflow-hidden border border-zinc-800 bg-black/40 backdrop-blur-sm cursor-crosshair"
        style={{
          background: "radial-gradient(ellipse at center, rgba(15, 5, 30, 0.8) 0%, rgba(0,0,0,0.9) 100%)",
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* HUD */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
          <div className="flex items-center gap-2 text-sm font-mono">
            <span className="text-purple-400">SCORE:</span>
            <motion.span
              key={score}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-white font-bold text-lg"
            >
              {score}
            </motion.span>
          </div>
          {isPlaying && (
            <div className="flex items-center gap-2 text-sm font-mono">
              <span className="text-red-400">TIME:</span>
              <motion.span
                key={timeLeft}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className={`font-bold text-lg ${timeLeft <= 5 ? "text-red-400" : "text-white"}`}
              >
                {timeLeft}s
              </motion.span>
            </div>
          )}
          {highScore > 0 && (
            <div className="text-sm font-mono">
              <span className="text-yellow-400">BEST:</span>{" "}
              <span className="text-white font-bold">{highScore}</span>
            </div>
          )}
        </div>

        {/* Orbs */}
        <AnimatePresence>
          {orbs.map((orb) => (
            <motion.div
              key={orb.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute cursor-pointer z-10"
              style={{
                left: orb.x - orb.size / 2,
                top: orb.y - orb.size / 2,
                width: orb.size,
                height: orb.size,
              }}
              onClick={(e) => catchOrb(orb, e)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <div
                className="w-full h-full rounded-full relative"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${orb.color}dd, ${orb.color}44)`,
                  boxShadow: `0 0 ${orb.size}px ${orb.color}66, inset 0 0 ${orb.size / 2}px rgba(255,255,255,0.2)`,
                }}
              >
                {/* Shine */}
                <div
                  className="absolute rounded-full bg-white/40"
                  style={{
                    width: orb.size * 0.25,
                    height: orb.size * 0.2,
                    top: "15%",
                    left: "20%",
                    filter: "blur(1px)",
                  }}
                />
                {/* Points indicator */}
                <span
                  className="absolute inset-0 flex items-center justify-center text-white font-bold"
                  style={{ fontSize: orb.size * 0.35 }}
                >
                  {orb.points > 3 ? "★" : ""}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Score pops */}
        <AnimatePresence>
          {pops.map((pop) => (
            <motion.div
              key={pop.id}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -40, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute z-20 font-bold text-yellow-400 pointer-events-none"
              style={{ left: pop.x, top: pop.y }}
            >
              +{pop.points}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Start / Result overlay */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 backdrop-blur-sm"
          >
            {showResult ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <h4 className="text-2xl font-bold text-white mb-2">
                  {score >= 30 ? "🏆 Amazing!" : score >= 15 ? "🎉 Great!" : "👍 Nice try!"}
                </h4>
                <p className="text-gray-300 mb-1">
                  Score: <span className="text-purple-400 font-bold text-xl">{score}</span>
                </p>
                {score >= highScore && score > 0 && (
                  <p className="text-yellow-400 text-sm mb-4 animate-pulse">
                    🌟 New High Score!
                  </p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-sm shadow-lg shadow-purple-500/25"
                >
                  Play Again
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-full text-white font-bold shadow-lg shadow-purple-500/30 relative overflow-hidden group"
              >
                <span className="relative z-10">🎮 Start Game</span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
