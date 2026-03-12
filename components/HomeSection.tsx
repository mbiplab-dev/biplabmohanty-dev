"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, MapPin } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiDjango,
  SiMongodb,
  SiPostgresql,
  SiSqlite,
  SiFirebase,
  SiDocker,
  SiTailwindcss,
  SiHtml5,
  SiGit,
  SiPython,
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";
import SocialLinks from "./SocialLinks";
import { usePortfolio } from "@/lib/PortfolioContext";

const skillIconMap: Record<string, React.ReactNode> = {
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  Python: <SiPython />,
  React: <SiReact />,
  "Next.js": <SiNextdotjs />,
  "Node.js": <SiNodedotjs />,
  Express: <SiExpress />,
  Flask: <SiFlask />,
  Django: <SiDjango />,
  MongoDB: <SiMongodb />,
  PostgreSQL: <SiPostgresql />,
  SQLite: <SiSqlite />,
  Firebase: <SiFirebase />,
  Docker: <SiDocker />,
  "Tailwind CSS": <SiTailwindcss />,
  "HTML/CSS": <SiHtml5 />,
  Git: <SiGit />,
  "Gen AI": <FaRobot />,
};

const roles = [
  "Full-Stack Developer",
  "React Developer",
  "Python Developer",
  "Backend Engineer",
  "Problem Solver",
];

export default function HomeSection() {
  const { profile, skills } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // typing & deleting effect for roles using intervals to avoid leftover timers
  useEffect(() => {
    const speed = isDeleting ? 80 : 160;
    const interval = setInterval(() => {
      setText((prev) => {
        const full = roles[roleIndex];
        if (!isDeleting) {
          if (prev.length < full.length) {
            return full.slice(0, prev.length + 1);
          }
          return prev;
        } else {
          if (prev.length > 0) {
            return full.slice(0, prev.length - 1);
          }
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
          return "";
        }
      });
    }, speed);
    return () => clearInterval(interval);
  }, [isDeleting, roleIndex]);

  // pause before deleting when word fully typed
  useEffect(() => {
    if (!isDeleting && text === roles[roleIndex]) {
      const t = setTimeout(() => setIsDeleting(true), 4000);
      return () => clearTimeout(t);
    }
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="mt-20 md:mt-32 max-w-4xl mx-auto px-6 text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 justify-between">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <span className="inline-flex items-center gap-2 text-sm md:text-base text-gray-400 tracking-wider uppercase">
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Hi, I&apos;m{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                {profile.name}
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>{" "}
            <motion.span
              className="inline-block cursor-pointer"
              whileHover={{ rotate: [0, 20, -15, 20, 0] }}
              transition={{ duration: 0.6 }}
              style={{ transformOrigin: "70% 70%" }}
            >
              👋
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mt-4 h-10"
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              {text}
            </span>
            <span className="animate-pulse text-purple-400 ml-0.5">|</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-300 mt-4 text-base md:text-lg leading-relaxed max-w-xl"
          >
            {profile.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-3 text-gray-400 mt-5 justify-center md:justify-start flex-wrap"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={18} className="text-purple-400" />
              <span className="text-sm">{profile.location}</span>
            </span>
            <span className="hidden sm:block text-zinc-700">|</span>
            <SocialLinks />
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(168,85,247,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500
                text-white text-sm font-semibold shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10">Resume</span>
              <Download className="w-4 h-4 relative z-10 group-hover:translate-y-[2px] transition-transform duration-300" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.a>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="flex-shrink-0 relative"
        >
          <div className="relative w-[160px] h-[160px] md:w-[220px] md:h-[220px]">
            <motion.div
              className="absolute -inset-2 rounded-full opacity-75"
              style={{
                background: "conic-gradient(from 0deg, #7c3aed, #3b82f6, #ec4899, #7c3aed)",
                filter: "blur(4px)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <Image
              src={profile.image}
              alt={profile.name}
              fill
              className="object-cover rounded-full border-4 border-black shadow-2xl relative z-10"
            />
            <motion.div
              className="absolute -bottom-2 -right-2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-green-500/50 backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs text-green-400 font-medium">Available</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-14"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 justify-center md:justify-start">
          <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent max-w-[60px]" />
          <span className="flex items-center gap-2">
            <span className="text-2xl">⚡</span> Tech Stack
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-zinc-800 to-transparent max-w-[60px]" />
        </h2>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.04,
                type: "spring",
                stiffness: 300,
              }}
              whileHover={{
                scale: 1.1,
                y: -4,
                boxShadow: "0 8px 24px rgba(139, 92, 246, 0.25)",
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/80 backdrop-blur-sm rounded-xl text-sm border border-zinc-700/50 hover:border-purple-500/50 transition-all cursor-default"
            >
              <span className="text-lg">
                {skillIconMap[skill] || <SiReact />}
              </span>
              <span className="text-gray-200">{skill}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
