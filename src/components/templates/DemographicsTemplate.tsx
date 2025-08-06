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
  const [state, setState] = useState({
    popoverOpenIndex: null as number | null,
    visibleParticipants: new Array(section.children.length).fill(false) as boolean[],
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

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
        setState({
          popoverOpenIndex: null,
          visibleParticipants: new Array(section.children.length).fill(false)
        });
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

      setState(prevState => {
        const newVisibleParticipants = prevState.visibleParticipants.map((_, index) => index < visibleCount);
        
        if (visibleCount === 0) {
          return {
            popoverOpenIndex: null,
            visibleParticipants: newVisibleParticipants
          };
        }

        // Check for newly revealed participant
        const newlyVisible = newVisibleParticipants.findIndex((isVisible, index) => 
          isVisible && !prevState.visibleParticipants[index]
        );
        
        let newPopoverIndex = prevState.popoverOpenIndex;
        
        if (newlyVisible !== -1) {
          newPopoverIndex = newlyVisible;
        } else if (scrollProgress > 0.95) {
          // Close popover near end of section
          newPopoverIndex = null;
        } else if (visibleCount > 0) {
          // Ensure last visible participant has popover open
          const lastVisibleIndex = visibleCount - 1;
          if (prevState.popoverOpenIndex !== lastVisibleIndex) {
            newPopoverIndex = lastVisibleIndex;
          }
        }

        return {
          popoverOpenIndex: newPopoverIndex,
          visibleParticipants: newVisibleParticipants
        };
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
        const isVisible = state.visibleParticipants[index];
        const shouldUseBottomPosition = isMobile && index < 2;
        
        return (
          <Popover
            key={index}
            isOpen={state.popoverOpenIndex === index}
            padding={12}
            reposition={true}
            positions={shouldUseBottomPosition ? ['bottom', 'top'] : ['top']}
            onClickOutside={() => setState(prev => ({ ...prev, popoverOpenIndex: null }))}
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
              onClick={() => setState(prev => ({ 
                ...prev, 
                popoverOpenIndex: prev.popoverOpenIndex === index ? null : index 
              }))}
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
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const borderStyle = `${arrowSize}px solid transparent`;
  
  if (position === 'bottom') {
    return {
      ...baseStyle,
      top: `-${arrowSize}px`,
      borderLeft: borderStyle,
      borderRight: borderStyle,
      borderBottom: `${arrowSize}px solid white`,
    };
  }
  
  return {
    ...baseStyle,
    bottom: `-${arrowSize}px`,
    borderLeft: borderStyle,
    borderRight: borderStyle,
    borderTop: `${arrowSize}px solid white`,
  };
};

const getPopoverContentStyle = (position: string) => {
  return {
    position: 'relative' as const,
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '12px',
    fontSize: '13px',
    maxWidth: '180px',
    minWidth: '150px',
    zIndex: 99999,
    lineHeight: '1.4',
    color: '#333',
    opacity: 1,
    isolation: 'isolate' as const,
    boxShadow: position === 'bottom' 
      ? '0 -4px 12px rgba(0, 0, 0, 0.15)' 
      : '0 4px 12px rgba(0, 0, 0, 0.15)',
  };
};

export default DemographicsTemplate;
