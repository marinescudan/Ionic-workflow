// src/app/services/chapters/data/chapter-06-navigation.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_06_DATA: Chapter = {
  id: 6,
  title: 'Navigation & Routing',
  description: 'Master tabs, modals, guards, and navigation patterns',
  icon: 'navigate-outline',
  category: 'intermediate',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 20,
      title: 'Angular Router vs Ionic NavController',
      content: `
        <h2>Navigation Approaches</h2>
        <p>Ionic apps use both Angular Router (URL-based) and NavController (stack-based) navigation.</p>

        <h3>Angular Router</h3>
        <ul>
          <li><strong>URL-based:</strong> Standard web routing with browser history</li>
          <li><strong>Lazy Loading:</strong> Load modules on-demand for better performance</li>
          <li><strong>Deep Linking:</strong> Direct navigation via URLs</li>
          <li><strong>Best for:</strong> Web apps, route definitions, guards</li>
        </ul>

        <h3>Ionic NavController</h3>
        <ul>
          <li><strong>Stack-based:</strong> Mobile-style navigation with page stack</li>
          <li><strong>Native Animations:</strong> Platform-specific transitions</li>
          <li><strong>Page Caching:</strong> Preserve page state in memory</li>
          <li><strong>Best for:</strong> Mobile apps, programmatic navigation</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 201,
          language: 'typescript',
          title: 'Router Navigation',
          code: `import { Router } from '@angular/router';

constructor(private router: Router) {}

// Navigate to route
navigateToChapter() {
  this.router.navigate(['/chapters', 123]);
}

// Navigate with query params
search() {
  this.router.navigate(['/search'], {
    queryParams: { q: 'ionic', filter: 'new' }
  });
}`,
          copyable: true,
        },
        {
          id: 202,
          language: 'typescript',
          title: 'NavController Navigation',
          code: `import { NavController } from '@ionic/angular';

constructor(private navCtrl: NavController) {}

// Forward navigation (push to stack)
goForward() {
  this.navCtrl.navigateForward('/page');
}

// Back navigation (pop from stack)
goBack() {
  this.navCtrl.navigateBack('/previous');
}

// Root navigation (clear stack)
goToRoot() {
  this.navCtrl.navigateRoot('/home');
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Router defines routes, NavController navigates them',
        'Use Router for route config and guards',
        'Use NavController for better mobile UX',
        'Both can be used together in same app',
      ],
    },
    {
      id: 21,
      title: 'Route Guards',
      content: `
        <h2>Protecting Routes with Guards</h2>
        <p>Guards control access to routes based on conditions.</p>

        <h3>Guard Types</h3>
        <ul>
          <li><strong>CanActivate:</strong> Can user enter this route?</li>
          <li><strong>CanDeactivate:</strong> Can user leave this route?</li>
          <li><strong>CanLoad:</strong> Should lazy module load?</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 205,
          language: 'typescript',
          title: 'CanActivate - Auth Guard',
          code: `// guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { map } from 'rxjs/operators';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Guards run before route activates',
        'Return false to block navigation',
        'Return Observable for async checks',
        'Multiple guards = all must pass',
      ],
    },
    {
      id: 22,
      title: 'Tab Navigation',
      content: `
        <h2>Bottom Tab Navigation</h2>
        <p>Classic mobile pattern with persistent bottom tabs.</p>

        <h3>Tab Characteristics</h3>
        <ul>
          <li><strong>Persistent:</strong> Always visible at bottom</li>
          <li><strong>Independent Stacks:</strong> Each tab has own navigation</li>
          <li><strong>State Preservation:</strong> Tabs remember scroll position</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 210,
          language: 'typescript',
          title: 'Tab Routes Configuration',
          code: `// pages/tabs/tabs.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page')
      },
      {
        path: 'explore',
        loadComponent: () => import('./explore/explore.page')
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Each tab has independent navigation stack',
        'Use ion-badge for notifications',
        'Tab state preserved when switching',
      ],
    },
    {
      id: 23,
      title: 'Modal Navigation',
      content: `
        <h2>Modal Overlays</h2>
        <p>Temporary overlays for focused tasks.</p>

        <h3>Modal Types</h3>
        <ul>
          <li><strong>Alert:</strong> Simple message with buttons</li>
          <li><strong>Form:</strong> Collect user input</li>
          <li><strong>Full-page:</strong> Immersive experience</li>
          <li><strong>Bottom Sheet:</strong> Mobile-style drawer</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 213,
          language: 'typescript',
          title: 'Open Modal',
          code: `import { ModalController } from '@ionic/angular';

async openModal() {
  const modal = await this.modalCtrl.create({
    component: FormModalComponent,
    componentProps: {
      title: 'Add Task',
      data: { priority: 'high' }
    },
    breakpoints: [0, 0.5, 1],
    initialBreakpoint: 0.5
  });

  await modal.present();
  const { data, role } = await modal.onWillDismiss();
  
  if (role === 'confirm') {
    console.log('User submitted:', data);
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Pass data via componentProps',
        'Return data via dismiss(data, role)',
        'Use breakpoints for bottom sheets',
      ],
    },
  ],
};
