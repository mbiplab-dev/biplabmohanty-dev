"use client";

import Navbar from "@/components/Navbar";
import HomeSection from "@/components/HomeSection";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClickRipple from "@/components/ClickRipple";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ArrowUp } from "lucide-react";

export default function PortfolioPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate stable star positions on first render (client-only)
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        width: 1.5 + (i * 7919) % 15 / 10,
        top: (i * 6271) % 100,
        left: (i * 9733) % 100,
        delay: (i * 3571) % 7,
      })),
    []
  );

  return (
    <main className="bg-grid min-h-screen relative text-white overflow-hidden">
      {/* global click effect */}
      <ClickRipple />

      {/* Stars */}
      <div className="stars">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              width: `${s.width}px`,
              height: `${s.width}px`,
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: `${s.delay * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Grid highlights */}
      <div className="grid-highlight" />
      <div className="grid-highlight" />
      <div className="grid-highlight" />
      <div className="grid-highlight" />
      <div className="grid-highlight" />

      <div className="relative z-10 pt-10">
        <Navbar />

        <section id="home" className="flex items-center justify-center">
          <HomeSection />
        </section>

        <section id="experience" className="flex items-center justify-center">
          <Experience />
        </section>

        <section id="projects" className="flex items-center justify-center">
          <Projects />
        </section>

        <section id="about" className="flex items-center justify-center">
          <About />
        </section>

        <section id="contact" className="flex items-center justify-center">
          <Contact />
        </section>

        <Footer />
      </div>

      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/25 text-white"
      >
        <ArrowUp size={20} />
      </motion.button>
    </main>
  );
}
