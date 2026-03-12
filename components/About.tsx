"use client";

import { motion } from "framer-motion";
import { GraduationCap, Trophy, Star } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";
import TiltCard from "./3d/TiltCard";

export default function About() {
  const { education, achievements } = usePortfolio();

  return (
    <section className="mt-24 w-full max-w-4xl mx-auto px-6 text-white">
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 text-sm rounded-full font-medium bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border border-green-500/30 backdrop-blur-md inline-flex items-center gap-2"
        >
          <Star size={14} /> About Me
        </motion.span>
      </div>

      {/* Education */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-8 flex items-center gap-3"
      >
        <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
          <GraduationCap className="text-white" size={24} />
        </div>
        <span>
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Education
          </span>
        </span>
      </motion.h2>

      <div className="relative mb-16">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-5 top-0 bottom-0 w-[2px]">
          <div className="w-full h-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent opacity-50" />
        </div>

        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: 40, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="mb-8 ml-8 md:ml-14 relative"
            style={{ perspective: "800px" }}
          >
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="absolute -left-[44px] md:-left-[52px] flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20"
            >
              <GraduationCap size={20} className="text-white" />
            </motion.span>

            <TiltCard glareColor="rgba(52, 211, 153, 0.1)">
              <div className="p-5 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 hover:border-purple-500/20 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500 font-mono bg-zinc-800/80 px-2 py-0.5 rounded-full">
                    {edu.period}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                <p className="text-sm text-purple-400 font-medium">{edu.institution}</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{edu.description}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
              <Trophy className="text-white" size={24} />
            </div>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Achievements
            </span>
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring" }}
                style={{ perspective: "800px" }}
              >
                <TiltCard glareColor="rgba(251, 191, 36, 0.1)">
                  <div className="relative p-6 rounded-xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 shadow-lg overflow-hidden">
                    {/* Top gradient accent with shimmer */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="flex items-start gap-4">
                      <motion.div
                        className="p-2.5 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg shadow-yellow-500/20 flex-shrink-0"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring" }}
                      >
                        <Trophy size={22} className="text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold">{achievement.title}</h3>
                        <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
