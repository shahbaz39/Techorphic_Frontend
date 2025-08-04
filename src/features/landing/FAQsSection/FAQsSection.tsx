'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQsSection() {
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
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center py-16 px-4 overflow-hidden">
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-widest font-mono">
          FAQS
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-white py-4"
            >
              <AccordionTrigger className="text-lg md:text-xl font-normal text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-300 pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
