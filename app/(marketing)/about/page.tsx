"use client";

import { motion } from "framer-motion";
import { AboutSection } from "@/components/sections";
import { Header } from "@/components/layout";
import { useState } from "react";

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-white min-h-screen">
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(!menuOpen)} />

      <motion.div
        animate={{
          y: menuOpen ? 100 : 0,
          scale: menuOpen ? 0.95 : 1,
          borderTopLeftRadius: menuOpen ? 24 : 0,
          borderTopRightRadius: menuOpen ? 24 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative origin-top overflow-hidden bg-black text-white min-h-screen"
        style={{ zIndex: 30 }}
      >
        <main className="pt-24">
          <AboutSection />
        </main>
      </motion.div>
    </div>
  );
}
