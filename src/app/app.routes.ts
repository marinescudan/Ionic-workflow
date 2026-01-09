import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { TABS_ROUTES } from '@app/pages/tabs/tabs/tabs.routes';

export const routes: Routes = [
  // Tabs (main navigation)
  ...TABS_ROUTES,

  // Chapters
  {
    path: 'chapters',
    loadComponent: () =>
      import('./pages/chapters/chapters.page').then(m => m.ChaptersPage),
  },
  {
    path: 'chapters/:id',
    loadComponent: () =>
      import('./pages/chapters/chapter-detail/chapter-detail.page').then(
        m => m.ChapterDetailPage
      ),
  },

  // Demo
  {
    path: 'demo/:chapterId',
    loadComponent: () => import('./pages/demo/demo.page').then(m => m.DemoPage),
  },

  // Progress (protected example)
  {
    path: 'progress',
    loadComponent: () =>
      import('./pages/progress/progress.page').then(m => m.ProgressPage),
    canActivate: [authGuard],
  },

  // Login
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },

  // Default redirect
  {
    path: '',
    redirectTo: 'chapters',
    pathMatch: 'full',
  },  {
    path: 'forms-demo',
    loadComponent: () => import('./pages/forms-demo/forms-demo.page').then( m => m.FormsDemoPage)
  },

];
