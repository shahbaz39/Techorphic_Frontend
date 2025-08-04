import React from 'react';
import FocusedAreasCards from './FocusedAreasCards';

export default function WhoWeAre() {
  return (
    <div className="relative min-h-screen w-full flex text-white overflow-hidden ">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/90 via-emerald-950/90 to-black z-0" />

      {/* Main content */}
      <div className="relative z-10 w-full backdrop-blur-2xl px-6 py-12 bg-black/60 ">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center py-10">Who We Are</h1>
          <div className="flex flex-col items-center justify-center space-y-8 mt-10">
            <div className="grid grid-cols-[55%_45%] items-center justify-between">
              <p className="text-4xl py-10 leading-[130%] tracking-[-0.017em]">
                At Techorphic, we deeply understand end-user needs. For example, if most of your
                business users are on mobile, we ensure your website is mobile-friendly, fast, and
                optimized for short attention spans. This user-focused approach means we don’t just
                build apps; we build results.
              </p>
              <div className="text-[16rem] flex gap-20 justify-center text-[#00FFBC]">
                <span className="translate-y-10">{'}'}</span>
                <span className="-translate-y-30">{'{'}</span>
              </div>
            </div>
            <p className="text-3xl py-10 leading-[130%] tracking-[-0.017em] max-w-[80%]">
              With over 30 expert developers on board, we deliver fast, help businesses grow, and
              boost digital visibility in a shorter time.
            </p>
            <div className="grid grid-cols-[45%_55%] items-center justify-between">
              <div className="text-[16rem] flex gap-20 justify-center text-[#00FFBC]">
                <span className="translate-y-10">{'}'}</span>
                <span className="-translate-y-30">{'{'}</span>
              </div>
              <p className="text-4xl py-10 leading-[130%] tracking-[-0.017em]">
                The digital world is now more powerful than the physical one—and we help you realize
                your full value in it by building modern applications designed around user
                psychology.
              </p>
            </div>
            <div className="text-3xl py-10 leading-[130%] tracking-[-0.017em] max-w-[80%]">
              And since digital disruption never stops, we&apos;re here for the long haul—keeping
              your technology up to date and future-ready.
            </div>
            <div>
              <FocusedAreasCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
