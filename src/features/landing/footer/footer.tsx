'use client';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative w-full bg-[#00FFBC] text-black pt-0 ">
      {/* Top black strip */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-5xl font-extrabold pt-8">techorphic</h3>
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 relative">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col">
            <p className="text-lg leading-relaxed max-w-[280px]">
              At Techorphic, an experienced IT software development company, we help businesses like
              yours figure out what&apos;s next, whether you&apos;re launching something new or just
              need a second opinion.
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 flex flex-col space-y-4 text-base">
            {' '}
            {/* Changed text-lg to text-base */}
            <p>Sabzazar Scheme, Lahore</p>
            <p>
              <a href="mailto:info@techorphic.com" className="hover:underline">
                info@techorphic.com
              </a>
            </p>
            <p>
              <a href="tel:+923086232070" className="hover:underline">
                +92 308 6232 070
              </a>
            </p>
            <Button className="bg-black text-white px-6 py-3 rounded-md text-base font-semibold shadow-lg hover:bg-gray-800 w-fit">
              LET&apos;S DISCUSS
            </Button>
          </div>

          {/* Social Media Links */}
          <div className="col-span-1 flex flex-col space-y-4 md:items-end m">
            {' '}
            {/* Removed lg:items-start */}
            <Button className="bg-black text-[#22CDA0] w-[8rem] py-3 rounded-md text-base font-semibold shadow-lg hover:bg-gray-800">
              instagram
            </Button>
            <Button className="bg-black text-[#22CDA0] w-[8rem] py-3 rounded-md text-base font-semibold shadow-lg hover:bg-gray-800">
              Facebook
            </Button>
            <Button className="bg-black text-[#22CDA0] w-[8rem] py-3 rounded-md text-base font-semibold shadow-lg hover:bg-gray-800">
              Linkedin
            </Button>
          </div>

          {/* To Top Button */}
          <button
            onClick={scrollToTop}
            className="absolute right-4 md:bottom-10 lg:-bottom-20 bg-black text-white w-7 h-22 rounded-2xl flex flex-col items-center justify-center text-xs uppercase font-semibold shadow-lg hover:bg-gray-800 transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 mb-1" />
            <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              TO TOP
            </span>{' '}
            {/* Vertical text */}
          </button>
        </div>

        {/* Copyright Section */}
        <div className="px-4 py-8 border-t-2 border-black w-[92%] text-lg mt-20">
          <p>All Rights Reserved | Techorphic</p>
        </div>
      </div>
    </footer>
  );
}
