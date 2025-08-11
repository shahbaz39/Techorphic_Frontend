'use client'; // If using Next.js App Router; skip this for Pages Router

import { useEffect, useState } from 'react';

import HeroSection from '@/features/landing/hero/HeroSection';
import IndustryLeaders from '@/features/landing/industryLeaders/IndustryLeaders';
import Navbar from '@/features/landing/nav/Navbar';
import ServicesOverview from '@/features/landing/servicesOverview/servicesOverview';
import TrustedBy from '@/features/landing/trustedby/TrustedBy';
import VideoSection from '@/features/landing/videoSection/VideoSection';
import WhoWeAre from '@/features/landing/whoweare/WhoWeAre';
import InitialLoader from '@/components/custom/InitialLoader';
import FocusedAreasCards from '@/features/landing/whoweare/FocusedAreasCards';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionStorage.setItem('hasVisited', 'true');
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <InitialLoader />;
  }
  return (
    <>
      <div
        className="min-h-[100vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
      >
        {/* Original Navbar for hero section */}
        <div className="relative z-10">
          <Navbar />
        </div>
        <HeroSection />
      </div>
      {/* <ScrollSection /> */}
      {/* Additional sections */}
      <TrustedBy />
      <IndustryLeaders />
      <VideoSection />
      <WhoWeAre />
      <FocusedAreasCards />
      <ServicesOverview />
    </>
  );
}
