"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaAward, FaMedal } from "react-icons/fa";

interface AboutSectionProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const teamMembers = [
  {
    name: "Judy Hopps",
    role: "CEO",
    img: "https://placehold.co/150x150/333/FFF?text=JH",
  },
  {
    name: "Mike Shinoda",
    role: "CTO",
    img: "https://placehold.co/150x150/333/FFF?text=MS",
  },
  {
    name: "Gwen Stacy",
    role: "CFO",
    img: "https://placehold.co/150x150/333/FFF?text=GS",
  },
  {
    name: "Mike Shinoda",
    role: "COO",
    img: "https://placehold.co/150x150/333/FFF?text=MS",
  },
  {
    name: "Gwen Stacy",
    role: "CMO",
    img: "https://placehold.co/150x150/333/FFF?text=GS",
  },
  {
    name: "Judy Hopps",
    role: "Lead Dev",
    img: "https://placehold.co/150x150/333/FFF?text=JH",
  },
];

export default function AboutSection({
  onBack,
  onComplete,
}: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // We don't use useInView for navigation logic, we use raw scroll events on the container or window
  // But since this is a "phase", it likely sits in a fixed container in page.tsx.
  // Actually, in page.tsx, sections are usually 100vh.
  // If AboutSection is long, it should be scrollable.
  // But the previous sections were "scroll-jacked" single screens.
  // If AboutSection is taller than 100vh, we need to handle its internal scroll.
  // The parent `page.tsx` renders it in a motion.div.
  // If use "overflow-y-auto" on the container, we can capture scroll events.

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only add scroll listeners if navigation props are provided (i.e., in the home page flow)
    if (!onBack && !onComplete) return;

    const handleScroll = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;

      // Scrolling UP at top -> Go Back
      if (e.deltaY < 0 && isAtTop && onBack) {
        e.preventDefault(); // Prevent bounce if needed
        onBack();
      }

      // Scrolling DOWN at bottom -> Go Next
      if (e.deltaY > 0 && isAtBottom && onComplete) {
        e.preventDefault();
        onComplete();
      }
    };

    // For touch, simplified logic (swipe detection)

    container.addEventListener("wheel", handleScroll, { passive: false });
    return () => container.removeEventListener("wheel", handleScroll);
  }, [onBack, onComplete]);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full bg-black text-white overflow-y-auto overflow-x-hidden relative scrollbar-hide"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col gap-32">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden grayscale relative"
        >
          <img
            src="https://placehold.co/1200x600/222/FFF?text=Team+Photo"
            alt="Team"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Founded in 2024 in Kanjirappally, Kerala, we started as a small team
            of passionate creators and strategists determined to make a
            difference. We believe in the power of design and technology to
            transform businesses and lives.
          </p>
        </motion.div>

        {/* Purpose */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white text-black rounded-3xl p-12 md:p-20 text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Purpose</h2>
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            We exist to create meaningful digital experiences that connect
            people and brands. Our purpose is to innovate, inspire, and drive
            growth for our partners through strategic design and cutting-edge
            technology.
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Meet Our Team
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            The talented individuals behind our success. We are a diverse group
            of thinkers, dreamers, and doers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-500">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Awards & Recognitions
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32">
            <div className="flex flex-col items-center">
              <FaAward className="text-6xl text-blue-500 mb-6" />
              <h3 className="text-xl font-bold mb-2">
                Awwwards - Site of the Day
              </h3>
              <p className="text-gray-500 text-sm">March 2024</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMedal className="text-6xl text-blue-500 mb-6" />
              <h3 className="text-xl font-bold mb-2">Red Dot Design Award</h3>
              <p className="text-gray-500 text-sm">December 2023</p>
            </div>
          </div>
        </motion.div>

        {/* Brand & Impact */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 pb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-900 group"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
            <img
              src="https://placehold.co/1200x600/111/FFF?text=Our+Brand"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Brand"
            />
            <div className="absolute bottom-10 left-10 z-20">
              <h3 className="text-3xl font-bold mb-4">Our Brand</h3>
              <p className="text-gray-200 max-w-md">
                Defining our identity through consistent visual language and
                core values.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-900 group"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
            <img
              src="https://placehold.co/1200x600/111/FFF?text=Our+Impact"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Impact"
            />
            <div className="absolute bottom-10 left-10 z-20">
              <h3 className="text-3xl font-bold mb-4">Our Impact</h3>
              <p className="text-gray-200 max-w-md">
                Creating positive change in our community and industry through
                sustainable practices.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
