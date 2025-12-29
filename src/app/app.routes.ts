import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'chapters',
    loadComponent: () => import('./chapters/chapters.page').then( m => m.ChaptersPage)
  },
  {
    path: 'chapter-detail',
    loadComponent: () => import('./chapter-detail/chapter-detail.page').then( m => m.ChapterDetailPage)
  },
  {
    path: 'demo',
    loadComponent: () => import('./demo/demo.page').then( m => m.DemoPage)
  },
  {
    path: 'progress',
    loadComponent: () => import('./progress/progress.page').then( m => m.ProgressPage)
  },
];
