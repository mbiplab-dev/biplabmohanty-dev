"use client";

import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-24 w-full border-t border-zinc-800 bg-black text-gray-400">
      <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h3 className="text-lg font-semibold text-white">Biplab Mohanty</h3>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} All rights reserved.</p>
        </motion.div>

        {/* Right side - Social Links */}
        <SocialLinks/>
      </div>
    </footer>
  );
}
