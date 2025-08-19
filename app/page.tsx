"use client";
import Navbar from "@/components/Navbar";
import React from "react";

const Page = () => {
  const stars = Array.from({ length: 200 });

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
        <section
          id="home"
          className="min-h-screen flex items-center justify-center"
        >
          <h1 className="text-5xl font-bold">Welcome to My Portfolio</h1>
        </section>

        <section
          id="projects"
          className="min-h-screen flex items-center justify-center"
        >
          <h2 className="text-4xl font-bold">Projects</h2>
        </section>

        <section
          id="about"
          className="min-h-screen flex items-center justify-center"
        >
          <h2 className="text-4xl font-bold">About Me</h2>
        </section>

        <section
          id="contact"
          className="min-h-screen flex items-center justify-center"
        >
          <h2 className="text-4xl font-bold">Contact Me</h2>
        </section>
      </div>
    </main>
  );
};

export default Page;
