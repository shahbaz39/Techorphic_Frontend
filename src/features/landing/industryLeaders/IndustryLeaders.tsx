'use client';

import { motion } from 'framer-motion';

export default function IndustryLeaders() {
  const cardData = [
    'Long-Term Upgrade & Support Packages',
    'Native + Hybrid Mobile App Expertise',
    '100% Client Satisfaction Rate',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateZ: 0,
      scale: 0.8,
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      rotateZ: custom,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.8,
      },
    }),
    hover: {
      scale: 1.08,
      rotateZ: 0,
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 1,
      },
    },
  };

  const leftRotations = [-3, -6, -2];
  const rightRotations = [2, 5, -1];

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background gradient orbs for ambiance */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
          THE CHOICE OF
          <br />
          <span>INDUSTRY LEADERS</span>
        </h1>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full relative z-10"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-2 justify-center items-center">
          {cardData.map((text, index) => (
            <motion.div
              key={`left-${index}`}
              custom={leftRotations[index]}
              variants={cardVariants}
              whileHover="hover"
              className="group relative cursor-pointer max-w-[27rem]"
            >
              {/* Card shadow/glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-teal-400/30 to-cyan-400/30 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-300"></div>

              {/* Main card */}
              <div
                className={`relative  ${index === 0 ? 'bg-[#72F7D4]' : 'bg-[#11E5AD]'} rounded-[1.2rem] p-4 md:p-6 shadow-2xl border border-white/20 backdrop-blur-sm`}
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
              custom={rightRotations[index]}
              variants={cardVariants}
              whileHover="hover"
              className="group relative cursor-pointer max-w-[27rem]"
            >
              {/* Card shadow/glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-teal-400/30 to-cyan-400/30 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-300"></div>

              {/* Main card */}
              <div
                className={`relative bg-gradient-to-br ${index === 0 ? 'bg-[#72F7D4]' : 'bg-[#11E5AD]'} rounded-[1.2rem] p-4 md:p-6 shadow-2xl border border-white/20 backdrop-blur-sm`}
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
      </motion.div>
    </div>
  );
}
