"use client";

import React, { createContext, useContext, ReactNode } from "react";

// Context to share parallax values across components
interface ParallaxContextType {
  ease: number;
}

const ParallaxContext = createContext<ParallaxContextType>({
  ease: 0.1, // Default easing value
});

export const useParallax = () => useContext(ParallaxContext);

interface ParallaxProviderProps {
  ease?: number;
  children: ReactNode;
}

export default function ParallaxProvider({
  ease = 0.1,
  children,
}: ParallaxProviderProps) {
  return (
    <ParallaxContext.Provider value={{ ease }}>
      {children}
    </ParallaxContext.Provider>
  );
} 