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
import { CHAPTER_16_DATA } from './data/chapter-16.data';
import { CHAPTER_17_DATA } from './data/chapter-17.data';
import { CHAPTER_18_DATA } from './data/chapter-18.data';

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
  CHAPTER_16_DATA,  // Local Database - SQLite
  CHAPTER_17_DATA,  // Offline-First Architecture
  CHAPTER_18_DATA,  // Testing Strategies
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
  {
    id: 20,
    title: 'Styling, Branding & Theming',
    description: 'Master advanced styling with Ionic theming, CSS variables, dark mode, custom branding, responsive design, and animation patterns',
    icon: 'brush-outline',
    category: 'intermediate',
    completed: false,
    hasDemo: true,
    sections: [],
  },
  {
    id: 21,
    title: 'Web & Mobile Security',
    description: 'Master authentication, secure storage, API security, XSS/CSRF prevention, biometric auth, and protect your Ionic app from common vulnerabilities',
    icon: 'shield-outline',
    category: 'expert',
    completed: false,
    hasDemo: true,
    sections: [],
  }
];
