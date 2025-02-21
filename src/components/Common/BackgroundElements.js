import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BackgroundElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const generateBackgroundElements = () => {
      const elementCount = 10;
      const newElements = Array.from({ length: elementCount }, (_, index) => ({
        id: index,
        size: Math.random() * 100 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 5
      }));
      setElements(newElements);
    };

    generateBackgroundElements();
  }, []);

  return (
    <div className="background-elements">
      {elements.map(element => (
        <motion.div 
          key={element.id}
          className="floating-element"
          initial={{ 
            opacity: 0, 
            scale: 0.5,
            x: element.left + '%',
            y: element.top + '%'
          }}
          animate={{ 
            opacity: [0, 0.2, 0.5, 0.2, 0],
            scale: [0.5, 1, 0.7, 1, 0.5],
            rotate: 360
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut"
          }}
          style={{
            width: element.size + 'px',
            height: element.size + 'px',
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundElements;
