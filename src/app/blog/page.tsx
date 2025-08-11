import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/features/landing/nav/Navbar';
import { blogs } from '@/constants/blogs';

export default function BlogList() {
  return (
    <div
      className="min-h-[100vh] w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      {/* Original Navbar for hero section */}
      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-[400] mt-10 font-overcame text-black mb-4 leading-tight">
            YOUR SOURCE TO THE LATEST
            <br />
            TRENDS OF DIGITAL ERA
          </h1>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block">
              <Image
                src={blog.imgUrl}
                width={400}
                height={300}
                alt={blog.slug}
                className="rounded-xl h-[15rem]"
              />
              <p className="text-gray-500 mt-1 text-sm text-right">{blog.date}</p>
              <div className="mt-4">
                <h2 className="text-2xl font-semibold text-gray-800 ">{blog.title}</h2>
                <p className="text-gray-600 mt-2">{blog.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
