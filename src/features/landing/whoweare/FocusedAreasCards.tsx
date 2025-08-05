'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FocusedAreasCards() {
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; delay: number; duration: number }>
  >([]);

  // Fix hydration error by generating particles on client side only
  useEffect(() => {
    const generatedParticles = Array.from({ length: 15 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateY: -90,
      rotateX: -45,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatingAnimation = {
    y: [-5, 5, -5],
    rotateX: [5, -2, 5],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    },
  };

  return (
    <div className="w-full py-16 relative overflow-hidden">
      {/* Floating particles - only render after hydration */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}

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
              '0 0 20px rgba(110, 231, 183, 0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          Our Focused Areas
        </motion.span>
      </motion.p>

      {/* Fixed: Added proper padding to prevent cards from being cut off */}
      <div className="flex justify-center items-center px-4 md:px-8 lg:px-16">
        <motion.div
          className="flex md:flex-row flex-col items-center justify-center relative"
          style={{
            perspective: '1500px',
            // Fixed: Added extra width to accommodate hover transformations
            width: '100%',
            maxWidth: '1400px',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              variants={cardVariants}
              animate={floatingAnimation}
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
              // Fixed: Added exit transition for smooth return to original state
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                type: 'spring',
                stiffness: 200,
                damping: 25,
              }}
              whileTap={{
                scale: 0.95,
                rotateY: index % 2 === 0 ? 25 : -25,
                transition: { duration: 0.1 },
              }}
              style={{
                transformStyle: 'preserve-3d',
                // Fixed: Adjusted margins for better spacing and prevent cutoff
                marginLeft: index > 0 ? '-15px' : '0',
                marginRight: index === 0 || index === cards.length - 1 ? '20px' : '0',
                zIndex: cards.length - index,
              }}
            >
              <motion.div
                className="w-64 md:w-72 h-44 md:h-48 rounded-3xl shadow-2xl transform-gpu relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, 
                    ${
                      index === 0
                        ? '#6EE7B7, #34D399'
                        : index === 1
                          ? '#34D399, #10B981'
                          : index === 2
                            ? '#10B981, #059669'
                            : '#059669, #047857'
                    })`,
                  transform: `rotateY(${index === 0 ? '15deg' : index === 1 ? '5deg' : index === 2 ? '-5deg' : '-15deg'}) rotateX(5deg)`,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                }}
                whileHover={{
                  boxShadow: `0 35px 80px rgba(110, 231, 183, 0.4), 0 0 50px rgba(110, 231, 183, 0.3), inset 0 0 0 1px rgba(255,255,255,0.2)`,
                  transition: { duration: 0.3 },
                }}
                // Fixed: Added exit transition for shadow
                transition={{
                  boxShadow: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                  }}
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%), 
                                     radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 40% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                    backgroundSize: '200% 200%',
                  }}
                />

                {/* Glowing border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-30 group-hover:opacity-60"
                  style={{
                    background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    rotate: {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    },
                    opacity: { duration: 0.3 },
                  }}
                />

                <div className="h-full flex flex-col justify-center items-center p-4 md:p-6 text-center relative z-10">
                  <motion.h2
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-1 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.8, duration: 0.8 }}
                    whileHover={{
                      scale: 1.1,
                      textShadow: '0 0 20px rgba(0,0,0,0.5)',
                      transition: { duration: 0.2 },
                    }}
                    // Fixed: Added exit transition for text
                    style={{
                      transition: 'all 0.2s ease-out',
                    }}
                  >
                    {card.title}
                  </motion.h2>
                  <motion.h3
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-black leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 1, duration: 0.8 }}
                    whileHover={{
                      scale: 1.1,
                      textShadow: '0 0 20px rgba(0,0,0,0.5)',
                      transition: { duration: 0.2 },
                    }}
                    // Fixed: Added exit transition for text
                    style={{
                      transition: 'all 0.2s ease-out',
                    }}
                  >
                    {card.subtitle}
                  </motion.h3>
                </div>

                {/* Enhanced shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                  style={{
                    transform: 'translateX(-100%) skewX(-25deg)',
                  }}
                  whileHover={{
                    transform: 'translateX(200%) skewX(-25deg)',
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

              {/* Floating glow effect */}
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
                  scale: [1.2, 1.4, 1.2],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
