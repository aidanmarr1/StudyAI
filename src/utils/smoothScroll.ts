/**
 * Utility for enabling smooth scrolling across the application
 * Used by the SmoothScrollProvider component
 */

interface SmoothScrollOptions {
  duration?: number;  // Duration of scroll in milliseconds
  offset?: number;    // Offset from the top (useful for fixed headers)
  easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad';
}

// Easing functions
const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
};

/**
 * Sets up smooth scrolling for anchor links
 */
export function setupSmoothScrolling(options: SmoothScrollOptions = {}) {
  const {
    duration = 800,
    offset = 0,
    easing = 'easeInOutQuad'
  } = options;

  const easingFunction = easings[easing];

  const handleClick = (e: MouseEvent) => {
    // Only process clicks on anchor links
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (!anchor) return;
    
    // Check if it's an internal link with a hash
    const href = anchor.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;
    
    e.preventDefault();
    
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;
    
    function step(currentTime: number) {
      if (!startTime) {
        startTime = currentTime;
      }
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easingFunction(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (timeElapsed < duration) {
        window.requestAnimationFrame(step);
      }
    }
    
    window.requestAnimationFrame(step);
  };
  
  // Add event listener to handle all anchor clicks
  document.addEventListener('click', handleClick);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('click', handleClick);
  };
} 