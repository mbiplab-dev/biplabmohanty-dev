"use client";

import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <motion.div
      className="flex space-x-6 px-6 py-3 "
      whileHover={{ gap: 32 }} // animate spacing when parent is hovered
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <FaGithub size={26} />
      </motion.a>

      <motion.a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <FaLinkedin size={26} />
      </motion.a>

      <motion.a
        href="https://instagram.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <FaInstagram size={26} />
      </motion.a>
    </motion.div>
  );
};

export default SocialLinks;
