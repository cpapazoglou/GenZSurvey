'use client';

import React, { useEffect, useState } from 'react';

interface ReadingProgressProps {
  currentSection: number;
  totalSections: number;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ 
  currentSection, 
  totalSections 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Calculate progress based on current section
    const scrollPercent = ((currentSection + 1) / totalSections) * 100;
    setScrollProgress(scrollPercent);
  }, [currentSection, totalSections]);

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
