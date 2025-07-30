'use client';

import React from 'react';
import { SingleQuoteSection } from '@/types/content';

interface SingleQuoteTemplateProps {
  section: SingleQuoteSection;
}

const SingleQuoteTemplate: React.FC<SingleQuoteTemplateProps> = ({ section }) => {
  return (
    <div style={styles.content}>
      <h2 style={styles.title}>{section.title}</h2>
      <blockquote style={styles.quote}>
        "{section.subtitle}"
      </blockquote>
      <p style={styles.caption}>— {section.caption}</p>
    </div>
  );
};

const styles = {
  content: {
    textAlign: 'center' as const,
    color: 'black',
  },
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  quote: {
    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
    lineHeight: 1.5,
    fontStyle: 'italic',
    margin: '2rem 0',
    opacity: 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  caption: {
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    fontWeight: '500',
    opacity: 0.8,
    marginTop: '1rem',
  },
};

export default SingleQuoteTemplate;
