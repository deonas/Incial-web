"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/app/components/layout/Footer";

interface ContactSectionProps {
  onBack?: () => void;
}

export default function ContactSection({ onBack }: ContactSectionProps) {
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      // If scrolling UP and at the top of the page
      if (e.deltaY < 0 && window.scrollY === 0 && onBack) {
        onBack();
      }
    };

    // Touch support (Swipe Down at top)
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Swipe Down (negative deltaY) and at top
      if (deltaY < -50 && window.scrollY === 0 && onBack) {
        onBack();
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [onBack]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <section className="min-h-screen w-full bg-black text-white flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 relative overflow-hidden">
      <div className="grow flex flex-col justify-center items-center max-w-2xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Have a question? Need a quote?
          </h2>
          <p className="text-lg text-gray-400">
            We promise to reply within 24 hours, every time.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full space-y-6"
        >
          {/* Name Field */}
          <div className="bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder-gray-500"
            />
          </div>

          {/* Email Field */}
          <div className="bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder-gray-500"
            />
          </div>

          {/* Phone Field */}
          <div className="bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder-gray-500"
            />
          </div>

          {/* Message Field */}
          <div className="bg-white/5 border border-white/10 rounded-3xl px-6 py-4 relative">
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder-gray-500 resize-none mb-12"
            />
            <button
              type="submit"
              className="absolute bottom-4 right-4 bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors"
            >
              Contact
            </button>
          </div>
        </motion.form>
      </div>

      <Footer />
    </section>
  );
}
