// src/app/services/chapters/chapters.constants.ts
// Chapter data extracted to dedicated file for:
// - Better separation of concerns (data vs logic)
// - Easier maintenance and updates
// - Reusability across components

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

  // LESSON 3: Demo Playground (Interactive Component Playground)
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

  // LESSON 4: Progress Tracking & Analytics
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

  // LESSON 5: RxJS Deep Dive (Full content from new lesson)
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
          <p>RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using Observables. It makes composing asynchronous or callback-based code easier.</p>

          <h3>Observable vs Promise</h3>
          <table>
            <tr>
              <th>Feature</th>
              <th>Promise</th>
              <th>Observable</th>
            </tr>
            <tr>
              <td>Values</td>
              <td>Single value</td>
              <td>Multiple values over time</td>
            </tr>
            <tr>
              <td>Execution</td>
              <td>Eager (starts immediately)</td>
              <td>Lazy (starts on subscribe)</td>
            </tr>
            <tr>
              <td>Cancellable</td>
              <td>No</td>
              <td>Yes (unsubscribe)</td>
            </tr>
            <tr>
              <td>Operators</td>
              <td>then(), catch()</td>
              <td>100+ operators (map, filter, etc.)</td>
            </tr>
          </table>

          <h3>Why Use RxJS?</h3>
          <ul>
            <li><strong>Declarative:</strong> Describe what you want, not how to do it</li>
            <li><strong>Composable:</strong> Chain operators for complex logic</li>
            <li><strong>Functional:</strong> Pure functions, no side effects</li>
            <li><strong>Powerful:</strong> Handle events, async data, state management</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 101,
            language: 'typescript',
            title: 'Promise vs Observable',
            code: `// Promise: Single value, eager
const promise = fetch('/api/data');
promise.then(data => console.log(data));
// HTTP request starts immediately

// Observable: Multiple values, lazy
const observable = new Observable(subscriber => {
  subscriber.next(1);
  setTimeout(() => subscriber.next(2), 1000);
  setTimeout(() => subscriber.next(3), 2000);
});
// Nothing happens until subscribe()

observable.subscribe(value => console.log(value));
// Now it starts: 1, 2 (after 1s), 3 (after 2s)`,
            copyable: true,
          },
        ],
        interviewTips: [
          'Observable is lazy - nothing happens until subscribe()',
          'Promises start executing immediately (eager)',
          'Observables can emit 0 to infinite values',
          'Use async pipe in Angular to auto-unsubscribe',
        ],
      },
      {
        id: 12,
        title: 'Creating Observables',
        content: `
          <h2>Creating Observables</h2>
          <p>RxJS provides many creation operators for different use cases.</p>

          <h3>Common Creation Operators</h3>
          <ul>
            <li><strong>of():</strong> Emit values from a list</li>
            <li><strong>from():</strong> Convert array/promise/iterable to Observable</li>
            <li><strong>interval():</strong> Emit numbers at intervals</li>
            <li><strong>timer():</strong> Emit after delay, then at intervals</li>
            <li><strong>fromEvent():</strong> Convert DOM events to Observable</li>
            <li><strong>new Observable():</strong> Custom Observable logic</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 103,
            language: 'typescript',
            title: 'Creation Operators',
            code: `import { of, from, interval, timer, fromEvent } from 'rxjs';

// of(): Emit fixed values
of(1, 2, 3).subscribe(x => console.log(x));
// Output: 1, 2, 3

// from(): Convert array to Observable
from([10, 20, 30]).subscribe(x => console.log(x));
// Output: 10, 20, 30

// interval(): Emit every N milliseconds
interval(1000).subscribe(x => console.log(x));
// Output: 0 (after 1s), 1 (after 2s), 2 (after 3s)...`,
            copyable: true,
          },
        ],
        interviewTips: [
          'of() and from() emit synchronously and complete',
          'interval() and timer() emit indefinitely (must unsubscribe)',
          'Always return cleanup function in custom Observables',
        ],
      },
      {
        id: 13,
        title: 'Subjects: Multicasting',
        content: `
          <h2>Subjects</h2>
          <p>Subjects are special Observables that can multicast to multiple subscribers.</p>

          <h3>Types of Subjects</h3>
          <ul>
            <li><strong>Subject:</strong> No initial value, emits to current subscribers only</li>
            <li><strong>BehaviorSubject:</strong> Requires initial value, emits current value to new subscribers</li>
            <li><strong>ReplaySubject:</strong> Replays N previous values to new subscribers</li>
            <li><strong>AsyncSubject:</strong> Only emits last value when completed</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 105,
            language: 'typescript',
            title: 'Subject vs BehaviorSubject',
            code: `import { Subject, BehaviorSubject } from 'rxjs';

// Subject: No initial value
const subject$ = new Subject<number>();

subject$.subscribe(x => console.log('Sub A:', x));
subject$.next(1); // Sub A: 1

subject$.subscribe(x => console.log('Sub B:', x));
subject$.next(2); // Sub A: 2, Sub B: 2
// Sub B did NOT receive 1

// BehaviorSubject: Requires initial value
const behavior$ = new BehaviorSubject<number>(0);

behavior$.subscribe(x => console.log('Sub A:', x)); // Sub A: 0
behavior$.next(1); // Sub A: 1

behavior$.subscribe(x => console.log('Sub B:', x)); // Sub B: 1 (current)
behavior$.next(2); // Sub A: 2, Sub B: 2`,
            copyable: true,
          },
        ],
        interviewTips: [
          'BehaviorSubject is most common for state management',
          'Always use .asObservable() to prevent external next() calls',
          'ReplaySubject uses more memory (stores history)',
        ],
      },
      {
        id: 14,
        title: 'Transformation Operators',
        content: `
          <h2>Transformation Operators</h2>
          <p>Transform values emitted by an Observable.</p>

          <h3>Essential Operators</h3>
          <ul>
            <li><strong>map:</strong> Transform each value</li>
            <li><strong>switchMap:</strong> Switch to new Observable, cancel previous</li>
            <li><strong>mergeMap:</strong> Run Observables concurrently</li>
            <li><strong>concatMap:</strong> Run Observables sequentially</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 108,
            language: 'typescript',
            title: 'map vs switchMap',
            code: `import { of, fromEvent } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// map: Transform value (synchronous)
of(1, 2, 3).pipe(
  map(x => x * 10)
).subscribe(x => console.log(x));
// Output: 10, 20, 30

// switchMap: Transform to Observable (async)
fromEvent(searchInput, 'input').pipe(
  map(event => event.target.value),
  switchMap(term => this.api.search(term))
).subscribe(results => {
  displayResults(results);
});`,
            copyable: true,
          },
        ],
        interviewTips: [
          'switchMap is most common (95% of use cases)',
          'Use switchMap for HTTP requests from user input',
          'mergeMap = concurrent, concatMap = sequential',
        ],
      },
      {
        id: 15,
        title: 'Combination Operators',
        content: `
          <h2>Combination Operators</h2>
          <p>Combine multiple Observables into one.</p>

          <h3>Key Operators</h3>
          <ul>
            <li><strong>combineLatest:</strong> Emit when any source emits</li>
            <li><strong>forkJoin:</strong> Emit once when all complete (like Promise.all)</li>
            <li><strong>merge:</strong> Emit from any source immediately</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 110,
            language: 'typescript',
            title: 'combineLatest vs forkJoin',
            code: `import { combineLatest, forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const user$ = of({ name: 'John' }).pipe(delay(100));
const settings$ = of({ theme: 'dark' }).pipe(delay(200));

// combineLatest: Emit when ANY source emits
combineLatest([user$, settings$]).subscribe(
  ([user, settings]) => {
    console.log('combineLatest:', { user, settings });
  }
);

// forkJoin: Emit ONCE when ALL complete
forkJoin([user$, settings$]).subscribe(
  ([user, settings]) => {
    console.log('forkJoin:', { user, settings });
  }
);`,
            copyable: true,
          },
        ],
        interviewTips: [
          'combineLatest waits for all sources to emit at least once',
          'forkJoin is like Promise.all (one-time)',
          'merge for events, combineLatest for state',
        ],
      },
      {
        id: 16,
        title: 'Filtering & Utility Operators',
        content: `
          <h2>Filtering & Utility Operators</h2>
          <p>Control which values pass through.</p>

          <h3>Essential Operators</h3>
          <ul>
            <li><strong>debounceTime:</strong> Wait for pause in emissions</li>
            <li><strong>distinctUntilChanged:</strong> Filter consecutive duplicates</li>
            <li><strong>take:</strong> Take N values then complete</li>
            <li><strong>takeUntil:</strong> Complete when another Observable emits</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 112,
            language: 'typescript',
            title: 'Search with debounceTime',
            code: `import { fromEvent } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

fromEvent(searchInput, 'input').pipe(
  map(event => event.target.value),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.api.search(term))
).subscribe(results => {
  displayResults(results);
});`,
            copyable: true,
          },
        ],
        interviewTips: [
          'debounceTime 300-500ms is standard for search',
          'distinctUntilChanged prevents duplicate API calls',
          'takeUntil is best practice for cleanup',
        ],
      },
      {
        id: 17,
        title: 'Error Handling',
        content: `
          <h2>Error Handling in RxJS</h2>
          <p>Handle errors gracefully and implement retry logic.</p>

          <h3>Error Operators</h3>
          <ul>
            <li><strong>catchError:</strong> Handle error and return new Observable</li>
            <li><strong>retry:</strong> Retry N times on error</li>
            <li><strong>retryWhen:</strong> Conditional retry with custom logic</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 115,
            language: 'typescript',
            title: 'catchError Pattern',
            code: `import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

this.http.get('/api/users').pipe(
  map(users => users.data),
  catchError(error => {
    console.error('API Error:', error);
    return of([]); // Return fallback
  })
).subscribe(users => {
  console.log('Users:', users);
});`,
            copyable: true,
          },
        ],
        interviewTips: [
          'catchError must return Observable',
          'retry for transient errors',
          'Use exponential backoff for production',
        ],
      },
      {
        id: 18,
        title: 'Memory Leak Prevention',
        content: `
          <h2>Preventing Memory Leaks</h2>
          <p>Always cleanup subscriptions!</p>

          <h3>Cleanup Strategies</h3>
          <ul>
            <li><strong>async pipe:</strong> Auto-unsubscribes (best)</li>
            <li><strong>takeUntil pattern:</strong> Complete on destroy</li>
            <li><strong>Manual unsubscribe:</strong> Call subscription.unsubscribe()</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 118,
            language: 'typescript',
            title: 'takeUntil Pattern',
            code: `import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.data$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
            copyable: true,
          },
        ],
        interviewTips: [
          'async pipe is best (auto-cleanup)',
          'takeUntil pattern for imperative code',
          'Manual unsubscribe is verbose',
        ],
      },
      {
        id: 19,
        title: 'Hot vs Cold Observables',
        content: `
          <h2>Hot vs Cold Observables</h2>
          <p>Understanding hot and cold Observables is crucial.</p>

          <h3>Cold Observables</h3>
          <ul>
            <li>Start producing values on subscribe</li>
            <li>Each subscriber gets independent execution</li>
            <li>Examples: HTTP requests, timers</li>
          </ul>

          <h3>Hot Observables</h3>
          <ul>
            <li>Produce values regardless of subscribers</li>
            <li>All subscribers share execution</li>
            <li>Examples: DOM events, Subjects</li>
          </ul>
        `,
        codeSnippets: [
          {
            id: 121,
            language: 'typescript',
            title: 'Cold Observable Example',
            code: `import { Observable } from 'rxjs';

const cold$ = new Observable(subscriber => {
  console.log('Producer started');
  subscriber.next(Math.random());
});

cold$.subscribe(x => console.log('Sub A:', x));
// Producer started, Sub A: 0.123

cold$.subscribe(x => console.log('Sub B:', x));
// Producer started (again!), Sub B: 0.456`,
            copyable: true,
          },
        ],
        interviewTips: [
          'HTTP requests are cold (each subscribe = new request)',
          'Use share() to multicast cold Observables',
          'Subjects are always hot',
        ],
      },
    ],
  },

  // LESSON 6: Forms & Validation (Future)
  {
    id: 6,
    title: 'Forms & Validation',
    description: 'Build reactive forms with complex validation patterns',
    icon: 'create-outline',
    category: 'foundation',
    completed: false,
    hasDemo: true,
    sections: [],
  },

  // LESSON 7: NgRx Store (Future)
  {
    id: 7,
    title: 'NgRx State Management',
    description: 'Enterprise-scale state with actions, reducers, and effects',
    icon: 'layers-outline',
    category: 'state',
    completed: false,
    hasDemo: false,
    sections: [],
  },

  // LESSON 8: GraphQL (Future)
  {
    id: 8,
    title: 'GraphQL Integration',
    description: 'Query and mutate data with Apollo Client',
    icon: 'git-branch-outline',
    category: 'advanced',
    completed: false,
    hasDemo: false,
    sections: [],
  },

  // LESSON 9: Real-time (Future)
  {
    id: 9,
    title: 'Real-time with Socket.io',
    description: 'Build live chat and notifications',
    icon: 'flash-outline',
    category: 'advanced',
    completed: false,
    hasDemo: true,
    sections: [],
  },

  // LESSON 10: Camera (Future)
  {
    id: 10,
    title: 'Native Camera API',
    description: 'Capture and upload photos with Capacitor',
    icon: 'camera-outline',
    category: 'native',
    completed: false,
    hasDemo: true,
    sections: [],
  },
];
