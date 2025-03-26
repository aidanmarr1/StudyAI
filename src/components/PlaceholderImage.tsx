"use client";

import React, { useMemo } from "react";

interface PlaceholderImageProps {
  width: number;
  height: number;
  text?: string;
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  text = "Image Placeholder",
  className = "",
}) => {
  // Generate beautiful gradients based on the text or random selection
  const backgroundGradient = useMemo(() => {
    const gradients = [
      "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", // Indigo to Purple
      "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)", // Blue to Purple
      "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)", // Emerald to Blue
      "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)", // Amber to Red
      "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)", // Purple to Pink
      "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)", // Indigo to Pink
    ];
    
    // Use the first character of the text to consistently select the same gradient for the same text
    let index = 0;
    if (text && text.length > 0) {
      index = text.charCodeAt(0) % gradients.length;
    } else {
      index = Math.floor(Math.random() * gradients.length);
    }
    
    return gradients[index];
  }, [text]);

  const style: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    background: backgroundGradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: `${Math.min(width, height) / 10}px`,
    fontWeight: 600,
    borderRadius: "12px",
    textAlign: "center",
    padding: "20px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    position: "relative",
    overflow: "hidden",
  };

  const patternStyle: React.CSSProperties = {
    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"1\"%3E%3C/circle%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"1\"%3E%3C/circle%3E%3C/g%3E%3C/svg%3E')"
  };

  return (
    <div style={style} className={`relative overflow-hidden ${className}`}>
      {/* Add a subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={patternStyle}></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -translate-x-full animate-shimmer"></div>
      
      {/* Content */}
      <div className="relative z-10">{text}</div>
    </div>
  );
};

export default PlaceholderImage; 