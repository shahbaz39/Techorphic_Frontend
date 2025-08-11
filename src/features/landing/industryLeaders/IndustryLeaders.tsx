'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IndustryLeaders() {
  const cardData = [
    'Long-Term Upgrade & Support Packages',
    'Native + Hybrid Mobile App Expertise',
    '100% Client Satisfaction Rate',
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftCardsRef = useRef<HTMLDivElement[]>([]);
  const rightCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${cardData.length * 2 * 150}`, // Total cards count
          pin: true,
          scrub: true,
        },
      });

      // Animate title first
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        0,
      );

      // Animate left column cards
      leftCardsRef.current.forEach((card, index) => {
        tl.fromTo(
          card,
          { y: '100vh' },
          { y: 0, duration: 1, ease: 'power2.out' },
          0.5 + index * 0.3,
        );
      });

      // Animate right column cards with slight delay
      rightCardsRef.current.forEach((card, index) => {
        tl.fromTo(
          card,
          { y: '100vh' },
          { y: 0, duration: 1, ease: 'power2.out' },
          0.65 + index * 0.3,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [cardData.length]);

  const leftRotations = [-3, -6, -2];
  const rightRotations = [2, 5, -1];

  return (
    <div
      ref={sectionRef}
      className="bg-black min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      {/* Background gradient orbs for ambiance */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      {/* Title */}
      <div ref={titleRef} className="text-center mb-20 relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
          THE CHOICE OF
          <br />
          <span>INDUSTRY LEADERS</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full relative z-10">
        {/* Left Column */}
        <div className="flex flex-col gap-2 justify-center items-center">
          {cardData.map((text, index) => (
            <div
              key={`left-${index}`}
              ref={(el) => (leftCardsRef.current[index] = el!)}
              className="group relative cursor-pointer max-w-[27rem]"
              style={{
                transform: `rotate(${leftRotations[index]}deg)`,
              }}
            >
              {/* Card shadow/glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-teal-400/30 to-cyan-400/30 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-300"></div>

              {/* Main card */}
              <div
                className={`relative ${index === 0 ? 'bg-[#72F7D4]' : 'bg-[#11E5AD]'} rounded-[1.2rem] p-4 md:p-6 shadow-2xl border border-white/20 backdrop-blur-sm hover:scale-105 hover:rotate-0 hover:-translate-y-2 transition-all duration-300`}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-[2rem]"></div>

                <h3 className="relative text-2xl md:text-3xl lg:text-3xl font-bold text-black/90 leading-tight tracking-tight">
                  {text}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2 justify-center items-center">
          {cardData.map((text, index) => (
            <div
              key={`right-${index}`}
              ref={(el) => (rightCardsRef.current[index] = el!)}
              className="group relative cursor-pointer max-w-[27rem]"
              style={{
                transform: `rotate(${rightRotations[index]}deg)`,
              }}
            >
              {/* Card shadow/glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-teal-400/30 to-cyan-400/30 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-300"></div>

              {/* Main card */}
              <div
                className={`relative bg-gradient-to-br ${index === 0 ? 'bg-[#72F7D4]' : 'bg-[#11E5AD]'} rounded-[1.2rem] p-4 md:p-6 shadow-2xl border border-white/20 backdrop-blur-sm hover:scale-105 hover:rotate-0 hover:-translate-y-2 transition-all duration-300`}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-[2rem]"></div>

                <h3 className="relative text-2xl md:text-3xl lg:text-3xl font-bold text-black/90 leading-tight tracking-tight">
                  {text}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
