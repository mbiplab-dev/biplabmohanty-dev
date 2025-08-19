"use client";
import About from "@/components/About";
import Contact from "@/components/Contact";
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

      <div className="grid-highlight" style={{ top: "900px", left: "900px" }} />
      <div className="grid-highlight" style={{ top: "150px", left: "600px" }} />
      <div className="grid-highlight" style={{ top: "0px", left: "1500px" }} />
      <div
        className="grid-highlight"
        style={{ top: "450px", left: "1800px" }}
      />
      <div className="grid-highlight" style={{ top: "450px", left: "300px" }} />

      <div className="relative z-10 p-10">
        <Navbar />

        <section id="home" className="mt-40 flex items-center justify-center">
          <HomeSection />
        </section>

        <section id="projects" className="mt-28 flex items-center justify-center">
          <Projects />
        </section>

        <section id="about" className="flex items-center justify-center mt-28">
          <About />
        </section>

        <section
          id="contact"
          className="flex items-center justify-center mt-32"
        >
          <Contact />
        </section>
      </div>
    </main>
  );
};

export default Page;
