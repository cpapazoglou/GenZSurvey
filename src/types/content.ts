export interface ContentItem {
  title: string;
  subtitle: string;
  content: string;
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  content: string | ContentItem[];
}

export interface SiteData {
  sections: Section[];
}
