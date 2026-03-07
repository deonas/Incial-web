import { loadBlogBySlug, loadBlogsData } from "@/lib/dataLoader";
import BlogPostClient from "@/components/features/blogs/BlogPostClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = loadBlogBySlug(slug);
  if (!post) return { title: "Blog | Incial" };
  return {
    title: `${post.title} | Incial Blog`,
    description: `Read "${post.title}" by ${post.author} — ${post.mins} min read.`,
    openGraph: {
      title: post.title,
      description: `By ${post.author} · ${post.date}`,
      images: [{ url: post.image }],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = loadBlogBySlug(slug);

  if (!post) notFound();

  // Build related posts: same category, exclude current
  const data = loadBlogsData();
  const pool =
    post.category === "popular" ? data.popularPosts : data.newestPosts;
  const relatedPosts = pool.filter((p) => p.slug !== slug).slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
