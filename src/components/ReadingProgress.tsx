'use client';

import React, { useState, useEffect, useCallback } from 'react';

const ReadingProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100));
  }, []);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress]);

  return (
    <div className="reading-progress">
      <div 
        className="reading-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
