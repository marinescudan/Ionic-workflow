/*
💡 INTERVIEW TIP:
- Interfaces define structure (no runtime code)
- Strong typing catches errors at compile time
- Makes code self-documenting
- IDE autocomplete works perfectly
*/

export interface Chapter {
  id: number;
  title: string;
  description: string;
  icon: string; // ionicon name
  category: ChapterCategory;
  sections: Section[];
  completed: boolean;
  hasDemo: boolean; // Does this chapter have a live demo?
}

export type ChapterCategory =
  | 'foundation'
  | 'components'
  | 'navigation'
  | 'state'
  | 'advanced'
  | 'native';

export interface Section {
  id: number;
  title: string;
  content: string; // HTML content with explanations
  codeSnippets: CodeSnippet[];
  interviewTips?: string[]; // Interview preparation tips
  // Fields for bookmarking
  bookmarked?: boolean;
  bookmarkId?: string;
}

export interface CodeSnippet {
  id: number;
  language: 'typescript' | 'html' | 'scss' | 'bash';
  code: string;
  title: string;
  description?: string;
  copyable: boolean; // Can user copy this snippet?
}
