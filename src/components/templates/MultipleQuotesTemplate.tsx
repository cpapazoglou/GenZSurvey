'use client';

import React from 'react';
import { MultipleQuotesSection } from '@/types/content';
import styles from './MultipleQuotesTemplate.module.css';

interface MultipleQuotesTemplateProps {
  section: MultipleQuotesSection;
}

const MultipleQuotesTemplate: React.FC<MultipleQuotesTemplateProps> = ({ section }) => {
  return (
    <div className={styles.content}>
      <div className={styles.quotesColumn}>
        {section.children.map((child, index) => (
          <div key={index} className={`${styles.quoteCard} ${index % 2 === 0 ? styles.quoteCardLeft : styles.quoteCardRight}`}>
            <div className={styles.imageContainer}>
              <img 
                src={child.image} 
                alt={child.title}
                className={styles.profileImage}
              />
            </div>
            <div className={styles.textContent}>
              <h3 className={styles.quoteTitle}>{child.title}</h3>
              <blockquote className={styles.quote}>
                "{child.text}"
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleQuotesTemplate;
