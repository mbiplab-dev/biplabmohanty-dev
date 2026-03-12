"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Code2, Layers } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";
import TiltCard from "./3d/TiltCard";

export default function Projects() {
  const { projects } = usePortfolio();

  if (projects.length === 0) return null;

  return (
    <section className="mt-24 w-full max-w-4xl mx-auto px-6 text-white">
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 text-sm rounded-full font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-md inline-flex items-center gap-2"
        >
          <Layers size={14} /> Projects
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mt-6"
        >
          Check out my{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            latest work
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          From full-stack web apps to real-time systems — here are some projects I&apos;m proud of.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            style={{ perspective: "1000px" }}
          >
            <TiltCard glareColor="rgba(96, 165, 250, 0.12)">
              <div className="rounded-xl overflow-hidden bg-zinc-900/60 backdrop-blur-md border border-zinc-800 shadow-lg flex flex-col group hover:border-blue-500/30 transition-all duration-300">
                {/* Project Image or Placeholder */}
                {project.image ? (
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-52 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    {/* Floating project number */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xs font-mono text-purple-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                ) : (
                  <div className="h-52 bg-gradient-to-br from-purple-900/30 via-zinc-900 to-blue-900/30 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1),transparent_70%)]" />
                    {/* Animated wireframe grid */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                    <Code2
                      size={48}
                      className="text-gray-600 group-hover:text-blue-400 transition-colors duration-500 relative z-10"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xs font-mono text-purple-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold group-hover:text-blue-300 transition-colors">{project.title}</h3>
                    <span className="text-gray-500 text-xs bg-zinc-800 px-2.5 py-1 rounded-full font-mono">
                      {project.period}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-3 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="px-2.5 py-1 text-xs rounded-lg bg-zinc-800/80 text-gray-300 border border-zinc-700/50 hover:border-blue-500/40 hover:text-blue-300 transition-all cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  {project.links.length > 0 && (
                    <div className="flex gap-3 mt-5">
                      {project.links.map((link, i) => (
                        <motion.a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all border border-purple-500/20"
                        >
                          <ExternalLink size={14} />
                          {link.label}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
