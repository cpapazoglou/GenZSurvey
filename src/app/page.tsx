'use client';

import React, { useEffect } from 'react';
import ParallaxSection from '@/components/ParallaxSection';
import ReadingProgress from '@/components/ReadingProgress';
import { SiteData } from '@/types/content';
import contentData from '@/data/content.json';
import { initAllSectionVisibility } from '@/lib/utils';

export default function HomePage() {
  const data: SiteData = contentData as SiteData;

  useEffect(() => {
    // Initialize section visibility system with content data
    const { cleanup } = initAllSectionVisibility(data);
    
    // Cleanup on unmount
    return cleanup;
  }, [data]);

  return (
    <main style={styles.main}>
      <ReadingProgress />
      {data.sections.map((section) => (
        <ParallaxSection
          key={section.id}
          section={section}
        />
      ))}
    </main>
  );
}

const styles = {
  main: {
    position: 'relative' as const,
  },
};
