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
import { CHAPTER_08_DATA } from './data/chapter-08-ngrx';
import { CHAPTER_09_DATA } from './data/chapter-09.data';
import { CHAPTER_10_DATA } from './data/chapter-10.data';
import { CHAPTER_11_DATA } from './data/chapter-11.data';
import { CHAPTER_12_DATA } from './data/chapter-12.data';
import { CHAPTER_13_DATA } from './data/chapter-13.data';
import { CHAPTER_14_DATA } from './data/chapter-14.data';
import { CHAPTER_15_DATA } from './data/chapter-15.data';

export const CHAPTERS_DATA: Chapter[] = [
  CHAPTER_01_DATA,  // Getting Started
  CHAPTER_02_DATA,  // Components Library
  CHAPTER_03_DATA,  // Demo Playground
  CHAPTER_04_DATA,  // Progress Tracking
  CHAPTER_05_DATA,  // RxJS
  CHAPTER_06_DATA,  // Navigation & Routing
  CHAPTER_07_DATA,  // Forms & Validation
  CHAPTER_08_DATA,  // NgRx State Management
  CHAPTER_09_DATA,  // HTTP & API Integration
  CHAPTER_10_DATA,  // Real-time with WebSockets
  CHAPTER_11_DATA,  // GraphQL with Apollo Client
  CHAPTER_12_DATA,  // Internationalization & Localization
  CHAPTER_13_DATA,  // WebRTC - Video & Audio Calls
  CHAPTER_14_DATA,  // Native Device APIs - Camera
  CHAPTER_15_DATA,  // Audio Recording & File System
  {
    id: 16,
    title: 'Local Database - SQLite',
    description: '...',
    icon: 'checkmark-done-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
  {
    id: 17,
    title: 'Offline-First Architecture',
    description: '...',
    icon: 'checkmark-done-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
  {
    id: 18,
    title: 'Testing Strategies',
    description: 'Unit, integration, and E2E testing',
    icon: 'checkmark-done-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
  {
    id: 19,
    title: 'Production & Deployment',
    description: 'Build, optimize, and deploy to stores',
    icon: 'rocket-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },
];
