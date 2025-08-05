'use client';
import { useState, useEffect } from 'react';

export default function ClientTestimonials() {
  const testimonials = [
    {
      text: 'At Techorphic Developers, nothing speaks louder than the success stories of our clients. Hear directly from some of our valued partners about their experience collaborating with us.',
      clientLogo: '/placeholder.svg?height=40&width=100&text=ADAWK&bg=000&color=fff',
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
    }, 9000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div
      className="relative md:min-h-screen bg-black text-white flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundImage: "url('/features-bg.svg')" }}
    >
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '30px 30px sm:40px 40px lg:50px 50px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-2 sm:mb-4 uppercase tracking-wide sm:tracking-wider lg:tracking-widest font-mono leading-tight">
            Client Testimonials
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 px-2">
            Trusted by Businesses Worldwide
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative flex items-center justify-center">
          {/* Left Brace - Hidden on mobile, visible on larger screens */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-16 xl:w-24">
            <span className="text-8xl xl:text-[13rem] translate-y-12 xl:translate-y-[180px] text-[#33E2B4] leading-none">
              {'}'}
            </span>
          </div>

          {/* Testimonial Carousel Container */}
          <div className="flex-1 overflow-hidden mx-4 lg:mx-8">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] px-2 sm:px-4 lg:px-8"
                >
                  {/* Testimonial Text */}
                  <div className="mb-6 sm:mb-8 lg:mb-12">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto px-2">
                      {testimonial.text}
                    </p>
                  </div>

                  {/* Client Information */}
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                    {/* Logo Placeholder */}
                    <div className="w-20 h-8 sm:w-24 sm:h-10 lg:w-28 lg:h-12 bg-gray-800 rounded-md flex items-center justify-center border border-gray-700">
                      <span className="text-xs sm:text-sm text-white font-mono">LOGO</span>
                    </div>

                    {/* Client Details */}
                    <div className="text-center sm:text-left">
                      <p className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                        {testimonial.clientName}
                      </p>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-400 mt-1">
                        {testimonial.clientTitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Brace - Hidden on mobile, visible on larger screens */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-16 xl:w-24">
            <span className="text-8xl xl:text-[13rem] -translate-y-12 xl:-translate-y-[180px] text-[#33E2B4] leading-none">
              {'{'}
            </span>
          </div>
        </div>

        {/* Mobile Braces - Only visible on mobile */}
        {/* <div className="lg:hidden flex justify-center items-center space-x-8 my-8">
          <span className="text-4xl sm:text-5xl text-[#33E2B4]">{'}'}</span>
          <span className="text-4xl sm:text-5xl text-[#33E2B4]">{'{'}</span>
        </div> */}

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12 space-x-2 sm:space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-2 sm:h-2 lg:w-2 lg:h-2 transition-all duration-300 ${
                index === currentSlide ? 'bg-[#00A77B] scale-110' : 'bg-white hover:bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows for Mobile */}
        <div className="flex justify-center space-x-8 mt-6 sm:hidden">
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
            }
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        {/* Slide Counter */}
        {/* <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
          {currentSlide + 1} / {testimonials.length}
        </div> */}
      </div>
    </div>
  );
}
