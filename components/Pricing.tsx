"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Pricing = () => {
  const [annually, setAnnually] = useState(true);

  // Pricing plans data
  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out StudyAI",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "AI-Powered Study Materials",
        "5 Uploads per Month",
        "Basic Flashcards",
        "Text-Only Summaries",
        "Community Support",
      ],
      mostPopular: false,
    },
    {
      name: "Pro",
      description: "Great for students and professionals",
      monthlyPrice: 19.99,
      annualPrice: 16.99,
      features: [
        "Everything in Free",
        "Unlimited Uploads",
        "Advanced Flashcards with Images",
        "Interactive Study Guides",
        "AI-Generated Practice Tests",
        "Video & Audio Lecture Analysis",
        "Priority Support",
      ],
      mostPopular: true,
    },
    {
      name: "Team",
      description: "Perfect for study groups and teams",
      monthlyPrice: 49.99,
      annualPrice: 39.99,
      features: [
        "Everything in Pro",
        "Team Collaboration Tools",
        "Shared Study Materials",
        "Group Progress Tracking",
        "Custom Branding",
        "API Access",
        "Dedicated Account Manager",
      ],
      mostPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-4">
              Pricing Plans
            </span>
            <motion.h2 
              className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </motion.h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Choose the perfect plan to help you achieve your learning goals. All plans come with a 14-day money-back guarantee.
            </p>
          </motion.div>
          
          <div className="mt-10 flex items-center justify-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full flex">
              <button
                className={`${
                  !annually
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                } px-6 py-2 rounded-full text-sm font-medium transition-all`}
                onClick={() => setAnnually(false)}
              >
                Monthly
              </button>
              <button
                className={`${
                  annually
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                } px-6 py-2 rounded-full text-sm font-medium transition-all`}
                onClick={() => setAnnually(true)}
              >
                Annually <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Save 15%</span>
              </button>
            </div>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.7,
            staggerChildren: 0.1,
            delayChildren: 0.3
          }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden border ${
                plan.mostPopular
                  ? "border-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-100/40 dark:shadow-indigo-900/40"
                  : "border-gray-200 dark:border-gray-700"
              } p-8 bg-white dark:bg-gray-800 relative`}
            >
              {plan.mostPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${annually ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">/ mo</span>
                {annually && plan.annualPrice > 0 && (
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Billed annually (${plan.annualPrice * 12}/year)</p>
                )}
              </div>
              
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium mb-8 transition-colors ${
                  plan.mostPopular
                    ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                }`}
              >
                {plan.monthlyPrice === 0 ? "Sign Up Free" : "Get Started"}
              </button>
              
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Plan includes:</p>
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300 text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Have questions about our pricing?{" "}
            <a href="#contact" className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300">
              Contact us
            </a>{" "}
            for more information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 