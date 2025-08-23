import { Metadata } from 'next';
import React from 'react';
import { blogs } from '@/constants/blogs';
import Navbar from '@/features/landing/nav/Navbar';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page(props: PageProps) {
  // Await the params promise
  const params = await props.params;
  const selectedBlog = blogs.find((blog) => blog.slug === params.slug);

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
            {selectedBlog?.title || 'Blog Post'}
          </h1>
        </div>

        <div>
          <Image
            alt={selectedBlog?.slug || ''}
            src={selectedBlog?.imgUrl || ''}
            width={1000}
            height={400}
            className="w-full rounded-2xl h-[80vh] object-cover"
          />
          <p className="text-gray-500 mt-1 text-sm text-right">{selectedBlog?.date}</p>
          <h2 className="text-2xl font-semibold text-gray-800">{selectedBlog?.title}</h2>
          <p className="text-gray-600 mt-2 text-xl max-w-6xl">{selectedBlog?.description}</p>
          <p className="text-gray-600 mt-2 text-xl max-w-6xl">{selectedBlog?.content}</p>
        </div>
      </div>
    </div>
  );
}
