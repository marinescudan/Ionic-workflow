// Chapter-related constants extracted to dedicated file to:
// - Reduce service file size and improve readability
// - Allow constants reuse across components without importing service
// - Separate configuration from logic

import { Chapter } from '../../models/chapter.model';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    title: 'Getting Started',
    description: 'Learn Ionic basics, project setup, and core concepts',
    icon: 'rocket',
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
  {
    id: 2,
    title: 'Ionic Components',
    description: 'Master buttons, cards, lists, and 100+ UI components',
    icon: 'apps',
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
          {
            id: 7,
            language: 'html',
            title: 'Clickable Card',
            code: `<ion-card button (click)="openDetails()">
  <ion-card-header>
    <ion-card-title>Tap Me</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    This entire card is clickable
  </ion-card-content>
</ion-card>`,
            description: 'The button attribute adds ripple effect and makes card tappable',
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
  // Add more chapters as needed (keeping original 3, 4, 5)
  {
    id: 3,
    title: 'Navigation & Routing',
    description: 'Master routing, navigation, and deep linking',
    icon: 'navigate',
    category: 'navigation',
    completed: false,
    hasDemo: true,
    sections: [],
  },
  {
    id: 4,
    title: 'Forms & Validation',
    description: 'Build reactive forms with validation',
    icon: 'create',
    category: 'foundation',
    completed: false,
    hasDemo: true,
    sections: [],
  },
  {
    id: 5,
    title: 'State Management',
    description: 'Learn NgRx for enterprise-scale apps',
    icon: 'layers',
    category: 'state',
    completed: false,
    hasDemo: false,
    sections: [],
  },
];

