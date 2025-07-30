'use client';

import React from 'react';
import { TextSection } from '@/types/content';
import styles from './TextTemplate.module.css';

interface TextTemplateProps {
  section: TextSection;
}

const TextTemplate: React.FC<TextTemplateProps> = ({ section }) => {
  return (
    <div className={styles.content}>
      <p className={styles.text}>{section.text}</p>
    </div>
  );
};

export default TextTemplate;
