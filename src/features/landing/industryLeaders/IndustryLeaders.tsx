'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function IndustryLeaders() {
  const cardData = [
    'Long-Term Upgrade & Support Packages',
    'Native + Hybrid Mobile App Expertise',
    '100% Client Satisfaction Rate',
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false); // Reset first
            setTimeout(() => setIsVisible(true), 50); // Then trigger animation
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -100px 0px', // Trigger a bit before fully visible
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const leftRotations = [-3, -6, -2];
  const rightRotations = [2, 5, -1];

  // Framer Motion variants for fade-in (same as your CSS animation)
  const fadeInVariants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  // Framer Motion variants for drop-in (same as your CSS animation)
  const dropInVariants = {
    hidden: {
      opacity: 0,
      y: -200,
      scale: 0.9,
    },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1], // cubic-bezier(0.34, 1.56, 0.64, 1)
        delay: delay,
      },
    }),
  };

  return (
    <div
      ref={sectionRef}
      className="bg-black min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      {/* Background gradient orbs for ambiance */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      {/* Title with Framer Motion fade-in */}
      <motion.div
        className="text-center mb-20 relative z-10"
        variants={fadeInVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
          THE CHOICE OF
          <br />
          <span>INDUSTRY LEADERS</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full relative z-10">
        {/* Left Column */}
        <div className="flex flex-col gap-2 justify-center items-center">
          {cardData.map((text, index) => (
            <motion.div
              key={`left-${index}`}
              className="group relative cursor-pointer max-w-[27rem]"
              variants={dropInVariants}
              custom={isVisible ? 0.5 + index * 0.15 : 0}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
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
            </motion.div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2 justify-center items-center">
          {cardData.map((text, index) => (
            <motion.div
              key={`right-${index}`}
              className="group relative cursor-pointer max-w-[27rem]"
              variants={dropInVariants}
              custom={isVisible ? 0.65 + index * 0.15 : 0}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
