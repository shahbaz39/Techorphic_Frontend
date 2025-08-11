'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function WhyTechorphic() {
  const cardData = [
    {
      icon: '/support.svg',
      title: 'Full cycle support',
      description:
        "From MVP to enterprise and from development to support—we're here through it all.",
    },
    {
      icon: '/logic.svg',
      title: 'Local Expertise First',
      description: 'First: Clear timelines. No jargon. Regular updates.',
    },
    {
      icon: '/box.svg',
      title: 'Transparency',
      description: "We know LA's startup culture, competitive market, and fast-paced expectations.",
    },
    {
      icon: '/settings.svg',
      title: 'Custom Approach',
      description:
        'Every product we build is uniquely crafted for your audience, goals, and growth path.',
    },
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const cardRotations = useMemo(() => [-8, 4, -3, 6], []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardWidth = 300; // Wider cards to match image
      const cardSpacing = 0; // More spacing between cards
      const totalCardWidth = cardWidth + cardSpacing;
      const cardsPerRow = 4; // All cards in one row

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${cardData.length * 300 + 800}`, // Reduced scroll distance
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

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.3,
      );

      // Animate description
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.5,
      );

      // Entry animation - cards come from right in a single row
      tl.fromTo(
        cardsRef.current,
        { x: '100vw', y: 0, rotateZ: 15, opacity: 0 },
        {
          x: (i) => {
            const centerOffset = ((cardsPerRow - 1) * totalCardWidth) / 2;
            return `${i * totalCardWidth - centerOffset}px`;
          },
          y: 0, // Keep all cards at same vertical level
          rotateZ: (i) => cardRotations[i],
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
        },
        0.8,
      );

      // Hold cards in position - they stay visible and interactive
      tl.to(
        cardsRef.current,
        {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        cardData.length * 0.15 + 1.8,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [cardData.length, cardRotations]);

  return (
    <div
      ref={sectionRef}
      className="bg-black h-screen flex flex-col  w-full bg-cover bg-center items-center justify-center px-6 py-20 relative overflow-hidden"
      style={{ backgroundImage: "url('/features-bg.svg')" }}
    >
      {/* Content */}
      <div className="max-w-6xl w-full text-center relative z-10">
        {/* Main Title */}
        <div ref={titleRef} className="mb-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            WHY TECHORPHIC?
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 leading-tight">
            The Right Web Development Partner in Los Angeles
          </h2>
        </div>

        {/* Description */}
        <div ref={descriptionRef} className="mb-16 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            We&apos;re not just a web development company in Los Angeles, we&apos;re your strategic
            technology partner. Here&apos;s why LA businesses trust us:
          </p>
        </div>

        {/* Cards Grid */}
        <div className="relative w-full max-w-7xl h-[400px] flex justify-center items-center mt-16">
          {cardData.map((card, index) => (
            <div key={index} ref={(el) => (cardsRef.current[index] = el)} className="absolute">
              <div className="group relative cursor-pointer w-[300px]">
                {/* Main card */}
                <div className="relative rounded-3xl p-8 shadow-2xl border border-white/10 backdrop-blur-sm hover:scale-105 hover:rotate-0 hover:-translate-y-3 transition-all duration-500 h-[380px] flex flex-col justify-between">
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-[#00E2A6] rounded-3xl"></div>

                  {/* Icon placeholder - you'll add SVG here */}
                  <div className="relative mb-6">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={60}
                      height={60}
                      className="mx-auto mb-4"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative flex-1">
                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-black/90 mb-4 leading-tight">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-black/80 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
