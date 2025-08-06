'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQsSection() {
  const ref = useRef(null);
  // Removed 'once: true' to make animations trigger every time user enters the section
  const isInView = useInView(ref, { margin: '-100px' });
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const faqs = [
    {
      question: 'Q1. What industries do you specialize in?',
      answer:
        'We specialize in a wide range of industries including FinTech, Healthcare, E-commerce, Real Estate, and Logistics, providing tailored software solutions to meet specific business needs.',
    },
    {
      question: 'Q2. How soon can you start on my project?',
      answer:
        'Project start times vary depending on scope and current workload, but we aim to begin within 1-2 weeks after finalizing the project details and contract.',
    },
    {
      question: 'Q3. Can I hire a developer full-time?',
      answer:
        'Yes, we offer dedicated developer hiring options where you can hire our skilled developers to work exclusively on your project on a full-time basis.',
    },
    {
      question: 'Q4. What technologies do you work with?',
      answer:
        'Our team is proficient in a broad spectrum of technologies including React, Next.js, Node.js, Python, AWS, Azure, Google Cloud, various databases, and mobile development frameworks like React Native and Flutter.',
    },
    {
      question: 'Q5. What is your pricing model?',
      answer:
        'We offer flexible pricing models including fixed-price, time & material, and dedicated team models, tailored to suit the specific requirements and budget of your project.',
    },
    {
      question: 'Q6. Do you offer post-launch support?',
      answer:
        'Absolutely. We provide comprehensive post-launch support and maintenance services to ensure your software runs smoothly, including bug fixes, updates, and performance optimization.',
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen bg-black text-white flex flex-col items-center py-16 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Grid background pattern */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 1.1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* Floating particles - regenerated each time the section comes into view */}
      {mounted &&
        [...Array(6)].map((_, i) => {
          // Generate new random positions each time isInView changes
          const initialX = Math.random() * windowSize.width;
          const initialY = Math.random() * windowSize.height;
          const targetX = Math.random() * windowSize.width;
          const targetY = Math.random() * windowSize.height;

          return (
            <motion.div
              key={`${i}-${isInView}`} // Changed key to force re-render when isInView changes
              className="absolute w-2 h-2 bg-white rounded-full opacity-30"
              initial={{
                x: initialX,
                y: initialY,
                opacity: 0,
              }}
              animate={
                isInView
                  ? {
                      x: targetX,
                      y: targetY,
                      opacity: [0, 0.3, 0],
                    }
                  : {
                      opacity: 0,
                    }
              }
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.5,
              }}
            />
          );
        })}

      {/* Header Section */}
      <motion.div
        className="relative z-10 max-w-7xl w-full mx-auto text-center mb-12"
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -50, scale: 0.8 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-widest font-mono relative"
          initial={{ opacity: 0, rotateX: -15 }}
          animate={isInView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: -15 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Glowing effect behind text */}
          <motion.span
            className="absolute inset-0 font-overcame text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text blur-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            FAQS
          </motion.span>
          <span className="relative z-10">FAQS</span>
        </motion.h2>
      </motion.div>

      {/* FAQ Accordion */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -100, rotateY: -10 }}
              animate={
                isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -100, rotateY: -10 }
              }
              transition={{
                duration: 0.6,
                delay: 0.8 + index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{
                scale: 1.02,
                x: 10,
                transition: { duration: 0.2 },
              }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border-b border-white/20 py-4 relative overflow-hidden group"
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />

                {/* Side accent line */}
                <motion.div
                  className="absolute left-0 top-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100"
                  initial={{ height: 0 }}
                  whileHover={{ height: '100%' }}
                  transition={{ duration: 0.3 }}
                />

                <AccordionTrigger className="text-lg md:text-xl font-normal text-left hover:no-underline relative z-10 group-hover:text-blue-200 transition-colors duration-300">
                  <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    {faq.question}
                  </motion.span>
                </AccordionTrigger>

                <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>

      {/* Bottom decorative elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="w-20 h-20 border border-white/20 rounded-full"
          animate={
            isInView
              ? {
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }
              : {
                  rotate: 0,
                  scale: 1,
                }
          }
          transition={{
            rotate: {
              duration: 20,
              repeat: isInView ? Number.POSITIVE_INFINITY : 0,
              ease: 'linear',
            },
            scale: {
              duration: 2,
              repeat: isInView ? Number.POSITIVE_INFINITY : 0,
            },
          }}
        />
      </motion.div>
    </motion.div>
  );
}
