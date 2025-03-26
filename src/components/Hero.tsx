"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Send, BookOpen, BookText, GraduationCap, School, Library, Microscope, Dna, Calculator, Star, Check, Zap, Lightbulb, Clock } from "lucide-react";
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

  // Key benefits of StudyAI
  const keyBenefits = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: "Learn 3x Faster",
      description: "Our AI-powered system adapts to your learning style and pace"
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-blue-500" />,
      title: "Instant Explanations",
      description: "Get clear, personalized explanations for any concept"
    },
    {
      icon: <Clock className="w-5 h-5 text-green-500" />,
      title: "Save Study Time",
      description: "Focus on what matters most with smart study plans"
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

  // Social proof metrics
  const socialProofMetrics = [
    { value: "500K+", label: "Students" },
    { value: "4.9", label: "App Rating" },
    { value: "98%", label: "Success Rate" }
  ];

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

    // Fixing the dependencies for the useEffect hook - around line 331
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
    }, [inView, animationCycle, currentQAIndex, questionsAndAnswers]);

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
    <div ref={heroRef} className="relative bg-white dark:bg-gray-950 overflow-hidden" id="hero">
      {/* Background gradient and effects */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 opacity-80 dark:opacity-30"
        style={{
          backgroundPosition: `${gradientPosition.x}% ${gradientPosition.y}%`,
          backgroundSize: '200% 200%',
          transition: 'background-position 0.3s ease-out'
        }}
      ></div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      
      {/* Animated blobs */}
      <div className="absolute top-1/4 right-[15%] w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
      <div className="absolute bottom-1/4 left-[10%] w-72 h-72 bg-indigo-300 dark:bg-indigo-900 rounded-full filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 left-[20%] w-56 h-56 bg-blue-300 dark:bg-blue-900 rounded-full filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left column - Hero Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-3xl">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 mb-5"
            >
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                AI-Powered Learning Assistant
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
            >
              <span className="block">Master Any Subject</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                With AI at Your Side
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              StudyAI transforms how you learn with personalized explanations, adaptive study plans, and interactive learning tools – all powered by cutting-edge artificial intelligence.
            </motion.p>

            {/* Key Benefits */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex-shrink-0 p-1.5 rounded-full bg-gray-50 dark:bg-gray-700">
                    {benefit.icon}
                  </div>
                  <div className="ml-3 text-left">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                See How It Works
              </a>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 items-center pt-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <Image 
                        src={`/avatar-${i+1}.png`} 
                        alt={`User ${i+1}`} 
                        width={32} 
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  Trusted by students worldwide
                </span>
              </div>
              
              <div className="flex space-x-6">
                {socialProofMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - Interactive Demo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="flex-1 w-full max-w-xl mx-auto lg:mx-0"
            ref={inViewRef}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${cardScale})`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {/* Demo UI container */}
            <div className="relative mx-auto w-full overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-white">StudyAI Assistant</h3>
                </div>
                <div className="flex space-x-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                </div>
              </div>

              {/* Chat container */}
              <div 
                ref={chatContainerRef}
                className="h-96 overflow-y-auto p-4 space-y-4"
              >
                {/* Welcome message */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      Hi there! I'm your StudyAI assistant. Ask me anything about your studies, and I'll help you understand any concept.
                    </p>
                  </div>
                </div>

                {/* User question */}
                {typedText && (
                  <div className="flex items-start justify-end">
                    <div className="mr-3 bg-indigo-600 text-white rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        {typedText}
                        {showInputCursor && <span className="inline-block w-1.5 h-4 bg-white ml-0.5 animate-blink"></span>}
                      </p>
                    </div>
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden">
                      <Image 
                        src="/avatar-user.png" 
                        alt="User" 
                        width={36} 
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* AI typing indicator */}
                {showTypingIndicator && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="ml-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI response */}
                {showAIResponse && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="ml-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                        {questionsAndAnswers[currentQAIndex].answer.text}
                      </p>
                      <ul className="space-y-1">
                        {questionsAndAnswers[currentQAIndex].answer.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-800 dark:text-gray-200">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Input area */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Ask any study question..."
                    value={inputFieldText}
                    readOnly
                    className="flex-1 py-2 pl-4 pr-10 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
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