"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiLogin } from "@/lib/adminApi";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [secret, setSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const ok = await apiLogin(secret);
      if (ok) {
        router.push("/admin");
      } else {
        setError("Invalid secret key. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-[Inter,sans-serif]">
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <span className="text-black font-black text-lg">I</span>
            </div>
            <div>
              <div className="text-white font-bold text-xl tracking-wide font-[Poppins,sans-serif]">
                INCIAL
              </div>
              <div className="text-[11px] text-[#8e8e8e] uppercase tracking-widest">
                Admin Portal
              </div>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="border border-[#1e1e1e] rounded-3xl p-8 bg-transparent">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full border border-[#1e1e1e] flex items-center justify-center">
              <Lock size={14} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base font-[Poppins,sans-serif]">
                Sign In
              </h1>
              <p className="text-[#8e8e8e] text-xs">
                Enter your admin secret key
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
          >
            <div className="relative w-full border border-[#1e1e1e] rounded-full h-[42px] flex items-center px-4">
              <input
                type={showSecret ? "text" : "password"}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Secret key"
                required
                className="w-full bg-transparent outline-none text-white placeholder-[#8e8e8e] text-[15px]"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e8e8e] hover:text-white transition-colors"
              >
                {showSecret ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center w-full">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !secret}
              className="w-full bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-[14px] h-[42px] rounded-full transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Verifying…
                </>
              ) : (
                "Enter Admin Panel"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Incial · Internal Dashboard
        </p>
      </div>
    </div>
  );
}
