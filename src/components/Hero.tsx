"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Send, BookOpen, BookText, GraduationCap, School, Library, Microscope, Dna, Calculator, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import TypingAnimation from "./TypingAnimation";

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

  const { darkMode } = useTheme();

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
    <section className="relative pb-20 pt-32 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dark:opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div
          className="absolute -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-blue-500 opacity-20 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 mb-6">
              StudyAI: Transform Your Learning Experience
            </h1>
          </motion.div>

          <motion.p 
            className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TypingAnimation 
              phrases={[
                "Create personalized study plans with AI.",
                "Generate smart flashcards in seconds.",
                "Track your progress with detailed analytics.",
                "Receive tailored learning recommendations.",
                "Join thousands of successful students."
              ]}
            />
          </motion.p>

          <motion.div 
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/dashboard"
              className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
            <Link
              href="#features"
              className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 flow-root sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="relative -m-2 rounded-xl bg-gray-900/5 dark:bg-gray-100/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              src={darkMode ? "/images/dashboard-dark.png" : "/images/dashboard-light.png"}
              alt="App screenshot"
              width={2432}
              height={1442}
              className="rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
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