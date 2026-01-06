// src/app/services/chapters/data/chapter-02-components.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_02_DATA: Chapter = {
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
};
