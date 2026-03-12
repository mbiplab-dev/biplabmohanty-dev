"use client";

import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { usePortfolio } from "@/lib/PortfolioContext";

const socialConfig = [
  { key: "github", icon: FaGithub },
  { key: "linkedin", icon: FaLinkedin },
  { key: "instagram", icon: FaInstagram },
  { key: "twitter", icon: FaTwitter },
  { key: "email", icon: MdEmail, isEmail: true },
] as const;

export default function SocialLinks() {
  const { socials } = usePortfolio();

  return (
    <motion.div
      className="flex space-x-4 px-2 py-1"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {socialConfig.map(({ key, icon: Icon, ...rest }) => {
        const url = socials[key as keyof typeof socials];
        if (!url) return null;
        const href = "isEmail" in rest ? `mailto:${url}` : url;
        return (
          <motion.a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.25, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Icon size={22} />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
