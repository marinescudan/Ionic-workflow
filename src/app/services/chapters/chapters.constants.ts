// src/app/services/chapters/chapters.constants.ts

import { Chapter } from '../../models/chapter.model';

export const CHAPTERS_DATA: Chapter[] = [
  // LESSON 1: Ionic Workflow Meta App
  {
    id: 1,
    title: 'Getting Started with Ionic',
    description: 'Learn Ionic basics, project setup, and core concepts',
    icon: 'rocket-outline',
    category: 'foundation',
    completed: false,
    hasDemo: false,
    sections: [
      {
        id: 1,
        title: 'What is Ionic?',
        content: `
          <h2>What is Ionic?</h2>
          <p>Ionic is an open-source UI toolkit for building high-quality cross-platform mobile apps using web technologies (HTML, CSS, JavaScript).</p>

          <h3>Key Benefits:</h3>
          <ul>
            <li><strong>Write Once, Run Everywhere:</strong> Build for iOS, Android, and Web from a single codebase</li>
            <li><strong>Web Technologies:</strong> Use familiar HTML, CSS, and TypeScript</li>
            <li><strong>Native Performance:</strong> Access device features via Capacitor</li>
            <li><strong>Platform-Adaptive:</strong> UI automatically matches iOS/Android design guidelines</li>
            <li><strong>Rich Component Library:</strong> 100+ pre-built UI components</li>
          </ul>

          <h3>Ionic vs Other Frameworks:</h3>
          <table>
            <tr>
              <th>Feature</th>
              <th>Ionic</th>
              <th>React Native</th>
              <th>Flutter</th>
            </tr>
            <tr>
              <td>Language</td>
              <td>TypeScript/JS</td>
              <td>JavaScript</td>
              <td>Dart</td>
            </tr>
            <tr>
              <td>UI Rendering</td>
              <td>Web Components</td>
              <td>Native Components</td>
              <td>Custom Engine</td>
            </tr>
            <tr>
              <td>Learning Curve</td>
              <td>Low (web devs)</td>
              <td>Medium</td>
              <td>High (new language)</td>
            </tr>
          </table>
        `,
        codeSnippets: [
          {
            id: 1,
            language: 'bash',
            title: 'Install Ionic CLI',
            code: `# Install Ionic CLI globally
npm install -g @ionic/cli

# Verify installation
ionic --version`,
            description: 'Global installation enables the "ionic" command in your terminal',
            copyable: true,
          },
          {
            id: 2,
            language: 'bash',
            title: 'Create New Project',
            code: `# Create blank Ionic Angular project
ionic start my-app blank --type=angular --capacitor

# Navigate into project
cd my-app

# Start development server
ionic serve`,
            description: 'Creates a new project and starts live-reload dev server',
            copyable: true,
          },
        ],
        interviewTips: [
          'Ionic is a UI framework, Capacitor is the native bridge - know the difference',
          'Ionic 7+ uses Web Components (framework agnostic)',
          'Can use with Angular, React, Vue, or vanilla JS',
          'Cordova is legacy - modern apps use Capacitor',
        ],
      },
      {
        id: 2,
        title: 'Project Structure',
        content: `
          <h2>Understanding Ionic Project Structure</h2>
          <p>A typical Ionic Angular project follows this structure:</p>

          <pre><code class="language-bash">ionic-app/
├── src/
│   ├── app/                 # Application code
│   │   ├── pages/          # Page components
│   │   ├── services/       # Business logic
│   │   ├── models/         # TypeScript interfaces
│   │   ├── components/     # Reusable components
│   │   ├── app.component.ts
│   │   └── app.routes.ts   # Routing config
│   ├── assets/             # Static files (images, fonts)
│   ├── theme/              # Global styles
│   │   └── variables.scss  # CSS custom properties
│   ├── index.html          # HTML entry point
│   └── main.ts             # TypeScript entry point
├── capacitor.config.ts     # Native configuration
├── ionic.config.json       # Ionic CLI config
├── angular.json            # Angular CLI config
└── tsconfig.json           # TypeScript config</code></pre>

          <h3>Key Files Explained:</h3>
          <ul>
            <li><strong>main.ts:</strong> Bootstraps the Angular application</li>
            <li><strong>app.routes.ts:</strong> Defines navigation routes</li>
            <li><strong>capacitor.config.ts:</strong> Native platform settings</li>
            <li><strong>variables.scss:</strong> Theme colors and CSS variables</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 3,
            language: 'typescript',
            title: 'main.ts - Application Bootstrap',
            code: `import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
  ],
});`,
            description: 'Entry point that initializes the Angular + Ionic app',
            copyable: true,
          },
        ],
        interviewTips: [
          'No app.module.ts in modern Ionic - uses standalone components',
          'IonicRouteStrategy caches pages for better navigation performance',
          'Lazy loading splits code into chunks (faster initial load)',
        ],
      },
    ],
  },

  // LESSON 2: Chapter Detail Viewer
  {
    id: 2,
    title: 'Ionic Components Library',
    description: 'Master buttons, cards, lists, and 100+ UI components',
    icon: 'grid-outline',
    category: 'components',
    completed: false,
    hasDemo: true,
    sections: [
      {
        id: 3,
        title: 'IonButton',
        content: `
          <h2>IonButton Component</h2>
          <p>Buttons are interactive elements that users tap to trigger actions. Ionic provides highly customizable buttons with multiple variants.</p>

          <h3>Button Properties:</h3>
          <ul>
            <li><strong>expand:</strong> 'block' (full width), 'full' (no border radius)</li>
            <li><strong>fill:</strong> 'solid' (default), 'outline', 'clear'</li>
            <li><strong>size:</strong> 'small', 'default', 'large'</li>
            <li><strong>color:</strong> 'primary', 'secondary', 'success', 'warning', 'danger'</li>
            <li><strong>shape:</strong> 'round' (rounded edges)</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 4,
            language: 'html',
            title: 'Button Variants',
            code: `<!-- Default solid button -->
<ion-button>Default</ion-button>

<!-- Block button (full width) -->
<ion-button expand="block">Block Button</ion-button>

<!-- Outline button -->
<ion-button fill="outline">Outline</ion-button>

<!-- Clear button (no background) -->
<ion-button fill="clear">Clear</ion-button>

<!-- Button with icon -->
<ion-button>
  <ion-icon name="star" slot="start"></ion-icon>
  Favorite
</ion-button>

<!-- Different colors -->
<ion-button color="success">Success</ion-button>
<ion-button color="warning">Warning</ion-button>
<ion-button color="danger">Danger</ion-button>`,
            copyable: true,
          },
          {
            id: 5,
            language: 'typescript',
            title: 'Button Click Handler',
            code: `import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-example',
  template: \`
    <ion-button (click)="handleClick()">
      Click Me
    </ion-button>
  \`,
  standalone: true,
  imports: [IonButton],
})
export class ExampleComponent {
  handleClick() {
    console.log('Button clicked!');
    // Add your logic here
  }
}`,
            copyable: true,
          },
        ],
        interviewTips: [
          'Buttons automatically adapt to platform (iOS rounded, Android sharp)',
          'Use fill="outline" for secondary actions',
          'slot="start" puts icon on left, slot="end" on right',
        ],
      },
      {
        id: 4,
        title: 'IonCard',
        content: `
          <h2>IonCard Component</h2>
          <p>Cards are containers that display grouped, related content. They're one of the most versatile UI patterns.</p>

          <h3>Card Structure:</h3>
          <ul>
            <li><strong>ion-card:</strong> Container element</li>
            <li><strong>ion-card-header:</strong> Top section (title, subtitle)</li>
            <li><strong>ion-card-content:</strong> Main content area</li>
            <li><strong>button attribute:</strong> Makes entire card tappable</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 6,
            language: 'html',
            title: 'Complete Card Example',
            code: `<ion-card>
  <img src="assets/image.jpg" alt="Card image" />

  <ion-card-header>
    <ion-card-title>Card Title</ion-card-title>
    <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
  </ion-card-header>

  <ion-card-content>
    This is the main content area of the card.
    Add any text, images, or components here.
  </ion-card-content>

  <ion-button fill="clear">Action</ion-button>
</ion-card>`,
            copyable: true,
          },
        ],
        interviewTips: [
          'Cards use elevation (shadow) on Android, border on iOS',
          'button attribute adds Material Design ripple effect',
          'Cards are great for list items with rich content',
        ],
      },
    ],
  },

  // LESSON 3: Demo Playground
  {
    id: 3,
    title: 'Interactive Demo Playground',
    description: 'Live component demos with real-time property editing',
    icon: 'construct-outline',
    category: 'components',
    completed: false,
    hasDemo: true,
    sections: [],
  },

  // LESSON 4: Progress Tracking
  {
    id: 4,
    title: 'Progress Tracking & Analytics',
    description: 'Track learning progress with statistics, streaks, and bookmarks',
    icon: 'analytics-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },

  // LESSON 5: RxJS Deep Dive
  {
    id: 5,
    title: 'RxJS & Reactive Programming',
    description: 'Master observables, operators, and reactive patterns',
    icon: 'git-network-outline',
    category: 'foundation',
    completed: false,
    hasDemo: true,
    sections: [
      {
        id: 11,
        title: 'What is RxJS?',
        content: `
          <h2>What is RxJS?</h2>
          <p>RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using Observables.</p>

          <h3>Observable vs Promise</h3>
          <table>
            <tr><th>Feature</th><th>Promise</th><th>Observable</th></tr>
            <tr><td>Values</td><td>Single</td><td>Multiple over time</td></tr>
            <tr><td>Execution</td><td>Eager</td><td>Lazy</td></tr>
            <tr><td>Cancellable</td><td>No</td><td>Yes</td></tr>
          </table>
        `,
        codeSnippets: [
          {
            id: 101,
            language: 'typescript',
            title: 'Promise vs Observable',
            code: `// Promise: Single value, eager
const promise = fetch('/api/data');
promise.then(data => console.log(data));

// Observable: Multiple values, lazy
const observable = new Observable(subscriber => {
  subscriber.next(1);
  setTimeout(() => subscriber.next(2), 1000);
});
observable.subscribe(value => console.log(value));`,
            copyable: true,
          },
        ],
        interviewTips: [
          'Observable is lazy - nothing happens until subscribe()',
          'Observables can emit 0 to infinite values',
          'Use async pipe in Angular to auto-unsubscribe',
        ],
      },
    ],
  },

  // LESSON 6: Navigation & Routing
  {
    id: 6,
    title: 'Navigation & Routing',
    description: 'Master tabs, modals, guards, and navigation patterns',
    icon: 'navigate-outline',
    category: 'navigation',
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

          <h3>When to Use Each</h3>
          <table>
            <tr>
              <th>Scenario</th>
              <th>Use Router</th>
              <th>Use NavController</th>
            </tr>
            <tr>
              <td>Route definitions</td>
              <td>âœ…</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Lazy loading</td>
              <td>âœ…</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Custom animations</td>
              <td>❌</td>
              <td>âœ…</td>
            </tr>
            <tr>
              <td>Programmatic nav</td>
              <td>âœ…</td>
              <td>âœ… (Better)</td>
            </tr>
          </table>
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
}

// Navigate with state (hidden from URL)
openWithData() {
  this.router.navigate(['/details'], {
    state: { data: { user: 'John' } }
  });
}`,
            description: 'Standard Angular Router for URL-based navigation',
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
  this.navCtrl.navigateForward('/page', {
    animated: true,
    animationDirection: 'forward'
  });
}

// Back navigation (pop from stack)
goBack() {
  this.navCtrl.navigateBack('/previous');
}

// Root navigation (clear stack)
goToRoot() {
  this.navCtrl.navigateRoot('/home');
}

// Pop to root
popToRoot() {
  this.navCtrl.pop(); // Pop current page
}`,
            description: 'Ionic NavController for stack-based navigation with animations',
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
        title: 'Route Parameters & Query Params',
        content: `
          <h2>Passing Data via Routes</h2>
          <p>Three ways to pass data between pages in Angular.</p>

          <h3>1. Route Parameters</h3>
          <ul>
            <li><strong>URL:</strong> /chapters/:id â†' /chapters/123</li>
            <li><strong>Required:</strong> Must provide value</li>
            <li><strong>Use for:</strong> Primary entity IDs</li>
          </ul>

          <h3>2. Query Parameters</h3>
          <ul>
            <li><strong>URL:</strong> /search?q=ionic&filter=new</li>
            <li><strong>Optional:</strong> Can be omitted</li>
            <li><strong>Use for:</strong> Filters, search terms</li>
          </ul>

          <h3>3. Router State</h3>
          <ul>
            <li><strong>URL:</strong> Hidden (not in URL)</li>
            <li><strong>Temporary:</strong> Lost on refresh</li>
            <li><strong>Use for:</strong> Complex objects, sensitive data</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 203,
            language: 'typescript',
            title: 'Define Routes with Parameters',
            code: `// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chapters',
    loadComponent: () => import('./pages/chapters/chapters.page')
      .then(m => m.ChaptersPage)
  },
  {
    path: 'chapters/:id', // Route parameter
    loadComponent: () => import('./pages/chapter-detail/chapter-detail.page')
      .then(m => m.ChapterDetailPage)
  },
  {
    path: 'search', // Query params handled automatically
    loadComponent: () => import('./pages/search/search.page')
      .then(m => m.SearchPage)
  }
];`,
            copyable: true,
          },
          {
            id: 204,
            language: 'typescript',
            title: 'Read Route Parameters',
            code: `import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class ChapterDetailPage implements OnInit {
  chapterId?: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Read route parameter
    this.route.params.subscribe(params => {
      this.chapterId = +params['id']; // + converts string to number
      this.loadChapter(this.chapterId);
    });

    // Read query parameters
    this.route.queryParams.subscribe(params => {
      const filter = params['filter'];
      const search = params['q'];
    });

    // Read router state
    const state = history.state;
    if (state.data) {
      console.log('Received data:', state.data);
    }
  }
}`,
            description: 'ActivatedRoute provides access to route parameters',
            copyable: true,
          },
        ],
        interviewTips: [
          'Route params are required, query params are optional',
          'Query params good for filters (keep in URL for sharing)',
          'Router state for temporary data (not in URL)',
          'Always unsubscribe or use async pipe',
        ],
      },
      {
        id: 22,
        title: 'Route Guards',
        content: `
          <h2>Protecting Routes with Guards</h2>
          <p>Guards control access to routes based on conditions.</p>

          <h3>Guard Types</h3>
          <ul>
            <li><strong>CanActivate:</strong> Can user enter this route?</li>
            <li><strong>CanDeactivate:</strong> Can user leave this route?</li>
            <li><strong>CanLoad:</strong> Should lazy module load?</li>
            <li><strong>Resolve:</strong> Pre-fetch data before route activates</li>
          </ul>

          <h3>Common Use Cases</h3>
          <ul>
            <li><strong>Authentication:</strong> Require login for protected pages</li>
            <li><strong>Authorization:</strong> Check user permissions/roles</li>
            <li><strong>Unsaved Changes:</strong> Warn before leaving form</li>
            <li><strong>Data Loading:</strong> Prevent blank pages</li>
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
};

/*
💡 INTERVIEW: Functional Guards (Angular 15+)
- Simpler than class-based guards
- Use inject() to get services
- Return boolean or Observable<boolean>
- Can be async
*/`,
            description: 'Functional guard checks authentication status',
            copyable: true,
          },
          {
            id: 206,
            language: 'typescript',
            title: 'CanDeactivate - Unsaved Changes',
            code: `// guards/unsaved-changes.guard.ts
import { inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const unsavedChangesGuard = async (
  component: CanComponentDeactivate
) => {
  const alertCtrl = inject(AlertController);

  if (component.canDeactivate()) {
    return true;
  }

  const alert = await alertCtrl.create({
    header: 'Unsaved Changes',
    message: 'You have unsaved changes. Discard them?',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      { text: 'Discard', role: 'destructive' }
    ]
  });

  await alert.present();
  const { role } = await alert.onDidDismiss();
  return role === 'destructive';
};`,
            description: 'Warns user about unsaved changes before leaving',
            copyable: true,
          },
          {
            id: 207,
            language: 'typescript',
            title: 'Apply Guards to Routes',
            code: `// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { unsavedChangesGuard } from '@guards/unsaved-changes.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page')
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page'),
    canActivate: [authGuard] // Must be logged in
  },
  {
    path: 'profile/edit',
    loadComponent: () => import('./pages/profile-edit/profile-edit.page'),
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard] // Warn on unsaved
  }
];`,
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
        id: 23,
        title: 'Lazy Loading Routes',
        content: `
          <h2>Optimize Bundle Size with Lazy Loading</h2>
          <p>Load routes on-demand instead of upfront.</p>

          <h3>Benefits</h3>
          <ul>
            <li><strong>Smaller initial bundle:</strong> Faster app startup</li>
            <li><strong>On-demand loading:</strong> Only load what's needed</li>
            <li><strong>Better caching:</strong> Chunks cached separately</li>
            <li><strong>Easier code splitting:</strong> Automatic by Angular</li>
          </ul>

          <h3>When to Use</h3>
          <ul>
            <li>âœ… Large features (admin panel, reports)</li>
            <li>âœ… Infrequently used pages</li>
            <li>âœ… Heavy dependencies (charts, editors)</li>
            <li>❌ Don't lazy load: home, critical paths</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 208,
            language: 'typescript',
            title: 'Lazy Load Routes',
            code: `// app.routes.ts
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page')
      .then(m => m.HomePage)
    // Lazy: Loaded when user navigates to /home
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES),
    canLoad: [adminGuard] // Only load if admin
    // Lazy: Entire admin module loaded on first access
  }
];

// pages/admin/admin.routes.ts
export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminDashboard },
  { path: 'users', component: UserManagement },
  { path: 'settings', component: AdminSettings }
];`,
            description: 'loadComponent for single page, loadChildren for feature module',
            copyable: true,
          },
          {
            id: 209,
            language: 'bash',
            title: 'Verify Bundle Splitting',
            code: `# Build for production
ionic build --prod

# Check output
# dist/
#   ├── main.js (core app)
#   ├── 123.js (home page chunk)
#   ├── 456.js (admin module chunk)
#   └── 789.js (another lazy chunk)

# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/stats.json`,
            description: 'Each lazy route creates separate bundle file',
            copyable: true,
          },
        ],
        interviewTips: [
          'Lazy loading is default in modern Angular',
          'Each lazy route = separate bundle',
          'Use CanLoad guard to prevent loading',
          'Preload strategy for critical routes',
        ],
      },
      {
        id: 24,
        title: 'Tab Navigation',
        content: `
          <h2>Bottom Tab Navigation</h2>
          <p>Classic mobile pattern with persistent bottom tabs.</p>

          <h3>Tab Characteristics</h3>
          <ul>
            <li><strong>Persistent:</strong> Always visible at bottom</li>
            <li><strong>Independent Stacks:</strong> Each tab has own navigation</li>
            <li><strong>State Preservation:</strong> Tabs remember scroll position</li>
            <li><strong>Active Indicator:</strong> Shows current tab</li>
          </ul>

          <h3>Best Practices</h3>
          <ul>
            <li>3-5 tabs maximum</li>
            <li>Most important features in tabs</li>
            <li>Use icons + labels</li>
            <li>Active tab visually distinct</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 210,
            language: 'typescript',
            title: 'Tab Routes Configuration',
            code: `// pages/tabs/tabs.routes.ts
import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page')
          .then(m => m.HomePage)
      },
      {
        path: 'explore',
        loadComponent: () => import('./explore/explore.page')
          .then(m => m.ExplorePage)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./notifications/notifications.page')
          .then(m => m.NotificationsPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page')
          .then(m => m.ProfilePage)
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
          {
            id: 211,
            language: 'typescript',
            title: 'Tabs Page Component',
            code: `// pages/tabs/tabs.page.ts
import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, compass, notifications, person } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge
  ]
})
export class TabsPage {
  notificationCount = 5;

  constructor() {
    addIcons({ home, compass, notifications, person });
  }
}`,
            copyable: true,
          },
          {
            id: 212,
            language: 'html',
            title: 'Tabs Page Template',
            code: `<!-- pages/tabs/tabs.page.html -->
<ion-tabs>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="home">
      <ion-icon name="home"></ion-icon>
      <ion-label>Home</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="explore">
      <ion-icon name="compass"></ion-icon>
      <ion-label>Explore</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="notifications">
      <ion-icon name="notifications"></ion-icon>
      <ion-label>Notifications</ion-label>
      <ion-badge *ngIf="notificationCount > 0">
        {{ notificationCount }}
      </ion-badge>
    </ion-tab-button>

    <ion-tab-button tab="profile">
      <ion-icon name="person"></ion-icon>
      <ion-label>Profile</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</ion-tabs>`,
            copyable: true,
          },
        ],
        interviewTips: [
          'Each tab has independent navigation stack',
          'Use ion-badge for notifications',
          'slot="bottom" for bottom tabs (default)',
          'Tab state preserved when switching',
        ],
      },
      {
        id: 25,
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

          <h3>When to Use Modals</h3>
          <ul>
            <li>âœ… Quick forms (add task, comment)</li>
            <li>âœ… Confirmations (delete, logout)</li>
            <li>âœ… Details (user profile, item info)</li>
            <li>❌ Don't use for: primary navigation</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 213,
            language: 'typescript',
            title: 'Open Modal',
            code: `import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormModalComponent } from '@components/modals/form-modal.component';

export class MyPage {
  constructor(private modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FormModalComponent,
      componentProps: {
        title: 'Add Task',
        data: { priority: 'high' }
      },
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
      backdropDismiss: true
    });

    await modal.present();

    // Wait for modal to close
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log('User submitted:', data);
    }
  }
}`,
            description: 'ModalController creates and manages modals',
            copyable: true,
          },
          {
            id: 214,
            language: 'typescript',
            title: 'Modal Component',
            code: `// components/modals/form-modal.component.ts
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-form-modal',
  template: \`
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cancel</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form [formGroup]="form">
        <ion-item>
          <ion-input formControlName="name" label="Name" labelPlacement="stacked"></ion-input>
        </ion-item>
      </form>

      <ion-button expand="block" (click)="submit()">
        Submit
      </ion-button>
    </ion-content>
  \`,
  standalone: true,
  imports: [ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonInput]
})
export class FormModalComponent {
  @Input() title = 'Form';
  @Input() data?: any;

  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['']
    });
  }

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    this.modalCtrl.dismiss(this.form.value, 'confirm');
  }
}`,
            copyable: true,
          },
        ],
        interviewTips: [
          'Pass data via componentProps',
          'Return data via dismiss(data, role)',
          'Use breakpoints for bottom sheets',
          'backdropDismiss for dismissible modals',
        ],
      },
      {
        id: 26,
        title: 'Deep Linking',
        content: `
          <h2>Deep Linking Configuration</h2>
          <p>Open app to specific pages via URL.</p>

          <h3>Use Cases</h3>
          <ul>
            <li><strong>App URLs:</strong> myapp://chapters/123</li>
            <li><strong>Universal Links:</strong> https://myapp.com/chapters/123</li>
            <li><strong>QR Codes:</strong> Scan to open content</li>
            <li><strong>Notifications:</strong> Tap to view details</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 215,
            language: 'typescript',
            title: 'Capacitor Deep Link Config',
            code: `// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionic.workflow',
  appName: 'Ionic Workflow',
  webDir: 'www',
  plugins: {
    DeepLinks: {
      // Custom URL scheme
      schemes: ['ionic-workflow'],
      // Universal links (iOS)
      associatedDomains: ['applinks:ionic-workflow.app'],
      // Android App Links
      intentFilters: [
        {
          action: 'VIEW',
          category: 'DEFAULT',
          category2: 'BROWSABLE',
          host: 'ionic-workflow.app'
        }
      ]
    }
  }
};

export default config;`,
            copyable: true,
          },
          {
            id: 216,
            language: 'typescript',
            title: 'Handle Deep Links',
            code: `// app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';

@Component({
  selector: 'app-root',
  template: '<ion-app><ion-router-outlet></ion-router-outlet></ion-app>'
})
export class AppComponent {
  constructor(private router: Router) {
    this.initDeepLinks();
  }

  initDeepLinks() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const url = event.url;
      console.log('Deep link:', url);

      // Parse URL
      // ionic-workflow://chapters/123
      const slug = url.split('.app').pop();

      if (slug) {
        this.router.navigateByUrl(slug);
      }
    });
  }
}`,
            copyable: true,
          },
        ],
        interviewTips: [
          'Custom schemes (myapp://) work on all platforms',
          'Universal links (https://) work without app installed',
          'Must configure iOS Associated Domains',
          'Must configure Android App Links',
        ],
      },
      {
        id: 27,
        title: 'Navigation Animations',
        content: `
          <h2>Custom Navigation Animations</h2>
          <p>Customize transitions between pages.</p>

          <h3>Animation Types</h3>
          <ul>
            <li><strong>iOS:</strong> Slide from right</li>
            <li><strong>Android:</strong> Material Design</li>
            <li><strong>Custom:</strong> Fade, scale, flip</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 217,
            language: 'typescript',
            title: 'Custom Animation',
            code: `import { Animation } from '@ionic/angular';
import { NavController } from '@ionic/angular';

export class MyPage {
  constructor(private navCtrl: NavController) {}

  navigateWithAnimation() {
    this.navCtrl.navigateForward('/page', {
      animation: (baseEl, opts) => {
        return customAnimation(baseEl, opts);
      }
    });
  }
}

function customAnimation(baseEl: any, opts: any): Animation {
  const enteringAnimation = baseEl
    .querySelector('.entering-page')
    .animate([
      { opacity: 0, transform: 'scale(0.8)' },
      { opacity: 1, transform: 'scale(1)' }
    ], {
      duration: 300,
      easing: 'ease-out'
    });

  return enteringAnimation;
}`,
            copyable: true,
          },
        ],
        interviewTips: [
          'Animations are platform-specific by default',
          'Custom animations use Web Animations API',
          'Keep animations under 300ms',
          'Test on real devices (not just browser)',
        ],
      },
    ],
  },

  // LESSON 7: Forms & Validation (Future)
  {
    id: 7,
    title: 'Forms & Validation',
    description: 'Build reactive forms with complex validation patterns',
    icon: 'create-outline',
    category: 'foundation',
    completed: false,
    hasDemo: true,
    sections: [],
  },

  // LESSON 8: NgRx Store (Future)
  {
    id: 8,
    title: 'NgRx State Management',
    description: 'Enterprise-scale state with actions, reducers, and effects',
    icon: 'layers-outline',
    category: 'state',
    completed: false,
    hasDemo: false,
    sections: [],
  },

  // LESSON 9: GraphQL (Future)
  {
    id: 9,
    title: 'GraphQL Integration',
    description: 'Query and mutate data with Apollo Client',
    icon: 'git-branch-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },

  // LESSON 10: Real-time (Future)
  {
    id: 10,
    title: 'Real-time with Socket.io',
    description: 'Build live chat and notifications',
    icon: 'flash-outline',
    category: 'advanced',
    completed: false,
    hasDemo: true,
    sections: [],
  },

  // LESSON 11: Camera (Future)
  {
    id: 11,
    title: 'Native Camera API',
    description: 'Capture and upload photos with Capacitor',
    icon: 'camera-outline',
    category: 'native',
    completed: false,
    hasDemo: true,
    sections: [],
  },

  // LESSON 12: Audio & Filesystem (Future)
  {
    id: 12,
    title: 'Audio & File Management',
    description: 'Record audio and manage files with Capacitor',
    icon: 'musical-notes-outline',
    category: 'native',
    completed: false,
    hasDemo: true,
    sections: [],
  },

  // LESSON 13: SQLite (Future)
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

  // LESSON 14: Offline-First (Future)
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

  // LESSON 15: Testing (Future)
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

  // LESSON 16: Production (Future)
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
