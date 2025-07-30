'use client';

import React, { useEffect, useRef } from 'react';
import { Section, ContentItem } from '@/types/content';

interface ParallaxSectionProps {
  section: Section;
  index: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ section, index }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      const yPos = -(scrolled * parallaxSpeed);

      sectionRef.current.style.transform = `translateY(${yPos}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    if (typeof section.content === 'string') {
      return (
        <p style={styles.textContent}>
          {section.content}
        </p>
      );
    }

    return (
      <div style={styles.contentGrid}>
        {section.content.map((item: ContentItem, itemIndex: number) => (
          <div key={itemIndex} style={styles.contentItem}>
            <h3 style={styles.itemTitle}>{item.title}</h3>
            <h4 style={styles.itemSubtitle}>{item.subtitle}</h4>
            <p style={styles.itemContent}>{item.content}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      style={{
        ...styles.section,
        backgroundColor: getBackgroundColor(index),
      }}
    >
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>{section.title}</h1>
          <h2 style={styles.subtitle}>{section.subtitle}</h2>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

const getBackgroundColor = (index: number): string => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  ];
  return colors[index % colors.length];
};

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    padding: '0 20px',
    zIndex: 1,
  },
  content: {
    textAlign: 'center' as const,
    color: 'black',
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
    fontWeight: '300',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  textContent: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    lineHeight: 1.6,
    maxWidth: '800px',
    margin: '0 auto',
    opacity: 0.9,
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  contentItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  itemTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  itemSubtitle: {
    fontSize: '1rem',
    fontWeight: '300',
    marginBottom: '1rem',
    opacity: 0.8,
  },
  itemContent: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    opacity: 0.9,
  },
};

export default ParallaxSection;
