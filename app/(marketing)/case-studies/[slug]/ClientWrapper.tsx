"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Header */}
      <Header menuOpen={menuOpen} onToggleMenu={handleToggleMenu} />
      
      {/* Content */}
      {children}
    </div>
  );
}