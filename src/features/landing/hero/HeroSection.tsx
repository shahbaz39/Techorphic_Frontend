import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Technology {
  id: number;
  name: string;
  icon: {
    url?: string;
    alternativeText?: string;
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
}

interface CTAButton {
  id: number;
  label: string;
  url: string;
  is_highlighted: boolean;
}

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: any;
  technologies?: Technology[];
  ctaButtons?: CTAButton[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = '',
  subtitle,
  description,
  technologies = [],
  ctaButtons = [],
}) => {
  // Convert rich text to plain text
  const getPlainText = (richText: any) => {
    if (!richText) return '';
    if (typeof richText === 'string') return richText;
    if (Array.isArray(richText)) {
      return richText
        .map((block: any) =>
          block.children?.map((child: any) => child.text).join('')
        )
        .join(' ');
    }
    return '';
  };

  const descriptionText = getPlainText(description) || '';

  // ✅ Safe helper to fix invalid URL issue
  const getIconUrl = (icon: any) => {
    const rawUrl = icon?.url || icon?.data?.attributes?.url;
    if (!rawUrl) return null;
    if (rawUrl.startsWith('http')) return rawUrl; // already Cloudinary
    return `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`;
  };

  return (
    <section
      className="w-full px-6 py-16 pb-[8rem]"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="flex flex-col w-full justify-between">
          {/* Left Column - Main Heading */}
          <div className="w-[50%]">
            <h1
              id="hero-heading"
              className="font-normal leading-[80px] md:text-[68px] text-[40px] hidden md:block tracking-[-0.017em] text-[#020209] max-w-[460px]"
              style={{
                fontFamily:
                  'Overcame Demo, system-ui, -apple-system, sans-serif',
                textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
                verticalAlign: 'middle',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Mobile title */}
          <h1
            className="block md:hidden text-5xl"
            style={{
              fontFamily:
                'Overcame Demo, system-ui, -apple-system, sans-serif',
              textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
              verticalAlign: 'middle',
            }}
          >
            {title.replace(/\n/g, ' ')}
          </h1>

          {/* Right Column - Description */}
          <div className="flex items-end md:justify-end transform md:-translate-y-13 mt-6 sm:mt-0">
            <div className="md:w-[35%]">
              {subtitle && (
                <h2
                  className="text-xl font-semibold mb-3 text-[#020209] md:text-right"
                >
                  {subtitle}
                </h2>
              )}
              <p
                className="font-normal leading-[110%] md:text-[40px] text-[30px] mt-3.5 md:mt-0 tracking-[-0.017em] text-[#030208] md:text-right"
                style={{
                  fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                  verticalAlign: 'middle',
                }}
              >
                {descriptionText}
              </p>
            </div>
          </div>
        </div>

        {/* Technology Icons */}
        {technologies.length > 0 && (
          <div className="mb-16 md:w-[50%] mt-10 md:mt-0">
            <div className="grid grid-cols-8">
              {technologies.slice(0, 8).map((tech) => {
                const iconUrl = getIconUrl(tech.icon);

                return (
                  <div
                    key={tech.id}
                    className="flex items-center justify-center"
                  >
                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt={
                          tech.icon?.alternativeText ||
                          tech.icon?.data?.attributes?.alternativeText ||
                          `${tech.name} technology icon`
                        }
                        width={30}
                        height={30}
                        className="h-10 w-auto object-contain"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-8 mt-6">
              {technologies.slice(8, 16).map((tech) => {
                const iconUrl = getIconUrl(tech.icon);

                return (
                  <div
                    key={tech.id}
                    className="flex items-center justify-center"
                  >
                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt={
                          tech.icon?.alternativeText ||
                          tech.icon?.data?.attributes?.alternativeText ||
                          `${tech.name} technology icon`
                        }
                        width={30}
                        height={30}
                        className="h-10 w-auto object-contain"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Content */}
        <div className="space-y-12">
          {/* Quote */}
          <h2 className="font-[300] md:text-[36px] text-[30px] leading-[110%] tracking-[-1.7%]">
            Your users deserve more than just functional technology,
            <br /> they deserve an exceptional experience.
          </h2>

          {/* Static description */}
          <p className="font-[300] md:text-[36px] text-[30px] leading-[110%] tracking-[-1.7%] max-w-5xl">
            Techorphic is a custom software development company that delivers
            scalable, intuitive solutions — including apps processing over
            1M+ monthly payments and healthcare platforms that cut sign-up
            time by 40%. We&#39;re your success partner.
          </p>

          {/* CTA Buttons */}
          {ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              {ctaButtons.map((button) => (
                <Link
                  key={button.id}
                  href={button.url}
                  aria-label={`Navigate to ${button.label}`}
                  className={`${
                    button.is_highlighted
                      ? 'bg-[#000000] text-[#fff]'
                      : 'bg-[#00FFBC] text-[#000000]'
                  } px-5 h-11 items-center justify-between flex rounded-md font-bold text-center`}
                >
                  {button.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
