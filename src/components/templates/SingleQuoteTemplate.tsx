'use client';

import React from 'react';
import { SingleQuoteSection } from '@/types/content';
import styles from './SingleQuoteTemplate.module.css';

interface SingleQuoteTemplateProps {
  section: SingleQuoteSection;
}

const SingleQuoteTemplate: React.FC<SingleQuoteTemplateProps> = ({ section }) => {
  return (
    <div className={styles.content} data-section={section.id} dangerouslySetInnerHTML={{ __html: section.text }} />
  );
};

export default SingleQuoteTemplate;
