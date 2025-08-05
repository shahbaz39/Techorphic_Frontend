import React from 'react';
import FocusedAreasCards from './FocusedAreasCards';

export default function WhoWeAre() {
  return (
    <div className="relative min-h-screen w-full flex text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/90 via-emerald-950/90 to-black z-0" />

      {/* Main content */}
      <div className="relative z-10 w-full backdrop-blur-2xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-black/60">
        <div className="max-w-7xl mx-auto">
          <h1
            className="font-bold mb-4 sm:mb-6 text-center py-6 sm:py-8 lg:py-10"
            style={{ fontSize: 'clamp(32px, 6vw, 80px)' }}
          >
            Who We Are
          </h1>

          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 mt-6 sm:mt-8 lg:mt-10">
            {/* First content block with brackets */}
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] items-center justify-between gap-6 lg:gap-8 w-full">
              <p
                className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 order-2 lg:order-1"
                style={{ fontSize: 'clamp(18px, 3.5vw, 48px)' }}
              >
                At Techorphic, we deeply understand end-user needs. For example, if most of your
                business users are on mobile, we ensure your website is mobile-friendly, fast, and
                optimized for short attention spans. This user-focused approach means we don&apos;t
                just build apps; we build results.
              </p>

              <div className=" gap-8 sm:gap-12 lg:gap-20 justify-center hidden md:flex text-[#00FFBC] order-1 lg:order-2">
                <span
                  className="translate-y-2 sm:translate-y-4 lg:translate-y-10"
                  style={{ fontSize: 'clamp(80px, 15vw, 256px)' }}
                >
                  {'}'}
                </span>
                <span
                  className="-translate-y-8 sm:-translate-y-16 lg:-translate-y-30"
                  style={{ fontSize: 'clamp(80px, 15vw, 256px)' }}
                >
                  {'{'}
                </span>
              </div>
            </div>

            {/* Middle paragraph */}
            <p
              className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 max-w-full sm:max-w-[90%] lg:max-w-[80%] text-center"
              style={{ fontSize: 'clamp(16px, 3vw, 36px)' }}
            >
              With over 30 expert developers on board, we deliver fast, help businesses grow, and
              boost digital visibility in a shorter time.
            </p>

            {/* Second content block with brackets */}
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] items-center justify-between gap-6 lg:gap-8 w-full">
              <div className="md:flex hidden gap-8 sm:gap-12 lg:gap-20 justify-center text-[#00FFBC] order-1">
                <span
                  className="translate-y-2 sm:translate-y-4 lg:translate-y-10"
                  style={{ fontSize: 'clamp(80px, 15vw, 256px)' }}
                >
                  {'}'}
                </span>
                <span
                  className="-translate-y-8 sm:-translate-y-16 lg:-translate-y-30"
                  style={{ fontSize: 'clamp(80px, 15vw, 256px)' }}
                >
                  {'{'}
                </span>
              </div>

              <p
                className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 order-2"
                style={{ fontSize: 'clamp(18px, 3.5vw, 48px)' }}
              >
                The digital world is now more powerful than the physical one—and we help you realize
                your full value in it by building modern applications designed around user
                psychology.
              </p>
            </div>

            {/* Final paragraph */}
            <div
              className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 max-w-full sm:max-w-[90%] lg:max-w-[80%] text-center"
              style={{ fontSize: 'clamp(16px, 3vw, 36px)' }}
            >
              And since digital disruption never stops, we&apos;re here for the long haul—keeping
              your technology up to date and future-ready.
            </div>

            {/* Focused Areas Cards */}
            <div className="w-full mt-6 sm:mt-8 lg:mt-12">
              <FocusedAreasCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
