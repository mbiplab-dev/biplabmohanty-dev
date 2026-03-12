"use client";

import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import { usePortfolio } from "@/lib/PortfolioContext";
import { Heart } from "lucide-react";

export default function Footer() {
  const { profile } = usePortfolio();

  return (
    <footer className="mt-24 w-full border-t border-zinc-800/50 bg-black/40 backdrop-blur-sm text-gray-400 relative overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-4xl mx-auto p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h3 className="text-lg font-bold text-white">
            {profile.name}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              .
            </span>
          </h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1 justify-center md:justify-start">
            Made with <Heart size={12} className="text-red-400 animate-pulse" /> &copy;{" "}
            {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SocialLinks />
        </motion.div>
      </div>
    </footer>
  );
}
