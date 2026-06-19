import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientTestimonials from '@/features/landing/testimonials/ClientTestimonials';
import FAQsSection from '@/features/landing/FAQsSection/FAQsSection';
import Footer from '@/features/landing/footer/footer';
import { fetchHomepage } from '@/lib/api';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Techorphic',
  description: 'Techorphic — Scalable Software Development Services',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetched once on the server (deduped via cache() with the page-level fetch),
  // so the global sections render in the initial HTML — no empty -> populated
  // flicker after hydration.
  const data = await fetchHomepage();

  const footerData = data?.Footer?.[0] ?? null;
  const faqSection = data?.FAQSection?.[0] ?? null;
  const faqData = faqSection?.faqitem ?? [];
  const faqTitle = faqSection?.title ?? 'FAQS';
  const testimonials = data?.ClientTestimonial?.testimonialItem ?? [];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <ClientTestimonials testimonials={testimonials} />
        <FAQsSection faqs={faqData} title={faqTitle} />
        <Footer footer={footerData} />
      </body>
    </html>
  );
}
