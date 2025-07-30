'use client';

import React from 'react';
import { MultipleQuotesSection } from '@/types/content';

interface MultipleQuotesTemplateProps {
  section: MultipleQuotesSection;
}

const MultipleQuotesTemplate: React.FC<MultipleQuotesTemplateProps> = ({ section }) => {
  return (
    <div style={styles.content}>
      <div style={styles.quotesGrid}>
        {section.children.map((child, index) => (
          <div key={index} style={styles.quoteCard}>
            <div style={styles.imageContainer}>
              <div style={styles.imagePlaceholder}>
                {child.image}
              </div>
            </div>
            <h3 style={styles.quoteTitle}>{child.title}</h3>
            <blockquote style={styles.quote}>
              "{child.text}"
            </blockquote>
          </div>
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
  quotesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  imageContainer: {
    marginBottom: '1rem',
  },
  imagePlaceholder: {
    width: '100%',
    height: '120px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    opacity: 0.7,
    border: '2px dashed rgba(0, 0, 0, 0.3)',
    marginBottom: '1rem',
  },
  quoteTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'black',
  },
  quote: {
    fontSize: '0.95rem',
    lineHeight: 1.5,
    fontStyle: 'italic',
    margin: 0,
    opacity: 0.9,
  },
};

export default MultipleQuotesTemplate;
