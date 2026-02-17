"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const caseStudies = [
  {
    id: 1,
    slug: "homescapes",
    category: "E-commerce",
    title: "Homescapes",
    description:
      "How do you take a traditional offline home décor seller and turn them into a premium online brand? We built them a commanding digital presence from scratch, and opened the doors to e-commerce success.",
  },
  {
    id: 2,
    slug: "funfee",
    category: "Social Media Marketing",
    title: "Funfee: Restocafé & Kids Park",
    description:
      "How do you turn a newly launched kids' park, restocafé, and event space into the most talked-about destination in town, with 18k followers in just three weeks? That's exactly what we delivered with Funfee's bold social campaign.",
  },
  {
    id: 3,
    slug: "datalabs",
    category: "Brand Identity",
    title: "DataLabs Corporation",
    description:
      "What happens when an AI company is making big moves in the U.S. market, but doesn't have a brand identity that sets them apart? Enter where Incial stepped in for DataLabs Corporation.",
  },
  {
    id: 4,
    slug: "livelong-wealth",
    category: "Financial Services Marketing",
    title: "Livelong Wealth Pala",
    description:
      "How do you build awareness around wealth management and age-banking in a three-tier city, when you yourself are new to the financial world? That's the challenge we took on with Livelong Wealth Pala.",
  },
  {
    id: 5,
    slug: "internhub",
    category: "Platform Development",
    title: "InternHub",
    description:
      "How do you bridge the gap between bright engineering talent and top companies? That's exactly what we delivered with InternHub, a digital platform we built for Amal Jyothi College of Engineering.",
  },
  {
    id: 6,
    slug: "blaupunkt",
    category: "Web Design & Development",
    title: "Blaupunkt EV Website",
    description:
      "When one of the world's most recognized electronics brands, Blaupunkt, approached us to design their EV (Electric Vehicle) website, we knew this was a massive responsibility—and it was an honor, a challenge, and a milestone for Incial.",
  },
];

export default function CaseStudiesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Header */}
      <Header menuOpen={menuOpen} onToggleMenu={handleToggleMenu} />

      {/* Main Content */}
      <main className="pt-32 pb-20">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-2 text-sm px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1400px] mx-auto"
        >
          <a href="/" className="text-blue-500 hover:text-blue-400 transition-colors">
            Home
          </a>
          <span className="text-gray-500">›</span>
          <span className="text-gray-400">Work</span>
        </motion.div>

        {/* Hero Section with Image - Full Width */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 relative px-4 md:px-8 lg:px-12"
        >
          {/* Hero Image with overlay text */}
          <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden mb-12 max-w-[1600px] mx-auto">
            <Image
              src="/images/case1.jpg"
              alt="Case Study Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Case Study
              </h1>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base max-w-3xl mx-auto text-center leading-relaxed italic">
            At Incial, we pride ourselves on developing tailored digital solutions that make a real impact. Here's a glimpse of some of the projects we've brought to life across various industries:
          </p>
        </motion.section>

        {/* Case Studies List */}
        <div className="space-y-16 mt-20 px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1400px] mx-auto">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group relative border-b border-white/10 pb-16 last:border-b-0"
            >
              <Link href={`/case-studies/${study.slug}`} className="block">
                <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
                  {/* Image */}
                  <div className="w-full md:w-[380px] lg:w-[420px] flex-shrink-0 overflow-hidden rounded-xl">
                    <div className="relative aspect-[420/240] w-full">
                      <Image
                        src="/images/case1.jpg"
                        alt={study.title}
                        fill
                        className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="text-[11px] text-gray-500 uppercase tracking-widest mb-3 font-light">
                      {study.category}
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-[28px] font-semibold mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                      {study.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed text-[15px] md:text-base">
                      "{study.description}"
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1400px] mx-auto mt-20">
        <Footer />
      </div>
    </div>
  );
}