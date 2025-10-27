// app/page.tsx
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
import Script from "next/script";

export const revalidate = 60;

// ✅ Page Metadata (SEO)
export const metadata = {
  title: "Techorphic | Scalable Software Development Services",
  description:
    "Techorphic delivers scalable, intuitive solutions — from apps processing 1M+ payments monthly to healthcare tools speeding up signups by 40%.",
  keywords: [
    "Techorphic",
    "software development",
    "custom apps",
    "scalable solutions",
    "healthcare software",
    "enterprise applications",
  ],
  openGraph: {
    title: "Techorphic | Scalable Software Development",
    description:
      "We build scalable, intuitive apps that power growth — from fintech to healthcare and beyond.",
    url: "https://your-domain.com",
    siteName: "Techorphic",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Techorphic Software Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Techorphic | Scalable Software Development",
    description:
      "Apps processing over 1M payments monthly and tools boosting healthcare signups by 40%.",
    images: ["https://your-domain.com/og-image.jpg"],
  },
};

export default async function Home() {
  const homepageData = await fetchHomepage();

  if (!homepageData) {
    return <div className="p-4 text-red-500">❌ Failed to load homepage data</div>;
  }

  const industryLeadersData = homepageData.IndustryLeadersChoiceSection;

  const whoWeAreRaw = homepageData.WhoWeAre?.[0];
  const whoWeAreData = whoWeAreRaw
    ? {
        title: whoWeAreRaw.title,
        first_paragraph: whoWeAreRaw.paragraph_1?.[0]?.children?.[0]?.text || '',
        middle_paragraph: whoWeAreRaw.paragraph_2?.[0]?.children?.[0]?.text || '',
        second_paragraph: whoWeAreRaw.paragraph_3?.[0]?.children?.[0]?.text || '',
        final_paragraph: whoWeAreRaw.paragraph_4?.[0]?.children?.[0]?.text || '',
      }
    : null;

  const coreSolutionData = homepageData.CoreSolution?.[0] || null;
  const caseStudiesData = homepageData.case_studie?.[0] || null;

  return (
    <PageWrapper>
      {/* ✅ JSON-LD Schema (safe with next/script) */}
      <Script
        id="ld-json-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Techorphic",
            url: "https://your-domain.com",
            logo: "https://your-domain.com/logo.png",
            sameAs: [
              "https://linkedin.com/company/techorphic",
              "https://twitter.com/techorphic",
            ],
          }),
        }}
      />

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
      {coreSolutionData && (
        <ServicesOverview
          data={coreSolutionData}
          caseStudies={caseStudiesData}
        />
      )}
    </PageWrapper>
  );
}
