"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  mins: number;
  date: string;
  image: string;
}

const popularPosts: BlogPost[] = [
  { id: 1, slug: "popular-1", title: "A Complete Guide to Mobile App Development", author: "Anjali", mins: 12, date: "December 09, 2025", image: "/images/case1.jpg" },
  { id: 2, slug: "popular-2", title: "A Complete Guide to Mobile App Development", author: "Anjali", mins: 12, date: "December 09, 2025", image: "/images/case1.jpg" },
  { id: 3, slug: "popular-3", title: "A Complete Guide to Mobile App Development", author: "Anjali", mins: 12, date: "December 09, 2025", image: "/images/case1.jpg" },
];

const newestPosts: BlogPost[] = [
  { id: 4,  slug: "newest-1", title: "A Complete Guide to Mobile App Development", author: "Arijit", mins: 12, date: "December 03, 2026", image: "/images/case1.jpg" },
  { id: 5,  slug: "newest-2", title: "A Complete Guide to Mobile App Development", author: "Arjun",  mins: 10, date: "December 08, 2026", image: "/images/case1.jpg" },
  { id: 6,  slug: "newest-3", title: "A Complete Guide to Mobile App Development", author: "Aditi",  mins: 6,  date: "December 03, 2026", image: "/images/case1.jpg" },
  { id: 7,  slug: "newest-4", title: "A Complete Guide to Mobile App Development", author: "Arijit", mins: 8,  date: "December 03, 2026", image: "/images/case1.jpg" },
  { id: 8,  slug: "newest-5", title: "A Complete Guide to Mobile App Development", author: "Arjun",  mins: 11, date: "December 08, 2026", image: "/images/case1.jpg" },
  { id: 9,  slug: "newest-6", title: "A Complete Guide to Mobile App Development", author: "Aditi",  mins: 7,  date: "December 03, 2026", image: "/images/case1.jpg" },
  { id: 10, slug: "newest-7", title: "A Complete Guide to Mobile App Development", author: "Arijit", mins: 9,  date: "December 03, 2026", image: "/images/case1.jpg" },
  { id: 11, slug: "newest-8", title: "A Complete Guide to Mobile App Development", author: "Arjun",  mins: 14, date: "December 08, 2026", image: "/images/case1.jpg" },
  { id: 12, slug: "newest-9", title: "A Complete Guide to Mobile App Development", author: "Aditi",  mins: 5,  date: "December 03, 2026", image: "/images/case1.jpg" },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link href={`/blogs/${post.slug}`} className="group block">
        {/* White card — Figma: radius 25px, padding 10px, gap 10px */}
        <div className="bg-white rounded-[25px] p-[10px] flex flex-col gap-[10px] shadow-sm group-hover:shadow-lg transition-shadow duration-300">

          {/* Image with overlay */}
          <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover grayscale brightness-60 group-hover:brightness-70 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-[15px] font-semibold leading-snug text-white mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[13px] text-white/70 font-light">By {post.author}</p>
            </div>
          </div>

          {/* Meta row — white strip */}
          <div className="flex items-center justify-between px-2 pb-1 text-[12px] text-gray-400 italic">
            <span>{post.mins} Mins</span>
            <span className="text-gray-300">|</span>
            <span>{post.date}</span>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}

function SectionLabel({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-2xl md:text-3xl font-bold italic text-white mb-8"
    >
      {label}
    </motion.h2>
  );
}

export default function BlogsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(!menuOpen)} />

      {/*
        Figma spec:
          container left: 90px → px-[90px]
          container max-width: 1251px
          grid column-gap: 60px → gap-x-[60px]
          grid row-gap: 60px    → gap-y-[60px]
      */}
      <main className="pt-28 pb-24 pl-[90px] pr-[90px] max-w-[1431px] mx-auto">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 text-sm"
        >
          <Link href="/" className="text-blue-500 hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="text-gray-500">›</span>
          <span className="text-gray-400">Blogs</span>
        </motion.div>

        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-14"
        >
          Blogs
        </motion.h1>

        {/* ── Popular ─────────────────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionLabel label="Popular" />
          {/* max-w-[1251px] grid with 60px gaps */}
          <div className="max-w-[1251px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[60px] gap-y-[60px]">
            {popularPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1251px] border-t border-white/10 mb-16" />

        {/* ── Newest ──────────────────────────────────────────────────────── */}
        <section>
          <SectionLabel label="Newest" delay={0.1} />
          <div className="max-w-[1251px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[60px] gap-y-[60px]">
            {newestPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <div className="pl-[90px] pr-[90px] max-w-[1431px] mx-auto">
        <Footer />
      </div>
    </div>
  );
}