"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

interface QuoteProps {
  text: string;
  author: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  quote: QuoteProps;
}

interface FeatureDetailsProps {
  feature: Feature;
}

const FeatureCard = ({ title, description, icon, color, isActive, onClick }: FeatureCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative group cursor-pointer overflow-hidden rounded-3xl p-1 transition-all duration-500 ${
        isActive 
          ? `${color} shadow-2xl scale-[1.02]` 
          : "bg-white dark:bg-gray-800 hover:shadow-xl"
      }`}
      whileHover={{ scale: isActive ? 1.02 : 1.01 }}
      layoutId={`card-container-${title}`}
    >
      <div className={`absolute inset-0 ${color} opacity-10 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'group-hover:opacity-20'}`} />
      
      <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
        <div className={`w-16 h-16 mb-6 rounded-2xl ${isActive ? 'bg-white/20' : color} flex items-center justify-center transition-all duration-300`}>
          {icon}
        </div>
        
        <h3 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-gray-900 dark:text-white'
        }`}>
          {title}
        </h3>
        
        <p className={`text-sm md:text-base transition-colors duration-300 ${
          isActive ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
        }`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const FeatureDetails = ({ feature }: FeatureDetailsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-10"
    >
      <div className="flex items-start gap-6 mb-8">
        <div className={`flex-shrink-0 w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center`}>
          {feature.icon}
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {feature.description}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {feature.benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`mt-1 flex-shrink-0 w-6 h-6 ${feature.color} rounded-full flex items-center justify-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{benefit}</p>
          </div>
        ))}
      </div>
      
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <blockquote className="italic text-sm text-gray-600 dark:text-gray-400 pl-4 border-l-4 border-gray-300 dark:border-gray-600">
          {feature.quote.text}
          <footer className="mt-2 font-medium">— {feature.quote.author}</footer>
        </blockquote>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  
  const features: Feature[] = [
    {
      id: 1,
      title: "AI Study Assistant",
      description: "Personal AI tutor that adapts to your learning style and needs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
      ),
      color: "bg-purple-600",
      benefits: [
        "Analyzes your learning patterns to identify strengths and weaknesses",
        "Provides personalized study recommendations based on your performance",
        "Adapts difficulty levels in real-time as you progress",
        "Uses spaced repetition science to optimize retention"
      ],
      quote: {
        text: "The AI assistant helped me identify my knowledge gaps and focus on weaker areas. I improved my grade from a C to an A- in just six weeks.",
        author: "Sarah T., Medical Student"
      }
    },
    {
      id: 2,
      title: "Smart Flashcards",
      description: "Dynamic cards that adapt to your learning curve using proven memory techniques",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      ),
      color: "bg-indigo-600",
      benefits: [
        "Auto-generates flashcards from your notes or uploaded study materials",
        "Implements scientifically-proven spaced repetition algorithms",
        "Prioritizes cards based on your recall performance",
        "Includes rich media support with images, audio, and diagrams"
      ],
      quote: {
        text: "I needed to memorize 500+ terms for my final exam. The smart flashcards helped me achieve 95% retention with just 20 minutes of daily practice.",
        author: "Michael K., Language Student"
      }
    },
    {
      id: 3,
      title: "Visual Concept Maps",
      description: "Interactive knowledge graphs that connect related concepts for deeper understanding",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      color: "bg-blue-600",
      benefits: [
        "Transforms complex topics into intuitive visual knowledge maps",
        "Helps identify connections between concepts across different subjects",
        "Highlights knowledge gaps in your understanding",
        "Provides multiple learning pathways through complex material"
      ],
      quote: {
        text: "The concept maps transformed how I understand biology. I could finally see how different systems connect, which made studying for comprehensive exams so much easier.",
        author: "Jenna L., Biology Major"
      }
    },
    {
      id: 4,
      title: "Performance Analytics",
      description: "Comprehensive learning metrics with predictive insights to optimize your study time",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
      color: "bg-emerald-600",
      benefits: [
        "Visualizes your learning progress with detailed performance metrics",
        "Identifies optimal study times based on your productivity patterns",
        "Predicts knowledge decay to schedule perfect review sessions",
        "Provides actionable insights to maximize study efficiency"
      ],
      quote: {
        text: "The analytics dashboard showed me exactly when I was most productive. By shifting my study schedule, I accomplished the same work in half the time.",
        author: "David R., Engineering Student"
      }
    },
    {
      id: 5,
      title: "Smart Study Planner",
      description: "AI-powered scheduling that optimizes your study time around your life",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
      color: "bg-orange-600",
      benefits: [
        "Creates personalized study schedules based on your goals and deadlines",
        "Balances study time with work, social, and rest periods",
        "Automatically adjusts plans when life happens and schedules change",
        "Integrates with calendar apps to keep everything in sync"
      ],
      quote: {
        text: "With a full-time job and family, I struggled to find study time. The planner helped me identify pockets of time I was wasting and turned them into productive study sessions.",
        author: "Emma J., MBA Student"
      }
    },
    {
      id: 6,
      title: "Practice Exams",
      description: "Custom tests that simulate real exam conditions with personalized questions",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
        </svg>
      ),
      color: "bg-rose-600",
      benefits: [
        "Creates realistic practice tests with time constraints and similar difficulty",
        "Generates questions based on your weak areas for targeted improvement",
        "Provides detailed explanations for every answer to deepen understanding",
        "Simulates exam pressure to build confidence and reduce test anxiety"
      ],
      quote: {
        text: "The practice exams were almost identical in format to my actual tests. My confidence going into the final exam made all the difference.",
        author: "Thomas W., Law Student"
      }
    }
  ];
  
  const handleFeatureClick = (feature: Feature) => {
    setActiveFeature(activeFeature?.id === feature.id ? null : feature);
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full mb-4">
            Smart Features
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Study Smarter, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Not Harder</span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Our platform combines cutting-edge AI with proven learning techniques to transform how you study.
            Click on any feature to learn more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              isActive={activeFeature?.id === feature.id}
              onClick={() => handleFeatureClick(feature)}
            />
          ))}
        </div>
        
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <FeatureDetails feature={activeFeature} />
          </motion.div>
        )}
        
        <div className="mt-20 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          >
            Get Started Today
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
