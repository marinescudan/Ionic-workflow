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
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/tabs/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'explore',
        loadComponent: () =>
          import('./pages/tabs/explore/explore.page').then(m => m.ExplorePage),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/tabs/notifications/notifications.page').then(
            m => m.NotificationsPage
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/tabs/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'chapters',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/tabs/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'explore',
    loadComponent: () => import('./pages/tabs/explore/explore.page').then( m => m.ExplorePage)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./pages/tabs/notifications/notifications.page').then( m => m.NotificationsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/tabs/profile/profile.page').then( m => m.ProfilePage)
  },

];
