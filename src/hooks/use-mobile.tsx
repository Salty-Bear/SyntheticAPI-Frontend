"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if the user is on a mobile device
 * Uses a media query to check if the screen width is below 768px (tablet breakpoint)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Create media query for mobile detection
    const mql = window.matchMedia("(max-width: 767.98px)");
    
    // Set initial value
    setIsMobile(mql.matches);
    
    // Handler for media query changes
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    // Add listener
    mql.addEventListener("change", onChange);
    
    // Cleanup
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
