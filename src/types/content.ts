export interface HeroSection {
  id: string;
  template: 'hero';
  title: string;
  subtitle: string;
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
}

export interface TextSection {
  id: string;
  template: 'text';
  text: string;
}

export interface DemographicsSection {
  id: string;
  template: 'demographics';
  image: string;
  text: string;
}

export interface SingleQuoteSection {
  id: string;
  template: 'single-quote';
  title: string;
  subtitle: string;
  caption: string;
}

export type Section = HeroSection | MultipleQuotesSection | TextSection | DemographicsSection | SingleQuoteSection;

export interface SiteData {
  sections: Section[];
}
