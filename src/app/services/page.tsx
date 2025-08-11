import Navbar from '@/features/landing/nav/Navbar';
import AgencyLosAngeles from '@/features/services/AgencyLosAngeles';
import HeroSection from '@/features/services/HeroSection';
import SolutionsCarousel from '@/features/services/SolutionsCarousel';
import Technologies from '@/features/services/Technologies';
import WebDevelopmentProcess from '@/features/services/WebDevelopmentProcess';
import WhyTechorphic from '@/features/services/WhyUs';
import React from 'react';

export default function page() {
  return (
    <div
      className="min-h-[100vh] w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      {/* Original Navbar for hero section */}
      <div className="relative z-10">
        <Navbar />
      </div>
      <HeroSection />
      <AgencyLosAngeles />
      <Technologies />
      <WhyTechorphic />
      <WebDevelopmentProcess />
      <SolutionsCarousel />
    </div>
  );
}
