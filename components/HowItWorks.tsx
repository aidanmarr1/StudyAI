"use client";

import { motion } from "framer-motion";
import UploadMaterialsDemo from "./FeatureDemos/UploadMaterialsDemo";
import AIAnalysisDemo from "./FeatureDemos/AIAnalysisDemo";
import LearningResourcesDemo from "./FeatureDemos/LearningResourcesDemo";
import ProgressTrackingDemo from "./FeatureDemos/ProgressTrackingDemo";

const steps = [
  {
    number: "01",
    title: "Upload Your Study Materials",
    description:
      "Simply upload your notes, textbooks, or lecture slides. Our AI will analyze and organize the content.",
    component: UploadMaterialsDemo,
  },
  {
    number: "02",
    title: "AI Analyzes Your Content",
    description:
      "Our advanced algorithms break down complex topics, identify key concepts, and create connections between ideas.",
    component: AIAnalysisDemo,
  },
  {
    number: "03",
    title: "Generate Learning Resources",
    description:
      "Create flashcards, quizzes, summaries, and mind maps tailored to your learning style and needs.",
    component: LearningResourcesDemo,
  },
  {
    number: "04",
    title: "Study Smarter, Track Progress",
    description:
      "Use our intelligent study system to retain information better. Track your progress and focus on areas that need improvement.",
    component: ProgressTrackingDemo,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-indigo-50 dark:bg-indigo-900/20 rounded-full opacity-50 transform translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-purple-50 dark:bg-purple-900/20 rounded-full opacity-50 transform -translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-800 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Your journey to <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">better studying</span>
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-400 mx-auto">
              StudyAI makes it easy to transform your learning materials into effective study tools. Follow these simple steps to get started.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-100 dark:bg-indigo-800/50 hidden lg:block"></div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-16`}
              >
                <motion.div 
                  className="lg:w-1/2"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-3 bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-700 dark:to-purple-700 rounded-2xl blur-lg opacity-30"></div>
                    <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
                      <div className="h-72 w-full">
                        {/* Replace static placeholder with interactive component */}
                        <step.component />
                      </div>
                    </div>
                    
                    {/* Step Number Circle - Desktop on line */}
                    <div className={`absolute top-1/2 hidden lg:flex -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold shadow-lg border-4 border-white dark:border-gray-800 z-10 text-lg
                      ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
                      {step.number}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="lg:w-1/2"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {/* Step Number Circle - Mobile & Desktop off line */}
                  <div className="flex items-center mb-6 lg:hidden">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold shadow-sm mr-4 text-lg">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  </div>
                  
                  <div className="hidden lg:block">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{step.title}</h3>
                  </div>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                  
                  {index === steps.length - 1 && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Get Started Now
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 