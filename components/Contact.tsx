"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "your_service_id", // replace with your EmailJS service ID
        "your_template_id", // replace with your template ID
        form,
        "your_user_id" // replace with your EmailJS user/public key
      )
      .then(() => {
        alert("Message sent successfully ✅");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong ❌");
      });
  };

  return (
    <section className="mt-28 w-full max-w-5xl mx-auto px-6 text-white ">
      {/* Call to Action */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center mb-12"
      >
        Let’s work <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">together!</span>
      </motion.h2>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-xl overflow-hidden bg-zinc-900/60 backdrop-blur-md border border-zinc-800 shadow-lg"
      >
        <div className="pt-2">
          <label className="block mb-2 text-sm text-gray-400">Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white"
          />
        </div>

        <div className="pt-2">
          <label className="block mb-2 text-sm text-gray-400">Your Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white"
          />
        </div>

        <div className="pt-2">
          <label className="block mb-2 text-sm text-gray-400">Your Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white"
          />
        </div>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex items-center gap-2 px-6 py-3 mt-6 bg-white hover:bg-white/90 transition-colors text-black font-medium rounded-xl shadow-md mx-auto"
        >
          Send Message <Send size={18} />
        </motion.button>
      </motion.form>
    </section>
  );
}
