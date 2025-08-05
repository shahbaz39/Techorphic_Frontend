'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FocusedAreasCards() {
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; delay: number; duration: number }>
  >([]);

  // Fix hydration error by generating particles on client side only
  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 3,
    }));
    setParticles(generatedParticles);
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
      title: 'Cloud services',
      subtitle: '& DevOps',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly faster stagger for a quicker reveal
        delayChildren: 0.5, // Delay the start of child animations after container appears
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 200, // Start much lower
      rotateX: 180, // Flip from the top (more dramatic)
      scale: 0, // Start completely invisible
      z: -200, // Further back in 3D space
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      z: 0,
      transition: {
        duration: 1.8, // Longer duration for a more drawn-out spring
        ease: 'easeOut',
        type: 'spring',
        stiffness: 80, // Less stiffness for a bouncier, more fluid feel
        damping: 12, // Less damping for more oscillation
        mass: 1.5, // Increased mass for a heavier, more impactful movement
      },
    },
  };

  // Enhanced floating animation with subtle rotation
  // const floatingAnimation = {
  //   y: [-8, 8, -8],
  //   rotateX: [3, -3, 3],
  //   rotateZ: [1, -1, 1],
  //   transition: {
  //     duration: 6,
  //     repeat: Number.POSITIVE_INFINITY,
  //     ease: 'easeInOut',
  //   },
  // };

  // // Gentle pulse animation for cards
  // const pulseAnimation = {
  //   scale: [1, 1.02, 1],
  //   transition: {
  //     duration: 4,
  //     repeat: Number.POSITIVE_INFINITY,
  //     ease: 'easeInOut',
  //   },
  // };

  return (
    <div className="w-full py-16 relative overflow-hidden">
      {/* Enhanced floating particles with different sizes */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute ${i % 3 === 0 ? 'w-2 h-2' : i % 3 === 1 ? 'w-1.5 h-1.5' : 'w-1 h-1'} ${
            i % 4 === 0
              ? 'bg-emerald-300/30'
              : i % 4 === 1
                ? 'bg-emerald-400/25'
                : i % 4 === 2
                  ? 'bg-teal-300/20'
                  : 'bg-cyan-300/15'
          } rounded-full`}
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(110, 231, 183, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 30%, rgba(52, 211, 153, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 70%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(110, 231, 183, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
      <motion.p
        className="uppercase font-bold text-3xl lg:text-5xl text-center mb-16 text-white"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.span
          animate={{
            textShadow: [
              '0 0 20px rgba(110, 231, 183, 0.3)',
              '0 0 40px rgba(110, 231, 183, 0.6)',
              '0 0 60px rgba(110, 231, 183, 0.4)',
              '0 0 20px rgba(110, 231, 183, 0.3)',
            ],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          Our Focused Areas
        </motion.span>
      </motion.p>
      <div className="flex justify-center items-center px-4 md:px-8 lg:px-16">
        <motion.div
          className="flex md:flex-row flex-col items-center justify-center relative"
          style={{
            perspective: '1500px',
            width: '100%',
            maxWidth: '1400px',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // This triggers the animation when the component comes into view
          viewport={{ once: true, amount: 0.2 }} // Ensures it only plays once when 20% of the component is visible
          // Add gentle container breathing animation
          animate={{
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              variants={cardVariants}
              // Removed initial/animate from here, now controlled by parent's whileInView
              whileHover={{
                y: -25,
                rotateY: index === 0 ? 15 : index === 3 ? -15 : index % 2 === 0 ? 8 : -8,
                rotateX: -10,
                scale: 1.1,
                z: 50,
                transition: {
                  duration: 0.4,
                  ease: 'easeOut',
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                },
              }}
              whileTap={{
                scale: 0.95,
                rotateY: index % 2 === 0 ? 25 : -25,
                transition: { duration: 0.1 },
              }}
              style={{
                transformStyle: 'preserve-3d',
                marginLeft: index > 0 ? '-15px' : '0',
                marginRight: index === 0 || index === cards.length - 1 ? '20px' : '0',
                zIndex: cards.length - index,
              }}
            >
              <motion.div
                className="w-64 md:w-72 h-44 md:h-48 rounded-3xl shadow-2xl transform-gpu relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${
                    index === 0
                      ? '#6EE7B7, #34D399'
                      : index === 1
                        ? '#34D399, #10B981'
                        : index === 2
                          ? '#10B981, #059669'
                          : '#059669, #047857'
                  })`,
                  transform: `rotateY(${
                    index === 0 ? '15deg' : index === 1 ? '5deg' : index === 2 ? '-5deg' : '-15deg'
                  }) rotateX(5deg)`,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                }}
                whileHover={{
                  boxShadow: `0 35px 80px rgba(110, 231, 183, 0.4), 0 0 50px rgba(110, 231, 183, 0.3), inset 0 0 0 1px rgba(255,255,255,0.2)`,
                  transition: { duration: 0.3 },
                }}
                // Add gentle color shifting animation
                animate={{
                  filter: [
                    'hue-rotate(0deg) brightness(1)',
                    'hue-rotate(5deg) brightness(1.05)',
                    'hue-rotate(0deg) brightness(1)',
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: index * 0.5,
                }}
              >
                {/* Enhanced animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: index * 0.3,
                  }}
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 40% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                    backgroundSize: '300% 300%',
                  }}
                />
                {/* Enhanced glowing border with pulsing effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-20 group-hover:opacity-60"
                  style={{
                    background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    rotate: {
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    },
                    opacity: {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                      delay: index * 0.2,
                    },
                  }}
                />
                <div className="h-full flex flex-col justify-center items-center p-4 md:p-6 text-center relative z-10">
                  <motion.h2
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-1 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      textShadow: [
                        '0 0 0px rgba(0,0,0,0)',
                        '0 2px 4px rgba(0,0,0,0.1)',
                        '0 0 0px rgba(0,0,0,0)',
                      ],
                    }}
                    transition={{
                      delay: index * 0.2 + 0.8,
                      duration: 0.8,
                      textShadow: {
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                        delay: index * 0.3,
                      },
                    }}
                    whileHover={{
                      scale: 1.1,
                      textShadow: '0 0 20px rgba(0,0,0,0.5)',
                      transition: { duration: 0.2 },
                    }}
                    style={{
                      transition: 'all 0.2s ease-out',
                    }}
                  >
                    {card.title}
                  </motion.h2>
                  <motion.h3
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-black leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      textShadow: [
                        '0 0 0px rgba(0,0,0,0)',
                        '0 2px 4px rgba(0,0,0,0.1)',
                        '0 0 0px rgba(0,0,0,0)',
                      ],
                    }}
                    transition={{
                      delay: index * 0.2 + 1,
                      duration: 0.8,
                      textShadow: {
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                        delay: index * 0.3 + 0.2,
                      },
                    }}
                    whileHover={{
                      scale: 1.1,
                      textShadow: '0 0 20px rgba(0,0,0,0.5)',
                      transition: { duration: 0.2 },
                    }}
                    style={{
                      transition: 'all 0.2s ease-out',
                    }}
                  >
                    {card.subtitle}
                  </motion.h3>
                </div>
                {/* Enhanced shine effect with continuous subtle animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                  style={{
                    transform: 'translateX(-100%) skewX(-25deg)',
                  }}
                  animate={{
                    opacity: [0, 0.1, 0],
                    transform: [
                      'translateX(-100%) skewX(-25deg)',
                      'translateX(0%) skewX(-25deg)',
                      'translateX(-100%) skewX(-25deg)',
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: index * 2,
                  }}
                  whileHover={{
                    transform: 'translateX(200%) skewX(-25deg)',
                    opacity: 1,
                    transition: { duration: 0.8, ease: 'easeInOut' },
                  }}
                />
                {/* Ripple effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  }}
                  whileHover={{
                    scale: [1, 1.5],
                    opacity: [0, 0.5, 0],
                    transition: { duration: 0.6 },
                  }}
                />
              </motion.div>
              {/* Enhanced floating glow effect with breathing animation */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-60 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${
                    index === 0
                      ? 'rgba(110, 231, 183, 0.4)'
                      : index === 1
                        ? 'rgba(52, 211, 153, 0.4)'
                        : index === 2
                          ? 'rgba(16, 185, 129, 0.4)'
                          : 'rgba(5, 150, 105, 0.4)'
                  } 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                  transform: 'scale(1.2)',
                }}
                animate={{
                  scale: [1.2, 1.5, 1.2],
                  opacity: [0, 0.2, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                  ease: 'easeInOut',
                }}
              />
              {/* New: Orbiting light effect */}
              <motion.div
                className="absolute w-2 h-2 rounded-full opacity-60 pointer-events-none"
                style={{
                  background: `${
                    index === 0
                      ? 'rgba(110, 231, 183, 0.8)'
                      : index === 1
                        ? 'rgba(52, 211, 153, 0.8)'
                        : index === 2
                          ? 'rgba(16, 185, 129, 0.8)'
                          : 'rgba(5, 150, 105, 0.8)'
                  }`,
                  filter: 'blur(2px)',
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 -100px',
                }}
                animate={{
                  rotate: [0, 360],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  rotate: {
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  },
                  opacity: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  },
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
