'use client';

import React from 'react';
import { DemographicsSection } from '@/types/content';

interface DemographicsTemplateProps {
  section: DemographicsSection;
}

const DemographicsTemplate: React.FC<DemographicsTemplateProps> = ({ section }) => {
  return (
    <div style={styles.content}>
      <div style={styles.demographicsGrid}>
        {section.children.map((child, index) => (
          <div key={index} style={styles.demographicsCard}>
            <div style={styles.imageContainer}>
              <div style={styles.imagePlaceholder}>
                {child.image}
              </div>
            </div>
            <h3 style={styles.cardTitle}>{child.title}</h3>
            <p style={styles.cardText}>{child.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  content: {
    textAlign: 'center' as const,
    color: 'black',
  },
  demographicsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  demographicsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  imageContainer: {
    marginBottom: '1.5rem',
  },
  imagePlaceholder: {
    width: '100%',
    height: '200px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    opacity: 0.7,
    border: '2px dashed rgba(0, 0, 0, 0.3)',
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'black',
  },
  cardText: {
    fontSize: '1rem',
    lineHeight: 1.6,
    margin: 0,
    opacity: 0.9,
  },
};

export default DemographicsTemplate;
