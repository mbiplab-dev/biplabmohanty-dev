"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/lib/PortfolioContext";

const sections = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const socialIcons: Record<string, React.ComponentType<{ size: number }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  twitter: FaTwitter,
};

export default function Navbar() {
  const { socials } = usePortfolio();
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && scrollPos >= el.offsetTop) {
          setActive(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const activeSocials = Object.entries(socials).filter(
    ([key, url]) => url && key !== "email" && key in socialIcons
  );

  return (
    <nav className="w-full fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Brand */}
        <motion.button
          onClick={() => handleClick("home")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-xl font-bold text-white">
            Biplab
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              .
            </span>
          </p>
        </motion.button>

        {/* Desktop Nav */}
        <motion.div
          layout
          className={`hidden md:flex space-x-6 px-6 py-3 rounded-full
            bg-white/10 border border-white/10
            shadow-lg backdrop-blur-md transition-all duration-300
            ${scrolled ? "bg-white/15 shadow-xl" : ""}`}
        >
          {sections.map((sec) => (
            <motion.button
              key={sec.id}
              layout
              onClick={() => handleClick(sec.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`text-sm font-medium transition-colors relative px-2
                ${
                  active === sec.id
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
            >
              {sec.label}
              {active === sec.id && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 mx-auto h-0.5 w-6 rounded bg-gradient-to-r from-purple-400 to-blue-400"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Desktop Social Icons */}
        <motion.div
          className="hidden md:flex space-x-5 px-5 py-3 rounded-full
            bg-white/10 border border-white/10
            shadow-lg backdrop-blur-md"
          whileHover={{ gap: 28 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {activeSocials.map(([key, url]) => {
            const Icon = socialIcons[key];
            return (
              <motion.a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Icon size={22} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 h-10 w-10 flex justify-center items-center text-white bg-white/10 border border-white/10
            shadow-lg backdrop-blur-md rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? "✕" : "☰"}
          </motion.span>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mt-3 flex flex-col items-center space-y-3
              bg-white/10 border border-white/10
              shadow-lg backdrop-blur-md p-5 rounded-2xl md:hidden"
          >
            {sections.map((sec) => (
              <motion.button
                key={sec.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClick(sec.id)}
                className={`text-lg font-medium transition-colors w-full text-center py-2 rounded-xl
                  ${
                    active === sec.id
                      ? "text-white bg-white/10"
                      : "text-gray-300 hover:text-white"
                  }`}
              >
                {sec.label}
              </motion.button>
            ))}
            <div className="flex space-x-6 pt-2">
              {activeSocials.map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white hover:scale-110 transition-all"
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
