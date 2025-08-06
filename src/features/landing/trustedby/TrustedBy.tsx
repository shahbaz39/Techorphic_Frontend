'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

export default function TrustedBy() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: '-100px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced Counter animation component
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
    const counterInView = useInView(ref, { margin: '-50px' });

    useEffect(() => {
      if (counterInView) {
        const controls = animate(count, to, {
          duration,
          delay,
          ease: 'easeOut',
        });
        return () => controls.stop();
      } else {
        // Reset counter when out of view
        count.set(from);
      }
    }, [counterInView, count, to, duration, delay, from]);

    return (
      <motion.div
        ref={ref}
        className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-2"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={counterInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.6, delay: delay }}
      >
        <motion.span
          animate={
            counterInView
              ? {
                  textShadow: '0 0 20px rgba(255,255,255,0.3)',
                }
              : {}
          }
          transition={{ duration: 0.8, delay: delay + 0.5 }}
        >
          {rounded}
        </motion.span>
        <motion.span
          animate={
            counterInView
              ? {
                  scale: [1, 1.2, 1],
                  textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                }
              : {}
          }
          transition={{
            duration: 1,
            delay: delay + 1,
            repeat: counterInView ? Infinity : 0,
            repeatDelay: 2,
          }}
        >
          +
        </motion.span>
      </motion.div>
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

  // Floating particles animation
  const FloatingParticles = () => {
    if (!mounted) return null;

    return (
      <>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}-${isInView}`}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                    opacity: [0, 0.4, 0],
                    scale: [0, 1, 0],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: isInView ? Infinity : 0,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </>
    );
  };

  return (
    <motion.div
      ref={sectionRef}
      className="min-h-screen relative w-full bg-cover bg-center bg-black overflow-hidden"
      style={{ backgroundImage: "url('/features-bg.svg')" }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated bottom gradient */}
      <motion.div
        className="absolute bottom-0 w-full h-[10%] bg-gradient-to-t from-white to-transparent opacity-10"
        initial={{ y: 100 }}
        animate={isInView ? { y: 0 } : { y: 100 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(30px, 5vw, 60px) clamp(30px, 5vw, 60px)',
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 1.1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Animated gradient orbs in background */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={
          isInView
            ? {
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.3, 0.1],
              }
            : { scale: 0.8, opacity: 0.1 }
        }
        transition={{
          duration: 8,
          repeat: isInView ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
        animate={
          isInView
            ? {
                scale: [1.2, 0.8, 1.2],
                opacity: [0.3, 0.1, 0.3],
              }
            : { scale: 0.8, opacity: 0.1 }
        }
        transition={{
          duration: 6,
          repeat: isInView ? Infinity : 0,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Main Heading with enhanced animations */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16 mt-8 sm:mt-12 lg:mt-14"
          initial={{ opacity: 0, y: -80, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -80, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 100 }}
        >
          <motion.h1
            className="font-bold text-white mb-2 sm:mb-6 tracking-wide font-overcame relative"
            style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}
            initial={{ opacity: 0, rotateX: -15 }}
            animate={isInView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: -15 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Glowing text effect */}
            <motion.span
              className="absolute inset-0 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text blur-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              TRUSTED GLOBALLY BY
            </motion.span>
            <span className="relative z-10">TRUSTED GLOBALLY BY</span>
          </motion.h1>

          <motion.h2
            className="font-bold text-white mb-4 sm:mb-6 lg:mb-8 tracking-wide font-overcame"
            style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, delay: 0.7, type: 'spring', stiffness: 80 }}
          >
            VISIONARY BRANDS
          </motion.h2>

          <motion.p
            className="text-gray-300 font-light tracking-wide"
            style={{ fontSize: 'clamp(16px, 3vw, 36px)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Coding the World Together
          </motion.p>
        </motion.div>

        {/* Enhanced Statistics */}
        <motion.div
          className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 xl:gap-32 mb-8 sm:mb-12 lg:mb-16 w-full max-w-7xl p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.div
            className="text-center flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-5 border-b pb-6 sm:pb-8 border-white w-full lg:w-[50%] relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4 }}
            />

            <Counter from={0} to={4} duration={2} delay={1.3} />
            <motion.div
              className="text-white font-[300] text-center sm:text-left relative z-10"
              style={{ fontSize: 'clamp(20px, 4vw, 48px)' }}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <p>Years of</p>
              <p>Excellence</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-5 border-b pb-6 sm:pb-8 border-white w-full lg:w-[50%] relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4 }}
            />

            <Counter from={0} to={30} duration={2.5} delay={1.5} />
            <motion.div
              className="text-white font-[300] text-center sm:text-left relative z-10"
              style={{ fontSize: 'clamp(20px, 4vw, 48px)' }}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              <p>Cross-Functional</p>
              <p>Experts</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Brand Logos */}
        <motion.div
          className="w-full max-w-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 1.9 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
            {brandLogos.map((brand, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center p-3 sm:p-4 lg:p-6 border-l border-gray-600 min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] relative group overflow-hidden"
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                      }
                    : {
                        opacity: 0,
                        y: 30,
                        rotateY: -15,
                      }
                }
                transition={{
                  duration: 0.6,
                  delay: 2.1 + index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                  initial={{ y: '100%' }}
                  whileHover={{ y: '0%' }}
                  transition={{ duration: 0.3 }}
                />

                {/* Side glow effect */}
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="text-center relative z-10">
                  <motion.div
                    whileHover={{
                      rotate: [0, -5, 5, 0],
                      scale: 1.2,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={48}
                      height={48}
                      className="h-8 w-auto sm:h-10 lg:h-12 mx-auto filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300"
                    />
                  </motion.div>
                  <div className="text-white text-sm sm:text-base lg:text-lg font-medium hidden">
                    {brand.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <motion.div
            className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center"
            animate={
              isInView
                ? {
                    rotate: 360,
                    borderColor: [
                      'rgba(255,255,255,0.2)',
                      'rgba(59,130,246,0.5)',
                      'rgba(255,255,255,0.2)',
                    ],
                  }
                : { rotate: 0 }
            }
            transition={{
              rotate: {
                duration: 15,
                repeat: isInView ? Infinity : 0,
                ease: 'linear',
              },
              borderColor: {
                duration: 3,
                repeat: isInView ? Infinity : 0,
              },
            }}
          >
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={
                isInView
                  ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }
                  : { scale: 1, opacity: 0.5 }
              }
              transition={{
                duration: 2,
                repeat: isInView ? Infinity : 0,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
