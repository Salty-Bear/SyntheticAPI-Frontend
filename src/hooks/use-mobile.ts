"use client";

import { useEffect } from "react";
import { hookstate, useHookstate } from "@hookstate/core";

// Global state for mobile detection
const mobileState = hookstate(false);

/**
 * Hook to detect if the user is on a mobile device
 * Uses a media query to check if the screen width is below 768px (tablet breakpoint)
 * Implemented with Hookstate for global state management
 */
export function useIsMobile() {
  const state = useHookstate(mobileState);

  useEffect(() => {
    // Create media query for mobile detection
    const mql = window.matchMedia("(max-width: 767.98px)");
    
    // Set initial value
    state.set(mql.matches);
    
    // Handler for media query changes
    const onChange = (e: MediaQueryListEvent) => {
      state.set(e.matches);
    };
    
    // Add listener
    mql.addEventListener("change", onChange);
    
    // Cleanup
    return () => mql.removeEventListener("change", onChange);
  }, [state]);

  return state.get();
}
