'use client';

import React from 'react';
import { HeroSection } from '@/types/content';

interface HeroTemplateProps {
  section: HeroSection;
}

const HeroTemplate: React.FC<HeroTemplateProps> = ({ section }) => {
  return (
    <div style={styles.content}>
      <h1 style={styles.title}>{section.title}</h1>
      <h2 style={styles.subtitle}>{section.subtitle}</h2>
    </div>
  );
};

const styles = {
  content: {
    textAlign: 'center' as const,
    color: 'black',
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
    fontWeight: '300',
    marginBottom: '2rem',
    opacity: 0.9,
  },
};

export default HeroTemplate;
