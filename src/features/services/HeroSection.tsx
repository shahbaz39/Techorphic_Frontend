'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import React from 'react';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };
  const caseStudyVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
  const caseStudies = [
    {
      title: 'Skip Tracing Platform Development',
      size: 'large',
      imageUrl: '/placeholder.svg?height=400&width=700',
    },
    {
      title: 'Skip Tracing Platform',
      size: 'small',
      imageUrl: '/placeholder.svg?height=300&width=350',
    },
    {
      title: 'Branding',
      size: 'small',
      imageUrl: '/placeholder.svg?height=300&width=350',
    },
    {
      title: 'Skip Tracing Platform',
      size: 'custom-60',
      imageUrl: '/placeholder.svg?height=300&width=420',
    },
    {
      title: 'Branding',
      size: 'custom-40',
      imageUrl: '/placeholder.svg?height=300&width=280',
    },
  ];
  return (
    <section className="w-full px-6 py-16 pb-[8rem]">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="flex flex-col w-full justify-between">
          {/* Left Column - Main Heading */}
          <div className="w-[50%]">
            <h1
              className="font-normal leading-[60px] mt-10 md:text-[50px] text-[40px] hidden md:block tracking-[-0.017em] text-[#020209]"
              style={{
                fontFamily: 'Overcame Demo, system-ui, -apple-system, sans-serif',
                // textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
                verticalAlign: 'middle',
              }}
            >
              Web Development
              <br />
              Leaders in <span className="text-[#00FFBC]">Los Angeles</span>
            </h1>
          </div>

          <p className="font-[300] md:text-[33px] text-[30px] leading-[110%] tracking-[-1.7%] mt-16 max-w-5xl">
            Here in California, innovation moves fast, and so do we. As a leading web development
            company in Los Angeles, Techorphic partners with startups and growing businesses to
            build websites and platforms that are smart, scalable, and customized for real-world
            success.
          </p>

          <p className="font-[300] md:text-[33px] text-[30px] leading-[110%] tracking-[-1.7%] mt-16 max-w-5xl">
            Need something <span className="font-bold ">simple/built to scale?</span>
          </p>
          <p className="font-[300] md:text-[33px] text-[30px] leading-[110%] tracking-[-1.7%] max-w-5xl">
            Whatever stage you&apos;re at, Techorphic blends creativity and code to build exactly
            what your business needs.
          </p>
        </div>

        {/* Bottom Content */}
        <div className="mt-20">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-10 gap-6 max-w-7xl mx-auto"
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                variants={caseStudyVariants}
                className={`
                  rounded-xl p-6 flex flex-col justify-end relative overflow-hidden
                  bg-gradient-to-br from-gray-200 to-gray-300
                  ${study.size === 'large' ? 'md:col-span-10 h-[300px] md:h-[400px]' : ''}
                  ${study.size === 'small' ? 'md:col-span-5 h-[200px] md:h-[300px]' : ''}
                  ${study.size === 'custom-60' ? 'md:col-span-6 h-[200px] md:h-[300px]' : ''}
                  ${study.size === 'custom-40' ? 'md:col-span-4 h-[200px] md:h-[300px]' : ''}
                `}
                style={{
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="relative z-10">
                  <p className="text-xl font-[400] text-[#000000]">{study.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
