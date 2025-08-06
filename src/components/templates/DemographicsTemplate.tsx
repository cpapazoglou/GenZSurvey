'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Popover } from 'react-tiny-popover';
import { DemographicsSection } from '@/types/content';
import styles from './DemographicsTemplate.module.css';

interface DemographicsTemplateProps {
  section: DemographicsSection;
  type?: string;
}

const DemographicsTemplate: React.FC<DemographicsTemplateProps> = ({ section, type }) => {
  const [popoverOpenIndex, setPopoverOpenIndex] = useState<number | null>(null);
  const [visibleParticipants, setVisibleParticipants] = useState<boolean[]>(
    new Array(section.children.length).fill(false)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type !== 'content') return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const currentContainer = containerRef.current;
      const currentSection = currentContainer.closest('[data-section]');
      if (!currentSection) return;

      const spacerElement = currentSection.previousElementSibling as HTMLElement;
      if (!spacerElement) return;

      const spacerRect = spacerElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Reset state if spacer has scrolled past viewport
      if (spacerRect.bottom < viewportHeight * 0.3) {
        setPopoverOpenIndex(null);
        setVisibleParticipants(new Array(section.children.length).fill(false));
        return;
      }

      // Calculate scroll progress (0 to 1)
      let scrollProgress = 0;
      if (spacerRect.height > viewportHeight) {
        if (spacerRect.top <= 0) {
          const scrolledPast = Math.abs(spacerRect.top);
          const maxScroll = spacerRect.height - viewportHeight;
          scrollProgress = Math.min(scrolledPast / Math.max(maxScroll, 1), 1);
        }
      } else {
        const entryProgress = (viewportHeight - spacerRect.top) / Math.max(spacerRect.height, viewportHeight);
        scrollProgress = Math.max(0, Math.min(entryProgress, 1));
      }

      const totalParticipants = section.children.length;
      const visibleCount = scrollProgress > 0 ? Math.max(1, Math.ceil(scrollProgress * totalParticipants)) : 0;

      setVisibleParticipants(prev => {
        const newState = prev.map((_, index) => index < visibleCount);

        if (visibleCount === 0) {
          setPopoverOpenIndex(null);
          return newState;
        }

        // Check for newly revealed participant
        const newlyVisible = newState.findIndex((isVisible, index) => isVisible && !prev[index]);
        if (newlyVisible !== -1) {
          setPopoverOpenIndex(newlyVisible);
        } else if (visibleCount > 0) {
          const lastVisibleIndex = visibleCount - 1;

          // Close first participant's popover when second appears
          if (visibleCount > 1 && popoverOpenIndex === 0) {
            setPopoverOpenIndex(lastVisibleIndex);
          }
          // Close last participant's popover near end of section
          else if (scrollProgress > 0.8 && popoverOpenIndex === lastVisibleIndex && lastVisibleIndex === totalParticipants - 1) {
            setPopoverOpenIndex(null);
          }
          // Close if spacer has moved significantly past viewport
          else if (spacerRect.bottom < viewportHeight * 0.5 && popoverOpenIndex !== null) {
            setPopoverOpenIndex(null);
          }
          // Ensure last visible participant has popover open
          else if (popoverOpenIndex === null || popoverOpenIndex !== lastVisibleIndex) {
            setPopoverOpenIndex(lastVisibleIndex);
          }
        }

        return newState;
      });
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [section.children.length, type]);

  return (
    <div ref={containerRef} className={styles.participants} data-type={type}>
      {section.children.map((child, index) => {
        const isVisible = visibleParticipants[index];
        
        const isMobile = window.innerWidth < 768;
        const shouldUseBottomPosition = isMobile && index < 2;
        
        return (
          <Popover
            key={index}
            isOpen={popoverOpenIndex === index}
            padding={12}
            reposition={true}
            positions={shouldUseBottomPosition ? ['bottom', 'top'] : ['top']}
            onClickOutside={() => setPopoverOpenIndex(null)}
            containerStyle={{ zIndex: '10000', opacity: '1' }}
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
              style={type === 'content' ? {
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.3)',
              } : {}}
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
  const baseStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '12px',
    fontSize: window.innerWidth < 768 ? '11px' : '13px',
    maxWidth: '180px',
    minWidth: '150px',
    zIndex: 99999, // Very high z-index
    lineHeight: '1.4',
    color: '#333',
    opacity: 1, // Force full opacity
    isolation: 'isolate', // Create new stacking context
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
