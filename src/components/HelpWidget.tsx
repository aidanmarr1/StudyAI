"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  MessageSquare, 
  Ticket, 
  HelpCircle, 
  Search, 
  X, 
  Calendar, 
  Star, 
  BookOpen, 
  GraduationCap,
  Brain
} from "lucide-react";

type TabType = "home" | "conversations" | "tickets" | "help";

interface ResourceItem {
  icon: React.ReactElement;
  title: string;
  badge: string | null;
}

const HelpWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleWidget = () => setIsOpen(!isOpen);

  const tabContent: Record<TabType, React.ReactElement> = {
    home: (
      <div className="flex flex-col gap-4">
        <div className="px-6 flex flex-col gap-y-4 flex-1 mt-1 pb-4">
          <div className="space-y-4 text-default">
            <div className="flex flex-col justify-between w-full outline outline-1 -outline-offset-1 outline-gray-200 dark:outline-gray-700 bg-white dark:bg-gray-800 shadow-lg px-4 py-3 pb-4 rounded-xl gap-3">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap flex-col gap-2">
                  <div>Let's schedule a personalized learning session with one of our AI tutors!</div>
                </div>
                <div className="flex flex-wrap flex-row gap-2">
                  <button 
                    type="button" 
                    className="relative flex items-center justify-center gap-1 text-white bg-gradient-primary rounded-lg px-3 py-2 text-sm font-medium hover:shadow-lg transition-all"
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    <div>Schedule a session</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <a href="#resources" className="block">
            <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl h-[192px] max-h-48 w-full flex justify-center items-center">
                <div className="text-white text-center p-6">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold">StudyAI Learning Resources</h3>
                  <p className="text-white/80 text-sm mt-2">Access interactive tutorials and guides</p>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-0.5">
                <h4 className="text-gray-900 dark:text-white text-base font-medium">Learning Resource Center</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Master your study techniques with guided exercises and AI-powered learning paths!</p>
              </div>
            </div>
          </a>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Popular Resources</h4>
            <ul className="space-y-3">
              {[
                { icon: <BookOpen className="w-4 h-4" />, title: "Getting Started Guide", badge: "New" },
                { icon: <Star className="w-4 h-4" />, title: "Advanced Study Techniques", badge: null },
                { icon: <MessageSquare className="w-4 h-4" />, title: "AI Tutor Best Practices", badge: null }
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <span className="text-indigo-600 dark:text-indigo-400">{item.icon}</span>
                    <span className="text-gray-800 dark:text-gray-200 text-sm">{item.title}</span>
                    {item.badge && (
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
    conversations: (
      <div className="p-6">
        <div className="text-center py-6">
          <MessageSquare className="w-12 h-12 mx-auto text-indigo-500 dark:text-indigo-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Your Conversations</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Start a conversation with our AI tutors to get personalized help.</p>
          <button className="bg-gradient-primary text-white rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transition-all">
            New Conversation
          </button>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Recent Conversations</h4>
          <div className="space-y-2">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 text-sm">No recent conversations</p>
            </div>
          </div>
        </div>
      </div>
    ),
    tickets: (
      <div className="p-6">
        <div className="text-center py-6">
          <Ticket className="w-12 h-12 mx-auto text-indigo-500 dark:text-indigo-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Support Tickets</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Create a support ticket for technical issues or feature requests.</p>
          <button className="bg-gradient-primary text-white rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transition-all">
            Create Ticket
          </button>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Your Tickets</h4>
          <div className="space-y-2">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 text-sm">No active tickets</p>
            </div>
          </div>
        </div>
      </div>
    ),
    help: (
      <div className="p-6">
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Frequently Asked Questions</h4>
            <div className="space-y-3">
              {[
                "How do I create my first flashcard set?",
                "Can I import my lecture notes?",
                "How do I share my study plans with classmates?",
                "How does the AI tutoring work?"
              ].map((question, index) => (
                <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <p className="text-gray-800 dark:text-gray-200 text-sm">{question}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-white">
            <h4 className="font-medium mb-2">Need more help?</h4>
            <p className="text-sm text-white/90 mb-3">Our support team is available 24/7 to assist you with any questions.</p>
            <button className="bg-white text-indigo-600 rounded-lg px-3 py-1.5 text-sm font-medium hover:shadow-lg transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    )
  };

  return (
    <>
      {/* Launcher Button */}
      <button
        onClick={toggleWidget}
        className="fixed z-50 bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300"
        aria-label="Open help"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Help Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed z-40 bottom-24 right-6 w-[380px] max-h-[600px] rounded-2xl shadow-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="px-6 pt-6 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between items-center gap-x-2 mb-4">
                <div className="flex items-center ml-auto">
                  <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white flex-1">
                  How can we help?
                </p>
                <button
                  onClick={toggleWidget}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 h-8 w-8 rounded-lg flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for help articles"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>

              {/* Tabs */}
              <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex gap-1 text-sm">
                {[
                  { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
                  { id: "conversations", label: "Conversations", icon: <MessageSquare className="w-4 h-4" /> },
                  { id: "tickets", label: "Tickets", icon: <Ticket className="w-4 h-4" /> },
                  { id: "help", label: "Help", icon: <HelpCircle className="w-4 h-4" /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex gap-1.5 items-center justify-center px-2 py-1.5 rounded-lg flex-1 transition-colors ${
                      activeTab === tab.id
                        ? "text-white bg-gradient-primary shadow-sm" 
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-[400px] glassmorphism dark:glassmorphism">
              {tabContent[activeTab]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpWidget; 