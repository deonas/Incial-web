"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { apiGetSection, apiSaveSection } from "@/lib/adminApi";
import type { AboutData, TeamMember, Award } from "@/lib/dataLoader";
import { toast } from "sonner";

function FieldEditor({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  const base =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/90 text-sm placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all";
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden mb-4">
      <div className="px-5 py-3 border-b border-white/5">
        <h3 className="text-sm font-semibold text-white/70">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiGetSection<AboutData>("about")
      .then(setData)
      .catch(() => {});
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      await apiSaveSection("about", data);
      toast.success("About section saved!");
    } catch {
      toast.error("Failed to save. Check your admin key.");
    } finally {
      setSaving(false);
    }
  }

  function updateMember(idx: number, field: keyof TeamMember, value: string) {
    if (!data) return;
    const members = [...data.teamMembers];
    members[idx] = { ...members[idx], [field]: value };
    setData({ ...data, teamMembers: members });
  }

  function addMember() {
    if (!data) return;
    const newMember: TeamMember = {
      id: String(Date.now()),
      name: "",
      role: "",
      img: "",
      objectPos: "center top",
    };
    setData({ ...data, teamMembers: [...data.teamMembers, newMember] });
  }

  function removeMember(idx: number) {
    if (!data) return;
    setData({
      ...data,
      teamMembers: data.teamMembers.filter((_, i) => i !== idx),
    });
  }

  function updateAward(idx: number, field: keyof Award, value: string) {
    if (!data) return;
    const awards = [...data.awards];
    awards[idx] = { ...awards[idx], [field]: value };
    setData({ ...data, awards });
  }

  function addAward() {
    if (!data) return;
    const newAward: Award = {
      id: String(Date.now()),
      name: "",
      description: "",
      year: "",
      icon: "",
    };
    setData({ ...data, awards: [...data.awards, newAward] });
  }

  function removeAward(idx: number) {
    if (!data) return;
    setData({ ...data, awards: data.awards.filter((_, i) => i !== idx) });
  }

  if (!data)
    return (
      <div className="flex items-center justify-center h-40 text-white/40">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading…
      </div>
    );

  return (
    <div className="max-w-3xl">
      {/* Save bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">About Section</h2>
          <p className="text-white/40 text-xs mt-0.5">
            Edit team info, story text, awards, and more.
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

      {/* Story */}
      <Card title="Our Story">
        <FieldEditor
          label="Title"
          value={data.storyTitle}
          onChange={(v) => setData({ ...data, storyTitle: v })}
        />
        <FieldEditor
          label="Story Text"
          value={data.storyText}
          onChange={(v) => setData({ ...data, storyText: v })}
          multiline
        />
      </Card>

      {/* Purpose */}
      <Card title="Our Purpose">
        <FieldEditor
          label="Title"
          value={data.purposeTitle}
          onChange={(v) => setData({ ...data, purposeTitle: v })}
        />
        <FieldEditor
          label="Purpose Text"
          value={data.purposeText}
          onChange={(v) => setData({ ...data, purposeText: v })}
          multiline
        />
      </Card>

      {/* Brand & Impact */}
      <Card title="Brand & Impact">
        <FieldEditor
          label="Brand Title"
          value={data.brandTitle}
          onChange={(v) => setData({ ...data, brandTitle: v })}
        />
        <FieldEditor
          label="Brand Text"
          value={data.brandText}
          onChange={(v) => setData({ ...data, brandText: v })}
          multiline
        />
        <FieldEditor
          label="Impact Title"
          value={data.impactTitle}
          onChange={(v) => setData({ ...data, impactTitle: v })}
        />
        <FieldEditor
          label="Impact Text"
          value={data.impactText}
          onChange={(v) => setData({ ...data, impactText: v })}
          multiline
        />
      </Card>

      {/* Images */}
      <Card title="Banner Images (URLs)">
        <FieldEditor
          label="Hero Banner URL"
          value={data.heroBanner}
          onChange={(v) => setData({ ...data, heroBanner: v })}
          placeholder="https://..."
        />
        <FieldEditor
          label="Brand Image URL"
          value={data.brandImage}
          onChange={(v) => setData({ ...data, brandImage: v })}
          placeholder="https://..."
        />
        <FieldEditor
          label="Impact Image URL"
          value={data.impactImage}
          onChange={(v) => setData({ ...data, impactImage: v })}
          placeholder="https://..."
        />
      </Card>

      {/* Team */}
      <Card title="Team Members">
        <div className="space-y-3">
          {data.teamMembers.map((member, i) => (
            <div
              key={member.id}
              className="bg-white/[0.03] border border-white/5 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-white/50">
                  Member {i + 1}
                </span>
                <button
                  onClick={() => removeMember(i)}
                  className="text-red-400/60 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FieldEditor
                  label="Name"
                  value={member.name}
                  onChange={(v) => updateMember(i, "name", v)}
                />
                <FieldEditor
                  label="Role"
                  value={member.role}
                  onChange={(v) => updateMember(i, "role", v)}
                />
              </div>
              <div className="mt-3">
                <FieldEditor
                  label="Photo URL"
                  value={member.img}
                  onChange={(v) => updateMember(i, "img", v)}
                  placeholder="https://..."
                />
              </div>
            </div>
          ))}
          <button
            onClick={addMember}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            <Plus size={15} /> Add Team Member
          </button>
        </div>
      </Card>

      {/* Awards */}
      <Card title="Awards & Recognitions">
        <div className="mb-3 space-y-1.5">
          <FieldEditor
            label="Section Title"
            value={data.awardsTitle}
            onChange={(v) => setData({ ...data, awardsTitle: v })}
          />
          <FieldEditor
            label="Section Subtitle"
            value={data.awardsSubtitle}
            onChange={(v) => setData({ ...data, awardsSubtitle: v })}
            multiline
          />
        </div>
        <div className="space-y-3">
          {data.awards.map((award, i) => (
            <div
              key={award.id}
              className="bg-white/[0.03] border border-white/5 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-white/50">
                  Award {i + 1}
                </span>
                <button
                  onClick={() => removeAward(i)}
                  className="text-red-400/60 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="space-y-2">
                <FieldEditor
                  label="Name"
                  value={award.name}
                  onChange={(v) => updateAward(i, "name", v)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FieldEditor
                    label="Description"
                    value={award.description}
                    onChange={(v) => updateAward(i, "description", v)}
                  />
                  <FieldEditor
                    label="Year"
                    value={award.year}
                    onChange={(v) => updateAward(i, "year", v)}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addAward}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            <Plus size={15} /> Add Award
          </button>
        </div>
      </Card>
    </div>
  );
}
