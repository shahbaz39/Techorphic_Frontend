"use client"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface VideoSectionProps {
  top_headline?: string
  bottom_headline?: string
  footer_description?: Array<{
    type: string
    children: Array<{ text: string; type: string }>
  }>
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

export default function VideoSection({
  top_headline,
  bottom_headline,
  footer_description,
  choice_video,
}: VideoSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // ✅ Use the full Cloudinary URL as-is
  const videoUrl = choice_video?.url || null

  const parsedFooterDescription = parseRichText(footer_description)

  if (!top_headline && !bottom_headline && !choice_video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading video section...</div>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className="md:min-h-screen w-full flex flex-col items-center justify-center px-4 py-20"
      style={{
        backgroundImage: "url('/hero-bg-2.svg')",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div className="text-center mb-8 max-w-4xl" variants={itemVariants}>
        <motion.h2
          className="text-4xl md:text-5xl font-overcame lg:text-6xl font-bold text-black mb-6 leading-tight max-w-[630px]"
          variants={itemVariants}
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {bottom_headline}
          </motion.span>
        </motion.h2>

        {parsedFooterDescription && (
          <motion.p
            className="text-base md:text-3xl text-gray-700 max-w-2xl mx-auto"
            variants={itemVariants}
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {parsedFooterDescription}
          </motion.p>
        )}
      </motion.div>

      <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
        {videoUrl ? (
          <video
            src={videoUrl} // ✅ Use the full Cloudinary URL directly
            className="w-full h-full object-cover"
            controls
            poster="/hero-bg-2.svg"
            aria-label={choice_video?.alternativeText || "Industry leaders video"}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-cover"
            style={{ backgroundImage: "url('/videobg.svg')" }}
          >
            <div className="text-center text-gray-600">
              <div className="mb-4">No video available</div>
              <button className="bg-white/60 hover:bg-white backdrop-blur-2xl transition-colors duration-200 rounded-2xl p-5 px-10 shadow-lg group">
                <div className="w-0 h-0 border-l-[24px] border-l-gray-800 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent ml-2 group-hover:border-l-gray-900 transition-colors duration-200"></div>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
