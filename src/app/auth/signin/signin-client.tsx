'use client';

import React from 'react';
import SignInForm from '../../../components/auth/SignInForm';
import Link from 'next/link';

export default function SignInClient() {
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