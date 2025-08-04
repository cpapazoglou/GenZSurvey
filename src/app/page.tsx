'use client';

import React, { useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import ParallaxSection from '@/components/ParallaxSection';
import ReadingProgress from '@/components/ReadingProgress';
import { SiteData } from '@/types/content';
import contentData from '@/data/content.json';

export default function HomePage() {
  const data: SiteData = contentData as SiteData;
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <main style={styles.main}>
      <ReadingProgress 
        currentSection={currentSection} 
        totalSections={data.sections.length} 
      />
      <ReactFullpage
        //fullpage options
        licenseKey={'gplv3-license'} // Use 'gplv3-license' for open source projects
        scrollingSpeed={1000}
        navigation={true}
        controlArrows={false}
        slidesNavigation={false}
        animateAnchor={true}
        recordHistory={true}
        lazyLoading={true}
        responsiveWidth={768}
        responsiveHeight={600}
        credits={{ enabled: false }}
        afterLoad={(origin, destination) => {
          setCurrentSection(destination.index);
        }}
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              {data.sections.map((section) => (
                <div key={section.id} className="section">
                  <ParallaxSection
                    section={section}
                  />
                </div>
              ))}
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </main>
  );
}

const styles = {
  main: {
    position: 'relative' as const,
  },
};
