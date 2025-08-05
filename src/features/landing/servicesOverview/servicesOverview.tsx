'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ServicesOverview() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseMove = (e, cardIndex) => {
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
      title: 'Software Solutions',
      items: [
        'Web Application Development',
        'Mobile App Development',
        'Cloud-Native Applications',
        'Blockchain Development',
        'MVP Development Services',
      ],
    },
    {
      title: 'Product & QA Services',
      items: [
        'Product Management & Strategy',
        'QA & Testing Services',
        'Maintenance & Optimization',
        'Landing Page Development',
      ],
    },
    {
      title: 'Cloud & Security Services',
      items: [
        'IoT Solutions',
        'Serverless Architecture',
        'Blockchain Solutions',
        'Cybersecurity Services',
      ],
    },
  ];

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

  const headerRef = useRef(null);
  const servicesRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const ctaRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, threshold: 0.1 });
  const caseStudiesInView = useInView(caseStudiesRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.3 });

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
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: {
        duration: 0.15,
        ease: 'easeInOut',
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

  const textRevealVariants = {
    hidden: {
      opacity: 0,
      y: 20,
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

  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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
    <div
      className="min-h-[100vh] w-full bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)',
            'linear-gradient(225deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)',
            'linear-gradient(45deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={textRevealVariants}
            className="text-4xl md:text-5xl font-bold mb-8 text-gray-800"
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Overview of Core Services
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              and Solutions
            </motion.span>
          </motion.h2>
          <motion.p
            variants={textRevealVariants}
            transition={{ delay: 0.6 }}
            className="font-[400] text-xl md:text-2xl text-gray-700"
          >
            Our Core Software <br /> Development Services
          </motion.p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          ref={servicesRef}
          initial="hidden"
          animate={servicesInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Static base glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-200/20 to-emerald-400/20 rounded-3xl blur-sm opacity-60" />

              {/* Dynamic mouse-following glow */}
              {hoveredCard === index && (
                <div
                  className="absolute w-32 h-32 bg-gradient-radial from-emerald-400/60 via-cyan-300/40 to-transparent rounded-full blur-xl opacity-80 pointer-events-none transition-opacity duration-300"
                  style={{
                    left: mousePosition.x - 64,
                    top: mousePosition.y - 64,
                    background: `radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(34, 197, 94, 0.4) 30%, rgba(6, 182, 212, 0.3) 60%, transparent 100%)`,
                  }}
                />
              )}

              {/* Enhanced hover glow layers */}
              {/* <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/30 via-cyan-400/20 to-emerald-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150" /> */}
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-emerald-300/40 to-emerald-500/40 rounded-3xl blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-150" /> */}

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="cursor-pointer bg-white/15 backdrop-blur-md rounded-3xl border border-[#00A77B]/40 p-8 h-full shadow-xl relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                }}
              >
                <motion.h3
                  className="text-2xl md:text-4xl font-bold text-emerald-600 mb-8 leading-tight max-w-[300px]"
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="group/item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: index * 0.1 + itemIndex * 0.05,
                        duration: 0.4,
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <p className="text-emerald-700 text-lg font-medium">{item}</p>
                      </div>
                      {itemIndex < service.items.length - 1 && (
                        <motion.div
                          className="w-full h-[.5px] bg-[#00A77B] mt-4"
                          initial={{ scaleX: 0 }}
                          animate={servicesInView ? { scaleX: 1 } : {}}
                          transition={{
                            delay: index * 0.1 + itemIndex * 0.05 + 0.2,
                            duration: 0.3,
                          }}
                          style={{ originX: 0 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center lg:text-left mb-6 lg:mb-0">
            <p className="text-2xl md:text-3xl text-gray-700">Have a project in mind?</p>
            <p className="text-2xl md:text-3xl text-gray-700">Let&#39;s shape it together</p>
          </motion.div>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="bg-black text-white px-12 py-3 rounded-md text-xl relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.15 }}
            />
            <span className="relative z-10">Get a Free Estimation</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Case Studies Section */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <motion.div
          ref={caseStudiesRef}
          initial="hidden"
          animate={caseStudiesInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            variants={textRevealVariants}
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800 uppercase"
          >
            Case Studies
          </motion.h2>
          <motion.p
            variants={textRevealVariants}
            className="mb-12 font-[400] text-xl md:text-2xl text-center text-gray-700"
          >
            Our Work in Action
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-16 max-w-7xl mx-auto"
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

          {/* Bottom text and link */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-4"
              variants={textRevealVariants}
            >
              We take your business as our personal <br /> and deliver more than beyond the
              boundaries
            </motion.p>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                href="#"
                className="text-xl md:text-2xl text-gray-800 underline underline-offset-4 hover:text-emerald-600 transition-colors duration-300"
              >
                Explore Our Latest Projects
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
