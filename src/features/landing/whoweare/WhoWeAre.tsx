'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Mock FocusedAreasCards component
import FocusedAreasCards from './FocusedAreasCards';

export default function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const bracketFloat = {
    animate: {
      y: [-8, 8, -8],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const bracketFloatReverse = {
    animate: {
      y: [8, -8, 8],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1.5,
      },
    },
  };

  return (
    <div ref={ref} className="relative min-h-screen w-full flex text-white overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-l from-emerald-500/90 via-emerald-950/90 to-black z-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full backdrop-blur-2xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-black/60">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="font-bold mb-4 sm:mb-6 text-center py-6 sm:py-8 font-overcame lg:py-10"
            style={{ fontSize: 'clamp(30px, 6vw, 70px)' }}
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Who We Are
          </motion.h1>

          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 mt-6 sm:mt-8 lg:mt-10">
            {/* First content block with animated brackets */}
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] items-center justify-between gap-6 lg:gap-8 w-full">
              <motion.p
                className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 order-2 lg:order-1"
                style={{ fontSize: 'clamp(16px, 3.5vw, 38px)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={slideInLeft}
                transition={{ delay: 0.2 }}
              >
                At Techorphic, we deeply understand end-user needs. For example, if most of your
                business users are on mobile, we ensure your website is mobile-friendly, fast, and
                optimized for short attention spans. This user-focused approach means we don&apos;t
                just build apps; we build results.
              </motion.p>

              <motion.div
                className="gap-8 sm:gap-12 lg:gap-20 justify-center hidden md:flex text-[#00FFBC] order-1 lg:order-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={slideInRight}
                transition={{ delay: 0.4 }}
              >
                <motion.span
                  className="translate-y-2 sm:translate-y-4 lg:translate-y-10 inline-block"
                  style={{
                    fontSize: 'clamp(80px, 15vw, 256px)',
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 188, 0.6))',
                  }}
                  variants={bracketFloat}
                  animate="animate"
                >
                  {'}'}
                </motion.span>
                <motion.span
                  className="-translate-y-8 sm:-translate-y-16 lg:-translate-y-30 inline-block"
                  style={{
                    fontSize: 'clamp(80px, 15vw, 256px)',
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 188, 0.6))',
                  }}
                  variants={bracketFloatReverse}
                  animate="animate"
                >
                  {'{'}
                </motion.span>
              </motion.div>
            </div>

            {/* Middle paragraph */}
            <motion.p
              className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 max-w-full sm:max-w-[90%] lg:max-w-[80%] text-center"
              style={{ fontSize: 'clamp(15px, 3vw, 33px)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              With over 30 expert developers on board, we deliver fast, help businesses grow, and
              boost digital visibility in a shorter time.
            </motion.p>

            {/* Second content block with animated brackets */}
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] items-center justify-between gap-6 lg:gap-8 w-full">
              <motion.div
                className="md:flex hidden gap-8 sm:gap-12 lg:gap-20 justify-center text-[#00FFBC] order-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={slideInLeft}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  className="translate-y-2 sm:translate-y-4 lg:translate-y-10 inline-block"
                  style={{
                    fontSize: 'clamp(80px, 15vw, 256px)',
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 188, 0.6))',
                  }}
                  variants={bracketFloat}
                  animate="animate"
                >
                  {'}'}
                </motion.span>
                <motion.span
                  className="-translate-y-8 sm:-translate-y-16 lg:-translate-y-30 inline-block"
                  style={{
                    fontSize: 'clamp(80px, 15vw, 256px)',
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 188, 0.6))',
                  }}
                  variants={bracketFloatReverse}
                  animate="animate"
                >
                  {'{'}
                </motion.span>
              </motion.div>

              <motion.p
                className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 order-2"
                style={{ fontSize: 'clamp(16px, 3.5vw, 38px)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={slideInRight}
                transition={{ delay: 0.4 }}
              >
                The digital world is now more powerful than the physical one—and we help you realize
                your full value in it by building modern applications designed around user
                psychology.
              </motion.p>
            </div>

            {/* Final paragraph */}
            <motion.div
              className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 max-w-full sm:max-w-[90%] lg:max-w-[80%] text-center"
              style={{ fontSize: 'clamp(15px, 3vw, 33px)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              And since digital disruption never stops, we&apos;re here for the long haul—keeping
              your technology up to date and future-ready.
            </motion.div>

            {/* Focused Areas Cards */}
            <motion.div
              className="w-full mt-6 sm:mt-8 lg:mt-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
            >
              <FocusedAreasCards />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
