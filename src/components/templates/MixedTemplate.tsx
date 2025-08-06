'use client';

import React from 'react';
import { MixedSection, HeroSection, MultipleQuotesSection, TextSection, DemographicsSection, SingleQuoteSection } from '@/types/content';
import HeroTemplate from './HeroTemplate';
import MultipleQuotesTemplate from './MultipleQuotesTemplate';
import TextTemplate from './TextTemplate';
import DemographicsTemplate from './DemographicsTemplate';
import SingleQuoteTemplate from './SingleQuoteTemplate';

interface MixedTemplateProps {
  section: MixedSection;
  type?: string; // Optional type prop for consistency with other templates
}

type ChildSection = HeroSection | MultipleQuotesSection | TextSection | DemographicsSection | SingleQuoteSection;

const MixedTemplate: React.FC<MixedTemplateProps> = ({ section, type }) => {
  const renderChild = (child: ChildSection, index: number) => {
    switch (child.template) {
      case 'hero':
        return <HeroTemplate key={`${child.id}-${index}`} section={child} type={type} />;
      case 'multiple-quotes':
        return <MultipleQuotesTemplate key={`${child.id}-${index}`} section={child} type={type} />;
      case 'text':
        return <TextTemplate key={`${child.id}-${index}`} section={child} type={type} />;
      case 'demographics':
        return <DemographicsTemplate key={`${child.id}-${index}`} section={child} type={type} />;
      case 'single-quote':
        return <SingleQuoteTemplate key={`${child.id}-${index}`} section={child} type={type} />;
    }
  };

  return section.children.map((child, index) => renderChild(child, index));
};

export default MixedTemplate;
