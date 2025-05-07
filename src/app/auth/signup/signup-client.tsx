'use client';

import React from 'react';
import SignUpForm from '../../../components/auth/SignUpForm';
import Link from 'next/link';

export default function SignUpClient() {
  return (
    <>
      <SignUpForm />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
} 