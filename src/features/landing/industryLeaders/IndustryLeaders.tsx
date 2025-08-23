"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Feature {
  id: number
  title_line1: string
  title_line2: string
}

interface IndustryLeadersProps {
  top_headline?: string
  bottom_headline?: string
  footer_description?: Array<{
    type: string
    children: Array<{ text: string; type: string }>
  }>
  features?: Feature[]
  choice_video?: {
    url: string
    alternativeText?: string
  }
}

const parseRichText = (
  richTextArray?: Array<{
    type: string
    children: Array<{ text: string; type: string }>
  }>,
): string => {
  if (!richTextArray || !Array.isArray(richTextArray)) return ""

  return richTextArray
    .map((block) => block.children?.map((child) => child.text || "").join(" "))
    .filter((text) => text.trim())
    .join(" ")
}

export default function IndustryLeaders({
  top_headline,
  bottom_headline,
  footer_description,
  features = [],
  choice_video,
}: IndustryLeadersProps) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const leftCardsRef = useRef<HTMLDivElement[]>([])
  const rightCardsRef = useRef<HTMLDivElement[]>([])

  const processedFeatures = features.map((feature) => ({
    id: feature.id,
    text: `${feature.title_line1} ${feature.title_line2}`,
  }))

  const leftFeatures = processedFeatures.filter((_, index) => index % 2 === 0)
  const rightFeatures = processedFeatures.filter((_, index) => index % 2 !== 0)

  const parsedFooterDescription = parseRichText(footer_description)

  useEffect(() => {
    if (processedFeatures.length === 0) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${processedFeatures.length * 2 * 150}`,
          pin: true,
          scrub: true,
        },
      })

      tl.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0)

      leftCardsRef.current.forEach((card, index) => {
        if (card) {
          tl.fromTo(card, { y: "100vh" }, { y: 0, duration: 1, ease: "power2.out" }, 0.5 + index * 0.3)
        }
      })

      rightCardsRef.current.forEach((card, index) => {
        if (card) {
          tl.fromTo(card, { y: "100vh" }, { y: 0, duration: 1, ease: "power2.out" }, 0.65 + index * 0.3)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [processedFeatures.length])

  const leftRotations = [-3, -6, -2]
  const rightRotations = [2, 5, -1]

// In your IndustryLeaders component, update the loading condition:
if (!top_headline && !bottom_headline && (!features || features.length === 0)) {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-white text-xl">Loading industry leaders...</div>
    </div>
  )
}
  return (
    <div
      ref={sectionRef}
      className="bg-black min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div ref={titleRef} className="text-center mb-20 relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight max-w-[700px]">
          {top_headline}
          <br />
        </h1>
       
      </div>

      {features.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full relative z-10">
          {/* Left Column */}
          <div className="flex flex-col gap-2 justify-center items-center">
            {leftFeatures.map((feature, index) => (
              <div
                key={`left-${feature.id}`}
                ref={(el) => {
                  if (el) leftCardsRef.current[index] = el
                }}
                className="group relative cursor-pointer max-w-[27rem]"
                style={{
                  transform: `rotate(${leftRotations[index] || 0}deg)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-teal-400/30 to-cyan-400/30 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div
                  className={`relative ${index === 0 ? "bg-[#72F7D4]" : "bg-[#11E5AD]"} rounded-[1.2rem] p-4 md:p-6 shadow-2xl border border-white/20 backdrop-blur-sm hover:scale-105 hover:rotate-0 hover:-translate-y-2 transition-all duration-300`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-[2rem]"></div>
                  <h3 className="relative text-2xl md:text-3xl lg:text-3xl font-bold text-black/90 leading-tight tracking-tight">
                    {feature.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-2 justify-center items-center">
            {rightFeatures.map((feature, index) => (
              <div
                key={`right-${feature.id}`}
                ref={(el) => {
                  if (el) rightCardsRef.current[index] = el
                }}
                className="group relative cursor-pointer max-w-[27rem]"
                style={{
                  transform: `rotate(${rightRotations[index] || 0}deg)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-teal-400/30 to-cyan-400/30 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div
                  className={`relative bg-gradient-to-br ${index === 0 ? "bg-[#72F7D4]" : "bg-[#11E5AD]"} rounded-[1.2rem] p-4 md:p-6 shadow-2xl border border-white/20 backdrop-blur-sm hover:scale-105 hover:rotate-0 hover:-translate-y-2 transition-all duration-300`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-[2rem]"></div>
                  <h3 className="relative text-2xl md:text-3xl lg:text-3xl font-bold text-black/90 leading-tight tracking-tight">
                    {feature.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
