export interface ProgressData {
  completedChapters: number[];
  bookmarks: Bookmark[];
  timeTracking: TimeTracking;
  streak: LearningStreak;
  lastUpdated: string; // ISO date string
  version: number; // For future migrations
}

export interface Bookmark {
  id: string; // UUID
  chapterId: number;
  sectionId: number;
  sectionTitle: string;
  chapterTitle: string;
  note?: string;
  createdAt: string; // ISO date string
}

export interface TimeTracking {
  totalMinutes: number;
  sessionStart?: string; // ISO date string
  dailyLog: Record<string, number>; // YYYY-MM-DD -> minutes
  weeklyGoalMinutes?: number;
}

export interface LearningStreak {
  current: number; // Current consecutive days
  longest: number; // Best streak ever
  lastActivityDate: string; // YYYY-MM-DD
  activeDays: string[]; // Array of YYYY-MM-DD dates
}

export interface ProgressStats {
  totalChapters: number;
  completedChapters: number;
  completionPercentage: number;
  totalTimeMinutes: number;
  averageTimePerChapter: number;
  currentStreak: number;
  longestStreak: number;
  todayMinutes: number;
  weekMinutes: number;
}

export interface CategoryProgress {
  category: string;
  total: number;
  completed: number;
  percentage: number;
}
