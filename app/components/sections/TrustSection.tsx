import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientMarquee from "@/app/components/ui/ClientMarquee";

const stats = [
  { value: "50+", label: "Happy Clients" },
  { value: "10+", label: "Projects Completed" },
  { value: "5", label: "Customer Ratings" },
];

interface TrustSectionProps {
  onBack?: () => void;
  onComplete?: () => void;
}

export default function TrustSection({
  onBack,
  onComplete,
}: TrustSectionProps) {
  const [view, setView] = useState<"stats" | "testimonials">("stats");

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (view === "stats") {
          setView("testimonials");
        } else if (onComplete) {
          onComplete();
        }
      } else {
        // Scrolling UP
        if (view === "testimonials") {
          setView("stats");
        } else if (onBack) {
          onBack();
        }
      }
    };

    // Touch support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (deltaY > 50) {
        // Swipe UP (Scroll Down)
        if (view === "stats") {
          setView("testimonials");
        } else if (onComplete) {
          onComplete();
        }
      } else if (deltaY < -50) {
        // Swipe DOWN (Scroll Up)
        if (view === "testimonials") {
          setView("stats");
        } else if (onBack) {
          onBack();
        }
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
  }, [onBack, onComplete, view]);

  return (
    <section className="min-h-screen w-full bg-black text-white flex flex-col justify-center py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-screen">
        {/* Stats View Content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center pb-40 pointer-events-none"
          initial={{ opacity: 1, y: 0 }}
          animate={{
            opacity: view === "stats" ? 1 : 0,
            y: view === "stats" ? 0 : -100,
            pointerEvents: view === "stats" ? "auto" : "none",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-light">
              Why Trust <span className="font-bold text-blue-400">Incial?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center w-full">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-6xl md:text-8xl font-bold text-blue-400 mb-4">
                  {stat.value}
                </div>
                <div className="text-xl md:text-2xl text-gray-300 font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Marquee - Animates from Bottom (Stats) to Top (Testimonials) */}
        <motion.div
          className="absolute left-0 right-0 z-20"
          initial={{ top: "15%" }}
          animate={{
            y: view === "stats" ? "55vh" : "0vh",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center bg-black/50 backdrop-blur-sm py-4">
            <p className="text-xl text-white italic mb-12">
              Some of Our Awesome Clients:
            </p>
            <ClientMarquee />
          </div>
        </motion.div>

        {/* Testimonials View Content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center pt-64 pointer-events-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: view === "testimonials" ? 1 : 0,
            y: view === "testimonials" ? 0 : 50,
            pointerEvents: view === "testimonials" ? "auto" : "none",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-6xl mx-auto w-full px-6">
            {/* Testimonial 1 */}
            <div className="pl-4 border-l-2 border-white/20">
              <p className="text-lg md:text-xl italic text-gray-300 mb-6">
                “Founded in 2024 in Kanjirappally, Kerala, we started as a small
                team of passionate creators and strategists determined to make a
                difference.”
              </p>
              <p className="text-right text-white font-medium">~ Client Name</p>
            </div>

            {/* Testimonial 2 */}
            <div className="pl-4 border-l-2 border-white/20">
              <p className="text-lg md:text-xl italic text-gray-300 mb-6">
                “Founded in 2024 in Kanjirappally, Kerala, we started as a small
                team of passionate creators and strategists determined to make a
                difference.”
              </p>
              <p className="text-right text-white font-medium">~ Client Name</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
