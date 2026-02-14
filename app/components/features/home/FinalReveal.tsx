"use client";

import { motion } from "framer-motion";

export default function FinalReveal() {
  return (
    <motion.div
      key="final-text"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div className="text-3xl font-light text-white/90 md:text-5xl">
        We Are
      </div>
      <div className="mt-2 text-7xl font-bold leading-none text-white md:text-[120px]">
        incial
      </div>
    </motion.div>
  );
}
