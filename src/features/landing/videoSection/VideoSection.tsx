'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function VideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.1 });

  // Animation variants for text only
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="md:min-h-screen w-full flex flex-col items-center justify-center px-4 py-20"
      style={{
        backgroundImage: "url('/hero-bg-2.svg')",
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Header Text */}
      <motion.div className="text-center mb-8 max-w-4xl" variants={itemVariants}>
        <motion.h2
          className="text-4xl md:text-5xl font-overcame lg:text-6xl font-bold text-black mb-6 leading-tight"
          variants={itemVariants}
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            THE CHOICE OF
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            INDUSTRY LEADERS
          </motion.span>
        </motion.h2>

        <motion.p
          className="text-base md:text-3xl text-gray-700 max-w-2xl mx-auto"
          variants={itemVariants}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Take a behind-the-scenes look at how we build
          <br />
          digital transformation success stories.
        </motion.p>
      </motion.div>

      {/* Video Thumbnail */}
      <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/hero-bg-2.svg"
          alt="Video thumbnail with abstract flowing shapes"
          fill
          className="object-cover"
        />
        {/* Play Button Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-cover"
          style={{ backgroundImage: "url('/videobg.svg')" }}
        >
          <button className="bg-white/60 hover:bg-white backdrop-blur-2xl transition-colors duration-200 rounded-2xl p-5 px-10 shadow-lg group">
            <div className="w-0 h-0 border-l-[24px] border-l-gray-800 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent ml-2 group-hover:border-l-gray-900 transition-colors duration-200"></div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
