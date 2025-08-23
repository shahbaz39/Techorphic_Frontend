"use client";

import { useEffect, useState } from "react";
import InitialLoader from "@/components/custom/InitialLoader";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionStorage.setItem("hasVisited", "true");
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <InitialLoader />;
  }

  return <>{children}</>;
}
