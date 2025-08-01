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
      <div className={styles.participants} data-section={section.id}>
        {section.children.map((child, index) => (
          <div key={index} className={styles.participant}>
            <Image 
              src={child.image} 
              alt={child.title}
              width={100}
              height={100}
              loading="lazy"
            />
            <div className={styles.participantName}>{child.title}</div>
            <div className={styles.participantDetails}>{child.text}</div>
          </div>
        ))}
      </div>
  );
};

export default DemographicsTemplate;
