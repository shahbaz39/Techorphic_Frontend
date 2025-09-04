'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  id: number;
  title: string;
  description: any; // Strapi Rich Text
}

interface PremierAgencySection {
  id: number;
  title: string;
  description: any; // Strapi Rich Text
  cta_button: string;
  cta_link: string;
  ServiceItem: ServiceItem[];
}

export default function AgencyLosAngeles({ data }: { data: PremierAgencySection[] | [] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);

  const section = Array.isArray(data) ? data[0] : null;
  const services = section?.ServiceItem || [];

  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });

  // GSAP Horizontal Scroll
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!sectionEl || !scrollContainer) return;
    const totalScroll = scrollContainer.scrollWidth - sectionEl.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
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

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    initial: { scale: 1, boxShadow: '0 4px 20px rgba(79, 209, 197, 0.3)' },
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 30px rgba(79, 209, 197, 0.4)',
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  return (
    <div className="bg-black text-white relative overflow-hidden">
      {/* Horizontal Section */}
      <section ref={sectionRef} className="h-screen overflow-hidden relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="container mx-auto px-6 pb-6 text-center relative z-10"
        >
          <motion.h1
            variants={textRevealVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-[400] font-overcame mb-4"
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block"
            >
              {section?.title || 'Premier Agency Section'}
            </motion.span>
          </motion.h1>

          <motion.div
            variants={textRevealVariants}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl lg:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed"
          >
            {section?.description ? <BlocksRenderer content={section.description} /> : ''}
          </motion.div>
        </motion.div>

        {/* Services Cards */}
        <div
          ref={scrollContainerRef}
          className="flex h-fit items-center absolute bottom-1"
          style={{ width: `${services.length * 360}px` }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="flex-shrink-0 w-[380px] group mx-4 bg-transparent rounded-2xl border text-[#00FFBC] border-[#00FFBC]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="rounded-2xl p-8 min-h-[370px] relative overflow-hidden">
                <div className="relative z-10 h-full flex flex-col">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-[#00FFBC] mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.div
                    className="text-[#00FFBC] text-base md:text-lg leading-relaxed flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {service.description ? <BlocksRenderer content={service.description} /> : ''}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {section?.cta_button && (
        <div className="bg-black py-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <motion.a
              href={section.cta_link || '#'}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="bg-[#00FFBC] text-black font-[400] cursor-pointer px-12 py-3 rounded-[16px] text-xl relative overflow-hidden inline-block"
            >
              <motion.div className="absolute inset-0" />
              <span className="relative z-10">{section.cta_button}</span>
            </motion.a>
          </motion.div>
        </div>
      )}
    </div>
  );
}
