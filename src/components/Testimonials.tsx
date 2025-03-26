"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";
import Image from "next/image";

// Define testimonial data
const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Medical Student",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "StudyAI transformed my medical school experience. I can quickly generate comprehensive study guides for complex topics and practice with custom question sets. My exam scores have improved by over 20%!",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Computer Science Major",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    quote: "The concept mapping feature is incredible for understanding complex programming concepts. I use StudyAI to visualize connections between different algorithms and data structures, making it much easier to grasp challenging topics.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Law Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Preparing for the bar exam was overwhelming until I found StudyAI. The platform helped me organize case laws and precedents, and the practice questions simulate real exam scenarios. It's been an invaluable study companion.",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "High School Teacher",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    quote: "I recommend StudyAI to all my students. The personalized learning paths adapt to each student's needs, and I can track their progress through the analytics dashboard. It's revolutionized how I support my students' learning.",
    rating: 4,
  },
  {
    id: 5,
    name: "Jennifer Lee",
    role: "MBA Student",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
    quote: "The collaborative features allow my study group to share notes and flashcards effortlessly. We can all contribute to study materials and track our collective progress. It's made our group sessions much more productive.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [direction, setDirection] = useState(0);
  
  // State to track the container height for smooth transitions
  const [containerHeight, setContainerHeight] = useState(500);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Update container height when active testimonial changes
  useEffect(() => {
    if (testimonialRef.current) {
      // Only update height after the enter animation starts
      const timer = setTimeout(() => {
        const height = testimonialRef.current?.offsetHeight || 500;
        setContainerHeight(height);
      }, 100); // Slight delay to avoid jitter
      
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);
  
  // Handle navigation with animation locking to prevent jitter
  const goToNext = () => {
    if (isAnimating) return; // Prevent navigation during animation
    setIsAnimating(true);
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    // Reset animation lock after animation completes
    setTimeout(() => setIsAnimating(false), 700);
  };
  
  const goToPrev = () => {
    if (isAnimating) return; // Prevent navigation during animation
    setIsAnimating(true);
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    // Reset animation lock after animation completes
    setTimeout(() => setIsAnimating(false), 700);
  };
  
  const goToIndex = (index: number) => {
    if (isAnimating || index === activeIndex) return; // Prevent navigation during animation
    setActiveIndex(index);
    
    // Reset autoplay timer when manually navigating
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      if (autoplay) {
        autoplayRef.current = setInterval(goToNext, 5000);
      }
    }
  };
  
  // Set up autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(goToNext, 5000);
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
      transition: {
        x: { 
          type: "spring", 
          stiffness: 270, 
          damping: 30,
          restDelta: 0.001, // Ensures animation fully completes
          duration: 0.5,
          ease: "easeOut"
        },
        opacity: { duration: 0.4, ease: "easeInOut" }
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      zIndex: 0,
      transition: {
        x: { 
          type: "spring", 
          stiffness: 270, 
          damping: 30,
          restDelta: 0.001, // Ensures animation fully completes
          duration: 0.5,
          ease: "easeIn"
        },
        opacity: { duration: 0.3, ease: "easeOut" }
      }
    }),
  };
  
  // Update direction when changing slides
  const updateDirection = (newIndex: number) => {
    // Handle wrap-around cases properly
    if (newIndex === 0 && activeIndex === testimonials.length - 1) {
      setDirection(-1); // Going left to first slide from last slide
    } else if (newIndex === testimonials.length - 1 && activeIndex === 0) {
      setDirection(1); // Going right to last slide from first slide
    } else {
      // Normal case
      setDirection(newIndex > activeIndex ? 1 : -1);
    }
    goToIndex(newIndex);
  };
  
  // Handle swipe gestures
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isAnimating) return; // Prevent dragging during animation
    
    // If the user dragged left (negative offset), go to next slide
    if (info.offset.x < -100) {
      goToNext();
    }
    // If the user dragged right (positive offset), go to previous slide
    else if (info.offset.x > 100) {
      goToPrev();
    }
    
    // Reset autoplay after dragging
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      if (autoplay) {
        autoplayRef.current = setInterval(goToNext, 5000);
      }
    }
  };
  
  return (
    <section 
      id="testimonials" 
      className="py-20 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-50/50 dark:from-indigo-950/20 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-10"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-3"
          >
            Student Success Stories
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            What Our <span className="text-gradient">Users</span> Say
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-3xl mx-auto text-lg md:text-xl"
          >
            Join thousands of students who have transformed their learning experience with StudyAI.
          </motion.p>
        </motion.div>
        
        {/* Testimonial Carousel */}
        <div 
          className="relative overflow-hidden py-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Fixed height container to prevent layout shifts */}
          <div 
            className="relative overflow-hidden"
            style={{ 
              height: `${containerHeight}px`,
              transition: "height 400ms ease-in-out", // Smoother height transition
              willChange: "height",
              perspectiveOrigin: "center",
              perspective: "1000px"
            }}
          >
            <motion.div
              drag={!isAnimating ? "x" : false} // Disable dragging during animation
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing touch-pan-y"
              style={{ 
                willChange: "transform",
                position: "relative", 
                height: "100%",
                perspective: "1000px",
                transform: "translateZ(0)"
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  ref={testimonialRef}
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onAnimationStart={() => setIsAnimating(true)}
                  onAnimationComplete={() => setIsAnimating(false)}
                  className="w-full"
                  style={{ 
                    position: 'absolute', 
                    left: 0, 
                    right: 0, 
                    top: 0,
                    transformOrigin: direction > 0 ? "left center" : "right center",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Content wrapper with guaranteed width */}
                  <div className="mx-auto max-w-4xl glassmorphism dark:glassmorphism rounded-2xl p-1 shadow-xl"
                    style={{ 
                      willChange: "transform", 
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)"
                    }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                      <div className="grid md:grid-cols-5 items-stretch">
                        {/* Image column */}
                        <div className="md:col-span-2 relative min-h-[300px] md:min-h-full bg-gradient-to-br from-indigo-500 to-purple-600">
                          <div className="absolute inset-0 opacity-20">
                            <svg
                              className="w-full h-full"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 0 L100 0 L100 100 L0 100 Z"
                                stroke="white"
                                strokeWidth="0.5"
                                fill="none"
                              />
                              {Array.from({ length: 10 }).map((_, i) => (
                                <path
                                  key={i}
                                  d={`M${i * 10} 0 L${i * 10} 100`}
                                  stroke="white"
                                  strokeWidth="0.2"
                                  fill="none"
                                />
                              ))}
                              {Array.from({ length: 10 }).map((_, i) => (
                                <path
                                  key={i}
                                  d={`M0 ${i * 10} L100 ${i * 10}`}
                                  stroke="white"
                                  strokeWidth="0.2"
                                  fill="none"
                                />
                              ))}
                            </svg>
                          </div>
                          
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
                              <Image
                                src={testimonials[activeIndex].image}
                                alt={testimonials[activeIndex].name}
                                fill
                                sizes="96px"
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzZhN2RmZiIgLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiNmZmZmZmYiIC8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMjIwIiByPSI5MCIgZmlsbD0iI2ZmZmZmZiIgLz48L3N2Zz4=";
                                }}
                              />
                            </div>
                            
                            <h3 className="text-xl font-bold text-white">{testimonials[activeIndex].name}</h3>
                            <p className="text-indigo-100 text-sm mb-4">{testimonials[activeIndex].role}</p>
                            
                            <div className="flex items-center justify-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < testimonials[activeIndex].rating
                                      ? "text-yellow-300 fill-yellow-300"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Content column */}
                        <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                          <Quote className="h-10 w-10 text-indigo-200 dark:text-indigo-800 mb-6" />
                          
                          <blockquote className="text-lg md:text-xl mb-8 relative">
                            "{testimonials[activeIndex].quote}"
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Navigation indicators with mobile swipe hint */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => updateDirection(index)}
                  disabled={isAnimating}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-indigo-600 dark:bg-indigo-400 w-8"
                      : isAnimating 
                        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                        : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-3 hidden sm:inline-block">
                Swipe or use arrows
              </span>
              <div className="flex gap-3">
                <motion.button
                  onClick={goToPrev}
                  whileHover={!isAnimating ? { scale: 1.1 } : {}}
                  whileTap={!isAnimating ? { scale: 0.9 } : {}}
                  disabled={isAnimating}
                  className={`w-10 h-10 flex items-center justify-center border rounded-full shadow-sm transition-colors
                    ${isAnimating 
                      ? "border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900 cursor-not-allowed" 
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    }`}
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className={`h-5 w-5 ${isAnimating ? "text-gray-400 dark:text-gray-700" : "text-gray-600 dark:text-gray-300"}`} />
                </motion.button>
                
                <motion.button
                  onClick={goToNext}
                  whileHover={!isAnimating ? { scale: 1.1 } : {}}
                  whileTap={!isAnimating ? { scale: 0.9 } : {}}
                  disabled={isAnimating}
                  className={`w-10 h-10 flex items-center justify-center border rounded-full shadow-sm transition-colors
                    ${isAnimating 
                      ? "border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900 cursor-not-allowed" 
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    }`}
                  aria-label="Next testimonial"
                >
                  <ArrowRight className={`h-5 w-5 ${isAnimating ? "text-gray-400 dark:text-gray-700" : "text-gray-600 dark:text-gray-300"}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social proof */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-gradient">15k+</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">Active Students</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-gradient">4.9</span>
            <div className="flex items-center mt-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Rating</span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-gradient">93%</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">Better Grades</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 