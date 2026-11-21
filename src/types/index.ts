export type SupportedLanguage = 'en' | 'am' | 'om' | 'so' | 'ti' | 'aa';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flagCode?: string;
}

export type UserRole = 'worker' | 'employer';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}
