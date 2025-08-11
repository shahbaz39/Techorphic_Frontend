'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DeepCurveCardChain() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${cardsRef.current.length * 500 + 500}`,
          pin: true,
          scrub: true,
        },
      });

      // Stronger curve and rotation — entry
      tl.fromTo(
        cardsRef.current,
        { x: '100vw', y: -80, rotateZ: 15 },
        {
          x: (i) => `${i * 130}px`,
          y: 0,
          rotateZ: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.25,
        },
        0,
      );

      // Stronger curve and rotation — exit
      tl.to(
        cardsRef.current,
        {
          x: '-100vw',
          y: -80,
          rotateZ: -15,
          duration: 1,
          ease: 'power3.in',
          stagger: 0.25,
        },
        cardsRef.current.length * 0.5,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-gray-950 text-white flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <h2 className="text-4xl font-bold mb-12 text-center">💫 Deep Curve Card Chain</h2>
      <div className="relative w-full max-w-7xl h-[260px] flex justify-center items-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el!)}
            className="absolute bg-white text-black rounded-xl p-8 shadow-xl w-[140px] h-[180px] flex items-center justify-center text-xl font-semibold"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </section>
  );
}
