'use client';

import React from 'react';
import ParallaxSection from '@/components/ParallaxSection';
import ReadingProgress from '@/components/ReadingProgress';
import { SiteData } from '@/types/content';
import contentData from '@/data/content.json';

export default function HomePage() {
  const data: SiteData = contentData as SiteData;

  return (
    <main style={styles.main}>
      <ReadingProgress />
      {data.sections.map((section, index) => (
        <ParallaxSection
          key={section.id}
          section={section}
          index={index}
        />
        ))}
      <div className="scrollIndicator">
        <div className="scrollArrow">↓</div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    position: 'relative' as const,
  },
};
