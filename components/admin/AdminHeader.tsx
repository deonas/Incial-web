"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/about": "About Section",
  "/admin/clients": "Clients Section",
  "/admin/trust": "Training & Trust Stats",
  "/admin/blogs": "Blog Posts",
  "/admin/casestudies": "Case Studies",
  "/admin/products": "Products",
  "/admin/settings": "Section Settings",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Admin";

  return (
    <header className="h-14 border-b border-[#1e1e1e] px-6 flex items-center justify-between shrink-0 bg-black">
      <div>
        <h1 className="text-sm font-semibold text-white/90 font-[Poppins,sans-serif]">
          {title}
        </h1>
        <p className="text-[11px] text-[#8e8e8e] mt-0.5 font-[Inter,sans-serif]">
          incial.com / admin
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-[11px] text-[#8e8e8e] font-[Inter,sans-serif]">
          Live
        </span>
      </div>
    </header>
  );
}
