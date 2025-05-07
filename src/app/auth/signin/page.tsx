import SignInClient from './signin-client';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">StudyAI</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Your Intelligent Study Companion</p>
        </div>
        
        <SignInClient />
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import SignInForm from '../../../components/auth/SignInForm';
import Link from 'next/link';

function SignInClient() {
  return (
    <>
      <SignInForm />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
} 