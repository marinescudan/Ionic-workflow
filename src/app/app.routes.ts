import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { TABS_ROUTES } from '@app/pages/tabs/tabs/tabs.routes';
import { NOTES_ROUTES } from '@app/features/notes/pages/notes.routes';

export const routes: Routes = [
  // Tabs (main navigation)
  ...TABS_ROUTES,

  // Notes feature routes
  ...NOTES_ROUTES,

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

  // Forms
  {
    path: 'forms-demo',
    loadComponent: () => import('./pages/forms-demo/forms-demo.page').then( m => m.FormsDemoPage)
  },

  // Default redirect
  {
    path: '',
    redirectTo: 'chapters',
    pathMatch: 'full',
  },
  {
    path: 'posts-list',
    loadComponent: () => import('./features/posts/pages/posts-list/posts-list.page').then( m => m.PostsListPage)
  },  {
    path: 'file-upload.page.ts',
    loadComponent: () => import('./features/files/pages/file-upload/file-upload.page.ts/file-upload.page.ts.page').then( m => m.FileUploadPageTsPage)
  },
  {
    path: 'file-upload',
    loadComponent: () => import('./features/files/pages/file-upload/file-upload/file-upload.page').then( m => m.FileUploadPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/pages/search/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'posts-list-v2',
    loadComponent: () => import('./features/posts/pages/posts-list-v2/posts-list-v2.page').then( m => m.PostsListV2Page)
  },




];
