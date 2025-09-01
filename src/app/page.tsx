// app/page.tsx (or wherever your page file is)

import { fetchHomepage } from '@/lib/api';
import HeroSection from '@/features/landing/hero/HeroSection';
import IndustryLeaders from '@/features/landing/industryLeaders/IndustryLeaders';
import Navbar from '@/features/landing/nav/Navbar';
import ServicesOverview from '@/features/landing/servicesOverview/servicesOverview';
import TrustedBy from '@/features/landing/trustedby/TrustedBy';
import VideoSection from '@/features/landing/videoSection/VideoSection';
import WhoWeAre from '@/features/landing/whoweare/WhoWeAre';
import FocusedAreasCards from '@/features/landing/whoweare/FocusedAreasCards';
import PageWrapper from './PageWrapper';
import ClientTestimonials from '@/features/landing/testimonials/ClientTestimonials';

export const revalidate = 60;

export default async function Home() {
  const homepageData = await fetchHomepage();

  if (!homepageData) {
    return <div className="p-4 text-red-500">❌ Failed to load homepage data</div>;
  }

  const industryLeadersData = homepageData.IndustryLeadersChoiceSection;
  // const whoWeAreData = homepageData.WhoWeAre;

  const whoWeAreRaw = homepageData.WhoWeAre?.[0]; // unwrap array
  const whoWeAreData = whoWeAreRaw
    ? {
        title: whoWeAreRaw.title,
        first_paragraph: whoWeAreRaw.paragraph_1?.[0]?.children?.[0]?.text || '',
        middle_paragraph: whoWeAreRaw.paragraph_2?.[0]?.children?.[0]?.text || '',
        second_paragraph: whoWeAreRaw.paragraph_3?.[0]?.children?.[0]?.text || '',
        final_paragraph: whoWeAreRaw.paragraph_4?.[0]?.children?.[0]?.text || '',
      }
    : null;
  // ✅ unwrap CoreSolution (it’s an array of length 1)
  const coreSolutionData = homepageData.CoreSolution?.[0] || null;

  const caseStudiesData = homepageData.case_studie?.[0] || null;
  

  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <div
        className="min-h-[100vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
      >
        <div className="relative z-10">
          <Navbar />
        </div>
        <HeroSection
          title={homepageData.title}
          subtitle={homepageData.subtitle}
          description={homepageData.description}
          technologies={homepageData.technology}
          ctaButtons={homepageData.cta_buttons}
        />
      </div>

      {/* TRUSTED BY */}
      <TrustedBy
        brandItems={homepageData.Brand_Items}
        stats={homepageData.stats}
        brandLogos={homepageData.Brand_logos}
      />

      {/* INDUSTRY LEADERS SECTION */}
      {industryLeadersData ? (
        <>
          <IndustryLeaders
            top_headline={industryLeadersData.top_headline}
            bottom_headline={industryLeadersData.bottom_headline}
            footer_description={industryLeadersData.footer_description}
            features={industryLeadersData.features || []}
            choice_video={industryLeadersData.choice_video}
          />
          <VideoSection
            top_headline={industryLeadersData.top_headline}
            bottom_headline={industryLeadersData.bottom_headline}
            footer_description={industryLeadersData.footer_description}
            choice_video={industryLeadersData.choice_video}
          />
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Industry leaders content not available</div>
        </div>
      )}

      {/* WHO WE ARE */}
      {whoWeAreData && (
        <>
          <WhoWeAre data={whoWeAreData} />
          <FocusedAreasCards data={whoWeAreRaw.focus_areas || []} />
        </>
      )}

      {/* SERVICES */}
      {coreSolutionData && <ServicesOverview data={coreSolutionData} />}
       
    </PageWrapper>
  );
}
