"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Send, BookOpen, BookText, GraduationCap, School, Library, Microscope, Dna, Calculator, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Add chat container ref for scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Variables for 3D tilt effect
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [cardScale, setCardScale] = useState(1);

  // Chat animation states
  const [animationStage, setAnimationStage] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [animationCycle, setAnimationCycle] = useState(0);
  const [inputFieldText, setInputFieldText] = useState("");
  const [showInputCursor, setShowInputCursor] = useState(false);
  const [currentQAIndex, setCurrentQAIndex] = useState(0);
  
  // Array of 10 different question-answer pairs for variety
  const questionsAndAnswers = [
    {
      question: "Can you help me understand quantum physics?",
      answer: {
        text: "Quantum physics is fascinating! I'd be happy to help you understand it. Let's start with the fundamental concepts:",
        bullets: [
          "Wave-particle duality",
          "Quantum superposition",
          "Heisenberg's uncertainty principle",
          "Quantum entanglement"
        ]
      }
    },
    {
      question: "How do I prepare for a biology exam?",
      answer: {
        text: "I can definitely help you prepare for your biology exam! Here's a structured approach:",
        bullets: [
          "Create a concept map for each major topic",
          "Practice with past exam questions",
          "Use spaced repetition for memorization",
          "Form study groups to discuss complex concepts"
        ]
      }
    },
    {
      question: "What are the key events of World War II?",
      answer: {
        text: "World War II was a pivotal moment in history. Here are some of the most significant events:",
        bullets: [
          "German invasion of Poland (1939)",
          "Attack on Pearl Harbor (1941)",
          "D-Day Normandy landings (1944)",
          "Atomic bombings of Hiroshima and Nagasaki (1945)"
        ]
      }
    },
    {
      question: "Can you explain the water cycle?",
      answer: {
        text: "The water cycle is a continuous natural process that circulates water throughout Earth. Here are the main phases:",
        bullets: [
          "Evaporation: Water transforms from liquid to vapor",
          "Condensation: Water vapor forms clouds",
          "Precipitation: Water returns to Earth as rain/snow",
          "Collection: Water gathers in bodies of water and groundwater"
        ]
      }
    },
    {
      question: "What are the principles of machine learning?",
      answer: {
        text: "Machine learning is a fascinating field! Here are the core principles you should understand:",
        bullets: [
          "Supervised vs. unsupervised learning approaches",
          "Training and test data separation",
          "Feature selection and engineering",
          "Model evaluation and validation techniques"
        ]
      }
    },
    {
      question: "How do I solve quadratic equations?",
      answer: {
        text: "Quadratic equations can be solved in several ways. Let me show you the main methods:",
        bullets: [
          "Using the quadratic formula: x = (-b ± √(b² - 4ac))/2a",
          "Factoring the equation when possible",
          "Completing the square method",
          "Graphing to find x-intercepts"
        ]
      }
    },
    {
      question: "What are the planets in our solar system?",
      answer: {
        text: "Our solar system consists of eight planets orbiting the Sun. Here they are in order:",
        bullets: [
          "Mercury, Venus, Earth, and Mars (Terrestrial planets)",
          "Jupiter and Saturn (Gas giants)",
          "Uranus and Neptune (Ice giants)",
          "Pluto (now classified as a dwarf planet)"
        ]
      }
    },
    {
      question: "How do I write an effective essay?",
      answer: {
        text: "Writing an effective essay requires structure and clarity. Here's a step-by-step approach:",
        bullets: [
          "Create a strong thesis statement",
          "Organize with an introduction, body paragraphs, and conclusion",
          "Use evidence and examples to support your points",
          "Revise for clarity, coherence, and proper citation"
        ]
      }
    },
    {
      question: "What are the key principles of economics?",
      answer: {
        text: "Economics is built on several fundamental principles. Here are the most important ones to understand:",
        bullets: [
          "Supply and demand determine market prices",
          "Opportunity cost: what you give up to get something",
          "Marginal analysis: additional benefits vs. additional costs",
          "Incentives drive economic behavior"
        ]
      }
    },
    {
      question: "How do computers store and process data?",
      answer: {
        text: "Computers use fascinating systems to store and process information. Here's how it works:",
        bullets: [
          "Binary system (0s and 1s) represents all data",
          "CPU processes instructions using logic gates",
          "RAM provides temporary working memory",
          "Storage devices (SSD/HDD) retain data permanently"
        ]
      }
    }
  ];

  // Gradient position state
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

  // Animation state for the lottery star effect
  const [isRolling, setIsRolling] = useState(false);
  const [showBang, setShowBang] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showShine, setShowShine] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const targetRating = 4.9;

  // Scroll chat to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [typedText, showAIResponse, showTypingIndicator, inputFieldText]);

  // Control 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        // Calculate 3D tilt effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateXValue = ((y - centerY) / centerY) * -8;
        const rotateYValue = ((x - centerX) / centerX) * 8;
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);

        // Update gradient position
        const gradX = (x / rect.width) * 100;
        const gradY = (y / rect.height) * 100;
        setGradientPosition({ x: gradX, y: gradY });
      }
    };

    const handleMouseEnter = () => {
      setCardScale(1.03);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setCardScale(1);
      setGradientPosition({ x: 50, y: 50 });
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      heroElement.addEventListener("mouseenter", handleMouseEnter);
      heroElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
        heroElement.removeEventListener("mouseenter", handleMouseEnter);
        heroElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Cursor animation
  useEffect(() => {
    // Only start animation when component is in view
    if (!inView) return;

    // For a new animation cycle, select the next question
    const nextIndex = (currentQAIndex + 1) % questionsAndAnswers.length;
    
    // Store the current question and answer to use throughout this animation cycle
    const currentQuestion = questionsAndAnswers[nextIndex].question;
    
    // Update the current index state
    setCurrentQAIndex(nextIndex);

    // Animation sequence
    const startAnimation = () => {
      // Reset states
      setAnimationStage(0);
      setTypedText("");
      setInputFieldText("");
      setShowInputCursor(false);
      setShowAIResponse(false);
      setShowTypingIndicator(false);
      setCursorPosition({ x: -100, y: -100 });

      // Initial delay
      setTimeout(() => {
        // Move cursor to input field - more precisely in the middle of the input field
        setAnimationStage(1);
        setCursorPosition({ x: 210, y: 405 }); // Adjusted up slightly for better vertical positioning

        // Click on input field
        setTimeout(() => {
          setAnimationStage(2);
          setShowInputCursor(true);
          
          // Start typing in input field
          setTimeout(() => {
            let currentIndex = 0;
            const typingInterval = setInterval(() => {
              if (currentIndex < currentQuestion.length) {
                setInputFieldText(currentQuestion.substring(0, currentIndex + 1));
                currentIndex++;
              } else {
                clearInterval(typingInterval);
                
                // Move cursor to send button - precise position on the send icon
                setTimeout(() => {
                  setCursorPosition({ x: 450, y: 405 }); // Keeping consistent height with input field
                  
                  // Click send button - first just trigger the animation
                  setTimeout(() => {
                    setAnimationStage(3);
                    setShowInputCursor(false);
                    setInputFieldText("");
                    
                    // After the click animation completes, then show the message in chat
                    setTimeout(() => {
                      // Set the typed message in the chat
                      setTypedText(currentQuestion);
                      
                      // Add a 1-second delay before showing typing indicator
                      setTimeout(() => {
                        // Show typing indicator (AI is thinking...)
                        setShowTypingIndicator(true);
                        
                        // After 2 seconds, hide typing indicator and show AI response
                        setTimeout(() => {
                          setShowTypingIndicator(false);
                          setShowAIResponse(true);
                          
                          // Reset for next cycle
                          setTimeout(() => {
                            setAnimationStage(0);
                            setTypedText("");
                            setShowAIResponse(false);
                            setShowTypingIndicator(false);
                            setShowInputCursor(false);
                            setCursorPosition({ x: -100, y: -100 });
                            
                            // Start next animation cycle
                            setTimeout(() => {
                              setAnimationCycle(prev => prev + 1);
                            }, 5000);
                          }, 7500);
                        }, 2000);
                      }, 1000);
                    }, 450); // Wait for click animation to complete (animation duration is ~400ms)
                  }, 600);
                }, 800);
              }
            }, 100); // Slower typing (increased from 65ms to 100ms)
            
            return () => clearInterval(typingInterval);
          }, 600);
        }, 800);
      }, 1500);
    };

    // Fixing the dependencies for the useEffect hook
    useEffect(() => {
      // Only start animation when component is in view
      if (!inView) return;

      // Reset animation state
      setIsRolling(false);
      setCurrentRating(0);
      
      // Add delay before starting animation
      const animationTimeout = setTimeout(() => {
        startAnimation();
      }, 1000);
      
      return () => clearTimeout(animationTimeout);
    }, [inView, animationCycle, currentQAIndex, questionsAndAnswers, startAnimation]);

  const startRollingAnimation = () => {
    setIsRolling(true);
    setCurrentRating(0);
    
    // Simulate the rolling animation by rapidly changing numbers
    let counter = 0;
    const maxIterations = 30;
    const interval = setInterval(() => {
      counter++;
      
      // Generate random rating between 1 and 5 during rolling
      const randomRating = (Math.random() * 4 + 1).toFixed(1);
      setCurrentRating(parseFloat(randomRating));
      
      // Slow down and eventually stop at the target rating
      if (counter >= maxIterations - 5) {
        // Last few iterations get closer to target
        const distance = maxIterations - counter;
        const adjustedRating = ((targetRating * (5 - distance) + parseFloat(randomRating) * distance) / 5).toFixed(1);
        setCurrentRating(parseFloat(adjustedRating));
      }
      
      if (counter >= maxIterations) {
        clearInterval(interval);
        setCurrentRating(targetRating);
        setIsRolling(false);
        
        // Trigger the bang effect
        setShowBang(true);
        setTimeout(() => setShowBang(false), 700);
        
        // Show the stars with slight delay
        setTimeout(() => setShowStars(true), 200);
        
        // Show shine effect
        setTimeout(() => {
          setShowShine(true);
          setTimeout(() => setShowShine(false), 1200);
        }, 300);
      }
    }, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 20px rgba(99, 102, 241, 0.2)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 5px 10px rgba(99, 102, 241, 0.1)" 
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.6,
      },
    },
  };
  
  const shapeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: 1.2 
      } 
    }
  };

  const captionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 1.6 
      } 
    }
  };

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)`,
  };

  return (
    <section
      ref={mergeRefs(heroRef, inViewRef)}
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
      style={gradientStyle}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      />
      <motion.div 
        className="absolute -top-20 right-1/3 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="z-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="flex items-center mb-4 space-x-2">
            <div className="flex items-center px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-800">
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                AI-Powered Study Assistant
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Study Smarter with{" "}
            <span className="text-gradient">
              AI-Powered Learning
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed"
          >
            Transform your learning experience with our advanced AI study assistant. 
            Create comprehensive study guides, generate practice questions, and get instant feedback 
            to help you master any subject effectively.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg px-6 py-3 font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
            <motion.button
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-6 py-3 font-medium flex items-center justify-center backdrop-blur-sm hover:backdrop-blur-lg transition-all"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div 
            variants={captionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-8 flex items-center"
          >
            <div className="flex -space-x-2 mr-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden bg-gray-200">
                  <Image 
                    src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} 
                    alt={`User avatar ${i}`} 
                    width={32} 
                    height={32}
                  />
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">5,000+</span> students already use StudyAI
            </span>

            {/* Star rating lottery animation */}
            <motion.div
              className="mt-4 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <div className="flex items-center">
                {/* Star icons */}
                <div className="flex mr-2 relative">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="relative">
                      <Star 
                        size={20} 
                        className={`${index < Math.floor(currentRating) ? 'text-yellow-400 fill-yellow-400' : index < Math.ceil(currentRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mx-0.5`} 
                      />
                      
                      {/* Partially filled star */}
                      {index === Math.floor(currentRating) && currentRating % 1 !== 0 && (
                        <div 
                          className="absolute inset-0 overflow-hidden" 
                          style={{ width: `${(currentRating % 1) * 100}%` }}
                        >
                          <Star size={20} className="text-yellow-400 fill-yellow-400 mx-0.5" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Glowing effect when stars appear */}
                  {showStars && (
                    <motion.div 
                      className="absolute inset-0 z-[-1]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: [0, 0.7, 0],
                        scale: [0.8, 1.2, 1.5]
                      }}
                      transition={{ 
                        duration: 1.5,
                        times: [0, 0.3, 1]
                      }}
                    >
                      <div className="absolute inset-0 bg-yellow-400 blur-md rounded-full" />
                    </motion.div>
                  )}
                  
                  {/* Bang effect */}
                  {showBang && (
                    <motion.div
                      className="absolute inset-0 z-[1] pointer-events-none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 2],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 0.7,
                        ease: "easeOut"
                      }}
                    >
                      {/* Radiating circles */}
                      <div className="absolute inset-0 border-2 border-yellow-400 rounded-full" />
                      
                      {/* Star particles */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          animate={{
                            x: [0, Math.cos(i * Math.PI/4) * 60],
                            y: [0, Math.sin(i * Math.PI/4) * 60],
                            opacity: [1, 0],
                            scale: [1, 0]
                          }}
                          transition={{
                            duration: 0.7,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                  
                  {/* Shine effect */}
                  {showShine && (
                    <motion.div
                      className="absolute inset-0 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ 
                        duration: 1.2,
                        times: [0, 0.2, 1]
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 z-10"
                        initial={{ 
                          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                          left: "-100%"
                        }}
                        animate={{
                          left: ["0%", "200%"]
                        }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                  )}
                </div>
                
                {/* Animated rating number */}
                <motion.div 
                  className="font-semibold text-gray-900 dark:text-white"
                  animate={isRolling ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ 
                    repeat: isRolling ? Infinity : 0,
                    duration: 0.5
                  }}
                >
                  <span className={`transition-all duration-200 ${showShine ? 'text-yellow-500 text-xl' : 'text-gray-900 dark:text-white'}`}>
                    {currentRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    from our students
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 flex justify-center"
          style={{
            perspective: '1000px',
          }}
        >
          <motion.div
            className="relative"
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${cardScale})`,
              transition: 'transform 0.2s ease-out',
            }}
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 transform translate-y-4 translate-x-4 rotate-3 opacity-20 blur-xl" />
              
              {/* Chat UI Card with Animation */}
              <div className="relative glass-card rounded-3xl w-full shadow-xl overflow-hidden">
                {/* macOS window controls */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                {/* Cursor Animation - ensured it doesn't get cut off while maintaining consistent size */}
                <motion.div 
                  className="absolute w-12 h-12 z-[100] pointer-events-none"
                  style={{ 
                    willChange: "transform",
                    transformOrigin: "12px 0px", // Align with the pointer tip
                    overflow: "visible", // Ensure it doesn't get cut off
                    filter: "drop-shadow(0 0 1px rgba(0,0,0,0.3))" // Add subtle shadow for better visibility
                  }}
                  initial={{ opacity: 0 }}
                  animate={
                    // Send button or input field click animation with enlarge-then-shrink effect
                    (animationStage === 3 && cursorPosition.x > 400) || (animationStage === 2 && cursorPosition.x < 300)
                    ? {
                      opacity: 1,
                      x: cursorPosition.x - 8,
                      y: cursorPosition.y - 8,
                      scale: [1, 1.05, 0.9, 1], // Subtle enlarge then click effect, then back to normal
                      transition: {
                        scale: {
                          times: [0, 0.2, 0.5, 0.8], // Precise timing for each phase
                          duration: 0.6, // Total animation duration
                        }
                      }
                    } 
                    : // Default animation
                    {
                      opacity: animationStage === 0 ? 0 : 1,
                      x: cursorPosition.x - 8,
                      y: cursorPosition.y - 8,
                      scale: 1,
                    }
                  }
                  transition={{ 
                    x: { type: "spring", duration: 1.5, bounce: 0.1 },
                    y: { type: "spring", duration: 1.5, bounce: 0.1 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <img 
                    src="https://help.apple.com/assets/674E245FBF37DF041803DF82/674E2467BF37DF041803DFAD/en_US/a0d5e859e5f2b01dbbf81dfc38a3a92f.png" 
                    alt="Cursor"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                
                {/* Chat Interface - Added overflow: 'visible' to parent to ensure cursor isn't cut off */}
                <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-visible shadow-sm m-6 h-[400px] flex flex-col">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center">
                    <Brain className="h-4 w-4 text-indigo-600 mr-2" />
                    <span className="text-sm font-medium">Study Assistant</span>
                  </div>
                  
                  {/* Chat Messages - Add ref for scrolling */}
                  <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
                    <div className="flex flex-col space-y-4">
                      {/* Initial AI Message */}
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 mr-3 mt-1">
                          <span className="text-sm font-bold">AI</span>
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-700/50 rounded-2xl p-3">
                          <p className="text-sm">How would you like me to help with your biology exam today?</p>
                        </div>
                      </div>
                      
                      {/* User Message 1 */}
                      <div className="flex items-start justify-end">
                        <div className="flex-1 bg-indigo-500 rounded-2xl p-3 ml-10 text-white">
                          <p className="text-sm">I need help with cellular respiration concepts.</p>
                        </div>
                      </div>
                      
                      {/* AI Response 1 */}
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 mr-3 mt-1">
                          <span className="text-sm font-bold">AI</span>
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-700/50 rounded-2xl p-3">
                          <p className="text-sm">Cellular respiration is the process where cells convert nutrients into energy (ATP). I'll create a study guide with key concepts:</p>
                          <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                            <li>Glycolysis process and outputs</li>
                            <li>Krebs cycle steps and products</li>
                            <li>Electron transport chain function</li>
                            <li>ATP synthesis mechanism</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Animated User Message */}
                      {typedText.length > 0 && animationStage >= 3 && (
                        <motion.div 
                          className="flex items-start justify-end"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            ease: "easeOut" 
                          }}
                        >
                          <div className="flex-1 bg-indigo-500 rounded-2xl p-3 ml-10 text-white">
                            <p className="text-sm">
                              {typedText}
                            </p>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Typing Indicator */}
                      {showTypingIndicator && (
                        <motion.div 
                          className="flex items-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            ease: "easeOut" 
                          }}
                        >
                          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 mr-3 mt-1">
                            <span className="text-sm font-bold">AI</span>
                          </div>
                          <div className="min-w-[42px] max-w-[60px] bg-gray-100 dark:bg-gray-700/50 rounded-full py-2 px-3">
                            <div className="flex space-x-1.5 justify-center items-center">
                              <div className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                              <div className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                              <div className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Animated AI Response - Dynamic based on current question */}
                      {showAIResponse && (
                        <motion.div 
                          className="flex items-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            ease: "easeOut" 
                          }}
                        >
                          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 mr-3 mt-1">
                            <span className="text-sm font-bold">AI</span>
                          </div>
                          <div className="flex-1 bg-gray-100 dark:bg-gray-700/50 rounded-2xl p-3">
                            <p className="text-sm">{questionsAndAnswers[currentQAIndex].answer.text}</p>
                            <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                              {questionsAndAnswers[currentQAIndex].answer.bullets.map((bullet, index) => (
                                <li key={index}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  {/* Input Area - added z-index to ensure it's below the cursor */}
                  <div className="p-3 border-t border-gray-100 dark:border-gray-700 relative z-10">
                    <div className="relative flex">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 pr-10 min-h-[36px]">
                        {animationStage === 2 ? (
                          <span className="text-sm">
                            {inputFieldText}
                            {showInputCursor && <span className="inline-block h-4 w-0.5 bg-gray-500 dark:bg-gray-400 ml-0.5 animate-blink"></span>}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">Type something here...</span>
                        )}
                      </div>
                      <button 
                        className={`absolute right-1 top-1/2 transform -translate-y-1/2 text-indigo-500 dark:text-indigo-400 p-1.5 bg-indigo-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all ${animationStage === 3 && !typedText ? 'scale-90' : ''}`}
                        style={{ transition: 'transform 0.1s ease-in-out' }} // Smooth transition for click effect
                      >
                        <Send size={18} /> {/* Slightly larger send icon for easier targeting */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating educational icons - repositioned and resized without containers */}
            <motion.div 
              className="absolute top-[-40px] right-[-50px]"
              variants={shapeVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ transformStyle: 'preserve-3d', zIndex: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.div
                animate={{
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <GraduationCap size={42} className="text-indigo-600 dark:text-indigo-400" />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-[-60px] left-[-50px]"
              variants={shapeVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ transformStyle: 'preserve-3d', zIndex: 1 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 3, 0, -3, 0]
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <BookOpen size={46} className="text-purple-600 dark:text-purple-400" />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute top-[100px] left-[-70px]"
              variants={shapeVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ transformStyle: 'preserve-3d', zIndex: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <BookText size={38} className="text-blue-600 dark:text-blue-400" />
              </motion.div>
            </motion.div>

            {/* Additional educational icons */}
            <motion.div 
              className="absolute bottom-[60px] right-[-50px]"
              variants={shapeVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ transformStyle: 'preserve-3d', zIndex: 1 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 5, 0],
                  scale: [1, 1.08, 1]
                }}
                transition={{
                  duration: 7,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <Calculator size={36} className="text-purple-800 dark:text-purple-600" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper function to merge refs
function mergeRefs(...refs: any[]) {
  return (node: any) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  };
} 