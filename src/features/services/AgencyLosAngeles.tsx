'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AgencyLosAngeles() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  const handleMouseMove = (e: React.MouseEvent, cardIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    setHoveredCard(cardIndex);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const services = [
    {
      title: 'Custom Web Application Development',
      description:
        "We specialize in custom web app development for web-based tools, portals, dashboards, intranets, and more. Every app we build adapts to LA's pace and your unique workflow.",
    },
    {
      title: 'Web App Development Services',
      description:
        'Our web app development services include everything from UI/UX design to scalable architecture, full-stack engineering, cloud setup, and ongoing maintenance for LA-based businesses.',
    },
    {
      title: 'MVP Development',
      description:
        'Need a pilot platform to validate your idea? Our MVP development converts concepts into working prototypes that can be launched quickly and iterated on based on real Los Angeles user feedback.',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)',
    },
    hover: {
      scale: 1.05,
      boxShadow:
        '0 20px 25px -5px rgba(16, 185, 129, 0.4), 0 10px 10px -5px rgba(16, 185, 129, 0.2)',
      transition: {
        duration: 0.15,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div className="w-full bg-black text-white py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)',
            'linear-gradient(225deg, rgba(16, 185, 129, 0.08) 0%, transparent 100%)',
            'linear-gradient(45deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-wide"
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              PREMIER WEB DESIGN AND APP
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              DEVELOPMENT AGENCY IN LOS
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              ANGELES
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
          >
            At Techorphic, we get what it takes to thrive in a city like LA. From the energy of
            Downtown startups to the creative pulse of Santa Monica, our web development solutions
            are built to fit your vibe and your business goals.
          </motion.p>

          {/* Service Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="relative group"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Dynamic mouse-following glow */}
                {hoveredCard === index && (
                  <div
                    className="absolute w-32 h-32 bg-gradient-radial from-emerald-400/40 via-emerald-300/20 to-transparent rounded-full blur-xl opacity-80 pointer-events-none transition-opacity duration-300"
                    style={{
                      left: mousePosition.x - 64,
                      top: mousePosition.y - 64,
                      background: `radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(34, 197, 94, 0.2) 30%, rgba(6, 182, 212, 0.1) 60%, transparent 100%)`,
                    }}
                  />
                )}

                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-black border-2 border-emerald-500 rounded-lg p-8 h-full min-h-[300px] flex flex-col justify-start text-left relative overflow-hidden cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(16, 185, 129, 0.05) 100%)',
                  }}
                >
                  <motion.h3
                    className="text-xl md:text-2xl font-bold text-emerald-400 mb-6 leading-tight"
                    transition={{ duration: 0.2 }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-300 text-base md:text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/20 to-transparent" />
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg md:text-xl px-12 py-4 rounded-lg relative overflow-hidden group transition-all duration-300"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.15 }}
            />
            <span className="relative z-10">Get a Free Estimation</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
