"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, Zap } from "lucide-react";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import TiltCard from "./3d/TiltCard";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Sending message...");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        toast.success("Message sent successfully! 🚀", { id: toastId });
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong ❌", { id: toastId });
      });
  };

  return (
    <section className="mt-24 w-full max-w-4xl mx-auto px-6 text-white">
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 text-sm rounded-full font-medium bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30 backdrop-blur-md inline-flex items-center gap-2"
        >
          <Zap size={14} /> Contact
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mt-6"
        >
          Let&apos;s work{" "}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            together!
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mt-4 max-w-lg mx-auto"
        >
          Have a project in mind or want to collaborate? Send me a message and
          I&apos;ll get back to you as soon as possible.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 5 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ perspective: "1000px" }}
      >
        <TiltCard intensity={8} glareColor="rgba(236, 72, 153, 0.1)">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 rounded-xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 shadow-lg relative overflow-hidden"
          >
            {/* Background grid pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                  <User size={14} />
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder:text-gray-600"
                    placeholder="John Doe"
                  />
                  {focusedField === "name" && (
                    <motion.div
                      layoutId="focus-glow"
                      className="absolute -inset-[1px] rounded-xl border border-purple-500/50 pointer-events-none"
                      style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)" }}
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                  <Mail size={14} />
                  Your Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder:text-gray-600"
                    placeholder="john@example.com"
                  />
                  {focusedField === "email" && (
                    <motion.div
                      layoutId="focus-glow"
                      className="absolute -inset-[1px] rounded-xl border border-purple-500/50 pointer-events-none"
                      style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)" }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 relative z-10">
              <label className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                <MessageSquare size={14} />
                Your Message
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder:text-gray-600 resize-none"
                  placeholder="Hey, I'd like to talk about..."
                />
                {focusedField === "message" && (
                  <motion.div
                    layoutId="focus-glow"
                    className="absolute -inset-[1px] rounded-xl border border-purple-500/50 pointer-events-none"
                    style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)" }}
                  />
                )}
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="flex items-center gap-2 px-8 py-3.5 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 mx-auto transition-all relative overflow-hidden z-10"
            >
              <span className="relative z-10 flex items-center gap-2">
                Send Message <Send size={18} />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </form>
        </TiltCard>
      </motion.div>
    </section>
  );
}
