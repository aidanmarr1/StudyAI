"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const AIAnalysisDemo = () => {
  const [animationStep, setAnimationStep] = useState(0);
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
  
  // Text content being "analyzed"
  const paragraphContent = [
    "The cell is the basic structural and functional unit of all organisms.",
    "Mitochondria are organelles that generate energy for the cell.",
    "DNA contains genetic instructions for development and functioning."
  ];
  
  // Words to highlight in each animation step
  const highlightedWords = [
    [], // Step 0: No highlights
    ["cell", "structural", "functional", "organisms"], // Step 1
    ["Mitochondria", "organelles", "energy", "cell"], // Step 2
    ["DNA", "genetic", "instructions", "development", "functioning"] // Step 3
  ];
  
  // Process text to add highlighting spans around words
  const processText = (text: string) => {
    if (animationStep === 0) return text;
    
    // Split text into words and process each word
    return text.split(' ').map((word: string, index: number) => {
      const cleanWord = word.replace(/[.,;:]/g, '');
      const punctuation = word.slice(cleanWord.length);
      
      if (highlightedWords[animationStep].includes(cleanWord)) {
        return (
          <span key={index}>
            <motion.span
              className="inline-block bg-indigo-100 dark:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 px-1 rounded"
              initial={{ backgroundColor: "transparent", color: "inherit" }}
              animate={{ 
                backgroundColor: ["transparent", "rgba(99, 102, 241, 0.1)", "rgba(99, 102, 241, 0.2)"],
                color: ["inherit", "rgb(67, 56, 202)", "rgb(99, 102, 241)"] 
              }}
              transition={{ duration: 1, times: [0, 0.5, 1] }}
            >
              {cleanWord}
            </motion.span>
            {punctuation}{' '}
          </span>
        );
      }
      
      return <span key={index}>{word} </span>;
    });
  };
  
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-inner bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {/* Simulated Document Header */}
      <div className="bg-indigo-600 dark:bg-indigo-700 p-3 text-white">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="flex-1 text-center text-sm font-medium">Biology Notes Analysis</div>
        </div>
      </div>
      
      {/* Document Content */}
      <div className="p-4 h-full flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          {/* AI Processing Badge */}
          {animationStep > 0 && (
            <motion.div 
              className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded-bl-lg z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              AI Analyzing
            </motion.div>
          )}
          
          {/* Document Text */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {paragraphContent.map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 dark:text-gray-300 mb-2">
                {processText(paragraph)}
              </p>
            ))}
          </div>
          
          {/* Analysis Results - Appear in Step 3 */}
          {animationStep >= 3 && (
            <motion.div
              className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">Key Concepts Identified:</h3>
              <div className="flex flex-wrap gap-2">
                {["Cell Structure", "Energy Production", "Genetic Material"].map((concept, i) => (
                  <motion.span
                    key={i}
                    className="px-2 py-1 bg-white dark:bg-gray-700 text-xs rounded-full border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.3 }}
                  >
                    {concept}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Scanning Effect */}
          {animationStep > 0 && animationStep < 3 && (
            <motion.div
              className="absolute left-0 top-0 w-full h-1 bg-indigo-500 opacity-60"
              initial={{ top: 0 }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ 
                duration: 2, 
                ease: "linear", 
                repeat: 1, 
                repeatType: "reverse" 
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisDemo; 