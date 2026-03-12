"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: "spark" | "ring" | "dot";
}

const COLORS = [
  "#a78bfa",
  "#60a5fa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#818cf8",
  "#fb7185",
  "#38bdf8",
];

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const animFrameRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  // Ambient floating particles
  const ambientParticlesRef = useRef<
    {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      phase: number;
    }[]
  >([]);

  const initAmbient = useCallback((w: number, h: number) => {
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }
    ambientParticlesRef.current = particles;
  }, []);

  const spawnExplosion = useCallback((x: number, y: number) => {
    const count = 30 + Math.floor(Math.random() * 20);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const speed = Math.random() * 6 + 2;
      const maxLife = Math.random() * 40 + 30;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: maxLife,
        maxLife,
        size: Math.random() * 4 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: Math.random() > 0.7 ? "ring" : Math.random() > 0.5 ? "spark" : "dot",
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ w: canvas.width, h: canvas.height });
      initAmbient(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trailRef.current.length > 25) trailRef.current.shift();
    };

    const handleClick = (e: MouseEvent) => {
      spawnExplosion(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ─── Mouse trail glow ───
      for (let i = 0; i < trailRef.current.length; i++) {
        const point = trailRef.current[i];
        point.alpha *= 0.92;
        if (point.alpha < 0.01) {
          trailRef.current.splice(i, 1);
          i--;
          continue;
        }
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          30
        );
        gradient.addColorStop(0, `rgba(167, 139, 250, ${point.alpha * 0.15})`);
        gradient.addColorStop(1, "rgba(167, 139, 250, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(point.x - 30, point.y - 30, 60, 60);
      }

      // ─── Mouse glow orb ───
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const orbGradient = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        orbGradient.addColorStop(0, `rgba(139, 92, 246, ${0.08 + Math.sin(time * 3) * 0.03})`);
        orbGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.03)");
        orbGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = orbGradient;
        ctx.fillRect(mx - 80, my - 80, 160, 160);
      }

      // ─── Ambient floating particles ───
      for (const p of ambientParticlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.02;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse attraction (subtle)
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 1) {
          p.vx += (dx / dist) * 0.01;
          p.vy += (dy / dist) * 0.01;
        }

        // Dampen
        p.vx *= 0.99;
        p.vy *= 0.99;

        const alpha = 0.3 + Math.sin(p.phase) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color
          .replace(")", `, ${alpha})`)
          .replace("rgb", "rgba")
          .replace("#", "");

        // Parse hex to rgba
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        // Draw connections between close ambient particles
        for (const p2 of ambientParticlesRef.current) {
          if (p === p2) continue;
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(1 - dist2 / 120) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // ─── Explosion particles ───
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.05; // gravity
        p.life--;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          i--;
          continue;
        }

        const alpha = p.life / p.maxLife;
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        if (p.type === "ring") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === "spark") {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initAmbient, spawnExplosion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-auto"
      style={{ mixBlendMode: "screen" }}
      width={dimensions.w}
      height={dimensions.h}
    />
  );
}
