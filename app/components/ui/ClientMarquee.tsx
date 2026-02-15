"use client";

const placeholders = Array(8)
  .fill(null)
  .map((_, i) => ({
    id: i,
    src: `https://placehold.co/200x80/white/black?text=Client+${i + 1}`,
    alt: `Client ${i + 1}`,
  }));

export default function ClientMarquee() {
  return (
    <div className="w-full">
      <div className="w-full overflow-hidden relative mb-24">
        <div className="flex gap-8 w-max animate-marquee will-change-transform">
          {[...placeholders, ...placeholders].map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="bg-white rounded-lg p-4 w-[200px] h-[100px] flex items-center justify-center shrink-0"
            >
              <img
                src={client.src}
                alt={client.alt}
                className="max-w-full max-h-full object-contain filter "
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay for smooth fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-black to-transparent z-10" />
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
