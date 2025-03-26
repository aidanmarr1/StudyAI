"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const ProgressTrackingDemo = () => {
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
  
  // Progress data for bar chart
  const progressData = [
    { subject: "Biology", progress: 85 },
    { subject: "Chemistry", progress: 62 },
    { subject: "Physics", progress: 73 },
    { subject: "Math", progress: 91 }
  ];
  
  // Weekly activity data for line chart
  const weeklyData = [10, 25, 15, 35, 55, 40, 60];
  
  // Render different content based on animation step
  const renderContent = () => {
    switch (animationStep) {
      case 0: // Overview
        return (
          <div className="h-full flex flex-col">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Study Progress Overview</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <span className="text-xs text-gray-500 dark:text-gray-400">Weekly Sessions</span>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">12</span>
                  <span className="text-xs text-green-500 mb-1">+3</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <span className="text-xs text-gray-500 dark:text-gray-400">Material Coverage</span>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">78%</span>
                  <span className="text-xs text-green-500 mb-1">+5%</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center animate-pulse">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tap to see detailed analytics</p>
                <svg className="w-6 h-6 mx-auto text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        );
      
      case 1: // Subject Progress
        return (
          <div className="h-full flex flex-col">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Subject Progress</h3>
            
            <div className="flex-1">
              {progressData.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-700 dark:text-gray-300">{item.subject}</span>
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case 2: // Weekly Activity
        return (
          <div className="h-full flex flex-col">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Weekly Activity</h3>
            
            <div className="flex-1 flex items-end">
              <div className="w-full h-full flex items-end justify-between gap-1 px-1">
                {weeklyData.map((value, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <motion.div 
                      className="w-full bg-indigo-500 rounded-t-sm"
                      style={{ background: `linear-gradient(to top, rgb(99 102 241), rgb(168 85 247 / 0.8))` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {["M", "T", "W", "T", "F", "S", "S"][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">Weekly Improvement</span>
                <span className="text-xs font-medium text-green-500">+28%</span>
              </div>
            </div>
          </div>
        );
      
      case 3: // Focus Areas
        return (
          <div className="h-full flex flex-col">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Suggested Focus Areas</h3>
            
            <div className="flex-1">
              {[
                { topic: "Cellular Respiration", confidence: "Low", priority: "High" },
                { topic: "Periodic Table", confidence: "Medium", priority: "Medium" },
                { topic: "Kinematics", confidence: "Low", priority: "High" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="mb-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.3 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.topic}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Confidence: {item.confidence}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.priority === "High" 
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' 
                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  
                  {/* Suggested actions */}
                  {idx === 0 && (
                    <motion.div
                      className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <button className="text-xs text-indigo-600 dark:text-indigo-400">
                        Review Flashcards
                      </button>
                      <button className="text-xs text-indigo-600 dark:text-indigo-400">
                        Take Quiz
                      </button>
                    </motion.div>
                  )}
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
          <div className="flex-1 text-center text-sm font-medium">Progress Tracking</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 h-48 flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProgressTrackingDemo; 