"use client";

import { useEffect } from "react";
import { setupSmoothScrolling } from "@/utils/smoothScroll";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useEffect(() => {
    // Setup smooth scrolling with default options
    setupSmoothScrolling({
      duration: 1000,
      offset: 80, // Account for fixed header
      easing: 'easeInOutQuad'
    });
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider; 