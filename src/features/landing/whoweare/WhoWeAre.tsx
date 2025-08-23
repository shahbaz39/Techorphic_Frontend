'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WhoWeAreProps {
  data: {
    title?: string;
    first_paragraph?: string;
    middle_paragraph?: string;
    second_paragraph?: string;
    final_paragraph?: string;
  };
}

export default function WhoWeAre({ data }: WhoWeAreProps) {
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
            {data?.title || 'Who We Are'}
          </motion.h1>

          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 mt-6 sm:mt-8 lg:mt-10">
            {/* First content block */}
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] items-center justify-between gap-6 lg:gap-8 w-full">
              <motion.p
                className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 order-2 lg:order-1"
                style={{ fontSize: 'clamp(16px, 3.5vw, 35px)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={slideInLeft}
                transition={{ delay: 0.2 }}
              >
                {data?.first_paragraph}
              </motion.p>

              {/* Floating brackets */}
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
                  style={{ fontSize: 'clamp(80px, 15vw, 256px)' }}
                  variants={bracketFloat}
                  animate="animate"
                >
                  {'}'}
                </motion.span>
                <motion.span
                  className="-translate-y-8 sm:-translate-y-16 lg:-translate-y-30 inline-block"
                  style={{ fontSize: 'clamp(80px, 15vw, 256px)' }}
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
              style={{ fontSize: 'clamp(15px, 3vw, 30px)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              {data?.middle_paragraph}
            </motion.p>

            {/* Second content block */}
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
                  style={{ fontSize: 'clamp(80px, 15vw, 256px)' }}
                  variants={bracketFloat}
                  animate="animate"
                >
                  {'}'}
                </motion.span>
                <motion.span
                  className="-translate-y-8 sm:-translate-y-16 lg:-translate-y-30 inline-block"
                  style={{ fontSize: 'clamp(80px, 15vw, 256px)' }}
                  variants={bracketFloatReverse}
                  animate="animate"
                >
                  {'{'}
                </motion.span>
              </motion.div>

              <motion.p
                className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 order-2"
                style={{ fontSize: 'clamp(16px, 3.5vw, 35px)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={slideInRight}
                transition={{ delay: 0.4 }}
              >
                {data?.second_paragraph}
              </motion.p>
            </div>

            {/* Final paragraph */}
            <motion.div
              className="leading-[130%] tracking-[-0.017em] py-6 sm:py-8 lg:py-10 max-w-full sm:max-w-[90%] lg:max-w-[80%] text-center"
              style={{ fontSize: 'clamp(15px, 3vw, 30px)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              {data?.final_paragraph}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
