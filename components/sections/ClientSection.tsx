"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Client logos sourced from Figma design (node 930:1929)
const clients = [
  // Row 1
  { id: "precon", name: "Precon", src: "/clients/precon.png" },
  { id: "dc-kottayam", name: "DC Kottayam", src: "/clients/dc-kottayam.png" },
  { id: "usi3dt", name: "USI3DT", src: "/clients/usi3dt.png" },
  { id: "blaupunkt", name: "Blaupunkt", src: "/clients/blaupunkt.png" },
  { id: "voltant", name: "Voltant Energy", src: "/clients/voltant.png" },
  { id: "datalabs", name: "DataLabs", src: "/clients/datalabs.svg" },
  { id: "livelong", name: "LiveLong Wealth", src: "/clients/livelong.png" },
  { id: "dream", name: "Dream", src: "/clients/dream.png" },

  // Row 2
  { id: "ajce", name: "AJCE", src: "/clients/ajce.png" },
  { id: "vic", name: "VIC", src: "/clients/vic.png" },
  {
    id: "apj-paramedicals",
    name: "APJ Paramedicals",
    src: "/clients/apj-paramedicals.png",
  },
  { id: "cognilearn", name: "CogniLearn", src: "/clients/cognilearn.png" },
  { id: "coinco", name: "Coinco", src: "/clients/coinco.png" },
  { id: "jaybees", name: "Jaybees", src: "/clients/jaybees.png" },
  {
    id: "eden-public-school",
    name: "Eden Public School",
    src: "/clients/eden-public-school.png",
  },
  { id: "esla-spices", name: "Esla Spices", src: "/clients/esla-spices.png" },

  // Row 3
  { id: "eutropics", name: "Eutropics", src: "/clients/eutropics.png" },
  { id: "elavanal", name: "Elavanal", src: "/clients/elavanal.png" },
  { id: "fotoloom", name: "Fotoloom", src: "/clients/fotoloom.png" },
  { id: "funfee", name: "Funfee", src: "/clients/funfee.png" },
  { id: "homescapes", name: "Homescapes", src: "/clients/homescapes.png" },
  { id: "intern-hub", name: "Intern Hub", src: "/clients/intern-hub.png" },
  { id: "zaburb", name: "Zaburb", src: "/clients/zaburb.png" },
  { id: "logo2", name: "Logo2", src: "/clients/logo2.png" },

  // Row 4
  { id: "manna", name: "Manna Caterers", src: "/clients/manna.png" },
  { id: "meowendi", name: "Meowendi", src: "/clients/meowendi.png" },
  { id: "miraco", name: "MIRACO", src: "/clients/miraco.png" },
  { id: "skinzone", name: "Skinzone", src: "/clients/skinzone.png" },
  { id: "untitled1", name: "Client", src: "/clients/untitled1.png" },
  {
    id: "livelong-pala",
    name: "LiveLong Pala",
    src: "/clients/livelong-pala.png",
  },
  { id: "varkitchen", name: "Varkitchen", src: "/clients/varkitchen.png" },
];

interface ClientSectionProps {
  onBack?: () => void;
  onComplete?: () => void;
}

export default function ClientSection({
  onBack,
  onComplete,
}: ClientSectionProps) {
  useEffect(() => {
    let isScrolling = false;
    const handleScroll = (e: WheelEvent) => {
      if (isScrolling) return;
      isScrolling = true;
      if (e.deltaY > 0) {
        if (onComplete) onComplete();
      } else {
        if (onBack) onBack();
      }
      setTimeout(() => {
        isScrolling = false;
      }, 500);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (deltaY > 50) {
        isScrolling = true;
        if (onComplete) onComplete();
        setTimeout(() => {
          isScrolling = false;
        }, 500);
      } else if (deltaY < -50) {
        isScrolling = true;
        if (onBack) onBack();
        setTimeout(() => {
          isScrolling = false;
        }, 500);
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
  }, [onBack, onComplete]);

  return (
    <section className="h-screen w-full bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center items-center">
        <motion.div
          className="flex flex-col items-center w-full max-w-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header — matches Figma: italic, centered, white */}
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xl md:text-2xl italic font-light tracking-wide text-white font-[Poppins]">
              Some of Our Awesome Clients:
            </p>
          </div>

          {/* Client Logo Grid — 8 columns, 4 rows matching Figma layout */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-2.5 mb-10 md:mb-14 w-full">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.025,
                  ease: "easeOut",
                }}
                className="bg-white rounded-[5px] flex items-center justify-center p-2 aspect-3/2 relative overflow-hidden group transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  fill
                  className="object-contain p-2 pointer-events-none"
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12.5vw"
                />
              </motion.div>
            ))}
          </div>

          {/* Testimonials — two columns matching Figma */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 w-full max-w-5xl px-4">
            <div className="flex flex-col">
              <p className="text-base md:text-lg italic text-white/80 mb-4 font-light leading-relaxed font-[Poppins]">
                &ldquo;Founded in 2024 in Kanjirappally, Kerala, we started as a
                small team of passionate creators and strategists determined to
                make a difference.&rdquo;
              </p>
              <p className="text-right text-white/60 font-light text-sm italic tracking-wide">
                ~ Client Name
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-base md:text-lg italic text-white/80 mb-4 font-light leading-relaxed font-[Poppins]">
                &ldquo;Founded in 2024 in Kanjirappally, Kerala, we started as a
                small team of passionate creators and strategists determined to
                make a difference.&rdquo;
              </p>
              <p className="text-right text-white/60 font-light text-sm italic tracking-wide">
                ~ Client Name
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
