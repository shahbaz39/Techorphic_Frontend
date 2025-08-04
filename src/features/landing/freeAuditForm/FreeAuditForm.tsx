'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Reusable Selectable Button Component
interface SelectableButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({ label, isSelected, onClick }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={cn(
        'px-6 py-2 rounded-md text-lg cursor-pointer font-medium transition-colors duration-200',
        isSelected
          ? 'bg-[#00A77B] text-white' // Teal background when selected
          : 'bg-black text-white hover:bg-gray-800', // Black background when not selected
      )}
      aria-pressed={isSelected}
    >
      {label}
    </Button>
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

  const budgetOptions = ['Website', 'Mobile App', 'Web App', 'SEO', 'Other']; // Assuming same options for budget for now
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);

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
    // Handle form submission logic here
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
    // You might want to clear the form or show a success message
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-16 px-4"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      <div className="max-w-7xl w-full text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-widest text-black">
          Get a Free Audit
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-black">Got an idea? Not sure where to start?</p>
        <p className="text-lg md:text-2xl font-[400] text-left leading-relaxed">
          At Techorphic, an experienced IT software development company, we help businesses like
          yours figure out what’s next, whether you’re launching something new or just need a second
          opinion.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-7xl space-y-8">
        {/* Input Fields */}
        {[
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
        ].map((field, index) => (
          <div key={index} className="relative">
            <label htmlFor={field.label.toLowerCase().replace(/\s/g, '-')} className="sr-only">
              {field.label}
            </label>
            <input
              id={field.label.toLowerCase().replace(/\s/g, '-')}
              type={field.type}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={field.label}
              className="w-full bg-transparent border-b border-gray-400 py-3 text-lg text-black placeholder-[#404040] focus:outline-none focus:border-black"
              aria-label={field.label}
            />
          </div>
        ))}

        {/* Interested Services */}
        <div>
          <p className="text-lg text-black mb-4">Interested Services</p>
          <div className="flex flex-wrap gap-4">
            {serviceOptions.map((service) => (
              <SelectableButton
                key={service}
                label={service}
                isSelected={selectedServices.includes(service)}
                onClick={() => handleServiceToggle(service)}
              />
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <p className="text-lg text-black mb-4">Budget</p>
          <div className="flex flex-wrap gap-4">
            {budgetOptions.map((budget) => (
              <SelectableButton
                key={budget}
                label={budget}
                isSelected={selectedBudget.includes(budget)}
                onClick={() => handleBudgetToggle(budget)}
              />
            ))}
          </div>
        </div>

        {/* Your Message */}
        <div className="relative">
          <label htmlFor="your-message" className="sr-only">
            Your Message
          </label>
          <textarea
            id="your-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            rows={4}
            className="w-full bg-transparent border-b border-gray-400 py-3 text-lg text-black placeholder-[#404040] focus:outline-none focus:border-black resize-none"
            aria-label="Your Message"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="bg-[#33E2B4] text-black px-8 py-3 rounded-md text-xl font-semibold  hover:bg-emerald-700 transition-colors duration-200"
          >
            Let&apos;s Connect
          </Button>
        </div>
      </form>
    </div>
  );
}
