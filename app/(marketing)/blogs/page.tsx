import { loadBlogsData } from "@/lib/dataLoader";
import BlogsClient from "@/components/features/blogs/BlogsClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Blogs | Incial",
  description: "Read our latest and popular blogs.",
};

export default function BlogsPage() {
  const blogsData = loadBlogsData();

  return (
    <BlogsClient
      popularPosts={blogsData.popularPosts}
      newestPosts={blogsData.newestPosts}
    />
  );
}
