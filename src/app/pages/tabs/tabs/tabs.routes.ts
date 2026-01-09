import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const TABS_ROUTES: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('@app/pages/tabs/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'explore',
        loadComponent: () =>
          import('@app/pages/tabs/explore/explore.page').then(m => m.ExplorePage),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('@app/pages/tabs/notifications/notifications.page').then(
            m => m.NotificationsPage
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('@app/pages/tabs/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
];
