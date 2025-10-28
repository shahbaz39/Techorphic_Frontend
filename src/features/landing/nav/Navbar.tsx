'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LETSDISCUSS from '@/icons/LET’SDISCUSS';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
          >
            <Image
              src="/logo.svg"
              alt="Techorphic Logo"
              width={200}
              height={45}
              className="w-auto h-8 sm:h-10 lg:h-12"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-[14px] xl:text-[15px]">
          <Link
            href="/"
            className="text-[#323232] hover:text-gray-900 font-[700] transition-colors whitespace-nowrap"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-[#323232] hover:text-gray-900 font-[700] transition-colors whitespace-nowrap"
          >
            Services
          </Link>
          <Link
            href="/blogs"
            className="text-[#323232] hover:text-gray-900 font-[700] transition-colors whitespace-nowrap"
          >
            Blogs
          </Link>

          
          <Link
            href="/free-audit"
            className="text-[#323232] hover:text-gray-900 font-[700] transition-colors whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block flex-shrink-0">
          <Link href="/contact">
            <LETSDISCUSS />
            {/* <button className="font-overcame bg-black rounded-md text-white font-bold pt-2 px-5">
              let&apos;s discuss
            </button> */}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-[#323232] hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-[#323232] hover:text-gray-900 font-[700] py-2 px-2 transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-[#323232] hover:text-gray-900 font-[700] py-2 px-2 transition-colors"
              onClick={closeMobileMenu}
            >
              Services
            </Link>
            <Link
              href="/blogs"
              className="text-[#323232] hover:text-gray-900 font-[700] py-2 px-2 transition-colors"
              onClick={closeMobileMenu}
            >
              Blogs
            </Link>
            <Link
              href="/free-audit"
              className="text-[#323232] hover:text-gray-900 font-[700] transition-colors whitespace-nowrap"
            >
              Who we are
            </Link>
            <Link
              href="/free-audit"
              className="text-[#323232] hover:text-gray-900 font-[700] py-2 px-2 transition-colors"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>

            <div className="pt-2">
              <Link href="/contact" onClick={closeMobileMenu}>
                <LETSDISCUSS />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
