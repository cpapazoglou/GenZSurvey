'use client';

import React from 'react';
import { TextSection } from '@/types/content';
import styles from './TextTemplate.module.css';

interface TextTemplateProps {
  section: TextSection;
}

const TextTemplate: React.FC<TextTemplateProps> = ({ section }) => {
  const content = section.text || '';

  return (
    <div className={styles.contentSection} data-section={section.id}>
      <div className={styles.mainContent}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default TextTemplate;
