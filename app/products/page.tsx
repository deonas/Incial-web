"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ── Inline product data ────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "WorkHub",
    tagline: "by Incial",
    image: "/images/workhub.png",
    description: [
      "WorkHub is not a regular enterprise management software or CRM. It is designed to remove complexity and keep only what truly matters for a company to operate smoothly.",
      "There are no unnecessary features, no confusing workflows, and no heavy enterprise clutter.",
      "WorkHub includes only the essential tools a company needs, such as task management, a clean CRM, team visibility, and clear reporting.",
    ],
    tryUrl: "https://workhub.incial.in",
  },
  {
    id: 2,
    name: "StockFlow",
    tagline: "by Incial",
    image: "/images/stockflow.png",
    description: [
      "StockFlow is a smart and simple inventory management software designed to give businesses complete control over their inventory.",
      "It helps track inventory coming in and going out, monitor real-time stock levels, organise inventory enrolment, and reduce losses, errors, and manual tracking.",
      "With clean dashboards and clear insights, StockFlow enables faster and better business decisions. It is ideal for any business that handles physical stock and needs clarity and control.",
    ],
    tryUrl: "https://stockflow.incial.in",
  },
];

// ── Arrow icon ─────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// ── Product Section ────────────────────────────────────────────────────────
function ProductSection({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      {/* Product name */}
      <h2 className="text-2xl md:text-[28px] font-bold text-white mb-6">
        {product.name}
      </h2>

      {/*
        Image card
        Figma: width 985, height 408, border-radius 10px
        Container is 1141px so image fills ~86% width naturally
      */}
      <div
        className="relative w-full mb-8 overflow-hidden"
        style={{ height: "408px", borderRadius: "10px" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-top"
          priority={index === 0}
        />
      </div>

      {/* Description + CTA row */}
      <div className="flex flex-col" style={{ gap: "20px" }}>
        {product.description.map((para, i) => (
          <div key={i} className="flex items-end justify-between gap-8">
            <p
              className="text-white"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "16px",
                lineHeight: "1.6",
                letterSpacing: 0,
              }}
            >
              {para}
            </p>
            {/* CTA only shown beside the last paragraph */}
            {i === product.description.length - 1 && (
              <a
                href={product.tryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 text-[13px] font-medium hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
              >
                Try it Out <ArrowRight />
              </a>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(!menuOpen)} />

      <main className="pt-24 pb-20">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 px-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold italic mb-3">
            Products
          </h1>
          <p className="text-[14px] text-gray-400 italic">
            Built to work. Built to scale. Built for real businesses.
          </p>
        </motion.div>

        {/*
          ── Products container
          Figma: left 149px, width 1141px → max-w-[1141px] with px matching left offset
          gap: 150px between products
        */}
        <div
          className="mx-auto w-full px-6 md:px-[149px]"
          style={{ maxWidth: "1439px" }}
        >
          <div className="flex flex-col" style={{ gap: "150px" }}>
            {products.map((product, i) => (
              <ProductSection key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* ── Coming soon ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center pt-[100px] pb-16 flex flex-col items-center"
            style={{ gap: "54px" }}
          >
            <h3
              className="text-white"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: 0,
                textAlign: "center",
              }}
            >
              Built by Incial. Designed for real businesses. More coming soon.
            </h3>
            <p
              className="text-white max-w-[1141px]"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "16px",
                lineHeight: "1.6",
                letterSpacing: 0,
                textAlign: "center",
              }}
            >
              WorkHub and StockFlow are just the beginning. We are actively building more solutions focused on automation, operations, analytics, and business growth. All upcoming products follow the same philosophy — simple, practical, and customisable for real business needs.
            </p>
          </motion.div>
        </div>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full px-6 md:px-[149px]" style={{ maxWidth: "1439px" }}>
        <Footer />
      </div>
    </div>
  );
}