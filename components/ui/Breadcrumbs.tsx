"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /**
   * Visual variant:
   * - "pill"  → centered blue pill badges (About page style)
   * - "link"  → standard text links (Blogs, Careers, Case Studies)
   */
  variant?: "pill" | "link";
  /** Text size override – only applied in "pill" variant */
  size?: "sm" | "base" | "lg";
  className?: string;
  /** Whether to animate entry */
  animate?: boolean;
}

const pillSizeMap: Record<NonNullable<BreadcrumbsProps["size"]>, string> = {
  sm: "text-[10px] px-3 py-1",
  base: "text-[12px] px-4 py-1.5",
  lg: "text-[15px] px-5 py-2",
};

const separatorSizeMap: Record<
  NonNullable<BreadcrumbsProps["size"]>,
  string
> = {
  sm: "text-[10px]",
  base: "text-[12px]",
  lg: "text-[15px]",
};

export default function Breadcrumbs({
  items,
  variant = "link",
  size = "sm",
  className = "",
  animate = true,
}: BreadcrumbsProps) {
  const content =
    variant === "pill" ? (
      <div
        className={`flex items-center justify-center gap-2 pt-6 pb-2 ${className}`}
      >
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2">
            {idx > 0 && (
              <span
                className={`text-[#49a8ff] rotate-90 inline-block ${separatorSizeMap[size]}`}
              >
                ›
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={`bg-[#05101e] text-[#49a8ff] font-[Poppins,sans-serif] rounded-full hover:brightness-110 transition-all ${pillSizeMap[size]}`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`bg-[#05101e] text-[#49a8ff] font-[Poppins,sans-serif] rounded-full ${pillSizeMap[size]}`}
              >
                {item.label}
              </span>
            )}
          </span>
        ))}
      </div>
    ) : (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="text-gray-500">›</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-400">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
}
