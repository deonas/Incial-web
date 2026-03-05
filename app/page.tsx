"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { greetings } from "@/lib/constants";
import { Header, NavMenu } from "@/components/layout";
import {
  GreetingsOverlay,
  ScrollSection,
  TrustSection,
  ClientSection,
  ContactSection,
} from "@/components/sections";

type Phase =
  | "greetings"
  | "scrolling"
  | "trust"
  | "client"
  | "about"
  | "contact";

const sectionVariants = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? "100vh" : "-100vh",
      opacity: 0,
    };
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      y: direction < 0 ? "100vh" : "-100vh",
      opacity: 0,
    };
  },
};

export default function Home() {
  const [phase, setPhase] = useState<Phase>("greetings");
  const [direction, setDirection] = useState(1);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollSectionStartAtEnd, setScrollSectionStartAtEnd] = useState(false);

  /* ── Greeting sequence ──────────────────────────── */
  useEffect(() => {
    if (phase !== "greetings") return;

    if (greetingIndex < greetings.length - 1) {
      const timer = setTimeout(() => setGreetingIndex((prev) => prev + 1), 500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDirection(1);
        setPhase("scrolling");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [greetingIndex, phase]);

  const handleToggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <>
      {/* Greetings overlay */}
      <AnimatePresence>
        {phase === "greetings" && (
          <GreetingsOverlay greetingIndex={greetingIndex} />
        )}
      </AnimatePresence>

      {/* Main page */}
      <div className="relative bg-white">
        {/* Header — hidden during greetings */}
        {phase !== "greetings" && (
          <Header menuOpen={menuOpen} onToggleMenu={handleToggleMenu} />
        )}

        {/* Navigation dropdown */}
        <AnimatePresence>{menuOpen && <NavMenu />}</AnimatePresence>

        {/* Content area — shifts down when menu is open */}
        <motion.div
          animate={{
            y: menuOpen ? 100 : 0,
            scale: menuOpen ? 0.95 : 1,
            borderTopLeftRadius: menuOpen ? 24 : 0,
            borderTopRightRadius: menuOpen ? 24 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative origin-top overflow-hidden bg-black text-white"
          style={{ zIndex: 30 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            {phase === "scrolling" && (
              <motion.div
                key="scroll"
                custom={direction}
                variants={sectionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <ScrollSection
                  startAtEnd={scrollSectionStartAtEnd}
                  onScrollComplete={() => {
                    setDirection(1);
                    setPhase("trust");
                  }}
                />
              </motion.div>
            )}

            {phase === "trust" && (
              <motion.div
                key="trust"
                custom={direction}
                variants={sectionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <TrustSection
                  onBack={() => {
                    setDirection(-1);
                    setScrollSectionStartAtEnd(true);
                    setPhase("scrolling");
                  }}
                  onComplete={() => {
                    setDirection(1);
                    setPhase("client");
                  }}
                />
              </motion.div>
            )}

            {phase === "client" && (
              <motion.div
                key="client"
                custom={direction}
                variants={sectionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <ClientSection
                  onBack={() => {
                    setDirection(-1);
                    setPhase("trust");
                  }}
                  onComplete={() => {
                    setDirection(1);
                    setPhase("contact");
                  }}
                />
              </motion.div>
            )}

            {phase === "contact" && (
              <motion.div
                key="contact"
                custom={direction}
                variants={sectionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <ContactSection
                  onBack={() => {
                    setDirection(-1);
                    setPhase("client");
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
