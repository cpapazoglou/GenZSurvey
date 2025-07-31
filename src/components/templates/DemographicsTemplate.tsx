'use client';

import React from 'react';
import Image from 'next/image';
import { DemographicsSection } from '@/types/content';
import styles from './DemographicsTemplate.module.css';

interface DemographicsTemplateProps {
  section: DemographicsSection;
}

const DemographicsTemplate: React.FC<DemographicsTemplateProps> = ({ section }) => {
  return (
    <div className={styles.content}>
      <div className={styles.demographicsGrid}>
        {section.children.map((child, index) => (
          <div key={index} className={styles.demographicsCard}>
            <div className={styles.imageContainer}>
              <Image 
                src={child.image} 
                alt={child.title}
                width={400}
                height={400}
                className={styles.profileImage}
              />
            </div>
            <h3 className={styles.cardTitle}>{child.title}</h3>
            <p className={styles.cardText}>{child.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemographicsTemplate;
