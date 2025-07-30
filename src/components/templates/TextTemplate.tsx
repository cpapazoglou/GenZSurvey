'use client';

import React from 'react';
import { TextSection } from '@/types/content';

interface TextTemplateProps {
  section: TextSection;
}

const TextTemplate: React.FC<TextTemplateProps> = ({ section }) => {
  return (
    <div style={styles.content}>
      <p style={styles.text}>{section.text}</p>
    </div>
  );
};

const styles = {
  content: {
    textAlign: 'center' as const,
    color: 'black',
  },
  text: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    lineHeight: 1.6,
    maxWidth: '100%',
    margin: '0 auto',
    opacity: 0.9,
  },
};

export default TextTemplate;
