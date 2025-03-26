"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor after a short delay to prevent initial flash
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorStyle = () => {
      const target = document.elementFromPoint(position.x, position.y);
      
      if (target) {
        // Check if element or its parents have cursor: pointer style
        const hasPointerCursor = (element: Element): boolean => {
          if (!element) return false;
          
          const computedStyle = window.getComputedStyle(element);
          if (computedStyle.cursor === 'pointer') return true;
          
          if (element.parentElement) {
            return hasPointerCursor(element.parentElement);
          }
          
          return false;
        };
        
        setIsPointer(hasPointerCursor(target));
      }
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousemove", updateCursorStyle);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousemove", updateCursorStyle);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [position.x, position.y]);

  // Only render on client and if visible
  if (!isVisible) return null;
  
  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-indigo-600 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isActive ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-indigo-500 pointer-events-none z-[9998] opacity-70"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : isActive ? 0.8 : 1,
          opacity: isPointer ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150,
          mass: 0.8,
        }}
      />
    </>
  );
};

export default CustomCursor; 