"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";
import TiltCard from "./3d/TiltCard";

export default function Experience() {
  const { experience } = usePortfolio();

  if (experience.length === 0) return null;

  return (
    <section className="mt-24 w-full max-w-4xl mx-auto px-6 text-white">
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 text-sm rounded-full font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md inline-flex items-center gap-2"
        >
          <Briefcase size={14} /> Experience
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mt-6"
        >
          Where I&apos;ve{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Worked
          </span>
        </motion.h2>
      </div>

      <div className="relative">
        {/* Timeline line with glow */}
        <div className="absolute left-0 md:left-6 top-0 bottom-0 w-[2px]">
          <div className="w-full h-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent opacity-50" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-400 to-transparent"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
          />
        </div>

        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="mb-10 ml-8 md:ml-14 relative"
          >
            {/* Timeline dot with pulse */}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="absolute -left-[44px] md:-left-[52px] flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
            >
              <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
              <Briefcase size={18} className="text-white relative z-10" />
            </motion.span>

            <TiltCard glareColor="rgba(139, 92, 246, 0.12)">
              <div className="p-6 rounded-xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 shadow-lg hover:border-purple-500/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <span className="flex items-center gap-1.5 text-sm text-gray-400 bg-zinc-800/80 px-3 py-1 rounded-full w-fit">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                </div>
                <p className="text-purple-400 font-medium mt-1.5">{exp.company}</p>
                {exp.location && (
                  <span className="flex items-center gap-1.5 text-sm text-gray-400 mt-1">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                )}
                <ul className="mt-4 space-y-2.5">
                  {exp.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 + 0.3 }}
                      className="text-gray-300 text-sm flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-purple-400 mt-0.5 flex-shrink-0">▸</span>
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
