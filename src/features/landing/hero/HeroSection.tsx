import React from "react";
import Link from "next/link";
import Image from "next/image";

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

const HeroSection = ({
  title = "",
  subtitle,
  description,
  technologies = [],
  ctaButtons = [],
}: HeroSectionProps) => {
  // Convert Strapi rich text to plain text
  const getPlainText = (richText: any): string => {
    if (!richText) return "";
    if (typeof richText === "string") return richText;
    if (Array.isArray(richText)) {
      return richText
        .map((block: any) =>
          block.children?.map((child: any) => child.text).join("")
        )
        .join(" ");
    }
    return "";
  };

  const descriptionText = getPlainText(description) || "";

  // ✅ Safe helper for icon URLs
  const getIconUrl = (icon: any): string | null => {
    const rawUrl = icon?.url || icon?.data?.attributes?.url;
    if (!rawUrl) return null;
    return rawUrl.startsWith("http")
      ? rawUrl
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`;
  };

  return (
    <section className="w-full px-6 py-16 pb-[8rem]">
      <div className="max-w-7xl mx-auto">
        {/* Content Grid */}
        <div className="flex flex-col w-full justify-between">
          {/* Left Column */}
          <div className="w-[50%]">
            <h1
              className="font-normal leading-[80px] md:text-[68px] text-[40px] hidden md:block tracking-[-0.017em] text-[#020209] max-w-[460px]"
              style={{
                fontFamily: "Overcame Demo, system-ui, -apple-system, sans-serif",
                textShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              {title}
            </h1>
          </div>

          {/* Mobile Title */}
          <p
            className="block md:hidden text-5xl"
            style={{
              fontFamily: "Overcame Demo, system-ui, -apple-system, sans-serif",
              textShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            {title.replace(/\n/g, " ")}
          </p>

          {/* Right Column */}
          <div className="flex items-end md:justify-end transform md:-translate-y-13">
            <div className="md:w-[35%]">
              <p
                className="font-normal leading-[110%] md:text-[40px] text-[30px] mt-3.5 md:mt-0 tracking-[-0.017em] text-[#030208] md:text-right"
                style={{
                  fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
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
            <div className="grid grid-cols-8 gap-3">
              {technologies.slice(0, 16).map((tech) => {
                const iconUrl = getIconUrl(tech.icon);
                return (
                  <div key={tech.id} className="flex items-center justify-center">
                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt={
                          tech.icon?.alternativeText ||
                          tech.icon?.data?.attributes?.alternativeText ||
                          tech.name
                        }
                        width={40}
                        height={40}
                        className="h-10 w-auto object-contain"
                        loading="lazy" // ✅ improves LCP
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
          <p className="font-[300] md:text-[36px] text-[30px] leading-[110%] tracking-[-1.7%]">
            Your users deserve more than just functional technology, <br /> they
            deserve an exceptional experience.
          </p>

          {/* Static Description */}
          <p className="font-[300] md:text-[36px] text-[30px] leading-[110%] tracking-[-1.7%] max-w-5xl">
            Techorphic&apos;s software development services deliver scalable,
            intuitive solutions like apps processing over 1M payments monthly
            and tools speeding up healthcare signups by 40%. We&apos;re your
            success partner.
          </p>

          {/* CTA Buttons */}
          {ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              {ctaButtons.map((button) => (
                <Link
                  key={button.id}
                  href={button.url}
                  className={`${
                    button.is_highlighted
                      ? "bg-[#000000] text-[#fff]"
                      : "bg-[#00FFBC] text-[#000000]"
                  } px-5 h-11 flex items-center justify-center rounded-md font-bold text-center`}
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
