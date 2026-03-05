"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/about": "About Section",
  "/admin/clients": "Clients Section",
  "/admin/trust": "Training & Trust Stats",
  "/admin/blogs": "Blog Posts",
  "/admin/services": "Services Section",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Admin";

  return (
    <header className="h-14 border-b border-white/5 px-6 flex items-center justify-between shrink-0 bg-[#0a0a0d]">
      <div>
        <h1 className="text-sm font-semibold text-white/90">{title}</h1>
        <p className="text-[11px] text-white/30 mt-0.5">incial.com / admin</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[11px] text-white/40">Live</span>
      </div>
    </header>
  );
}
