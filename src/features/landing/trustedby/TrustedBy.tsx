"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface BrandLogo {
  id: number
  name: string
  logo: {
    url?: string
    alternativeText?: string
    data?: {
      attributes: {
        url: string
        alternativeText?: string
      }
    }
  }
}

interface Stat {
  id: number
  number: string
  label: string
}

interface BrandItem {
  id: number
  title: string
  subtitle: string
  tagline: string
}

interface TrustedByProps {
  brandItems?: BrandItem[]
  stats?: Stat[]
  brandLogos?: BrandLogo[]
}

export default function TrustedBy({ brandItems = [], stats = [], brandLogos = [] }: TrustedByProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { margin: "-100px" })
  const [mounted, setMounted] = useState(false)

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  useEffect(() => {
    setMounted(true)
  }, [])

  // Counter animation component
  const Counter = ({
    from,
    to,
    duration = 2,
    delay = 0,
  }: {
    from: number
    to: number
    duration?: number
    delay?: number
  }) => {
    const count = useMotionValue(from)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const ref = useRef(null)
    const counterInView = useInView(ref, { margin: "-50px" })

    useEffect(() => {
      if (counterInView) {
        const controls = animate(count, to, {
          duration,
          delay,
          ease: "easeOut",
        })
        return () => controls.stop()
      } else {
        count.set(from)
      }
    }, [counterInView, count, to, duration, delay, from])

    return (
      <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-2">
        <motion.span>{rounded}</motion.span>
        <span>+</span>
      </div>
    )
  }

  const mainBrandItem = brandItems[0] || {
    title: "TRUSTED GLOBALLY BY",
    subtitle: "VISIONARY BRANDS",
    tagline: "Coding the World Together",
  }

  const defaultBrandLogos = [
    { id: 1, name: "Sun", logo: { url: "/company-logo-3.svg" } },
    { id: 2, name: "SATYA Jewelry", logo: { url: "/company-logo-2.svg" } },
    { id: 3, name: "PHL", logo: { url: "/company-logo-3.svg" } },
    { id: 4, name: "Kerasse", logo: { url: "/company-logo-4.svg" } },
    { id: 5, name: "XIW", logo: { url: "/company-logo-5.svg" } },
    { id: 6, name: "Apteo", logo: { url: "/company-logo-6.svg" } },
  ]

  const displayBrandLogos = brandLogos.length > 0 ? brandLogos : defaultBrandLogos

  const defaultStats = [
    { id: 1, number: "4", label: "Years of Excellence" },
    { id: 2, number: "30", label: "Cross-Functional Experts" },
  ]

  const displayStats = stats.length > 0 ? stats : defaultStats

  return (
    <div
      ref={sectionRef}
      className=" relative w-full bg-cover bg-center bg-black overflow-hidden"
      style={{ backgroundImage: "url('/features-bg.svg')" }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(30px, 5vw, 60px) clamp(30px, 5vw, 60px)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8">
          <h1
            className="font-bold text-white mb-1 leading-20 font-overcame"
            style={{ fontSize: "clamp(28px, 6vw, 62px)" }}
          >
            {mainBrandItem.title} <br /> {mainBrandItem.subtitle}
          </h1>
          <p className="text-gray-300 font-light tracking-wide" style={{ fontSize: "clamp(16px, 3vw, 36px)" }}>
            {mainBrandItem.tagline}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 xl:gap-32 mb-8 sm:mb-12 lg:mb-16 w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {displayStats.map((stat, index) => {
            const numericValue = Number.parseInt(stat.number.replace(/\D/g, "")) || 0
            return (
              <div
                key={stat.id}
                className="text-center flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-5 border-b pb-6 sm:pb-8 border-white w-full lg:w-[50%]"
              >
                <Counter from={0} to={numericValue} duration={2} delay={index * 0.2} />
                <div
                  className="text-white font-[300] text-center sm:text-left"
                  style={{ fontSize: "clamp(20px, 4vw, 48px)" }}
                >
                  {stat.label.split(" ").map((word, wordIndex) => (
                    <p key={wordIndex}>{word}</p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="w-full max-w-7xl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {displayBrandLogos.map((brand, index) => {
                const logoUrl = brand.logo?.url
                  ? brand.logo.url.startsWith("http")
                    ? brand.logo.url
                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${brand.logo.url}`
                  : brand.logo?.data?.attributes?.url
                    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${brand.logo.data.attributes.url}`
                    : "/company-logo-3.svg" // fallback

                return (
                  <CarouselItem key={brand.id || index} className="basis-1/2 sm:basis-1/3 lg:basis-1/6">
                    <div className="flex items-center justify-center p-3 sm:p-4 lg:p-6 border-l border-gray-600 min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]">
                      <div className="text-center">
                        <Image
                          src={logoUrl || "/placeholder.svg"}
                          alt={
                            brand.logo?.alternativeText ||
                            brand.logo?.data?.attributes?.alternativeText ||
                            brand.name ||
                            "Brand logo"
                          }
                          width={48}
                          height={48}
                          className="h-8 w-auto sm:h-10 lg:h-12 mx-auto filter brightness-0 invert opacity-70"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden" />
            <CarouselNext className="hidden" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
