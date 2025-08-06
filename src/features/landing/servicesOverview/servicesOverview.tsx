'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

export default function ServicesOverview() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInServicesArea, setIsInServicesArea] = useState(false);
  const [canScrollNormally, setCanScrollNormally] = useState(true);

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

  // Expanded services array with all cards
  const services = [
    {
      title: 'Web Development',
      items: [
        'React & Next.js Applications',
        'Vue.js Development',
        'Full-Stack Solutions',
        'Progressive Web Apps',
        'E-commerce Platforms',
      ],
    },
    {
      title: 'Mobile Development',
      items: [
        'iOS App Development',
        'Android Development',
        'React Native Solutions',
        'Flutter Applications',
        'Cross-Platform Apps',
      ],
    },
    {
      title: 'Cloud Solutions',
      items: [
        'AWS Integration',
        'Azure Services',
        'Google Cloud Platform',
        'Serverless Architecture',
        'Cloud Migration',
      ],
    },
    {
      title: 'AI & Machine Learning',
      items: [
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics',
        'Chatbot Development',
        'Data Science Solutions',
      ],
    },
    {
      title: 'Blockchain & Web3',
      items: [
        'Smart Contract Development',
        'DeFi Applications',
        'NFT Marketplaces',
        'Cryptocurrency Solutions',
        'Web3 Integration',
      ],
    },
    {
      title: 'DevOps & Infrastructure',
      items: [
        'CI/CD Pipeline Setup',
        'Docker Containerization',
        'Kubernetes Orchestration',
        'Infrastructure as Code',
        'Monitoring & Analytics',
      ],
    },
    {
      title: 'UI/UX Design',
      items: [
        'User Interface Design',
        'User Experience Research',
        'Prototyping & Wireframing',
        'Design Systems',
        'Mobile App Design',
      ],
    },
    {
      title: 'Quality Assurance',
      items: [
        'Automated Testing',
        'Manual Testing',
        'Performance Testing',
        'Security Testing',
        'Continuous Integration',
      ],
    },
    {
      title: 'Data Analytics',
      items: [
        'Business Intelligence',
        'Data Visualization',
        'Big Data Processing',
        'Real-time Analytics',
        'Data Warehousing',
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
  const servicesContainerRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const ctaRef = useRef(null);
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef(null);

  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, threshold: 0.1 });
  const caseStudiesInView = useInView(caseStudiesRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.3 });

  // Calculate horizontal scroll distance
  const cardWidth = 450;
  const totalCards = services.length;
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const visibleCards = Math.floor(containerWidth / cardWidth);
  const maxScrollDistance = Math.max(0, (totalCards - visibleCards) * cardWidth);

  // Enhanced scroll area detection with debouncing
  const checkServicesArea = useCallback(() => {
    const container = servicesContainerRef.current;
    if (!container) return false;

    const containerRect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // More precise area detection with buffer zones
    const topBuffer = viewportHeight * 0.1;
    const bottomBuffer = viewportHeight * 0.1;

    const isInArea =
      containerRect.top <= topBuffer && containerRect.bottom >= viewportHeight - bottomBuffer;

    return isInArea;
  }, []);

  // Enhanced scroll handler with better logic
  const handleWheel = useCallback(
    (e) => {
      const currentTime = Date.now();
      const isInArea = checkServicesArea();

      // Debounce rapid scroll events - reduced for faster response
      if (currentTime - lastScrollTime.current < 58) return; // Reduced from 16ms to 8ms
      lastScrollTime.current = currentTime;

      if (!isInArea) {
        setIsInServicesArea(false);
        setCanScrollNormally(true);
        return;
      }

      setIsInServicesArea(true);

      const delta = Math.sign(e.deltaY);
      const currentProgress = scrollProgress;

      // Determine if we should allow normal scrolling
      const shouldAllowNormalScroll =
        (currentProgress <= 0 && delta < 0) || // At start, scrolling up
        (currentProgress >= 1 && delta > 0); // At end, scrolling down

      if (shouldAllowNormalScroll) {
        // Allow a brief moment for normal scrolling to take effect
        setCanScrollNormally(true);

        // Clear any existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        // Set a timeout to re-enable horizontal scrolling
        scrollTimeout.current = setTimeout(() => {
          if (checkServicesArea()) {
            setCanScrollNormally(false);
          }
        }, 100);

        return;
      }

      // Prevent default and handle horizontal scrolling
      e.preventDefault();
      setCanScrollNormally(false);

      // Smoother progress calculation with much faster speed
      const step = 0.035; // Much faster scroll speed (was 0.012)
      const newProgress = Math.max(0, Math.min(1, currentProgress + delta * step));

      setScrollProgress(newProgress);
    },
    [scrollProgress, checkServicesArea],
  );

  // Main scroll event handler
  useEffect(() => {
    const wheelHandler = (e) => {
      handleWheel(e);
    };

    // Use passive: false only when necessary
    window.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      window.removeEventListener('wheel', wheelHandler);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleWheel]);

  // Body scroll management
  useEffect(() => {
    if (isInServicesArea && !canScrollNormally) {
      // Prevent body scroll when in services area and handling horizontal scroll
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      // Allow normal scrolling
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isInServicesArea, canScrollNormally]);

  // Intersection observer for better area detection
  useEffect(() => {
    const container = servicesContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.1;

        if (!isVisible) {
          setIsInServicesArea(false);
          setCanScrollNormally(true);
        }
      },
      {
        threshold: [0, 0.1, 0.5, 0.9, 1],
        rootMargin: '-10% 0px -10% 0px',
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Reset scroll progress when leaving services area
  useEffect(() => {
    if (!isInServicesArea && scrollProgress > 0 && scrollProgress < 1) {
      // Smoothly reset to nearest end
      const targetProgress = scrollProgress < 0.5 ? 0 : 1;
      const resetAnimation = () => {
        setScrollProgress((prev) => {
          const diff = targetProgress - prev;
          if (Math.abs(diff) < 0.01) return targetProgress;
          return prev + diff * 0.1;
        });

        if (Math.abs(scrollProgress - targetProgress) > 0.01) {
          requestAnimationFrame(resetAnimation);
        }
      };
      requestAnimationFrame(resetAnimation);
    }
  }, [isInServicesArea, scrollProgress]);

  // Calculate transform with easing
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const easedProgress = easeInOutCubic(scrollProgress);
  const xTransform = -easedProgress * maxScrollDistance;

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
      // y: -8,
      // scale: 1.03,
      // transition: {
      //   duration: 0.15,
      //   ease: 'easeInOut',
      // },
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
      className="w-full bg-cover bg-center relative overflow-hidden"
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

      {/* Progress indicator */}
      {/* {isInServicesArea && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="w-64 h-[3px] bg-white/20 rounded-full backdrop-blur-sm">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )} */}

      {/* Header Section */}
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
            className="text-4xl md:text-5xl font-bold font-overcame mb-8 text-gray-800"
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
      </div>

      {/* Horizontal Scrolling Service Cards Section */}
      <div ref={servicesContainerRef} className="h-screen relative overflow-hidden -mt-8">
        <div className="h-full flex items-center">
          <motion.div ref={servicesRef} className="h-full flex items-center  w-full">
            <div
              style={{
                transform: `translateX(${xTransform}px)`,
                transition: canScrollNormally ? 'transform 0.6s ease-out' : 'none',
              }}
              className="flex space-x-8 py-8 px-8"
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="relative group flex-shrink-0 w-[400px]"
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Static base glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-200/20 to-emerald-400/20 rounded-3xl blur-sm opacity-0" />

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

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover="hover"
                    className="cursor-pointer bg-white/15 backdrop-blur-md rounded-3xl border border-[#00A77B]/40 p-8 h-full  relative overflow-hidden min-h-[480px]"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                    }}
                  >
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-emerald-600 mb-8 leading-tight"
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
                            <p className="text-emerald-700 text-lg font-medium">{item}</p>
                          </div>
                          {itemIndex < service.items.length - 1 && (
                            <motion.div
                              className="w-full h-[.5px] bg-[#00A77B] mt-4"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{
                                delay: index * 0.05 + itemIndex * 0.03 + 0.2,
                                duration: 0.3,
                              }}
                              style={{ originX: 0 }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Card number indicator */}
                    {/* <div className="absolute top-6 right-6 w-8 h-8 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-sm">{index + 1}</span>
                    </div> */}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-4 pb-8 relative z-10">
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto mb-16"
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

        {/* Case Studies Section */}
        <motion.div
          ref={caseStudiesRef}
          initial="hidden"
          animate={caseStudiesInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            variants={textRevealVariants}
            className="text-4xl md:text-5xl font-overcame font-bold mb-8 text-center text-gray-800 uppercase"
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
          <motion.div variants={itemVariants} className="text-center">
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
