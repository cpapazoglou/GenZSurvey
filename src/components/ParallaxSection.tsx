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

  const renderTemplate = () => {
    switch (section.template) {
      case 'hero':
        return <HeroTemplate section={section} />;
      case 'multiple-quotes':
        return <MultipleQuotesTemplate section={section} />;
      case 'text':
        return <TextTemplate section={section} />;
      case 'demographics':
        return <DemographicsTemplate section={section} />;
      case 'single-quote':
        return <SingleQuoteTemplate section={section} />;
      case 'mixed':
        return <MixedTemplate section={section} />;
      default:
        return <div>Unknown template</div>;
    }
  };

  const content = renderTemplate();

  // For parallax sections: invisible spacer + fixed overlay
  if (section.animation === 'parallax') {
    return (
      <>
        {/* Invisible spacer maintains document flow and scroll behavior */}
        <section 
          ref={spacerRef}
          className={styles.section} 
          style={{ visibility: 'hidden' }}
        >
          <div className={styles.container}>
            {content}
          </div>
        </section>
        
        {/* Fixed parallax overlay - only renders after mount to avoid hydration issues */}
        
				<section 
					className={styles.parallax}
					data-section={section.id}
				>
					<div className={styles.container}>
						{content}
					</div>
				</section>
      </>
    );
  }

  // Regular sections - normal scroll behavior
  return (
    <section className={styles.section} data-section={section.id}>
      <div className={styles.container}>
        {content}
      </div>
    </section>
  );
};

export default ParallaxSection;
