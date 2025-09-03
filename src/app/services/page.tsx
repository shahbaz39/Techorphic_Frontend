
import Navbar from '@/features/landing/nav/Navbar';
import AgencyLosAngeles from '@/features/services/AgencyLosAngeles';
import HeroSection from '@/features/services/HeroSection';
import SolutionsCarousel from '@/features/services/SolutionsCarousel';
import Technologies from '@/features/services/Technologies';
import WebDevelopmentProcess from '@/features/services/WebDevelopmentProcess';
import WhyTechorphic from '@/features/services/WhyUs';
import React from 'react';
import { fetchHomepage } from '@/lib/api';

export default  async function page() {

   const homepageData = await fetchHomepage();

  const caseStudiesData = homepageData.case_studie?.[0] || null;
  return (
    <div
      className="min-h-[100vh] w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      {/* Original Navbar for hero section */}
      <div className="relative z-10">
        <Navbar />
      </div>
      <HeroSection caseStudies={caseStudiesData?.case_studie_Image || []} />
      <AgencyLosAngeles />
      <Technologies />
      <WhyTechorphic />
      <WebDevelopmentProcess />
      <SolutionsCarousel />
    </div>
  );
}
