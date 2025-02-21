import React, { createContext, useContext, useEffect, useCallback } from 'react';

// Create a context for global scroll management
const ScrollContext = createContext();

// Custom hook for smooth scrolling
const useSmoothScroll = () => {
  // Smooth scroll to section method
  const smoothScrollToSection = useCallback((sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, []);

  useEffect(() => {
    // Comprehensive scroll optimization
    const optimizeScroll = () => {
      const html = document.documentElement;
      const body = document.body;

      // Global scroll settings
      html.style.scrollBehavior = 'smooth';
      body.style.overscrollBehavior = 'none';
      html.style.overscrollBehavior = 'none';
    };

    // Advanced scroll prevention and management
    const preventUnwantedScroll = (e) => {
      // Allow zooming and essential scroll actions
      if (e.ctrlKey || e.metaKey) return;

      // Prevent rapid or unintended scrolling
      if (e.type === 'wheel') {
        e.preventDefault();
      }
    };

    // Enhanced scroll tracking
    const trackScrollPosition = () => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Optional: Add scroll position tracking logic
      console.log({
        current: scrollPosition,
        total: documentHeight,
        progress: (scrollPosition / (documentHeight - windowHeight)) * 100
      });
    };

    // Performance-optimized scroll handler
    const handleScroll = (e) => {
      preventUnwantedScroll(e);
      trackScrollPosition();
    };

    // Attach global scroll event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });

    // Initial optimization
    optimizeScroll();

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  // Return the smoothScrollToSection method
  return { smoothScrollToSection };
};

// Global Scroll Provider Component
export const ScrollProvider = ({ children }) => {
  const scrollMethods = useSmoothScroll();

  return (
    <ScrollContext.Provider value={scrollMethods}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook to use scroll context
export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};
