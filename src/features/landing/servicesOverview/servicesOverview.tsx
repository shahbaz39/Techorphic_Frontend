'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesOverview() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Refs for GSAP
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Other refs
  const headerRef = useRef(null);
  const servicesRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const ctaRef = useRef(null);

  // Dynamic rotation logic
  const getCardRotation = (index: number) => {
    // Pattern: -rotate-2, rotate-2, -rotate-2, rotate-2, ...
    return index % 2 === 0 ? '-rotate-2' : 'rotate-2';
  };

  const handleMouseMove = (e: React.MouseEvent, cardIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    setHoveredCard(cardIndex);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  // Services data
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

  // InView hooks
  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, threshold: 0.1 });
  const caseStudiesInView = useInView(caseStudiesRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.3 });

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

  return (
    <div
      className="w-full bg-cover bg-center relative "
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      {/* Animated background elements */}

      {/* Header Section */}

      {/* GSAP Horizontal Scrolling Service Cards Section */}
      <section
        ref={sectionRef}
        className="h-screen  overflow-hidden relative -mt-8 bg-transparent"
        style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
      >
        {' '}
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
        </div>
        <div
          ref={scrollContainerRef}
          className="flex h-fit items-center absolute bottom-10"
          style={{
            width: `${services.length * 350}px`, // Card width + gap
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative group flex-shrink-0 w-[350px] ${getCardRotation(index)} rounded-2xl mx-4 flex items-center bg-black`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
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
                      {/* {itemIndex < service.items.length - 1 && (
                        <motion.div
                          className="w-full h-[.5px] bg-[#00A77B] mt-2"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            delay: index * 0.05 + itemIndex * 0.03 + 0.2,
                            duration: 0.3,
                          }}
                          style={{ originX: 0 }}
                        />
                      )} */}
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
              <motion.div className="absolute inset-0" transition={{ duration: 0.15 }} />
              <span className="relative z-10">Get a Free Estimation</span>
            </motion.button>
          </motion.div>

          {/* Case Studies Section */}
          <motion.div
            ref={caseStudiesRef}
            initial="hidden"
            animate={caseStudiesInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            // style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
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
                  rounded-xl p-6 flex flex-col justify-end relative border bg-[#D9D9D9] overflow-hidden
                  bg-gradient-to-br from-gray-200 to-gray-300
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
    </div>
  );
}
