// @ts-nocheck
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Search, Settings, Home, Users, TicketCheck, HelpCircle, Clock, BookOpen, ChevronRight, Plus, Send } from "lucide-react";

export default function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Launcher button - Made larger and more noticeable */}
      <button 
        onClick={toggleWidget}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none border-2 border-white dark:border-gray-800 animate-pulse"
        aria-label="Help and support"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <MessageSquare className="w-8 h-8" />
        )}
      </button>

      {/* Widget panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "500px", maxHeight: "calc(100vh - 150px)" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-gray-900 dark:text-white">StudyAI Support</h3>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button 
                  onClick={toggleWidget}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search bar */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Tab navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleTabChange("home")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "home"
                    ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <div className="flex items-center justify-center">
                  <Home className="w-4 h-4 mr-1" />
                  <span>Home</span>
                </div>
              </button>
              <button
                onClick={() => handleTabChange("conversations")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "conversations"
                    ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <div className="flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>Conversations</span>
                </div>
              </button>
              <button
                onClick={() => handleTabChange("tickets")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "tickets"
                    ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <div className="flex items-center justify-center">
                  <TicketCheck className="w-4 h-4 mr-1" />
                  <span>Tickets</span>
                </div>
              </button>
              <button
                onClick={() => handleTabChange("help")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "help"
                    ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <div className="flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 mr-1" />
                  <span>Help</span>
                </div>
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === "home" && (
                <div className="space-y-6">
                  {/* Quick actions */}
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                    <h4 className="font-medium text-indigo-900 dark:text-indigo-300 mb-3">
                      Schedule a Session
                    </h4>
                    <p className="text-sm text-indigo-800/70 dark:text-indigo-300/70 mb-3">
                      Book time with one of our AI tutors to get personalized help with your studies.
                    </p>
                    <button className="text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors w-full">
                      Schedule Now
                    </button>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                      Learning Resources
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2">
                          <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">Study Groups</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Find or create study groups
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                          <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">Tutorials</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Step-by-step guides
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Popular resources */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Popular Resources
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-900 dark:text-white">Getting Started Guide</h5>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Learn the basics of StudyAI
                              </p>
                            </div>
                          </div>
                          <span className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
                            New
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors">
                          <div className="w-8 h-8 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                            <Settings className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">Account Settings</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Manage your profile and preferences
                            </p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "conversations" && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Recent Conversations
                  </h4>
                  
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                            AI Tutor {i}
                          </h5>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {i}h ago
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          Last message from your conversation with the AI tutor about {
                            ["physics", "literature", "mathematics"][i - 1]
                          } concepts and problem-solving techniques.
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-2 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center justify-center py-2">
                    <Plus className="w-4 h-4 mr-1" />
                    New Conversation
                  </button>
                </div>
              )}

              {activeTab === "tickets" && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Support Tickets
                  </h4>
                  
                  {[1].map((i) => (
                    <div key={i} className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          Ticket #{1000 + i}
                          <span className="ml-2 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-0.5 rounded-full">
                            In Progress
                          </span>
                        </h5>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          2d ago
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Issue with PDF export functionality not working properly on mobile devices.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Last updated: Yesterday
                        </span>
                        <button className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="py-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Need help with something?
                    </p>
                    <button className="text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                      Create New Ticket
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "help" && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Frequently Asked Questions
                  </h4>
                  
                  <div className="space-y-3">
                    {[
                      "How do I create a study plan?",
                      "Can I export my notes?",
                      "How do I connect with a tutor?",
                      "Is my data secure?",
                    ].map((question, i) => (
                      <div key={i} className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                            {question}
                          </h5>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                      Still need help?
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Our support team is here to assist you with any questions or issues.
                    </p>
                    <div className="flex space-x-2">
                      <button className="flex-1 text-sm px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        Email Us
                      </button>
                      <button className="flex-1 text-sm px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                        Live Chat
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input area (for conversations tab) */}
            {activeTab === "conversations" && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 py-2 px-4 pr-10 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}