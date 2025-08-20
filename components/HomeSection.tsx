"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiDocker,
  SiVite,
  SiFlask,
} from "react-icons/si";
import { Download, MapPin } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { FaRobot } from "react-icons/fa";

export default function HomeSection() {
  return (
    <section className="mt-20 md:mt-32 max-w-4xl mx-auto px-6 text-white">
      {/* Intro Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 justify-between">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold"
            >
              Hi, I&apos;m <span className="text-white">Biplab Mohanty</span>{" "}
              <span className="inline-block animate-wave">👋</span>
            </motion.h1>

            <div className="mt-6 max-w-xl">
              {/* Role Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
              >
                Full-Stack Web Developer
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gray-300 mt-3 text-lg leading-relaxed"
              >
                {" "}
                I love working on both{" "}
                <span className="text-white font-medium">frontend</span> &{" "}
                <span className="text-white font-medium">backend</span>,
                bringing ideas to life with elegant solutions.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-2 text-gray-400 mt-3 justify-center md:justify-start"
            >
              <MapPin size={28} className="text-gray-400" />
              <span className="text-l">Based in India</span>
              <SocialLinks />

              <motion.a
                href="https://drive.google.com/file/d/12LaHD9L63ROLw1bHxnNCukBo75qG9xll/view?usp=drive_link"
                target="_blank" 
                rel="noopener noreferrer"
                initial={{ scale: 1 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-fit group flex items-center gap-2 px-4 py-2 rounded-full 
                 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
                 text-white font-medium shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10">Resume</span>
                <Download className="w-5 h-5 relative z-10 group-hover:translate-y-[2px] transition-transform duration-300" />

                {/* Glow effect inside the button */}
                <motion.span
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="glow"
                />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex-shrink-0 mr-8 relative w-[120px] h-[120px] md:w-[200] md:h-[200]"
        >
          <Image
            src="/me.png"
            alt="Profile Pic"
            fill
            className="object-cover rounded-full border-4 border-white shadow-lg"
          />
        </motion.div>
      </div>

      {/* Skills Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-6">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { icon: <SiJavascript />, label: "JavaScript" },
            { icon: <SiTypescript />, label: "TypeScript" },
            { icon: <SiReact />, label: "React" },
            { icon: <SiNextdotjs />, label: "Next.js" },
            { icon: <SiPostgresql />, label: "PostgreSQL" },
            { icon: <SiMongodb />, label: "MongoDB" },
            { icon: <SiFirebase />, label: "Firebase" },
            { icon: <SiDocker />, label: "Docker" },
            { icon: <SiVite />, label: "Vite" },
            { icon: <SiFlask />, label: "Flask" },
            { icon: <FaRobot />, label: "Gen AI" },
          ].map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg text-sm"
            >
              <span className="text-xl">{skill.icon}</span>
              {skill.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
