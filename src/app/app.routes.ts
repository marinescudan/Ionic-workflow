import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chapters',
    loadComponent: () => import('./pages/chapters/chapters.page').then(m => m.ChaptersPage),
  },
  {
    path: 'chapters/:id',
    loadComponent: () => import('./pages/chapters/chapter-detail/chapter-detail.page')
      .then(m => m.ChapterDetailPage),
  },
  {
    path: 'demo/:chapterId',
    loadComponent: () => import('./pages/demo/demo.page').then(m => m.DemoPage),
  },
  {
    path: 'progress',
    loadComponent: () => import('./pages/progress/progress.page').then(m => m.ProgressPage),
  },
  {
    path: '',
    redirectTo: 'chapters',
    pathMatch: 'full',
  },
];
