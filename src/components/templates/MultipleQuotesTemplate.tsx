'use client';

import React from 'react';
import { MultipleQuotesSection } from '@/types/content';

interface MultipleQuotesTemplateProps {
  section: MultipleQuotesSection;
}

const MultipleQuotesTemplate: React.FC<MultipleQuotesTemplateProps> = ({ section }) => {
  return (
    <div style={styles.content}>
      <div style={styles.imageContainer}>
        <div style={styles.imagePlaceholder}>
          {section.image}
        </div>
      </div>
      <h2 style={styles.title}>{section.title}</h2>
      <div style={styles.quotesGrid}>
        {section.text.map((quote, index) => (
          <blockquote key={index} style={styles.quote}>
            "{quote}"
          </blockquote>
        ))}
      </div>
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
    height: '200px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    opacity: 0.7,
    border: '2px dashed rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  quotesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  quote: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    fontSize: '1rem',
    lineHeight: 1.5,
    fontStyle: 'italic',
    margin: 0,
  },
};

export default MultipleQuotesTemplate;
