"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  period: string;
  description: string;
  image: string;
  tech: string[];
  links: { label: string; url: string }[];
};

const projects: Project[] = [
  {
    title: "Chat Collect",
    period: "Jan 2024 – Feb 2024",
    description:
      "With the release of the OpenAI GPT Store, I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
    image: "/1.jpeg",
    tech: ["Next.js", "Typescript", "PostgreSQL", "Prisma", "TailwindCSS", "Stripe", "Shadcn UI", "Magic UI"],
    links: [{ label: "Website", url: "#" }],
  },
  {
    title: "Magic UI",
    period: "June 2023 – Present",
    description:
      "Designed, developed and sold animated UI components for developers.",
    image: "/2.jpg",
    tech: ["Next.js", "Typescript", "PostgreSQL", "Prisma", "TailwindCSS", "Stripe", "Shadcn UI", "Magic UI"],
    links: [
      { label: "Website", url: "#" },
      { label: "Source", url: "#" },
    ],
  },
];

export default function ProjectSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 text-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1 text-xl rounded-xl font-medium bg-white text-black backdrop-blur-md"
        >
          Projects
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mt-6"
        >
          Check out my latest work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          I've worked on a variety of projects, from simple websites to complex
          web applications. Here are a few of my works.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl overflow-hidden bg-zinc-900/60 backdrop-blur-md border border-zinc-800 shadow-lg flex flex-col"
          >
            {/* Project Image */}
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="object-cover w-full h-56"
            />

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <span className="text-gray-400 text-sm block mt-1">
                {project.period}
              </span>
              <p className="text-gray-300 text-sm mt-3 flex-grow">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="px-2 py-1 text-xs rounded bg-zinc-800 text-gray-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-5">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-white text-black transition"
                  >
                    <ExternalLink size={14} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
