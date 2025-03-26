"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const UploadMaterialsDemo = () => {
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
    }, 3000); // Change step every 3 seconds
    
    return () => {
      clearTimeout(timer);
    };
  }, [animationStep]);
  
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-inner bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {/* Simulated Dashboard Header */}
      <div className="bg-indigo-600 dark:bg-indigo-700 p-3 text-white">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="flex-1 text-center text-sm font-medium">StudyAI Dashboard</div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="p-4 h-48 flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          {/* Dashboard Elements */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="h-6 bg-indigo-100 dark:bg-indigo-800/30 rounded"></div>
            <div className="h-6 bg-purple-100 dark:bg-purple-800/30 rounded"></div>
          </div>
          
          {/* Upload Box */}
          <div className={`border-2 border-dashed ${animationStep >= 2 ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-4 flex flex-col items-center justify-center h-28 transition-colors duration-300`}>
            <svg
              className={`w-8 h-8 ${animationStep >= 2 ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500'} mb-2 transition-colors duration-300`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className={`text-sm ${animationStep >= 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'} font-medium transition-colors duration-300`}>
              {animationStep === 3 ? 'Uploading...' : 'Upload Materials'}
            </span>
            
            {/* Progress bar that appears in step 3 */}
            {animationStep === 3 && (
              <div className="w-full mt-2 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5 }}
                />
              </div>
            )}
          </div>
          
          {/* Cursor */}
          <motion.div
            className="absolute w-5 h-5 pointer-events-none z-10"
            initial={{ x: 20, y: 20 }}
            animate={
              animationStep === 0
                ? { x: 150, y: 70, scale: 1 }
                : animationStep === 1
                ? { x: 150, y: 85, scale: 0.9 }
                : { x: 200, y: 100, scale: 1 }
            }
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.5
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.49994 3L11.9999 20L14.9999 13L21.9999 10L3.49994 3Z"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UploadMaterialsDemo; 