// src/app/services/chapters/data/chapter-01-setup.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_01_DATA: Chapter = {
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
};
