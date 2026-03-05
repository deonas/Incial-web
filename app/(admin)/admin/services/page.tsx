"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { apiGetSection, apiSaveSection } from "@/lib/adminApi";
import type { ServicesData, ServiceSlide } from "@/lib/dataLoader";
import { toast } from "sonner";

function FieldEditor({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const base =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/90 text-sm placeholder-white/25 focus:outline-none focus:border-blue-500/50 transition-all";
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
    </div>
  );
}

function SlideEditor({
  title,
  slide,
  onChange,
  color,
}: {
  title: string;
  slide: ServiceSlide;
  onChange: (updated: ServiceSlide) => void;
  color: string;
}) {
  function updateService(idx: number, value: string) {
    const services = [...slide.services];
    services[idx] = value;
    onChange({ ...slide, services });
  }

  function addService() {
    onChange({ ...slide, services: [...slide.services, ""] });
  }

  function removeService(idx: number) {
    onChange({
      ...slide,
      services: slide.services.filter((_, i) => i !== idx),
    });
  }

  return (
    <div
      className={`bg-white/[0.03] border ${color} rounded-xl overflow-hidden mb-4`}
    >
      <div className="px-5 py-3 border-b border-white/5">
        <h3 className="text-sm font-semibold text-white/70">{title}</h3>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FieldEditor
            label="Headline"
            value={slide.headline}
            onChange={(v) => onChange({ ...slide, headline: v })}
          />
          <FieldEditor
            label="Subheadline"
            value={slide.subheadline}
            onChange={(v) => onChange({ ...slide, subheadline: v })}
          />
        </div>
        <FieldEditor
          label="Description"
          value={slide.description}
          onChange={(v) => onChange({ ...slide, description: v })}
          multiline
        />
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
            Service Tags
          </label>
          {slide.services.map((svc, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={svc}
                onChange={(e) => updateService(i, e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <button
                onClick={() => removeService(i)}
                className="text-red-400/50 hover:text-red-400 transition-colors text-xs"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addService}
            className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
          >
            + Add tag
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminServicesPage() {
  const [data, setData] = useState<ServicesData | null>(null);
  const [saving, setSaving] = useState(false);

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

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Services Section</h2>
          <p className="text-white/40 text-xs mt-0.5">
            Edit the intro and all service slides.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          Save Changes
        </button>
      </div>

      {/* Intro */}
      <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden mb-4">
        <div className="px-5 py-3 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white/70">Intro Slide</h3>
        </div>
        <div className="p-5 space-y-4">
          <FieldEditor
            label="Title"
            value={data.introTitle}
            onChange={(v) => setData({ ...data, introTitle: v })}
          />
          <FieldEditor
            label="Subtitle"
            value={data.introSubtitle}
            onChange={(v) => setData({ ...data, introSubtitle: v })}
          />
        </div>
      </div>

      <SlideEditor
        title="Branding Slide"
        slide={data.branding}
        onChange={(updated) => setData({ ...data, branding: updated })}
        color="border-purple-500/15"
      />
      <SlideEditor
        title="Technology Slide"
        slide={data.technology}
        onChange={(updated) => setData({ ...data, technology: updated })}
        color="border-blue-500/15"
      />
      <SlideEditor
        title="Experience Slide"
        slide={data.experience}
        onChange={(updated) => setData({ ...data, experience: updated })}
        color="border-pink-500/15"
      />
    </div>
  );
}
