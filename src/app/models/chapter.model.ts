
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

// Progression-based category naming:
// fundamentals → essentials → intermediate → advanced → expert
export type ChapterCategory =
  | 'fundamentals'
  | 'essentials'
  | 'intermediate'
  | 'advanced'
  | 'expert';

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
  language: 'typescript' | 'html' | 'scss' | 'bash' | 'graphql' | 'yaml' | 'javascript';
  code: string;
  title: string;
  description?: string;
  copyable: boolean; // Can user copy this snippet?
}
