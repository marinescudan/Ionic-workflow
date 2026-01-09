// src/app/services/chapters/chapters.constants.ts
// AGGREGATOR FILE - Imports all chapter data

import { Chapter } from '@app/models/chapter.model';
import { CHAPTER_01_DATA } from './data/chapter-01-setup';
import { CHAPTER_02_DATA } from './data/chapter-02-components';
import { CHAPTER_03_DATA } from './data/chapter-03-demo';
import { CHAPTER_04_DATA } from './data/chapter-04-progress';
import { CHAPTER_05_DATA } from './data/chapter-05-rxjs';
import { CHAPTER_06_DATA } from './data/chapter-06-navigation';
import { CHAPTER_07_DATA } from './data/chapter-07-forms';

export const CHAPTERS_DATA: Chapter[] = [
  CHAPTER_01_DATA,  // Getting Started
  CHAPTER_02_DATA,  // Components Library
  CHAPTER_03_DATA,  // Demo Playground
  CHAPTER_04_DATA,  // Progress Tracking
  CHAPTER_05_DATA,  // RxJS
  CHAPTER_06_DATA,  // Navigation & Routing
  CHAPTER_07_DATA,  // Forms & Validation

  {
    id: 8,
    title: 'NgRx State Management',
    description: 'Enterprise-scale state with actions, reducers, and effects',
    icon: 'layers-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
  {
    id: 9,
    title: 'HTTP & REST APIs',
    description: 'Integrate with backend APIs using HttpClient',
    icon: 'cloud-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
  {
    id: 10,
    title: 'Real-time with WebSockets',
    description: 'Build live features with Socket.io',
    icon: 'flash-outline',
    category: 'advanced',
    completed: false,
    hasDemo: true,
    sections: [],
  },
  {
    id: 11,
    title: 'Native Camera API',
    description: 'Capture and upload photos with Capacitor',
    icon: 'camera-outline',
    category: 'expert',
    completed: false,
    hasDemo: true,
    sections: [],
  },
  {
    id: 12,
    title: 'Audio & File Management',
    description: 'Record audio and manage files with Capacitor',
    icon: 'musical-notes-outline',
    category: 'expert',
    completed: false,
    hasDemo: true,
    sections: [],
  },
  {
    id: 13,
    title: 'SQLite Database',
    description: 'Local database with SQLite',
    icon: 'server-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
  {
    id: 14,
    title: 'Offline-First Architecture',
    description: 'Build apps that work offline',
    icon: 'cloud-offline-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
  {
    id: 15,
    title: 'Testing Strategies',
    description: 'Unit, integration, and E2E testing',
    icon: 'checkmark-done-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
  {
    id: 16,
    title: 'Production & Deployment',
    description: 'Build, optimize, and deploy to stores',
    icon: 'rocket-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
];
