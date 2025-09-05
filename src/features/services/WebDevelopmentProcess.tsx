'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WebDevelopmentProcessProps {
  data: {
    title?: string;
    description?: string;
    steps?: {
      id: number;
      title: string;
      items: { id: number; item_names: string }[];
    }[];
  } | null;
}

const WebDevelopmentProcess: React.FC<WebDevelopmentProcessProps> = ({ data }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerInView = useInView(headerRef, { once: false, amount: 0.3 });

  const processSteps = data?.steps || [];

  // Generate alternating rotations for cards
  const cardTransforms = processSteps.map((_, index) => ({
    rotation: index % 2 === 0 ? -5 : 5,
  }));

  useEffect(() => {
    const cards = cardsRef.current;
    const container = scrollContainerRef.current;

    if (!container || cards.length === 0) return;

    // Horizontal scroll animation
    gsap.to(cards, {
      x: () => -(container.scrollWidth - window.innerWidth + 200),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${container.scrollWidth}`,
        scrub: 1,
        pin: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [processSteps]);

  return (
    <section
      ref={sectionRef}
      className="h-screen overflow-hidden relative"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-10 pt-20">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-overcame text-black mb-4 tracking-tight whitespace-pre-line">
            {data?.title || 'OUR WEB DEVELOPMENT PROCESS'}
          </h2>
          <p className="text-lg md:text-xl text-gray-800 max-w-4xl mx-auto px-4 whitespace-pre-line">
            {data?.description ||
              'Be it a complex SaaS product, an interactive digital experience, or a powerful internal dashboard, our process keeps your build smart, focused, and aligned with your goals.'}
          </p>
        </motion.div>
      </div>

      {/* Cards Container */}
      <div className="absolute bottom-0 left-0 w-full h-3/5 flex items-center">
        <div
          ref={scrollContainerRef}
          className="flex items-center"
          style={{
            width: `${processSteps.length * 350}px`, // ✅ dynamic width
          }}
        >
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="flex-shrink-0 w-[320px] shadow-md relative"
              style={{
                transform: `rotate(${cardTransforms[index].rotation}deg)`,
                marginLeft: index > 0 ? '20px' : '0px',
                zIndex: index + 1,
              }}
            >
              <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 h-[300px] relative overflow-hidden border border-gray-800">
                <h3
                  className="text-2xl font-bold mb-8 leading-tight whitespace-pre-line"
                  style={{ color: '#00FFBC' }}
                >
                  {step.title}
                </h3>

                <div className="space-y-4">
                  {step.items?.map((item) => (
                    <div key={item.id} className="relative">
                      <div
                        className="text-base leading-relaxed whitespace-pre-line"
                        style={{ color: '#00FFBC' }}
                      >
                        {item.item_names}
                      </div>
                      {/* Underline effect */}
                      <div
                        className="h-px mt-2"
                        style={{ backgroundColor: '#00FFBC', opacity: 0.3 }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevelopmentProcess;
