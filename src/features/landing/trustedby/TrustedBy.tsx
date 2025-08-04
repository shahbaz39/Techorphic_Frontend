'use client';

import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function TrustedBy() {
  // Counter animation component
  const Counter = ({
    from,
    to,
    duration = 2,
    delay = 0,
  }: {
    from: number;
    to: number;
    duration?: number;
    delay?: number;
  }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);

    useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const controls = animate(count, to, {
              duration,
              delay,
              ease: 'easeOut',
            });
            observer.disconnect();
            return () => controls.stop();
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(element);
      return () => observer.disconnect();
    }, [count, to, duration, delay]);

    return (
      <div ref={ref} className="text-4xl md:text-5xl font-semibold text-white mb-2">
        <motion.span>{rounded}</motion.span>+
      </div>
    );
  };

  const brandLogos = [
    { name: 'Sun', logo: '/company-logo-3.svg' },
    { name: 'SATYA Jewelry', logo: '/company-logo-2.svg' },
    { name: 'PHL', logo: '/company-logo-3.svg' },
    { name: 'Kerasse', logo: '/company-logo-4.svg' },
    { name: 'XIW', logo: '/company-logo-5.svg' },
    { name: 'Apteo', logo: '/company-logo-6.svg' },
  ];

  return (
    <div
      className="min-h-[100vh] relative w-full bg-cover bg-center bg-black"
      style={{ backgroundImage: "url('/features-bg.svg')" }}
    >
      <div className="absolute bottom-0 w-full h-[10%] bg-gradient-to-t from-white to-transparent opacity-10" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Heading */}
        <div className="text-center mb-16 mt-14">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-wide">
            TRUSTED GLOBALLY BY
          </h1>
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-wide">
            VISIONARY BRANDS
          </h2>
          <p className="text-xl md:text-4xl text-gray-300 font-light tracking-wide">
            Coding the World Together
          </p>
        </div>

        {/* Statistics */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 mb-16 w-full max-w-7xl p-8">
          <div className="text-center flex items-center gap-5 border-b pb-8 border-white w-[50%]">
            <Counter from={0} to={4} duration={2} delay={0.5} />
            <div className="text-3xl md:text-5xl text-white font-[300] text-left">
              <p>Years of</p>
              <p>Excellence</p>
            </div>
          </div>
          <div className="text-center flex items-center gap-5 border-b pb-8 border-white w-[50%]">
            <Counter from={0} to={30} duration={2.5} delay={0.7} />
            <div className="text-3xl md:text-5xl text-white font-[300] text-left">
              <p>Cross-Functional</p>
              <p>Experts</p>
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
            {brandLogos.map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 border-l border-gray-600 min-h-[120px]"
              >
                <div className="text-center">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={48}
                    height={48}
                    className="h-12 w-auto mx-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="text-white text-lg font-medium hidden">{brand.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
