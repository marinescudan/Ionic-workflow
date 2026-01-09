// src/app/services/progress/data/achievements.constants.ts
// API-ready constant - achievement definitions

import { Achievement } from '@app/models/progress.model';
import { Chapter } from '@app/models/chapter.model';
import { ProgressData } from '@app/models/progress.model';

/**
 * Achievement definition with condition function
 * Note: When migrating to API, metadata comes from server,
 * but conditions remain client-side for performance
 */
export interface AchievementDefinition extends Achievement {
  condition: (progress: ProgressData, chapters: Chapter[]) => boolean;
}

/**
 * All available achievements in the application
 */
export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first-chapter',
    name: 'First Steps',
    description: 'Complete your first chapter',
    icon: 'trophy',
    color: 'warning',
    condition: (p) => p.completedChapters.length >= 1,
  },
  {
    id: 'five-chapters',
    name: 'Getting Serious',
    description: 'Complete 5 chapters',
    icon: 'medal',
    color: 'primary',
    condition: (p) => p.completedChapters.length >= 5,
  },
  {
    id: 'week-streak',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: 'flame',
    color: 'danger',
    condition: (p) => p.streak.current >= 7,
  },
  {
    id: 'all-fundamentals',
    name: 'Fundamentals Master',
    description: 'Complete all fundamentals chapters',
    icon: 'book',
    color: 'success',
    condition: (p, chapters) => {
      const fundamentalsChapters = chapters.filter(c => c.category === 'fundamentals');
      return fundamentalsChapters.length > 0 &&
        fundamentalsChapters.every(c => p.completedChapters.includes(c.id));
    },
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Add 5 bookmarks',
    icon: 'bookmark',
    color: 'tertiary',
    condition: (p) => p.bookmarks.length >= 5,
  },
  {
    id: 'time-dedicated',
    name: 'Dedicated Learner',
    description: 'Spend 60 minutes learning',
    icon: 'time',
    color: 'secondary',
    condition: (p) => p.timeTracking.totalMinutes >= 60,
  },
];
