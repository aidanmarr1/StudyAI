import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Study<span className="text-indigo-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your AI-powered study companion. Learn more efficiently, create flashcards, and ace your exams.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link 
              href="/dashboard"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/#features"
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 