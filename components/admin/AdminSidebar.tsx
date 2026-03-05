"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  BookOpen,
  Layers,
  LogOut,
} from "lucide-react";
import { apiLogout } from "@/lib/adminApi";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/about", label: "About", icon: Users },
  { href: "/admin/clients", label: "Clients", icon: Building2 },
  { href: "/admin/trust", label: "Training Stats", icon: BarChart3 },
  { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
  { href: "/admin/services", label: "Services", icon: Layers },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    apiLogout();
    router.push("/admin/login");
  }

  return (
    <aside className="w-60 shrink-0 border-r border-white/5 flex flex-col bg-[#0a0a0d]">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <span className="text-white text-xs font-black">I</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wide">
              INCIAL
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">
              Admin
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname.startsWith(href) && pathname !== "/admin";
          const dashboardActive = exact && pathname === "/admin";
          const active = isActive || dashboardActive;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                active
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon
                size={16}
                className={`shrink-0 ${active ? "text-blue-400" : "text-white/40 group-hover:text-white/60"}`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 w-full transition-all duration-150"
        >
          <LogOut size={16} className="shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
