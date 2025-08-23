'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AgencyLosAngeles() {
  // Refs for GSAP and animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);

  // Services data matching the image + additional services for scroll
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
        'Need a pilot platform to validate your ideas? Our MVP development converts concepts into working prototypes that can be launched quickly and iterated on based on real Los Angeles user feedback.',
    },
    {
      title: 'Mobile App Development',
      description:
        'From iOS to Android, we create mobile experiences that capture the innovative spirit of LA. Our apps are built for the fast-paced lifestyle of Angelenos.',
    },
    {
      title: 'Cloud Solutions',
      description:
        'Scalable cloud infrastructure designed for LA businesses. We leverage AWS, Azure, and Google Cloud to ensure your applications can handle Hollywood-scale traffic.',
    },
    {
      title: 'AI & Machine Learning',
      description:
        'Bringing cutting-edge AI to LA startups and enterprises. From chatbots to predictive analytics, we help businesses stay ahead of the tech curve.',
    },
    {
      title: 'E-commerce Development',
      description:
        'Custom e-commerce solutions for LA retailers and brands. We create shopping experiences that convert visitors into loyal customers. Creative energy. Our UI/UX team creates interfaces that are both beautiful and functional for the diverse LA market.',
    },
    {
      title: 'UI/UX Design',
      description:
        "Design that reflects LA's creative energy. Our UI/UX team creates interfaces that are both beautiful and functional for the diverse LA market. LA's creative energy. Our UI/UX team creates interfaces that are both beautiful and functional for the diverse LA market.",
    },
  ];

  // InView hooks
  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });

  // GSAP Horizontal Scroll Setup
  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    // Calculate the total scroll distance
    const totalScroll = scrollContainer.scrollWidth - section.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollContainer.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
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
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const textRevealVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 4px 20px rgba(79, 209, 197, 0.3)',
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 30px rgba(79, 209, 197, 0.4)',
      transition: {
        duration: 0.2,
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
    <div className="bg-black text-white relative overflow-hidden">
      {/* Horizontal Scrolling Services Section */}
      <section ref={sectionRef} className="h-screen overflow-hidden relative">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="container mx-auto px-6 pb-6 text-center relative z-10"
        >
          <motion.h1
            variants={textRevealVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-[400] font-overcame mb-4 "
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block"
            >
              PREMIER WEB DESIGN AND APP
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block"
            >
              DEVELOPMENT AGENCY IN LOS
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block"
            >
              ANGELES
            </motion.span>
          </motion.h1>

          <motion.p
            variants={textRevealVariants}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl lg:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed"
          >
            At Techorphic, we get what it takes to thrive in a city like LA. From the energy of
            Downtown startups to the creative pulse of Santa Monica, our web development solutions
            are built to fit your vibe and your business goals.
          </motion.p>
        </motion.div>
        <div
          ref={scrollContainerRef}
          className="flex h-fit items-center absolute bottom-1"
          style={{
            width: `${services.length * 360}px`, // Card width + gap
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              // whileHover="hover"
              className="flex-shrink-0 w-[380px]  group mx-4 bg-transparent rounded-2xl border text-[#00FFBC] border-[#00FFBC]"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className=" rounded-2xl p-8 min-h-[370px] relative overflow-hidden">
                {/* Card glow effect on hover */}
                {/* <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 " /> */}

                {/* Border gradient on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 "
                  style={{
                    background: 'linear-gradient(45deg, #4FD1C5, #38B2AC, #319795)',
                    padding: '2px',
                    margin: '-2px',
                  }}
                >
                  <div className="bg-gray-900 rounded-2xl w-full h-full" />
                </motion.div>

                <div className="relative z-10 h-full flex flex-col">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-[#00FFBC] mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    className="text-[#00FFBC] text-base md:text-lg leading-relaxed flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {service.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <div className="bg-black py-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="bg-[#00FFBC]  text-black font-[400] cursor-pointer px-12 py-3 rounded-[16px] text-xl relative overflow-hidden"
          >
            <motion.div className="absolute inset-0" />
            <span className="relative z-10">Get a Free Estimation</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
