import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LETSDISCUSS from '@/icons/LET’SDISCUSS';

const Navbar = () => {
  return (
    <nav className="w-full px-10 py-6">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
          >
            <Image src="/logo.svg" alt="Techorphic Logo" width={260} height={60} />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 text-[15px]">
          <Link
            href="/"
            className="text-[#323232]  hover:text-gray-900 font-[700] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-[#323232]  hover:text-gray-900 font-[700] transition-colors"
          >
            About
          </Link>
          <Link
            href="/software-development"
            className="text-[#323232]  hover:text-gray-900 font-[700] transition-colors"
          >
            Software Development
          </Link>
          <Link
            href="/mobile-app-development"
            className="text-[#323232]  hover:text-gray-900 font-[700] transition-colors"
          >
            Mobile App Development
          </Link>
          <Link
            href="/ui-ux-design"
            className="text-[#323232]  hover:text-gray-900 font-[700] transition-colors"
          >
            UI/UX Design
          </Link>
          <Link
            href="/case-study"
            className="text-[#323232]  hover:text-gray-900 font-[700] transition-colors"
          >
            Case Study
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/contact">
            <LETSDISCUSS />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-[#323232]  hover:text-gray-900 focus[700]ne-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (you can add state management to toggle this) */}
      <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
        <div className="flex flex-col space-y-4 pt-4">
          <Link href="/" className="text-[#323232]  hover:text-gray-900 font-[700]">
            Home
          </Link>
          <Link href="/about" className="text-[#323232]  hover:text-gray-900 font-[700]">
            About
          </Link>
          <Link
            href="/software-development"
            className="text-[#323232]  hover:text-gray-900 font-[700]"
          >
            Software Development
          </Link>
          <Link
            href="/mobile-app-development"
            className="text-[#323232]  hover:text-gray-900 font-[700]"
          >
            Mobile App Development
          </Link>
          <Link href="/ui-ux-design" className="text-[#323232]  hover:text-gray-900 font-[700]">
            UI/UX Design
          </Link>
          <Link href="/case-study" className="text-[#323232]  hover:text-gray-900 font-[700]">
            Case Study
          </Link>
          <Link href="/contact">
            <LETSDISCUSS />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
