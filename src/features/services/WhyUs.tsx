"use client"

import { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface Card {
  id: number
  card_title: string
  card_description: string
  icon?: {
    url: string
    alternativeText?: string
  }
}

interface WhyUsData {
  title?: string
  subtitle?: string
  description?: string
  cards?: Card[]
}

export default function WhyTechorphic({ data }: { data: WhyUsData }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const cardRotations = useMemo(() => [-8, 4, -3, 6], [])

  useEffect(() => {
    if (!data?.cards) return

    const ctx = gsap.context(() => {
      const cardWidth = 280
      const cardSpacing = 40
      const totalCardWidth = cardWidth + cardSpacing
      const cardsPerRow = data.cards?.length || 4

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${cardsPerRow * 400 + 1000}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Animate title
      tl.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, 0)

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        0.5,
      )

      // Animate description
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        0.8,
      )

      // Set initial state for all cards
      gsap.set(cardsRef.current, {
        x: window.innerWidth + 200,
        y: 0,
        rotateZ: 15,
        opacity: 0,
        scale: 0.8,
      })

      // Animate cards in sequence
      cardsRef.current.forEach((card, i) => {
        if (!card) return

        const centerOffset = ((cardsPerRow - 1) * totalCardWidth) / 2
        const targetX = i * totalCardWidth - centerOffset

        tl.to(
          card,
          {
            x: targetX,
            y: 0,
            rotateZ: cardRotations[i % cardRotations.length],
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.2)",
          },
          1.5 + i * 0.2,
        )
      })

      tl.to(
        cardsRef.current,
        {
          rotateZ: (i) => cardRotations[i % cardRotations.length] * 0.5,
          duration: 1,
          ease: "power2.inOut",
        },
        3 + cardsPerRow * 0.2,
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [data?.cards, cardRotations])

  return (
    <div
      ref={sectionRef}
      className="bg-black h-screen flex flex-col w-full bg-cover bg-center items-center justify-center px-6 py-20 relative overflow-hidden"
      style={{ backgroundImage: "url('/features-bg.svg')" }}
    >
      <div className="max-w-6xl w-full text-center relative z-10 mt-10">
        {/* Title */}
        <div ref={titleRef} className="mb-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            {data?.title}
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 leading-tight">{data?.subtitle}</h2>
        </div>

        {/* Description */}
        <div ref={descriptionRef} className="mb-16 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">{data?.description}</p>
        </div>

        {/* Cards */}
        <div className="relative w-full max-w-7xl h-[450px] flex justify-center items-center mt-16">
          {data?.cards?.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="absolute"
              style={{ zIndex: data.cards!.length - index }}
            >
              <div className="group relative cursor-pointer w-[280px]">
                <div className="relative rounded-3xl p-8 shadow-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-2 h-[380px] flex flex-col justify-between">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-[#00E2A6] rounded-3xl"></div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    {card.icon?.url && (
                      <Image
                        src={card.icon.url || "/placeholder.svg"}
                        alt={card.icon.alternativeText || card.card_title}
                        width={60}
                        height={60}
                        className="mx-auto mb-4"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold text-black/90 mb-4 leading-tight">
                      {card.card_title}
                    </h3>
                    <p className="text-base text-black/80 leading-relaxed">{card.card_description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
