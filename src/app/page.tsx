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
  const [isFullpageVisible, setIsFullpageVisible] = useState(false);

  return (
    <main style={styles.main}>
      {!isFullpageVisible && (
        <div style={styles.loading}>
          <div style={styles.loader}>
            <div className="loading-bullet"></div>
            <div className="loading-bullet"></div>
            <div className="loading-bullet"></div>
          </div>
        </div>
      )}
      <div style={{ opacity: isFullpageVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
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
          afterRender={() => {
            // Show fullpage after it's fully rendered
            setIsFullpageVisible(true);
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
      </div>
    </main>
  );
}

const styles = {
  main: {
    position: 'relative' as const,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '1.2rem',
    color: '#4e3254',
    backgroundColor: '#f8fbee',
  },
  loader: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
};
