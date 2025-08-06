'use client';

import React from 'react';
import { TextSection } from '@/types/content';
import styles from './TextTemplate.module.css';

interface TextTemplateProps {
  section: TextSection;
  type?: string; // Optional type prop for consistency with other templates
}

const TextTemplate: React.FC<TextTemplateProps> = ({ section, type }) => {
  const content = section.text || '';

  return (
    <div className={styles.contentSection} data-type={type}>
      <div className={styles.mainContent}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default TextTemplate;
