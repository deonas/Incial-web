"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { apiGetSection, apiSaveSection } from "@/lib/adminApi";
import type { ServicesData, ServiceSlide } from "@/lib/dataLoader";
import { toast } from "sonner";
import SectionVisibilityToggle from "@/components/admin/SectionVisibilityToggle";

const inputCls =
  "w-full bg-transparent border border-[#1e1e1e] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#555] focus:outline-none focus:border-white/50 transition-all font-[Inter,sans-serif]";
const labelCls =
  "text-[10px] font-semibold text-[#8e8e8e] uppercase tracking-wider font-[Inter,sans-serif]";

const SLIDE_COLORS: Record<string, string> = {
  branding: "#2d1b69",
  technology: "#0a1628",
  experience: "#1a0a1e",
};
const SLIDE_ACCENT: Record<string, string> = {
  branding: "#a855f7",
  technology: "#3b82f6",
  experience: "#ec4899",
};

function SlideCard({
  title,
  slide,
  onChange,
}: {
  title: string;
  slide: ServiceSlide;
  onChange: (updated: ServiceSlide) => void;
}) {
  function updateService(idx: number, value: string) {
    const services = [...slide.services];
    services[idx] = value;
    onChange({ ...slide, services });
  }

  return (
    <div className="bg-transparent border border-[#1e1e1e] rounded-2xl p-5 space-y-4">
      <p className="text-white font-semibold text-sm font-[Poppins,sans-serif]">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className={labelCls}>Headline</label>
          <input
            type="text"
            value={slide.headline}
            onChange={(e) => onChange({ ...slide, headline: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Subheadline</label>
          <input
            type="text"
            value={slide.subheadline}
            onChange={(e) =>
              onChange({ ...slide, subheadline: e.target.value })
            }
            className={inputCls}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Description</label>
        <textarea
          rows={3}
          value={slide.description}
          onChange={(e) => onChange({ ...slide, description: e.target.value })}
          className={`${inputCls} resize-none`}
        />
      </div>
      <div className="space-y-2">
        <label className={labelCls}>Service Tags</label>
        <div className="space-y-2">
          {slide.services.map((svc, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={svc}
                onChange={(e) => updateService(i, e.target.value)}
                className={inputCls}
              />
              <button
                onClick={() =>
                  onChange({
                    ...slide,
                    services: slide.services.filter((_, j) => j !== i),
                  })
                }
                className="text-red-500/70 hover:text-red-500 shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              onChange({ ...slide, services: [...slide.services, ""] })
            }
            className="flex items-center gap-2 text-white hover:text-gray-300 text-xs font-medium transition-colors"
          >
            <Plus size={13} /> Add tag
          </button>
        </div>
      </div>
    </div>
  );
}

function SlidePreview({
  slide,
  slideKey,
}: {
  slide: ServiceSlide;
  slideKey: string;
}) {
  const bg = SLIDE_COLORS[slideKey] || "#111";
  const accent = SLIDE_ACCENT[slideKey] || "#fff";
  return (
    <div
      className="rounded-xl overflow-hidden p-6 flex flex-col justify-between min-h-[200px]"
      style={{ background: bg }}
    >
      <div>
        <div className="text-3xl font-bold text-white mb-1 font-[Poppins,sans-serif]">
          {slide.headline || "Headline"}
        </div>
        <div
          className="text-lg font-semibold mb-3 font-[Poppins,sans-serif]"
          style={{ color: accent }}
        >
          {slide.subheadline || "Subheadline"}
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-4 font-[Inter,sans-serif]">
          {slide.description || "Description…"}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {slide.services.map((svc, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full border font-[Inter,sans-serif]"
            style={{ borderColor: accent, color: accent }}
          >
            {svc}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AdminServicesPage() {
  const [data, setData] = useState<ServicesData | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeSlide, setActiveSlide] = useState<
    "branding" | "technology" | "experience"
  >("branding");

  useEffect(() => {
    apiGetSection<ServicesData>("services")
      .then(setData)
      .catch(() => {});
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      await apiSaveSection("services", data);
      toast.success("Services section saved!");
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  if (!data)
    return (
      <div className="flex items-center justify-center h-40 text-white/40">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading…
      </div>
    );

  const slides = {
    branding: data.branding,
    technology: data.technology,
    experience: data.experience,
  };
  const slideTitles = {
    branding: "Branding Slide",
    technology: "Technology Slide",
    experience: "Experience Slide",
  };

  return (
    <div className="flex flex-col h-full gap-0 font-[Inter,sans-serif]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h2 className="text-xl font-bold text-white font-[Poppins,sans-serif]">
            Services Section
          </h2>
          <p className="text-[#8e8e8e] text-sm mt-1">
            Edit the intro and all service slides.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <SectionVisibilityToggle
            sectionId="scrolling"
            label="Visible on Home"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-white hover:bg-gray-200 disabled:opacity-50 text-black text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* ── Split layout ── */}
      <div className="flex gap-8 flex-1 min-h-0">
        {/* LEFT: Form */}
        <div className="w-[420px] shrink-0 overflow-y-auto pr-2 space-y-5">
          {/* Intro */}
          <div className="bg-transparent border border-[#1e1e1e] rounded-2xl p-5 space-y-4">
            <p className="text-white font-semibold text-sm font-[Poppins,sans-serif]">
              Intro Slide
            </p>
            <div className="space-y-1.5">
              <label className={labelCls}>Title</label>
              <input
                type="text"
                value={data.introTitle}
                onChange={(e) =>
                  setData({ ...data, introTitle: e.target.value })
                }
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Subtitle</label>
              <input
                type="text"
                value={data.introSubtitle}
                onChange={(e) =>
                  setData({ ...data, introSubtitle: e.target.value })
                }
                className={inputCls}
              />
            </div>
          </div>

          {/* Slide tabs */}
          <div className="flex gap-2">
            {(["branding", "technology", "experience"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setActiveSlide(k)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize ${
                  activeSlide === k
                    ? "bg-white text-black"
                    : "border border-[#1e1e1e] text-[#8e8e8e] hover:text-white"
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          <SlideCard
            title={slideTitles[activeSlide]}
            slide={slides[activeSlide]}
            onChange={(updated) => setData({ ...data, [activeSlide]: updated })}
          />
        </div>

        {/* RIGHT: Live preview */}
        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-[#1e1e1e] bg-black flex flex-col">
          <div className="px-5 py-3 border-b border-[#1e1e1e] flex items-center justify-between shrink-0">
            <span className="text-[10px] font-semibold text-[#8e8e8e] uppercase tracking-widest">
              Live Preview — Services
            </span>
            <div className="flex gap-2">
              {(["branding", "technology", "experience"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setActiveSlide(k)}
                  className={`text-[10px] px-3 py-1 rounded-full transition-colors capitalize font-semibold ${
                    activeSlide === k
                      ? "bg-white text-black"
                      : "border border-[#1e1e1e] text-[#8e8e8e] hover:text-white"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Intro preview */}
            <div className="border border-[#1e1e1e] rounded-xl p-6 bg-black">
              <div className="text-[#8e8e8e] text-xs uppercase tracking-widest mb-2">
                Services
              </div>
              <h2 className="text-4xl font-bold text-white font-[Poppins,sans-serif] mb-1">
                {data.introTitle || "What We Do"}
              </h2>
              <p className="text-[#8e8e8e] text-sm font-[Inter,sans-serif]">
                {data.introSubtitle || "Our core offerings"}
              </p>
            </div>

            {/* Active slide preview */}
            <SlidePreview slide={slides[activeSlide]} slideKey={activeSlide} />

            {/* Other slides dim preview */}
            <div className="grid grid-cols-2 gap-3 opacity-40">
              {(["branding", "technology", "experience"] as const)
                .filter((k) => k !== activeSlide)
                .map((k) => (
                  <SlidePreview key={k} slide={slides[k]} slideKey={k} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
