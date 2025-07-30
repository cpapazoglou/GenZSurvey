'use client';

import React from 'react';
import { SingleQuoteSection } from '@/types/content';
import styles from './SingleQuoteTemplate.module.css';

interface SingleQuoteTemplateProps {
  section: SingleQuoteSection;
}

const SingleQuoteTemplate: React.FC<SingleQuoteTemplateProps> = ({ section }) => {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{section.title}</h2>
      <blockquote className={styles.quote}>
        "{section.subtitle}"
      </blockquote>
      <p className={styles.caption}>— {section.caption}</p>
    </div>
  );
};

export default SingleQuoteTemplate;
