'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Popover } from 'react-tiny-popover';
import { DemographicsSection } from '@/types/content';
import styles from './DemographicsTemplate.module.css';

interface DemographicsTemplateProps {
  section: DemographicsSection;
}

const DemographicsTemplate: React.FC<DemographicsTemplateProps> = ({ section }) => {
  const [popoverOpenIndex, setPopoverOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.participants}>
      {section.children.map((child, index) => {
        return (
          <Popover
            key={index}
            isOpen={popoverOpenIndex === index}
            padding={12}
            reposition={true}
            onClickOutside={() => setPopoverOpenIndex(null)}
            content={({ position }: { position: string }) => (
              <div style={getPopoverContentStyle(position)}>
                <div style={getArrowStyle(position)} />
                <div dangerouslySetInnerHTML={{ __html: child.text }} />
              </div>
            )}
          >
            <div 
              className={styles.participant}
              onClick={() => setPopoverOpenIndex(popoverOpenIndex === index ? null : index)}
              onMouseEnter={() => setPopoverOpenIndex(index)}
              onMouseLeave={() => setPopoverOpenIndex(null)}
            >
              <Image 
                src={child.image} 
                alt={child.title}
                width={100}
                height={100}
                loading="lazy"
              />
              <div className={styles.participantName}>{child.title}</div>
            </div>
          </Popover>
        );
      })}
    </div>
  );
};

const getArrowStyle = (position: string) => {
  const arrowSize = 8;
  const baseStyle = {
    position: 'absolute' as const,
    width: 0,
    height: 0,
  };

  if (position === 'bottom') {
    return {
      ...baseStyle,
      top: `-${arrowSize}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid white`,
    };
  } else if (position === 'top') {
    return {
      ...baseStyle,
      bottom: `-${arrowSize}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderTop: `${arrowSize}px solid white`,
    };
  }

  return {};
};

const getPopoverContentStyle = (position: string) => {
  const baseStyle = {
    position: 'relative' as const,
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '12px',
    fontSize: '11px',
    maxWidth: '180px',
    minWidth: '150px',
    zIndex: 1000,
    lineHeight: '1.4',
    color: '#333',
  };

  if (position === 'bottom') {
    return {
      ...baseStyle,
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.15)', // Shadow above for bottom position
    };
  } else {
    return {
      ...baseStyle,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Shadow below for top position
    };
  }
};

export default DemographicsTemplate;
