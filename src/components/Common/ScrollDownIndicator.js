import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useScrollContext } from '../../context/ScrollProvider';

const ScrollDownIndicator = () => {
  const { smoothScrollToSection } = useScrollContext();
  const location = useLocation();
  const [homePageSections, setHomePageSections] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Home page specific sections in order
  const HOME_SECTIONS = [
    '#skills-achievements', 
    '#professional-profile', 
    '#skills-showcase', 
    '#professional-statistics', 
    '#contact'
  ];



  const detectHomePageSections = useCallback(() => {
    // Only detect sections if on the home page
    if (location.pathname !== '/' && location.pathname !== '/home') return [];

    // Filter out sections that actually exist in the document
    return HOME_SECTIONS.filter(sectionId => 
      document.querySelector(sectionId)
    );
  }, [location.pathname]);

  // Initialize and update sections
  useEffect(() => {
    const validSections = detectHomePageSections();
    setHomePageSections(validSections);
  }, [detectHomePageSections]);

  // Scroll to next section (right side)
  const scrollToNextSection = () => {
    if (homePageSections.length === 0) return;

    const nextIndex = (currentSectionIndex + 1) % homePageSections.length;
    const nextSection = homePageSections[nextIndex];

    smoothScrollToSection(nextSection);
    setCurrentSectionIndex(nextIndex);
  };

  // Scroll to previous section (left side)
  const scrollToPreviousSection = () => {
    if (homePageSections.length === 0) return;

    const prevIndex = (currentSectionIndex - 1 + homePageSections.length) % homePageSections.length;
    const prevSection = homePageSections[prevIndex];

    smoothScrollToSection(prevSection);
    setCurrentSectionIndex(prevIndex);
  };

  // Only render on home page
  if (location.pathname !== '/' && location.pathname !== '/home') {
    return null;
  }

  return (
    <div className="scroll-navigation-container">
      {/* Left Scroll Button */}
      <motion.div 
        className="scroll-left-indicator"
        onClick={scrollToPreviousSection}
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: [0, 1, 0],
          x: [-20, 0, -20]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        <span>السابق</span>
      </motion.div>

      {/* Right Scroll Button */}
      <motion.div 
        className="scroll-right-indicator"
        onClick={scrollToNextSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: [0, 1, 0],
          x: [20, 0, 20]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6"/>
        </svg>
        <span>التالي</span>
      </motion.div>
    </div>
  );
};

export default ScrollDownIndicator;
