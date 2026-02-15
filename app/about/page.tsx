"use client";

import AboutSection from "@/app/components/sections/AboutSection";
import Header from "@/app/components/layout/Header";
import NavMenu from "@/app/components/layout/NavMenu";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen text-white">
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(!menuOpen)} />
      <AnimatePresence>{menuOpen && <NavMenu />}</AnimatePresence>

      <main className="pt-20">
        <AboutSection />
      </main>
    </div>
  );
}
