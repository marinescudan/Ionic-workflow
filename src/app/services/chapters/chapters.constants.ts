// Chapter-related constants extracted to dedicated file to:
// - Reduce service file size and improve readability
// - Allow constants reuse across components without importing service
// - Separate configuration from logic

import { Chapter } from '../../models/chapter.model';

export const CHAPTERS: Chapter[] = [
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
              <p>Ionic is an open-source UI toolkit for building cross-platform mobile apps using web technologies.</p>
              <h3>Key Benefits:</h3>
              <ul>
                <li><strong>Write Once, Run Everywhere:</strong> iOS, Android, Web from one codebase</li>
                <li><strong>Web Technologies:</strong> Use HTML, CSS, TypeScript</li>
                <li><strong>Native Performance:</strong> Access device features via Capacitor</li>
                <li><strong>Platform-Adaptive:</strong> UI automatically matches iOS/Android design</li>
              </ul>
            `,
            codeSnippets: [
              {
                id: 1,
                language: 'bash',
                title: 'Install Ionic CLI',
                code: 'npm install -g @ionic/cli',
                description: 'Global installation enables "ionic" command',
                copyable: true,
              },
            ],
            interviewTips: [
              'Ionic is a UI framework, Capacitor is the native bridge',
              'Ionic 7+ uses Web Components (works with any framework)',
              'Angular, React, Vue are all supported',
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
        hasDemo: true, // This chapter has live demos!
        sections: [
          {
            id: 2,
            title: 'IonButton',
            content: `
              <h2>IonButton Component</h2>
              <p>Buttons trigger actions and can have different styles and sizes.</p>
            `,
            codeSnippets: [
              {
                id: 2,
                language: 'html',
                title: 'Button Variants',
                code: `<ion-button>Default</ion-button>
<ion-button expand="block">Block</ion-button>
<ion-button fill="outline">Outline</ion-button>
<ion-button fill="clear">Clear</ion-button>`,
                description: 'Different button fills and expansions',
                copyable: true,
              },
            ],
          },
          {
            id: 3,
            title: 'IonCard',
            content: `
              <h2>IonCard Component</h2>
              <p>Cards display grouped, related content in a container.</p>
            `,
            codeSnippets: [
              {
                id: 3,
                language: 'html',
                title: 'Card Structure',
                code: `<ion-card>
  <ion-card-header>
    <ion-card-title>Title</ion-card-title>
    <ion-card-subtitle>Subtitle</ion-card-subtitle>
  </ion-card-header>
  <ion-card-content>
    Content goes here
  </ion-card-content>
</ion-card>`,
                copyable: true,
              },
            ],
          },
        ],
      },
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
