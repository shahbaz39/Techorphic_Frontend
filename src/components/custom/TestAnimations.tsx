'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    const totalScroll = scrollContainer.scrollWidth - section.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollContainer.scrollWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          width: '300vw',
          height: '100vh',
        }}
      >
        <div
          style={{
            width: '100vw',
            background: '#f87171',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ fontSize: '3rem', color: '#fff' }}>Slide 1</h1>
        </div>
        <div
          style={{
            width: '100vw',
            background: '#60a5fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ fontSize: '3rem', color: '#fff' }}>Slide 2</h1>
        </div>
        <div
          style={{
            width: '100vw',
            background: '#34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ fontSize: '3rem', color: '#fff' }}>Slide 3</h1>
        </div>
      </div>
    </section>
  );
}
