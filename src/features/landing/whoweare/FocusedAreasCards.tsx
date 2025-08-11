'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FocusedAreasCards() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardWidth = 256; // w-64 = 256px
      const cardSpacing = 18; // Reduced space between cards
      const totalCardWidth = cardWidth + cardSpacing;
      const cardsPerRow = 5;
      const rowSpacing = 60; // Space between rows

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${cardsRef.current.length * 500 + 500}`,
          pin: true,
          scrub: true,
        },
      });

      // Entry animation - cards come from right with proper spacing in 2 rows
      tl.fromTo(
        cardsRef.current,
        { x: '100vw', y: -80, rotateZ: 15 },
        {
          x: (i) => {
            const col = i % cardsPerRow;
            const centerOffset = ((cardsPerRow - 1) * totalCardWidth) / 2;
            return `${col * totalCardWidth - centerOffset}px`;
          },
          y: (i) => {
            const row = Math.floor(i / cardsPerRow);
            return `${row * (176 + rowSpacing) - rowSpacing / 2}px`; // 176px is card height (h-44)
          },
          rotateZ: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
        },
        0,
      );

      // Exit animation - cards go to left with proper spacing
      tl.to(
        cardsRef.current,
        {
          x: '-100vw',
          y: -80,
          rotateZ: -15,
          duration: 1,
          ease: 'power3.in',
          stagger: 0.15,
        },
        cardsRef.current.length * 0.2,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: 'Application',
      subtitle: 'Development',
    },
    {
      title: 'Website',
      subtitle: 'Development',
    },
    {
      title: 'Blockchain',
      subtitle: 'Development',
    },
    {
      title: 'Cloud Services',
      subtitle: '& DevOps',
    },
    {
      title: 'Mobile App',
      subtitle: 'Development',
    },
    {
      title: 'AI/ML',
      subtitle: 'Solutions',
    },
    {
      title: 'UI/UX',
      subtitle: 'Design',
    },
    {
      title: 'Data Analytics',
      subtitle: '& Insights',
    },
    {
      title: 'Data Analytics',
      subtitle: '& Insights',
    },
    {
      title: 'Data Analytics',
      subtitle: '& Insights',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-gray-950 text-white flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-emerald-950/90 to-emerald-500/90 z-0" />
      {/* Animated background gradient - rotated from left-to-right instead of left-to-right */}
      <div className="absolute inset-0 bg-black/60" />

      <p className="uppercase font-bold text-3xl z-40 font-overcame lg:text-5xl text-center mb-16 text-white">
        Our Focused Areas
      </p>

      <div className="relative w-full max-w-7xl h-[400px] flex justify-center items-center">
        {cards.map((card, index) => (
          <div key={index} ref={(el) => (cardsRef.current[index] = el!)} className="absolute">
            <div
              className={`w-64 h-44 rounded-3xl shadow-lg transform-gpu relative overflow-hidden cursor-pointer ${
                index % 4 === 0
                  ? 'rotate-2'
                  : index % 4 === 1
                    ? '-rotate-2'
                    : index % 4 === 2
                      ? 'rotate-2'
                      : '-rotate-2'
              }`}
              style={{
                background: 'linear-gradient(135deg, #6EE7B7 0%, #34D399 100%)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              {/* Subtle background pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                }}
              />

              {/* Content */}
              <div className="h-full flex flex-col justify-center items-center p-6 text-center relative z-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-black mb-1 leading-tight">
                  {card.title}
                </h2>
                <h3 className="text-2xl lg:text-3xl font-bold text-black leading-tight">
                  {card.subtitle}
                </h3>
              </div>

              {/* Subtle shine effect */}
              <div
                className="absolute top-0 left-0 w-full h-1 opacity-30"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
