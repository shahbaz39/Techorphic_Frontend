'use client';

import { useEffect, useState } from 'react';
import InitialLoader from '@/components/custom/InitialLoader';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionStorage.setItem('hasVisited', 'true');
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Always render children */}
      {children}

      {/* Loader overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <InitialLoader />
        </div>
      )}
    </div>
  );
}
