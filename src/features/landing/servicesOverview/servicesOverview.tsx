'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudyImage {
  id: number;
  case_studies_img: { url: string };
  case_studies_img_description: Array<{ children: Array<{ text: string }> }>;
  case_studies_pdf?: { url: string };
}

interface CaseStudiesData {
  title: string;
  description: string;
  case_studie_Image: CaseStudyImage[];
  case_studies_footer_description: string;
  explore_button: string;
  explore_button_link: string;
}

interface ServicesOverviewProps {
  data: {
    title: string;
    subtitle: string;
    cta_title: string;
    cta_description: string;
    cta_button: string;
    ServicesCategory: Array<{
      id: number;
      category_title: string;
      servicename: Array<{
        id: number;
        name: string;
      }>;
    }>;
  };
  caseStudies?: CaseStudiesData | null;
}

// Case Study Modal Component
const CaseStudyModal = ({ 
  isOpen, 
  onClose, 
  caseStudy 
}: {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: {
    id: number;
    title: string;
    imageUrl: string;
    pdfUrl: string | null;
    description?: string;
  } | null;
}) => {
  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url('${caseStudy.imageUrl}')` }}
              />
              
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {caseStudy.title}
                </h2>
                
                <p className="text-gray-600 mb-6">
                  {caseStudy.description || 'No description available.'}
                </p>
                
                {caseStudy.pdfUrl && (
                  <div className="mt-6">
                    <a
                      href={caseStudy.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download Full Case Study PDF
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ServicesOverview({
  data,
  caseStudies: caseStudiesProp,
}: ServicesOverviewProps) {
  // Add state for the modal
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<{
    id: number;
    title: string;
    imageUrl: string;
    pdfUrl: string | null;
    description?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs for GSAP
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Other refs
  const headerRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const ctaRef = useRef(null);

  // InView hooks - must be called before any conditional returns
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const caseStudiesInView = useInView(caseStudiesRef, { once: true, amount: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  // GSAP Horizontal Scroll Setup
  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

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

  // Error handling for undefined data
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: Services data is not available</div>
      </div>
    );
  }

  const { title, subtitle, cta_title, cta_description, cta_button, ServicesCategory } = data;

  // Dynamic rotation logic
  const getCardRotation = (index: number) => {
    return index % 2 === 0 ? '-rotate-2' : 'rotate-2';
  };

  const services =
    ServicesCategory?.map((category) => ({
      title: category.category_title,
      items: category.servicename?.map((service) => service.name.replace(/\n+/g, '').trim()) || [],
    })) || [];

  // Case studies mapping
  const caseStudies =
    caseStudiesProp?.case_studie_Image?.map((image, index) => {
      let size = 'small';
      if (index === 0) size = 'large';
      else if (index % 4 === 1 || index % 4 === 2) size = 'small';
      else if (index % 4 === 3) size = 'custom-60';
      else if (index % 4 === 0 && index > 0) size = 'custom-40';

      return {
        id: image.id,
        title: image.case_studies_img_description?.[0]?.children?.[0]?.text || 'Case Study',
        size,
        imageUrl: image.case_studies_img?.url || '/placeholder.svg?height=400&width=700',
        pdfUrl: image.case_studies_pdf?.url || null,
        description: image.case_studies_img_description?.[0]?.children?.[1]?.text || '',
      };
    }) || [];

  // Animation variants
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
        ease: 'easeOut' as const,
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
    hover: {},
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

  // Function to handle case study click
  const handleCaseStudyClick = (study: any) => {
    setSelectedCaseStudy(study);
    setIsModalOpen(true);
  };

  return (
    <div
      className="w-full bg-cover bg-center relative "
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      {/* GSAP Horizontal Scrolling Service Cards Section */}
      <section
        ref={sectionRef}
        className="h-screen  overflow-hidden relative -mt-8 bg-transparent"
        style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
      >
        <div className="container mx-auto px-4 pt-20 relative z-10">
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2
              variants={textRevealVariants}
              className=" mx-auto max-w-[700px] text-4xl md:text-5xl  mb-8 text-gray-800 font-overcame font-bold"
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {title}
              </motion.span>
            </motion.h2>
            <motion.p
              variants={textRevealVariants}
              transition={{ delay: 0.6 }}
              className="mx-auto max-w-[400px] font-[400] text-xl md:text-2xl text-gray-700"
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex h-fit items-center absolute mt-5"
          style={{
            width: `${services.length * 350}px`,
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative group flex-shrink-0 w-[350px] ${getCardRotation(index)} rounded-2xl mx-4 flex items-center bg-black`}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
                className="cursor-pointer p-6 h-full relative overflow-hidden min-h-[350px] w-full"
              >
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-[#00FFBC] mb-8 leading-tight"
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
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05 + itemIndex * 0.03,
                        duration: 0.4,
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <p className="text-[#00FFBC] text-lg font-medium">{item}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <div className="bg-gray-800 relative" style={{ backgroundImage: "url('/hero-bg-2.svg')" }}>
        <div className="container mx-auto px-4 py-16 relative z-10 bg-transparent">
          <motion.div
            ref={ctaRef}
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto mb-16"
            style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
          >
            <motion.div variants={itemVariants} className="text-center lg:text-left mb-6 lg:mb-0">
              <p className="text-2xl md:text-3xl text-gray-700">{cta_title}</p>
              <p className="text-2xl md:text-3xl text-gray-700">{cta_description}</p>
            </motion.div>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="bg-black text-white px-12 py-3 rounded-md text-xl relative overflow-hidden group"
            >
              <motion.div className="absolute inset-0" transition={{ duration: 0.15 }} />
              <span className="relative z-10">{cta_button}</span>
            </motion.button>
          </motion.div>

          {/* Case Studies Section */}
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
              {caseStudiesProp?.title || 'Case Studies'}
            </motion.h2>
            <motion.p
              variants={textRevealVariants}
              className="mb-12 font-[400] text-xl md:text-2xl text-center text-gray-700"
            >
              {caseStudiesProp?.description || 'Our Work in Action'}
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-16 max-w-7xl mx-auto cursor-pointer"
            >
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  variants={caseStudyVariants}
                  className={`
                    rounded-xl p-6 flex flex-col justify-end relative
                    ${study.size === 'large' ? 'md:col-span-10 h-[300px] md:h-[400px]' : ''}
                    ${study.size === 'small' ? 'md:col-span-5 h-[200px] md:h-[300px]' : ''}
                    ${study.size === 'custom-60' ? 'md:col-span-6 h-[200px] md:h-[300px]' : ''}
                    ${study.size === 'custom-40' ? 'md:col-span-4 h-[200px] md:h-[300px]' : ''}
                  `}
                  style={{
                    backgroundImage: `url('${study.imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onClick={() => handleCaseStudyClick(study)}
                >
                  {/* Hover overlay effect */}
                  <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white">
                      {/* <p className="text-xl font-[600]">{study.title}</p> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom text and link */}
            <motion.div variants={itemVariants} className="text-center">
              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-4"
                variants={textRevealVariants}
              >
                {caseStudiesProp?.case_studies_footer_description ||
                  'We take your business as our personal and deliver more than beyond the boundaries'}
              </motion.p>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  href={caseStudiesProp?.explore_button_link || '#'}
                  className="text-xl md:text-2xl text-gray-800 underline underline-offset-4 hover:text-emerald-600 transition-colors duration-300"
                >
                  {caseStudiesProp?.explore_button || 'Explore Our Latest Projects'}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caseStudy={selectedCaseStudy}
      />
    </div>
  );
}