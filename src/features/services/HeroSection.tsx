'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { Variants } from 'framer-motion';

interface HeroSectionProps {
  caseStudies: any[];
  servicesPage?: any; // ✅ added servicesPage prop
}

// helper function to safely extract plain text from Strapi rich text blocks
const extractText = (blocks: any[]): string => {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .map((block) =>
      block?.children?.map((child: any) => child?.text || '').join(' ')
    )
    .join(' ');
};

const HeroSection: React.FC<HeroSectionProps> = ({ caseStudies, servicesPage }) => {
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

  const caseStudyVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
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
                verticalAlign: 'middle',
              }}
            >
              {servicesPage?.page_title || 'Web Development'}
             {' '}
              <span className="text-[#00FFBC]">
                {servicesPage?.city_name || 'Los Angeles'}
              </span>
            </h1>
          </div>

          <p className="font-[300] md:text-[33px] text-[30px] leading-[110%] tracking-[-1.7%] mt-16 max-w-5xl">
            {extractText(servicesPage?.intro_paragraph) ||
              `Here in California, innovation moves fast, and so do we. As a leading web development
              company in Los Angeles, Techorphic partners with startups and growing businesses to
              build websites and platforms that are smart, scalable, and customized for real-world
              success.`}
          </p>

          <p className="font-[300] md:text-[33px] text-[30px] leading-[110%] tracking-[-1.7%] mt-16 max-w-5xl">
            Need something{' '}
            <span className="font-bold">
              {servicesPage?.highlighted_text || 'simple/built to scale?'}
            </span>
          </p>

          <p className="font-[300] md:text-[33px] text-[30px] leading-[110%] tracking-[-1.7%] max-w-5xl">
            {extractText(servicesPage?.second_paragraph) ||
              `Whatever stage you're at, Techorphic blends creativity and code to build exactly what your business needs.`}
          </p>
        </div>

        {/* Bottom Content */}
        <div className="mt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-10 gap-6 max-w-7xl mx-auto"
          >
            {caseStudies.map((study, index) => {
              // preserve size mapping to keep same design
              const sizeClass =
                index === 0
                  ? 'md:col-span-10 h-[300px] md:h-[400px]'
                  : index === 1
                  ? 'md:col-span-5 h-[200px] md:h-[300px]'
                  : index === 2
                  ? 'md:col-span-5 h-[200px] md:h-[300px]'
                  : index === 3
                  ? 'md:col-span-6 h-[200px] md:h-[300px]'
                  : 'md:col-span-4 h-[200px] md:h-[300px]';

              return (
                <motion.div
                  key={index}
                  variants={caseStudyVariants}
                  className={`
                    rounded-xl p-6 flex flex-col justify-end relative overflow-hidden
                    cursor-pointer
                    ${sizeClass}
                  `}
                  style={{
                    backgroundImage: `url('${study.case_studies_img?.url || '/placeholder.svg'}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* <div className="relative z-10">
                    <p className="text-xl font-[400] text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
                      {study.case_studies_img_description?.[0]?.children?.[0]?.text || 'Case Study'}
                    </p>
                  </div> */}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
