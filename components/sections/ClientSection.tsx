import { useEffect } from "react";
import { motion } from "framer-motion";

const placeholders = Array(24)
  .fill(null)
  .map((_, i) => ({
    id: i,
    src: `https://placehold.co/200x80/white/black?text=Client+${i + 1}`,
    alt: `Client ${i + 1}`,
  }));

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
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl text-gray-300 italic font-light tracking-wide">
              Some of Our Awesome Clients:
            </h3>
          </div>

          {/* Grid of Logos */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4 mb-16 md:mb-24 w-full">
            {placeholders.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-md p-3 md:p-4 aspect-2/1 flex items-center justify-center relative overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src={client.src}
                  alt={client.alt}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full max-w-5xl px-4 mt-auto">
            <div className="flex flex-col">
              <p className="text-lg md:text-xl italic text-gray-300 mb-6 font-light leading-relaxed">
                “Founded in 2024 in Kanjirappally, Kerala, we started as a small
                team of passionate creators and strategists determined to make a
                difference in the digital world.”
              </p>
              <p className="text-right text-gray-400 font-light text-sm italic tracking-wide">
                ~ Client Name
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-lg md:text-xl italic text-gray-300 mb-6 font-light leading-relaxed">
                “Founded in 2024 in Kanjirappally, Kerala, we started as a small
                team of passionate creators and strategists determined to make a
                difference in the digital world.”
              </p>
              <p className="text-right text-gray-400 font-light text-sm italic tracking-wide">
                ~ Client Name
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
