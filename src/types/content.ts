export interface HeroSection {
  id: string;
  template: 'hero';
  title: string;
  subtitle: string;
  animation?: string;
}

export interface MultipleQuotesChild {
  image: string;
  title: string;
  text: string;
}

export interface MultipleQuotesSection {
  id: string;
  template: 'multiple-quotes';
  children: MultipleQuotesChild[];
  layout?: 'row' | 'column';
  animation?: string;
}

export interface TextSection {
  id: string;
  template: 'text';
  text: string;
  animation?: string;
}

export interface DemographicsChild {
  image: string;
  title: string;
  text: string;
}

export interface DemographicsSection {
  id: string;
  template: 'demographics';
  children: DemographicsChild[];
  animation?: string;
}

export interface SingleQuoteSection {
  id: string;
  template: 'single-quote';
  text: string;
  animation?: string;
}

export interface MixedSection {
  id: string;
  template: 'mixed';
  children: (HeroSection | MultipleQuotesSection | TextSection | DemographicsSection | SingleQuoteSection)[];
  animation?: string;
}

export type Section = HeroSection | MultipleQuotesSection | TextSection | DemographicsSection | SingleQuoteSection | MixedSection;

export interface SiteData {
  sections: Section[];
}
