'use client';

import React from 'react';
import ParallaxSection from '@/components/ParallaxSection';
import { SiteData } from '@/types/content';
import contentData from '@/data/content.json';

export default function HomePage() {
  const data: SiteData = contentData as SiteData;

  return (
    <main style={styles.main}>
      {data.sections.map((section, index) => (
        <ParallaxSection
          key={section.id}
          section={section}
          index={index}
        />
      ))}
      <div style={styles.scrollIndicator}>
        <div style={styles.scrollArrow}>↓</div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    position: 'relative' as const,
  },
  scrollIndicator: {
    position: 'fixed' as const,
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    animation: 'bounce 2s infinite',
  },
  scrollArrow: {
    fontSize: '2rem',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
};
