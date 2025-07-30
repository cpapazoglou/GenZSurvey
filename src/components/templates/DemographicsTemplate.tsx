'use client';

import React from 'react';
import { DemographicsSection } from '@/types/content';

interface DemographicsTemplateProps {
  section: DemographicsSection;
}

const DemographicsTemplate: React.FC<DemographicsTemplateProps> = ({ section }) => {
  return (
    <div style={styles.content}>
      <div style={styles.imageContainer}>
        <div style={styles.imagePlaceholder}>
          {section.image}
        </div>
      </div>
      <p style={styles.text}>{section.text}</p>
    </div>
  );
};

const styles = {
  content: {
    textAlign: 'center' as const,
    color: 'black',
  },
  imageContainer: {
    marginBottom: '2rem',
  },
  imagePlaceholder: {
    width: '100%',
    height: '300px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    opacity: 0.7,
    border: '2px dashed rgba(0, 0, 0, 0.3)',
  },
  text: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    lineHeight: 1.6,
    maxWidth: '100%',
    margin: '0 auto',
    opacity: 0.9,
  },
};

export default DemographicsTemplate;
