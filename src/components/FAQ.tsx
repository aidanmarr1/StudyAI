"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does StudyAI work?",
    answer:
      "StudyAI uses advanced artificial intelligence to analyze your study materials, identify key concepts, and create personalized learning resources like flashcards, summaries, and quizzes. The platform adapts to your learning style and helps you focus on areas where you need the most improvement.",
  },
  {
    question: "What types of study materials can I upload?",
    answer:
      "You can upload a wide variety of study materials including PDFs, Word documents, PowerPoint presentations, images of handwritten notes, and even audio/video lecture recordings. Our AI can process and extract information from all these formats.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security very seriously. All uploads are encrypted, and we do not share your study materials or personal data with third parties. You can delete your data at any time from our servers.",
  },
  {
    question: "Can StudyAI work for any subject?",
    answer:
      "Yes! StudyAI is designed to work with any academic subject from mathematics and sciences to humanities, languages, law, medicine, and more. The AI adapts to the specific terminology and concepts of each field.",
  },
  {
    question: "How much time can StudyAI save me?",
    answer:
      "Users report saving an average of 40-60% of their study time when using StudyAI. This varies depending on the subject and your learning goals, but the automated flashcard creation, summarization, and personalized study plans dramatically reduce time spent on manual study preparation.",
  },
  {
    question: "Do you offer a student discount?",
    answer:
      "Yes, we offer a 50% discount for verified students. Simply sign up with your .edu email address or provide proof of enrollment to qualify for the discounted rate.",
  },
  {
    question: "Can I use StudyAI on my mobile device?",
    answer:
      "Absolutely! StudyAI works on all devices including smartphones, tablets, and computers. We have native apps for iOS and Android, as well as a responsive web version that works in any modern browser.",
  },
  {
    question: "What if I want to cancel my subscription?",
    answer:
      "You can cancel your subscription at any time through your account settings. We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, just let us know and we'll process your refund with no questions asked.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-4">
              FAQ
            </span>
            <motion.h2 
              className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked <span className="text-gradient">Questions</span>
            </motion.h2>
            <motion.p 
              className="max-w-2xl text-center mx-auto text-lg text-gray-600 dark:text-gray-400 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything you need to know about StudyAI and how it can help you excel in your studies.
            </motion.p>
          </motion.div>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left bg-gray-50 dark:bg-gray-800 focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-4 bg-white dark:bg-gray-800"
                  >
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 