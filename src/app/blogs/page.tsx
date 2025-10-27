// app/blogs/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/features/landing/nav/Navbar';
import { fetchBlogs, fetchBlogsPage } from '@/lib/api';

// ✅ ISR enabled: page will revalidate every 60 seconds
export const revalidate = 60; // ⏳ change to whatever interval you like

export default async function BlogList() {
  // Pre-rendered at build time, then revalidated every 60s
  const [blogsData, pageData] = await Promise.all([fetchBlogs(), fetchBlogsPage()]);

  const blogs = blogsData?.data || [];
  const blogPageData = pageData || null;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
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

      <div className="container mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-[400] mt-10 font-overcame text-black mb-4 leading-tight">
            YOUR SOURCE TO THE LATEST
            <br />
            TRENDS OF DIGITAL ERA
          </h1>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => {
              const { id, title, slug, excerpt, date, createdAt, publishedAt, thumbnail } = blog;

              let thumbnailUrl = null;
              if (thumbnail?.url) {
                const url = thumbnail.url;
                thumbnailUrl = url.startsWith('http')
                  ? url
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
              }

              return (
                <Link
                  key={id}
                  href={`/blogs/${slug}`}
                  className="group block hover:scale-105 transition-transform duration-300"
                >
                  {thumbnailUrl && (
                    <div className="relative h-[15rem] w-full overflow-hidden rounded-xl">
                      <Image
                        src={thumbnailUrl}
                        fill
                        alt={title || 'Blog Image'}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-gray-500 mt-1 text-sm text-right">
                    {formatDate(date) || formatDate(publishedAt) || formatDate(createdAt)}
                  </p>
                  <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {title}
                    </h2>
                    <p className="text-gray-600 mt-2 line-clamp-3">{excerpt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
