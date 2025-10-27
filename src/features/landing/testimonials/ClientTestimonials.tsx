"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

interface TestimonialProps {
  testimonials: any[]
}

export default function ClientTestimonials({ testimonials = [] }: TestimonialProps) {
  const extractTextFromRichText = (richTextArray: any[]) => {
    if (!richTextArray || !Array.isArray(richTextArray)) return ""

    return richTextArray
      .map((paragraph: any) => {
        if (paragraph.children && Array.isArray(paragraph.children)) {
          return paragraph.children.map((child: any) => child.text || "").join("")
        }
        return ""
      })
      .join(" ")
  }

  const transformedTestimonials = testimonials.map((testimonial: any) => ({
    text: extractTextFromRichText(testimonial.testimonial_text),
    clientPhoto: testimonial.client_photo?.url
      ? `${testimonial.client_photo.url}`
      : "/placeholder.svg?height=80&width=80&text=User&bg=gray&color=white",
    clientName: testimonial.client_name || "Anonymous",
    clientTitle: testimonial.client_role || "Client",
  }))

  const displayTestimonials =
    transformedTestimonials.length > 0
      ? transformedTestimonials
      : [
          {
            text: "At Techorphic Developers, nothing speaks louder than the success stories of our clients. Hear directly from some of our valued partners about their experience collaborating with us.",
            clientPhoto: "/placeholder.svg?height=80&width=80&text=AS&bg=gray&color=white",
            clientName: "Alyan Shahzad",
            clientTitle: "CEO",
          },
          {
            text: "Working with Techorphic Developers was a game-changer for our business. Their expertise and dedication helped us achieve our goals efficiently and effectively.",
            clientPhoto: "/placeholder.svg?height=80&width=80&text=JD&bg=gray&color=white",
            clientName: "Jane Doe",
            clientTitle: "CTO, Innovate Corp",
          },
          {
            text: "The team at Techorphic Developers delivered an outstanding product that exceeded our expectations. Their communication and professionalism were top-notch throughout the project.",
            clientPhoto: "/placeholder.svg?height=80&width=80&text=JS&bg=gray&color=white",
            clientName: "John Smith",
            clientTitle: "Founder, GlobalTech Solutions",
          },
        ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.1 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayTestimonials.length)
    }, 9000)
    return () => clearInterval(interval)
  }, [displayTestimonials.length])

  // Animation variants
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

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const braceVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  }

  const testimonialVariants = {
    enter: {
      x: 300,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const indicatorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="relative md:min-h-screen bg-black text-white flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundImage: "url('/features-bg.svg')" }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
          backgroundSize: "30px 30px sm:40px 40px lg:50px 50px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <motion.div className="mb-8 sm:mb-12 lg:mb-16" variants={headerVariants}>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-overcame lg:text-5xl xl:text-6xl font-extrabold mb-2 sm:mb-4 uppercase tracking-wide sm:tracking-wider lg:tracking-widest font-mono leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Client Testimonials
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 px-2"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Trusted by Businesses Worldwide
          </motion.p>
        </motion.div>

        {/* Testimonials Container */}
        <div className="relative flex items-center justify-center">
          {/* Left Brace */}
          <motion.div
            className="hidden lg:flex items-center justify-center flex-shrink-0 w-16 xl:w-24"
            variants={braceVariants}
          >
            <motion.span
              className="text-8xl xl:text-[13rem] translate-y-12 xl:translate-y-[180px] text-[#33E2B4] leading-none"
              animate={{
                rotateY: [0, 10, 0],
                transition: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              {"}"}
            </motion.span>
          </motion.div>

          {/* Testimonial Carousel Container */}
          <motion.div
            className="flex-1 overflow-hidden mx-4 lg:mx-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative h-[250px] sm:h-[300px] lg:h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="absolute inset-0 flex flex-col items-center justify-center px-2 sm:px-4 lg:px-8"
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* Testimonial Text */}
                  <motion.div
                    className="mb-6 sm:mb-8 lg:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto px-2">
                      {displayTestimonials[currentSlide].text}
                    </p>
                  </motion.div>

                  {/* Client Information */}
                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-[#33E2B4] flex items-center justify-center bg-gray-800"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={displayTestimonials[currentSlide].clientPhoto || "/placeholder.svg"}
                        alt={`${displayTestimonials[currentSlide].clientName} photo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=80&width=80&text=User&bg=gray&color=white"
                        }}
                      />
                    </motion.div>

                    {/* Client Details */}
                    <div className="text-center sm:text-left">
                      <p className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                        {displayTestimonials[currentSlide].clientName}
                      </p>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-400 mt-1">
                        {displayTestimonials[currentSlide].clientTitle}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Brace */}
          <motion.div
            className="hidden lg:flex items-center justify-center flex-shrink-0 w-16 xl:w-24"
            variants={braceVariants}
          >
            <motion.span
              className="text-8xl xl:text-[13rem] -translate-y-12 xl:-translate-y-[180px] text-[#33E2B4] leading-none"
              animate={{
                rotateY: [0, -10, 0],
                transition: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              {"{"}
            </motion.span>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <motion.div
          className="flex justify-center mt-8 sm:mt-10 lg:mt-12 space-x-2 sm:space-x-3"
          variants={indicatorVariants}
        >
          {displayTestimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 sm:w-2 sm:h-2 lg:w-2 lg:h-2 transition-all duration-300 ${
                index === currentSlide ? "bg-[#00A77B] scale-110" : "bg-white hover:bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
            />
          ))}
        </motion.div>

        {/* Navigation Arrows for Mobile */}
        <motion.div
          className="flex justify-center space-x-8 mt-6 sm:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)
            }
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % displayTestimonials.length)}
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
