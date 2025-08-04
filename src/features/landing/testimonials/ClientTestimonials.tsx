'use client';
import { useState, useEffect } from 'react';
// import Image from 'next/image';

export default function ClientTestimonials() {
  const testimonials = [
    {
      text: 'At Techorphic Developers, nothing speaks louder than the success stories of our clients. Hear directly from some of our valued partners about their experience collaborating with us.',
      clientLogo: '/placeholder.svg?height=40&width=100&text=ADAWK&bg=000&color=fff', // Updated placeholder for black background, white text
      clientName: 'Alyan Shahzad',
      clientTitle: 'CEO',
    },
    {
      text: 'Working with Techorphic Developers was a game-changer for our business. Their expertise and dedication helped us achieve our goals efficiently and effectively.',
      clientLogo: '/placeholder.svg?height=40&width=100&text=CompanyB&bg=000&color=fff',
      clientName: 'Jane Doe',
      clientTitle: 'CTO, Innovate Corp',
    },
    {
      text: 'The team at Techorphic Developers delivered an outstanding product that exceeded our expectations. Their communication and professionalism were top-notch throughout the project.',
      clientLogo: '/placeholder.svg?height=40&width=100&text=GlobalTech&bg=000&color=fff',
      clientName: 'John Smith',
      clientTitle: 'Founder, GlobalTech Solutions',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 9000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center py-16 px-4 overflow-hidden"
      style={{ backgroundImage: "url('/features-bg.svg')" }}
    >
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 uppercase tracking-widest font-mono">
          Client Testimonials
        </h2>
        <p className="text-xl md:text-2xl mb-12 text-gray-300">Trusted by Businesses Worldwide</p>

        <div className="relative flex items-center justify-center px-8 md:px-16">
          {/* Left Brace */}
          <span className="text-[13rem] translate-y-[180px]  text-[#33E2B4]">{'}'}</span>

          {/* Testimonial Carousel Container */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex flex-col items-center justify-center min-h-[200px] md:min-h-[250px] px-4"
                >
                  <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center space-x-4">
                    {/* <Image
                      src={testimonial.clientLogo}
                      alt={`${testimonial.clientName} logo`}
                      width={100}
                      height={40}
                      className="rounded-md bg-black p-2" // Adjusted for black background, white text
                    /> */}
                    <div className="text-left">
                      <p className="text-lg font-semibold">{testimonial.clientName}</p>
                      <p className="text-sm text-gray-400">{testimonial.clientTitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <span className="text-[13rem] -translate-y-[180px]  text-[#33E2B4]">{'{'}</span>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 ${
                // Changed to rounded-sm for square
                index === currentSlide ? 'bg-[#00A77B]' : 'bg-white' // Teal for active, white for inactive
              } transition-colors duration-300`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
