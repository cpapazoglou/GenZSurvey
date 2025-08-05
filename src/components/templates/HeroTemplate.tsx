'use client';

import React from 'react';
import { HeroSection } from '@/types/content';
import styles from './HeroTemplate.module.css';

interface HeroTemplateProps {
  section: HeroSection;
}

const HeroTemplate: React.FC<HeroTemplateProps> = ({ section }) => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{section.title}</h1>
      <h2 className={styles.subtitle}>{section.subtitle}</h2>
    </div>
  );
};

export default HeroTemplate;
