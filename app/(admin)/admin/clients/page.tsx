"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { apiGetSection, apiSaveSection } from "@/lib/adminApi";
import type { ClientsData, Client, Testimonial } from "@/lib/dataLoader";
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
          rows={3}
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

export default function AdminClientsPage() {
  const [data, setData] = useState<ClientsData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiGetSection<ClientsData>("clients")
      .then(setData)
      .catch(() => {});
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      await apiSaveSection("clients", data);
      toast.success("Clients section saved!");
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  function updateClient(idx: number, field: keyof Client, value: string) {
    if (!data) return;
    const clients = [...data.clients];
    clients[idx] = { ...clients[idx], [field]: value };
    setData({ ...data, clients });
  }

  function addClient() {
    if (!data) return;
    const newClient: Client = { id: String(Date.now()), name: "", src: "" };
    setData({ ...data, clients: [...data.clients, newClient] });
  }

  function removeClient(idx: number) {
    if (!data) return;
    setData({ ...data, clients: data.clients.filter((_, i) => i !== idx) });
  }

  function updateTestimonial(
    idx: number,
    field: keyof Testimonial,
    value: string,
  ) {
    if (!data) return;
    const testimonials = [...data.testimonials];
    testimonials[idx] = { ...testimonials[idx], [field]: value };
    setData({ ...data, testimonials });
  }

  function addTestimonial() {
    if (!data) return;
    setData({
      ...data,
      testimonials: [
        ...data.testimonials,
        { id: String(Date.now()), quote: "", author: "" },
      ],
    });
  }

  function removeTestimonial(idx: number) {
    if (!data) return;
    setData({
      ...data,
      testimonials: data.testimonials.filter((_, i) => i !== idx),
    });
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
          <h2 className="text-lg font-bold text-white">Clients Section</h2>
          <p className="text-white/40 text-xs mt-0.5">
            Manage client logos and testimonials.
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

      <Card title="Section Header">
        <FieldEditor
          label="Header Text"
          value={data.headerText}
          onChange={(v) => setData({ ...data, headerText: v })}
          placeholder="Some of Our Awesome Clients:"
        />
      </Card>

      <Card title={`Client Logos (${data.clients.length})`}>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {data.clients.map((client, i) => (
            <div
              key={client.id}
              className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3"
            >
              <div className="flex-1 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={client.name}
                  onChange={(e) => updateClient(i, "name", e.target.value)}
                  placeholder="Client Name"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/25 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <input
                  type="text"
                  value={client.src}
                  onChange={(e) => updateClient(i, "src", e.target.value)}
                  placeholder="/clients/logo.png"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/25 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <button
                onClick={() => removeClient(i)}
                className="text-red-400/50 hover:text-red-400 transition-colors shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addClient}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2"
        >
          <Plus size={15} /> Add Client
        </button>
      </Card>

      <Card title="Testimonials">
        <div className="space-y-3">
          {data.testimonials.map((t, i) => (
            <div
              key={t.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/40">
                  Testimonial {i + 1}
                </span>
                <button
                  onClick={() => removeTestimonial(i)}
                  className="text-red-400/50 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="space-y-2">
                <FieldEditor
                  label="Quote"
                  value={t.quote}
                  onChange={(v) => updateTestimonial(i, "quote", v)}
                  multiline
                  placeholder="Client testimonial..."
                />
                <FieldEditor
                  label="Author"
                  value={t.author}
                  onChange={(v) => updateTestimonial(i, "author", v)}
                  placeholder="~ Client Name"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addTestimonial}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            <Plus size={15} /> Add Testimonial
          </button>
        </div>
      </Card>
    </div>
  );
}
