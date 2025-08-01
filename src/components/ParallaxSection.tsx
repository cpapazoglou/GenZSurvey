'use client';

import React from 'react';
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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {renderTemplate()}
      </div>
    </section>
  );
};

export default ParallaxSection;
