'use client';

import React from 'react';
import { SingleQuoteSection } from '@/types/content';
import styles from './SingleQuoteTemplate.module.css';

interface SingleQuoteTemplateProps {
  section: SingleQuoteSection;
  type?: string; // Optional type prop for consistency with other templates
}

const SingleQuoteTemplate: React.FC<SingleQuoteTemplateProps> = ({ section, type }) => {
  return (
    <div className={styles.content} data-type={type} dangerouslySetInnerHTML={{ __html: section.text }} />
  );
};

export default SingleQuoteTemplate;
