"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const LearningResourcesDemo = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const componentMounted = useRef(true);
  
  // Ensure animation starts as soon as component is mounted
  useEffect(() => {
    componentMounted.current = true;
    
    // Start animation immediately
    setAnimationStep(0);
    
    return () => {
      componentMounted.current = false;
    };
  }, []);
  
  // Continuous animation loop
  useEffect(() => {
    // Only proceed if component is still mounted
    if (!componentMounted.current) return;
    
    const timer = setTimeout(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [animationStep]);
  
  // Flashcard data
  const flashcards = [
    { front: "Mitochondria", back: "Powerhouse of the cell" },
    { front: "DNA", back: "Carries genetic information" },
    { front: "Cell Membrane", back: "Controls what enters and exits the cell" }
  ];
  
  // Quiz questions
  const quizQuestions = [
    { question: "What is the function of mitochondria?", options: ["Energy production", "Protein synthesis", "Cell division"] },
    { question: "What molecule stores genetic information?", options: ["DNA", "RNA", "Protein"] }
  ];
  
  // Render different content based on animation step
  const renderContent = () => {
    switch (animationStep) {
      case 0: // Generating resources animation
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block mb-3">
                <svg className="w-8 h-8 text-indigo-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Generating learning resources...</p>
            </div>
          </div>
        );
      
      case 1: // Flashcards
        return (
          <div className="h-full flex flex-col">
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Flashcards</h3>
              <div className="h-0.5 w-20 bg-indigo-500 rounded-full mb-3"></div>
            </div>
            
            <div className="relative flex-1 perspective-500">
              {flashcards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className={`absolute inset-0 rounded-lg overflow-hidden cursor-pointer ${
                    idx === activeCard ? 'z-10' : 'z-0'
                  }`}
                  initial={{ rotateY: idx === activeCard ? 0 : 180, x: idx * 10, y: idx * 10, opacity: idx === activeCard ? 1 : 0.5 }}
                  animate={{ 
                    rotateY: idx === activeCard ? (idx % 2 === 0 ? 0 : 180) : 180,
                    x: idx === activeCard ? 0 : idx * 10, 
                    y: idx === activeCard ? 0 : idx * 10,
                    opacity: idx === activeCard ? 1 : 0.5
                  }}
                  transition={{ duration: 0.7 }}
                  onClick={() => setActiveCard(idx)}
                  style={{ 
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                  }}
                >
                  {/* Card Front */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center p-4 bg-white dark:bg-gray-800 border-2 border-indigo-100 dark:border-indigo-800 shadow-md rounded-lg"
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(0deg)"
                    }}
                  >
                    <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{card.front}</h4>
                  </div>
                  
                  {/* Card Back */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-100 dark:border-indigo-800 shadow-md rounded-lg"
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <p className="text-indigo-800 dark:text-indigo-200">{card.back}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-3 gap-1">
              {flashcards.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === activeCard ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => setActiveCard(idx)}
                />
              ))}
            </div>
          </div>
        );
      
      case 2: // Quiz
        return (
          <div className="h-full flex flex-col">
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Quiz</h3>
              <div className="h-0.5 w-20 bg-indigo-500 rounded-full mb-3"></div>
            </div>
            
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
                {quizQuestions[0].question}
              </h4>
              
              <div className="space-y-2">
                {quizQuestions[0].options.map((option, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2, duration: 0.3 }}
                    className={`p-2 border rounded-md cursor-pointer transition-colors ${
                      idx === 0 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center border ${
                        idx === 0 
                          ? 'border-indigo-500 bg-indigo-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {idx === 0 && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-sm">{option}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 3: // Mind Map
        return (
          <div className="h-full flex flex-col">
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Mind Map</h3>
              <div className="h-0.5 w-20 bg-indigo-500 rounded-full mb-3"></div>
            </div>
            
            <div className="flex-1 relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2">
              {/* Central node */}
              <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-100 dark:bg-indigo-800/40 border border-indigo-300 dark:border-indigo-700 rounded-full p-2 shadow-sm z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300 whitespace-nowrap">Cell Biology</span>
              </motion.div>
              
              {/* Connected nodes */}
              {[
                { label: "Structure", x: "20%", y: "30%", delay: 0.3 },
                { label: "Function", x: "75%", y: "25%", delay: 0.5 },
                { label: "Organelles", x: "65%", y: "70%", delay: 0.7 },
                { label: "Reproduction", x: "25%", y: "75%", delay: 0.9 }
              ].map((node, idx) => (
                <motion.div
                  key={idx}
                  className="absolute bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-full p-1.5 shadow-sm"
                  style={{ left: node.x, top: node.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: node.delay, duration: 0.4 }}
                >
                  <span className="text-xs font-medium text-purple-700 dark:text-purple-300 whitespace-nowrap">{node.label}</span>
                </motion.div>
              ))}
              
              {/* Connection lines */}
              {[
                { from: { x: 50, y: 50 }, to: { x: 20, y: 30 }, delay: 0.2 },
                { from: { x: 50, y: 50 }, to: { x: 75, y: 25 }, delay: 0.4 },
                { from: { x: 50, y: 50 }, to: { x: 65, y: 70 }, delay: 0.6 },
                { from: { x: 50, y: 50 }, to: { x: 25, y: 75 }, delay: 0.8 }
              ].map((line, idx) => (
                <motion.div
                  key={idx}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: line.delay, duration: 0.3 }}
                >
                  <svg className="absolute top-0 left-0 w-full h-full">
                    <line
                      x1={`${line.from.x}%`}
                      y1={`${line.from.y}%`}
                      x2={`${line.to.x}%`}
                      y2={`${line.to.y}%`}
                      stroke="rgb(99 102 241 / 0.4)"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                    />
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-inner bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-indigo-600 dark:bg-indigo-700 p-3 text-white">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="flex-1 text-center text-sm font-medium">Learning Resources</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 h-48 flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

export default LearningResourcesDemo;

// Add this CSS
// .perspective-500 {
//   perspective: 500px;
// } 