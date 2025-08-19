"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

type Study = {
  year: string;
  title: string;
  place: string;
  description: string;
};

const studies: Study[] = [
  {
    year: "2021 - 2023",
    title: "High School",
    place: "SBD International School",
    description:
      "completed high school in science stream.",
  },
  {
    year: "2024 - 2028",
    title: "Bachelors in Science",
    place: "Indian Institute of Technology, Madras",
    description:
      "Pursuing degree in Data Science and Programming",
  },
];

export default function EducationTimeline() {
  return (
    <section className="max-w-5xl px-6 text-white">
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1 text-xl rounded-xl font-medium bg-white text-black backdrop-blur-md"
        >
          About me
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mt-6"
        >
          Education
        </motion.h2>
        
      </div>

      <div className="md:w-4xl relative border-l border-zinc-700">
        {studies.map((study, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="mb-10 ml-8 pb-6 border-b border-gray-400"
          >
            {/* Circle with Icon */}
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-600">
              <GraduationCap size={16} className="text-purple-400" />
            </span>

            {/* Timeline Content */}
            <p className="text-sm text-gray-400">{study.year}</p>
            <h4 className="text-lg font-semibold text-white">{study.title}</h4>
            <p className="text-sm text-purple-400">{study.place}</p>
            <p className="text-gray-400 mt-2 text-sm">{study.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
