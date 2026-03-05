"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Plus, Trash2, Star } from "lucide-react";
import { apiGetSection, apiSaveSection } from "@/lib/adminApi";
import type { BlogsData, BlogPost } from "@/lib/dataLoader";
import { toast } from "sonner";

function FieldInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] uppercase tracking-wider text-white/40">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm placeholder-white/25 focus:outline-none focus:border-blue-500/50 transition-all"
      />
    </div>
  );
}

function BlogRow({
  post,
  index,
  category,
  onChange,
  onRemove,
}: {
  post: BlogPost;
  index: number;
  category: string;
  onChange: (field: keyof BlogPost, value: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {category === "popular" && (
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
          )}
          <span className="text-xs text-white/40">
            {category === "popular" ? "Popular" : "Newest"} · Post {index + 1}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="text-red-400/50 hover:text-red-400 transition-colors"
        >
          <Trash2 size={13} />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <FieldInput
          label="Title"
          value={post.title}
          onChange={(v) => onChange("title", v)}
          placeholder="Blog post title..."
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <FieldInput
          label="Author"
          value={post.author}
          onChange={(v) => onChange("author", v)}
        />
        <FieldInput
          label="Read time (mins)"
          value={post.mins}
          onChange={(v) => onChange("mins", v)}
          type="number"
        />
        <FieldInput
          label="Date"
          value={post.date}
          onChange={(v) => onChange("date", v)}
          placeholder="December 09, 2025"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FieldInput
          label="Slug"
          value={post.slug}
          onChange={(v) => onChange("slug", v)}
          placeholder="my-blog-post"
        />
        <FieldInput
          label="Image path"
          value={post.image}
          onChange={(v) => onChange("image", v)}
          placeholder="/images/post.jpg"
        />
      </div>
    </div>
  );
}

export default function AdminBlogsPage() {
  const [data, setData] = useState<BlogsData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiGetSection<BlogsData>("blogs")
      .then(setData)
      .catch(() => {});
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      await apiSaveSection("blogs", data);
      toast.success("Blog posts saved!");
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  function updatePopular(idx: number, field: keyof BlogPost, value: string) {
    if (!data) return;
    const posts = [...data.popularPosts];
    posts[idx] = {
      ...posts[idx],
      [field]: field === "mins" || field === "id" ? Number(value) : value,
    } as BlogPost;
    setData({ ...data, popularPosts: posts });
  }

  function updateNewest(idx: number, field: keyof BlogPost, value: string) {
    if (!data) return;
    const posts = [...data.newestPosts];
    posts[idx] = {
      ...posts[idx],
      [field]: field === "mins" || field === "id" ? Number(value) : value,
    } as BlogPost;
    setData({ ...data, newestPosts: posts });
  }

  function addPost(category: "popular" | "newest") {
    if (!data) return;
    const newPost: BlogPost = {
      id: Date.now(),
      slug: `${category}-${Date.now()}`,
      title: "",
      author: "",
      mins: 5,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      image: "/images/case1.webp",
      category,
    };
    if (category === "popular") {
      setData({ ...data, popularPosts: [...data.popularPosts, newPost] });
    } else {
      setData({ ...data, newestPosts: [...data.newestPosts, newPost] });
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
          <h2 className="text-lg font-bold text-white">Blog Posts</h2>
          <p className="text-white/40 text-xs mt-0.5">
            {data.popularPosts.length} popular · {data.newestPosts.length}{" "}
            newest
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

      {/* Popular Posts */}
      <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden mb-4">
        <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <h3 className="text-sm font-semibold text-white/70">Popular Posts</h3>
        </div>
        <div className="p-5 space-y-3">
          {data.popularPosts.map((post, i) => (
            <BlogRow
              key={post.id}
              post={post}
              index={i}
              category="popular"
              onChange={(field, value) => updatePopular(i, field, value)}
              onRemove={() =>
                setData({
                  ...data,
                  popularPosts: data.popularPosts.filter((_, idx) => idx !== i),
                })
              }
            />
          ))}
          <button
            onClick={() => addPost("popular")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            <Plus size={15} /> Add Popular Post
          </button>
        </div>
      </div>

      {/* Newest Posts */}
      <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden mb-4">
        <div className="px-5 py-3 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white/70">Newest Posts</h3>
        </div>
        <div className="p-5 space-y-3">
          {data.newestPosts.map((post, i) => (
            <BlogRow
              key={post.id}
              post={post}
              index={i}
              category="newest"
              onChange={(field, value) => updateNewest(i, field, value)}
              onRemove={() =>
                setData({
                  ...data,
                  newestPosts: data.newestPosts.filter((_, idx) => idx !== i),
                })
              }
            />
          ))}
          <button
            onClick={() => addPost("newest")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            <Plus size={15} /> Add Newest Post
          </button>
        </div>
      </div>
    </div>
  );
}
