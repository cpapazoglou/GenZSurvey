'use client';

import React, { useEffect, useRef } from 'react';
import { Section } from '@/types/content';
import HeroTemplate from './templates/HeroTemplate';
import MultipleQuotesTemplate from './templates/MultipleQuotesTemplate';
import TextTemplate from './templates/TextTemplate';
import DemographicsTemplate from './templates/DemographicsTemplate';
import SingleQuoteTemplate from './templates/SingleQuoteTemplate';

interface ParallaxSectionProps {
  section: Section;
  index: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ section, index }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      const yPos = -(scrolled * parallaxSpeed);

      sectionRef.current.style.transform = `translateY(${yPos}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      default:
        return <div>Unknown template</div>;
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        ...styles.section,
        background: getBackgroundColor(index),
      }}
    >
      <div style={styles.container}>
        {renderTemplate()}
      </div>
    </section>
  );
};

const getBackgroundColor = (index: number): string => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  ];
  return colors[index % colors.length];
};

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  container: {
    maxWidth: '580px',
    width: '100%',
    padding: '0 20px',
    zIndex: 1,
  },
};

export default ParallaxSection;
