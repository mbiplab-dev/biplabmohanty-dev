"use client";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HomeSection from "@/components/HomeSection";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import React from "react";

const Page = () => {
  const stars = Array.from({ length: 100 });

  return (
    <main className="bg-grid-glow min-h-screen relative text-white overflow-hidden">
      <div className="stars">
        {stars.map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 1 + 2}px`,
              height: `${Math.random() * 1 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-10">
        <Navbar />

        <section id="home" className="flex items-center justify-center">
          <HomeSection />
        </section>

        <section id="projects" className="flex items-center justify-center">
          <Projects />
        </section>

        <section id="about" className="flex items-center justify-center">
          <About />
        </section>

        <section
          id="contact"
          className="flex items-center justify-center"
        >
          <Contact />
        </section>

        <Footer/>
      </div>
    </main>
  );
};

export default Page;
