'use client';

import { useEffect, useState } from 'react';
import InitialLoader from '@/components/custom/InitialLoader';
import ClientTestimonials from '@/features/landing/testimonials/ClientTestimonials';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionStorage.setItem('hasVisited', 'true');
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <InitialLoader />;
  }

  // ✅ When loading is complete, render ClientTestimonials + rest of page
  return (
    <>
      <ClientTestimonials />
      {children}
    </>
  );
}
