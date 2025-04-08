"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="text-center max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-lg font-medium"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 