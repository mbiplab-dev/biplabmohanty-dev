"use client";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About Me" },
  { id: "contact", label: "Contact Me" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let section of sections) {
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

  return (
    <nav className="w-full fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <button onClick={() => handleClick("home")}>
          <p className="text-xl font-medium text-white">Biplab Mohanty</p>
        </button>

        <div
          className="hidden md:flex space-x-6 px-6 py-3 rounded-full 
                      bg-white/10 border border-white/10 
                      shadow-lg backdrop-blur-md"
        >
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleClick(sec.id)}
              className={`text-base font-medium transition-colors relative px-2
              ${
                active === sec.id
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {sec.label}
              {active === sec.id && (
                <span className="absolute left-0 right-0 -bottom-1 mx-auto h-0.5 w-6 rounded bg-white"></span>
              )}
            </button>
          ))}
        </div>

        <motion.div
          className="flex space-x-6 px-6 py-3 rounded-full 
                      bg-white/10 border border-white/10 
                      shadow-lg backdrop-blur-md"
          whileHover={{ gap: 32 }} // animate spacing when parent is hovered
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.a
            href="https://github.com/mbiplab-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <FaGithub size={26} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/biplab-k-mohanty"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <FaLinkedin size={26} />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/biplabmohanty19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <FaInstagram size={26} />
          </motion.a>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div
          className="mt-3 flex flex-col items-center space-y-4 
                      bg-white/10 border border-white/10 
                      shadow-lg backdrop-blur-md p-4 rounded-2xl md:hidden"
        >
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleClick(sec.id)}
              className={`text-lg font-medium transition-colors
              ${
                active === sec.id
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {sec.label}
            </button>
          ))}
          <div className="flex transition-all duration-300 ease-in-out group space-x-6 hover:space-x-8">
            <a
              href="https://github.com/mbiplab-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transform transition-all duration-300 ease-in-out hover:scale-110"
            >
              <FaGithub size={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/biplab-k-mohanty"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transform transition-all duration-300 ease-in-out hover:scale-110"
            >
              <FaLinkedin size={26} />
            </a>
            <a
              href="https://www.instagram.com/biplabmohanty19"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transform transition-all duration-300 ease-in-out hover:scale-110"
            >
              <FaInstagram size={26} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
