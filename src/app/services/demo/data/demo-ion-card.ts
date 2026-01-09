// src/app/services/demo/data/demo-ion-card.ts

import { DemoComponent } from '@app/models/demo.model';

export const DEMO_ION_CARD: DemoComponent = {
  id: 'ion-card',
  name: 'IonCard',
  description: 'Card container for grouped content',
  category: 'card',
  icon: 'square-outline',
  defaultProps: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    content: 'This is the card content area. Cards are versatile containers for displaying grouped information.',
    color: 'default',
    button: false,
    showImage: true,
  },
  propDefinitions: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      defaultValue: 'Card Title',
      description: 'Card header title',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      defaultValue: 'Card Subtitle',
      description: 'Card header subtitle',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'text',
      defaultValue: 'This is the card content area. Cards are versatile containers for displaying grouped information.',
      description: 'Main card content',
    },
    {
      name: 'color',
      label: 'Color',
      type: 'select',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'tertiary', label: 'Tertiary' },
        { value: 'success', label: 'Success' },
        { value: 'warning', label: 'Warning' },
        { value: 'danger', label: 'Danger' },
      ],
      defaultValue: 'default',
      description: 'Card background color',
    },
    {
      name: 'button',
      label: 'Make Clickable',
      type: 'boolean',
      defaultValue: false,
      description: 'Add ripple effect and make card tappable',
    },
    {
      name: 'showImage',
      label: 'Show Image',
      type: 'boolean',
      defaultValue: true,
      description: 'Display image at top of card',
    },
  ],
  templateGenerator: (props) => {
    const color = props['color'] !== 'default' ? ` color="${props['color']}"` : '';
    const button = props['button'] ? ' button' : '';
    const image = props['showImage']
      ? '\n  <img src="https://picsum.photos/400/200" alt="Card image" />\n  '
      : '';

    return `<ion-card${color}${button}>
  ${image}<ion-card-header>
    <ion-card-title>${props['title']}</ion-card-title>
    <ion-card-subtitle>${props['subtitle']}</ion-card-subtitle>
  </ion-card-header>

  <ion-card-content>
    ${props['content']}
  </ion-card-content>
</ion-card>`;
  },
  typescriptGenerator: (props) => {
    return `import { Component } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-example',
  template: \`
    <ion-card${props['color'] !== 'default' ? ` color="${props['color']}"` : ''}${props['button'] ? ' button' : ''}>
      ${props['showImage'] ? '<img src="https://picsum.photos/400/200" alt="Card image" />' : ''}
      <ion-card-header>
        <ion-card-title>${props['title']}</ion-card-title>
        <ion-card-subtitle>${props['subtitle']}</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        ${props['content']}
      </ion-card-content>
    </ion-card>
  \`,
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
})
export class ExampleComponent {}`;
  },
};
