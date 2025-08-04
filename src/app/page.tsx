import FAQsSection from '@/features/landing/FAQsSection/FAQsSection';
import Footer from '@/features/landing/footer/footer';
import FreeAuditForm from '@/features/landing/freeAuditForm/FreeAuditForm';
import HeroSection from '@/features/landing/hero/HeroSection';
import IndustryLeaders from '@/features/landing/industryLeaders/IndustryLeaders';
import Navbar from '@/features/landing/nav/Navbar';
import ServicesOverview from '@/features/landing/servicesOverview/servicesOverview';
import ClientTestimonials from '@/features/landing/testimonials/ClientTestimonials';
import TrustedBy from '@/features/landing/trustedby/TrustedBy';
import VideoSection from '@/features/landing/videoSection/VideoSection';
import WhoWeAre from '@/features/landing/whoweare/WhoWeAre';

export default function Home() {
  return (
    <>
      <div
        className="min-h-[100vh] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
      >
        <Navbar />
        <HeroSection />
      </div>
      <TrustedBy />
      <IndustryLeaders />
      <VideoSection />
      <WhoWeAre />
      <ServicesOverview />
      <ClientTestimonials />
      <FreeAuditForm />
      <FAQsSection />
      <Footer />
    </>
  );
}
