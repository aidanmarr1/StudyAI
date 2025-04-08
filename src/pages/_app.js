import React, { useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Handle dark mode
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <>
      <Head>
        <title>StudyAI - Your AI-Powered Study Companion</title>
        <meta name="description" content="StudyAI helps students learn more effectively with AI-powered flashcards, quiz generation, and personalized study plans" />
        <link rel="icon" href="/images/robot.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 