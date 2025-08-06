'use client';

import React, { useRef } from 'react';
import { Section } from '@/types/content';
import HeroTemplate from './templates/HeroTemplate';
import MultipleQuotesTemplate from './templates/MultipleQuotesTemplate';
import TextTemplate from './templates/TextTemplate';
import DemographicsTemplate from './templates/DemographicsTemplate';
import SingleQuoteTemplate from './templates/SingleQuoteTemplate';
import MixedTemplate from './templates/MixedTemplate';
import styles from './ParallaxSection.module.css';

interface ParallaxSectionProps {
  section: Section;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ section }) => {
  const spacerRef = useRef<HTMLElement>(null);

  const renderTemplate = (type?: string) => {
    switch (section.template) {
      case 'hero':
        return <HeroTemplate section={section} type={type} />;
      case 'multiple-quotes':
        return <MultipleQuotesTemplate section={section} type={type} />;
      case 'text':
        return <TextTemplate section={section} type={type} />;
      case 'demographics':
        return <DemographicsTemplate section={section} type={type} />;
      case 'single-quote':
        return <SingleQuoteTemplate section={section} type={type} />;
      case 'mixed':
        return <MixedTemplate section={section} type={type} />;
      default:
        return <div>Unknown template</div>;
    }
  };

  // For parallax sections: invisible spacer + fixed overlay
  if (section.animation === 'parallax') {
    // Determine if this section might need overflow handling
    const needsOverflow = section.template === 'multiple-quotes';
    
    return (
      <>
        {/* Invisible spacer maintains document flow and scroll behavior */}
        <section 
          ref={spacerRef}
          className={styles.parallaxSpacer} 
          style={{ visibility: 'hidden' }}
        >
          <div className={styles.container}>
            {renderTemplate('spacer')}
          </div>
        </section>
        
        {/* Fixed parallax overlay - only renders after mount to avoid hydration issues */}
        
				<section 
					className={`${styles.parallax} ${needsOverflow ? styles.overflow : ''}`}
					data-section={section.id}
				>
					<div className={styles.container}>
						{renderTemplate('content')}
					</div>
				</section>
      </>
    );
  }

  // Regular sections - normal scroll behavior
  return (
    <section className={styles.section}>
      <div className={styles.container} data-section={section.id}>
        {renderTemplate('content')}
      </div>
    </section>
  );
};

export default ParallaxSection;
