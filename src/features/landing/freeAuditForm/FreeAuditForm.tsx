/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type React from 'react';
import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

// Reusable Selectable Button Component
interface SelectableButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
  label,
  isSelected,
  onClick,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{
        scale: 1.05,
        y: -2,
        rotateX: -3,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.15 }, // Much faster
      }}
      whileTap={{
        scale: 0.95,
        y: 0,
        transition: { duration: 0.05 }, // Instant response
      }}
    >
      <Button
        type="button"
        onClick={onClick}
        className={cn(
          'px-6 py-2 rounded-md text-lg cursor-pointer font-medium transition-all duration-150 relative overflow-hidden transform-gpu', // Faster transitions and GPU acceleration
          isSelected
            ? 'bg-[#00A77B] text-white shadow-lg shadow-[#00A77B]/30 border-2 border-[#00A77B]'
            : 'bg-black text-white hover:bg-gray-800 border-2 border-transparent hover:border-[#33E2B4]/50',
        )}
        aria-pressed={isSelected}
      >
        {/* Enhanced hover glow effect with pulse */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#00A77B]/30 to-[#33E2B4]/30 opacity-0"
          whileHover={{
            opacity: [0, 1, 0.8, 1],
            scale: [1, 1.02, 1],
            transition: { duration: 0.3, times: [0, 0.5, 0.8, 1] },
          }}
        />
        <span className="relative z-10">{label}</span>
      </Button>
    </motion.div>
  );
};

// Enhanced Animated Input Component with Cool Left-to-Right Entrance
interface AnimatedInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  index: number;
  rows?: number;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  type,
  value,
  onChange,
  index,
  rows,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = label.toLowerCase().replace(/\s/g, '-');

  const InputComponent = rows ? motion.textarea : motion.input;

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{
        opacity: 0,
        x: -100,
        scale: 0.8,
        rotateY: -15,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
      }}
      transition={{
        delay: index * 0.2 + 1.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      {/* Background highlight effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#00A77B]/5 to-[#33E2B4]/5 rounded-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      />

      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>

      <InputComponent
        id={inputId}
        type={type}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={label}
        rows={rows}
        className="w-full bg-transparent border-b border-gray-300 py-4 px-2 text-lg text-black placeholder-[#404040] focus:outline-none focus:border-transparent resize-none relative z-10 transition-all duration-300"
        aria-label={label}
        whileFocus={{}}
        transition={{ duration: 0.2 }}
      />

      {/* Static bottom border */}
      {/* <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300" /> */}

      {/* Main animated drawing line effect */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00A77B] via-[#33E2B4] to-[#00A77B] shadow-sm"
        initial={{
          width: 0,
          opacity: 0,
          boxShadow: '0 0 0px rgba(0, 167, 123, 0)',
        }}
        animate={{
          width: isFocused || value ? '100%' : 0,
          opacity: isFocused || value ? 1 : 0,
          boxShadow:
            isFocused || value ? '0 0 12px rgba(0, 167, 123, 0.5)' : '0 0 0px rgba(0, 167, 123, 0)',
        }}
        transition={{
          width: { duration: 0.7, ease: 'easeInOut' },
          opacity: { duration: 0.3 },
          boxShadow: { duration: 0.4 },
        }}
      />

      {/* Enhanced glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#33E2B4] to-transparent blur-sm"
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: isFocused ? '100%' : value ? '100%' : 0,
          opacity: isFocused ? 0.8 : value ? 0.4 : 0,
        }}
        transition={{
          duration: 0.7,
          ease: 'easeInOut',
          delay: isFocused ? 0.1 : 0,
        }}
      />

      {/* Animated traveling dot */}
      {(isFocused || value) && (
        <motion.div
          className="absolute bottom-0 w-2 h-2 bg-[#33E2B4] rounded-full shadow-lg"
          initial={{ left: 0, opacity: 0, scale: 0 }}
          animate={{
            left: '100%',
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0,
          }}
          transition={{
            left: { duration: 0.7, ease: 'easeInOut' },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          style={{ transform: 'translateX(-50%)' }}
        />
      )}
    </motion.div>
  );
};

export default function FreeAuditForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [howHear, setHowHear] = useState('');
  const [message, setMessage] = useState('');

  const serviceOptions = ['Website', 'Mobile App', 'Web App', 'SEO', 'Other'];
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const budgetOptions = ['$5K-$10K', '$10K-$25K', '$25K-$50K', '$50K+', 'Not Sure'];
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

  const handleBudgetToggle = (budget: string) => {
    setSelectedBudget((prev) =>
      prev.includes(budget) ? prev.filter((b) => b !== budget) : [...prev, budget],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      email,
      company,
      technologies,
      howHear,
      message,
      selectedServices,
      selectedBudget,
    });
    alert('Form submitted! Check console for data.');
  };

  const inputFields = [
    { label: 'Your Name', type: 'text', value: name, onChange: setName },
    { label: 'Work Email', type: 'email', value: email, onChange: setEmail },
    { label: 'Company Name', type: 'text', value: company, onChange: setCompany },
    {
      label: 'What technologies do you work with?',
      type: 'text',
      value: technologies,
      onChange: setTechnologies,
    },
    {
      label: 'How did you hear about us?',
      type: 'text',
      value: howHear,
      onChange: setHowHear,
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center py-16 px-4"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <motion.div
        className="max-w-7xl w-full text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-widest text-black"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Get a Free Audit
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Got an idea? Not sure where to start?
        </motion.p>

        <motion.p
          className="text-lg md:text-2xl font-[400] text-left leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          At Techorphic, an experienced IT software development company, we help businesses like
          yours figure out what&apos;s next, whether you&apos;re launching something new or just
          need a second opinion.
        </motion.p>
      </motion.div>

      {/* Form Section */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-7xl space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {/* Input Fields with enhanced staggered animation */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {inputFields.map((field, index) => (
            <AnimatedInput
              key={index}
              label={field.label}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              index={index}
            />
          ))}
        </motion.div>

        {/* Interested Services with enhanced entrance */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotateX: -10 }}
          animate={
            isInView ? { opacity: 1, x: 0, rotateX: 0 } : { opacity: 0, x: -80, rotateX: -10 }
          }
          transition={{ delay: 2.5, duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            className="text-lg text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 2.7, duration: 0.4 }}
          >
            Interested Services
          </motion.p>
          <div className="flex flex-wrap gap-4">
            {serviceOptions.map((service, index) => (
              <SelectableButton
                key={service}
                label={service}
                isSelected={selectedServices.includes(service)}
                onClick={() => handleServiceToggle(service)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Budget with enhanced entrance */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotateX: -10 }}
          animate={
            isInView ? { opacity: 1, x: 0, rotateX: 0 } : { opacity: 0, x: -80, rotateX: -10 }
          }
          transition={{ delay: 3, duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            className="text-lg text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 3.2, duration: 0.4 }}
          >
            Budget
          </motion.p>
          <div className="flex flex-wrap gap-4">
            {budgetOptions.map((budget, index) => (
              <SelectableButton
                key={budget}
                label={budget}
                isSelected={selectedBudget.includes(budget)}
                onClick={() => handleBudgetToggle(budget)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Your Message with enhanced entrance */}
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -100, scale: 0.8 }}
          transition={{ delay: 3.5, duration: 0.8, ease: 'easeOut' }}
        >
          <AnimatedInput
            label="Your Message"
            type="text"
            value={message}
            onChange={setMessage}
            index={6}
            rows={4}
          />
        </motion.div>

        {/* Submit Button with enhanced entrance */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
          transition={{ delay: 4, duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <motion.div
            whileHover={{
              scale: 1.02,
              y: -1,
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.05 },
            }}
            transition={{ duration: 0.15 }}
          >
            <Button
              type="submit"
              className="bg-[#33E2B4] text-black px-8 py-3 rounded-md text-xl font-semibold hover:bg-emerald-400 transition-colors duration-200 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              <span className="relative z-10">Let&apos;s Connect</span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
