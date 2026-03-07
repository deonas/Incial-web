"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { apiGetSection, apiSaveSection } from "@/lib/adminApi";
import type { SectionsConfig } from "@/lib/dataLoader";
import { toast } from "sonner";

interface SectionVisibilityToggleProps {
  sectionId: string;
  label?: string;
}

export default function SectionVisibilityToggle({
  sectionId,
  label = "Visible on Website",
}: SectionVisibilityToggleProps) {
  const [data, setData] = useState<SectionsConfig | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiGetSection<SectionsConfig>("sections")
      .then(setData)
      .catch(() => {});
  }, []);

  const sectionConfig = data?.sections.find((s) => s.id === sectionId);
  const isEnabled = sectionConfig?.enabled ?? true;

  async function handleToggle() {
    if (!data) return;
    setSaving(true);
    try {
      const newSections = data.sections.map((s) => {
        if (s.id === sectionId) {
          return { ...s, enabled: !s.enabled };
        }
        return s;
      });

      // If it doesn't exist, we could add it, but it should exist.
      if (!data.sections.find((s) => s.id === sectionId)) {
        newSections.push({
          id: sectionId,
          label: label,
          enabled: !isEnabled,
        });
      }

      await apiSaveSection("sections", { sections: newSections });
      setData({ ...data, sections: newSections });
      toast.success(isEnabled ? `${label} disabled.` : `${label} enabled.`);
    } catch {
      toast.error("Failed to update visibility.");
    } finally {
      setSaving(false);
    }
  }

  if (!data) {
    return (
      <div className="flex items-center gap-2 text-[#8e8e8e] text-sm">
        <Loader2 size={14} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-[#8e8e8e] uppercase tracking-wider font-[Inter,sans-serif]">
        {label}
      </span>
      <button
        onClick={handleToggle}
        disabled={saving}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
          isEnabled ? "bg-white" : "bg-[#2e2e2e]"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
            isEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
