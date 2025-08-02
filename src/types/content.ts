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
  layout?: 'row' | 'column';
}

export interface TextSection {
  id: string;
  template: 'text';
  text: string;
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
}

export interface SingleQuoteSection {
	id: string;
  template: 'single-quote';
  text: string;
}

export interface MixedSection {
  id: string;
  template: 'mixed';
  children: (HeroSection | MultipleQuotesSection | TextSection | DemographicsSection | SingleQuoteSection)[];
}

export type Section = HeroSection | MultipleQuotesSection | TextSection | DemographicsSection | SingleQuoteSection | MixedSection;

export interface SiteData {
  sections: Section[];
}
