"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  BarChart3,
  BookOpen,
  Layers,
  ArrowRight,
} from "lucide-react";
import { apiGetSection } from "@/lib/adminApi";
import type { BlogsData, ClientsData, TrustData } from "@/lib/dataLoader";

const sections = [
  {
    href: "/admin/about",
    label: "About Section",
    icon: Users,
    desc: "Team members, story, purpose & awards",
    color: "from-purple-600/20 to-purple-800/5",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
  },
  {
    href: "/admin/clients",
    label: "Clients",
    icon: Building2,
    desc: "Client logos & testimonials",
    color: "from-blue-600/20 to-blue-800/5",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    href: "/admin/trust",
    label: "Training Stats",
    icon: BarChart3,
    desc: "Happy clients, projects, ratings",
    color: "from-green-600/20 to-green-800/5",
    border: "border-green-500/20",
    iconColor: "text-green-400",
    iconBg: "bg-green-500/10",
  },
  {
    href: "/admin/blogs",
    label: "Blog Posts",
    icon: BookOpen,
    desc: "Popular and newest articles",
    color: "from-orange-600/20 to-orange-800/5",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: Layers,
    desc: "Branding, Technology & Experience slides",
    color: "from-pink-600/20 to-pink-800/5",
    border: "border-pink-500/20",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10",
  },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ blogs: 0, clients: 0, stats: 0 });

  useEffect(() => {
    Promise.all([
      apiGetSection<BlogsData>("blogs"),
      apiGetSection<ClientsData>("clients"),
      apiGetSection<TrustData>("trust"),
    ])
      .then(([blogs, clients, trust]) => {
        setCounts({
          blogs: blogs.popularPosts.length + blogs.newestPosts.length,
          clients: clients.clients.length,
          stats: trust.stats.length,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl">
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Welcome back 👋</h2>
        <p className="text-white/40 text-sm">
          Manage your website content from here. Changes are reflected
          immediately.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total Blog Posts",
            value: counts.blogs,
            color: "text-orange-400",
          },
          {
            label: "Client Logos",
            value: counts.clients,
            color: "text-blue-400",
          },
          {
            label: "Trust Stats",
            value: counts.stats,
            color: "text-green-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/[0.03] border border-white/8 rounded-xl p-4"
          >
            <p className="text-white/40 text-xs mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map(
          ({
            href,
            label,
            icon: Icon,
            desc,
            color,
            border,
            iconColor,
            iconBg,
          }) => (
            <Link
              key={href}
              href={href}
              className={`group relative bg-gradient-to-br ${color} border ${border} rounded-xl p-5 flex items-start gap-4 hover:border-opacity-50 transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className={`${iconBg} rounded-lg p-2.5 shrink-0`}>
                <Icon size={18} className={iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm mb-1">
                  {label}
                </div>
                <div className="text-white/40 text-xs leading-relaxed">
                  {desc}
                </div>
              </div>
              <ArrowRight
                size={15}
                className="text-white/20 group-hover:text-white/50 transition-colors shrink-0 mt-0.5"
              />
            </Link>
          ),
        )}
      </div>

      {/* Info box */}
      <div className="mt-6 bg-blue-600/5 border border-blue-500/10 rounded-xl p-4 flex gap-3">
        <div className="w-1 bg-blue-500/50 rounded-full shrink-0" />
        <div>
          <p className="text-blue-300/80 text-xs font-medium mb-0.5">
            How it works
          </p>
          <p className="text-white/30 text-xs leading-relaxed">
            Edit any section using the sidebar. Click{" "}
            <strong className="text-white/50">Save Changes</strong> in each
            editor to publish instantly. The public website reads data directly
            from your saved content.
          </p>
        </div>
      </div>
    </div>
  );
}
