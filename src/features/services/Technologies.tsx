'use client';

import Image from 'next/image';
import React from 'react';

interface IconItem {
  id: number;
  icon?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  customWidth?: number;  // if you store custom size in Strapi
  customHeight?: number;
}

interface TechnologiesProps {
  data: {
    title?: string;
    description?: string;
    tech_icons?: IconItem[];
    bottom_icon?: IconItem[];
    bottom_description?: string;
  };
}

export default function Technologies({ data }: TechnologiesProps) {
  if (!data) return null;

  return (
    <div
      className="min-h-[100vh] w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title + Description */}
        <div className="container mx-auto px-6 pt-20 pb-6 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-[400] font-overcame mb-4 leading-tight whitespace-pre-line">
            {data.title}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-[#041913] max-w-xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* First row of tech icons (aligned right, same as static) */}
        {data.tech_icons && data.tech_icons.length > 0 && (
          <div className="my-10">
            <div className="flex items-center justify-end">
              <div className="grid grid-cols-7 gap-1">
                {data.tech_icons.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-center text-gray-600"
                  >
                    {item.icon?.url && (
                      <Image
                        src={item.icon.url}
                        alt={item.icon.alternativeText || 'tech icon'}
                        width={item.customWidth || item.icon.width || 80}  // fallback larger
                        height={item.customHeight || item.icon.height || 80}
                        className="object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Second row (bottom icons, centered, same spacing as static) */}
            {data.bottom_icon && data.bottom_icon.length > 0 && (
              <div className="grid grid-cols-7 mt-12 gap-18 w-fit">
                {data.bottom_icon.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-center text-gray-600"
                  >
                    {item.icon?.url && (
                      <Image
                        src={item.icon.url}
                        alt={item.icon.alternativeText || 'bottom icon'}
                        width={item.customWidth || item.icon.width || 60}  // fallback same as static
                        height={item.customHeight || item.icon.height || 60}
                        className="object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom description */}
        {data.bottom_description && (
          <p className="text-lg md:text-xl lg:text-2xl text-[#041913] max-w-xl leading-relaxed">
            {data.bottom_description}
          </p>
        )}
      </div>
    </div>
  );
}
