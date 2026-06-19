/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hardcoded fallback images per sector, keyed by the Strapi card `title`.
// Used only when the Solution card has no `img` uploaded in Strapi.
// Drop your images into public/sectors/ using these exact filenames.
const SECTOR_IMAGES: Record<string, string> = {
  'Healthcare Solutions': '/sectors/healthcare.jpg',
  'E-commerce & Retail': '/sectors/ecommerce.jpg',
  'Financial Services': '/sectors/finance.jpg',
  'Education & Learning': '/sectors/education.jpg',
  'Tech Startups': '/sectors/tech-startups.jpg',
};

interface SolutionsCarouselProps {
  data: any;
}

const SolutionsCarousel = ({ data }: SolutionsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 25,
      dragFree: false,
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  // ✅ Fetch dynamic data from Strapi
  const solutions = data?.solution_card || [];
  const servicesTags = data?.services_names?.map((s: any) => s.services_names) || [];

  return (
    <section className="min-h-screen bg-gradient-to-l from-emerald-500/90 via-emerald-950/90 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%)]"></div>
      </div>

      <div className="bg-black/60">
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-overcame tracking-tight whitespace-pre-line">
              {data?.title || 'SOLUTIONS WE HAVE PROVIDED'}
            </h2>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
              {data?.description ||
                'We Have Served Diverse Clientele with Web Development in Los Angeles'}
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={scrollPrev}
              className="absolute -left-8 cursor-pointer top-1/2 -translate-y-1/2 z-20 group"
            >
              <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute -right-8 cursor-pointer top-1/2 -translate-y-1/2 z-20"
            >
              <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Embla Carousel */}
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex">
                {solutions.map((solution: any, index: number) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 ">
                    <div className="h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                      {/* Left Content */}
                      <div className="flex flex-col justify-center space-y-4">
                        {/* Main Card */}
                        <div className="bg-white h-full rounded-2xl p-6 shadow-2xl transform ">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {solution.title}
                          </h3>
                          <p className="text-gray-700 text-xl font-[400] leading-relaxed">
                            {solution.description}
                          </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="space-y-3">
                          <div className="bg-[#00FFBC] rounded-2xl px-4 py-2 text-gray-900 shadow-lg">
                            <div className="flex items-center space-x-4 justify-between">
                              <span className="text-4xl font-bold pb-6">
                                {solution.years_stats}
                              </span>
                              <span className="text-xl leading-tight text-right">
                                {solution.years_description}
                              </span>
                            </div>
                          </div>
                          <div className="bg-[#00FFBC] rounded-2xl px-4 py-2 text-gray-900 shadow-lg">
                            <div className="flex items-center space-x-4 justify-between">
                              <span className="text-4xl font-bold pb-6">
                                {solution.clients_stats}
                              </span>
                              <span className="text-xl leading-tight text-right">
                                {solution.clients_description}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Image */}
                      <div className="flex items-center justify-center">
                        <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl w-full h-full flex items-center justify-center shadow-2xl transform relative overflow-hidden">
                          {(() => {
                            // Strapi image first, then the hardcoded per-sector image.
                            const imgSrc =
                              solution.img?.url || SECTOR_IMAGES[solution.title?.trim()];
                            return imgSrc ? (
                              <img
                                src={imgSrc}
                                alt={solution.title}
                                className="w-full h-full object-cover rounded-2xl"
                              />
                            ) : (
                              <span className="text-white text-2xl font-bold text-center px-8 relative z-10">
                                Digital Solution
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 w-2 transition-all duration-300 ${
                    index === selectedIndex
                      ? 'bg-emerald-400 scale-125'
                      : 'bg-white hover:bg-white/90'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Services Tags */}
          <div className="mt-12">
            <div className="flex flex-wrap gap-3 justify-center max-w-6xl mx-auto">
              {servicesTags.map((service: string, index: number) => (
                <span
                  key={index}
                  className="backdrop-blur-sm text-black bg-white px-4 py-3 rounded-md text-sm font-[400] cursor-pointer"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsCarousel;
