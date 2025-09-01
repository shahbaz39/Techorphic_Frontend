import { Metadata } from "next";
import React from "react";
import Navbar from "@/features/landing/nav/Navbar";
import Image from "next/image";
import { fetchBlogs } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  // ✅ Fetch blogs from Strapi
  const blogsRes = await fetchBlogs();
  const blogs = blogsRes?.data || [];
  const selectedBlog = blogs.find((blog: any) => blog.slug === params.slug);

  if (!selectedBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Blog not found</h1>
      </div>
    );
  }

  // ✅ Thumbnail handling
  let thumbnailUrl = null;
  if (selectedBlog.thumbnail?.url) {
    const url = selectedBlog.thumbnail.url;
    thumbnailUrl = url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  }

  // ✅ Date formatting
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className="min-h-[100vh] w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-[400] mt-10 font-overcame text-black mb-4 leading-tight">
            {selectedBlog.title}
          </h1>
        </div>

        <div>
          {thumbnailUrl && (
            <Image
              alt={selectedBlog.title || "Blog image"}
              src={thumbnailUrl}
              width={1000}
              height={400}
              className="w-full rounded-2xl h-[80vh] object-cover"
            />
          )}

          <p className="text-gray-500 mt-1 text-sm text-right">
            {formatDate(selectedBlog.date) ||
              formatDate(selectedBlog.publishedAt)}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            {selectedBlog.title}
          </h2>
          <p className="text-gray-600 mt-2 text-xl max-w-6xl">
            {selectedBlog.excerpt}
          </p>

          {/* ✅ Render Strapi Rich Text properly */}
          <div className="prose lg:prose-lg mt-6 text-gray-700">
            {selectedBlog.content && (
              <BlocksRenderer content={selectedBlog.content} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
