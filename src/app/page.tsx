"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileApp from "@/components/MobileApp";
import HelpWidget from '@/components/HelpWidget';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // This is to avoid hydration mismatch for dark mode
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <MobileApp />
        <Pricing />
        <FAQ />
        <Contact />
        <Footer />
      </main>
      {/* Place HelpWidget outside main to ensure it's not affected by any container styles */}
      <HelpWidget />
    </>
  );
}
