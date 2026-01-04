import { Injectable } from '@angular/core';
import { DemoComponent, DemoCategory } from '@app/models/demo.model';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private demoComponents: DemoComponent[] = [
    // IonButton Demo
    {
      id: 'ion-button',
      name: 'IonButton',
      description: 'Interactive button component with multiple styles',
      category: 'button',
      icon: 'square',
      defaultProps: {
        text: 'Click Me',
        expand: 'default',
        fill: 'solid',
        size: 'default',
        color: 'primary',
        shape: 'default',
        disabled: false,
      },
      propDefinitions: [
        {
          name: 'text',
          label: 'Button Text',
          type: 'text',
          defaultValue: 'Click Me',
          description: 'Text displayed on button',
        },
        {
          name: 'expand',
          label: 'Expand',
          type: 'select',
          options: [
            { value: 'default', label: 'Default' },
            { value: 'block', label: 'Block (full width)' },
            { value: 'full', label: 'Full (no margin)' },
          ],
          defaultValue: 'default',
          description: 'Button width behavior',
        },
        {
          name: 'fill',
          label: 'Fill',
          type: 'select',
          options: [
            { value: 'solid', label: 'Solid' },
            { value: 'outline', label: 'Outline' },
            { value: 'clear', label: 'Clear' },
          ],
          defaultValue: 'solid',
          description: 'Button background style',
        },
        {
          name: 'size',
          label: 'Size',
          type: 'select',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'default', label: 'Default' },
            { value: 'large', label: 'Large' },
          ],
          defaultValue: 'default',
          description: 'Button size',
        },
        {
          name: 'color',
          label: 'Color',
          type: 'select',
          options: [
            { value: 'primary', label: 'Primary' },
            { value: 'secondary', label: 'Secondary' },
            { value: 'tertiary', label: 'Tertiary' },
            { value: 'success', label: 'Success' },
            { value: 'warning', label: 'Warning' },
            { value: 'danger', label: 'Danger' },
            { value: 'light', label: 'Light' },
            { value: 'medium', label: 'Medium' },
            { value: 'dark', label: 'Dark' },
          ],
          defaultValue: 'primary',
          description: 'Button color theme',
        },
        {
          name: 'shape',
          label: 'Shape',
          type: 'select',
          options: [
            { value: 'default', label: 'Default' },
            { value: 'round', label: 'Round' },
          ],
          defaultValue: 'default',
          description: 'Button border radius',
        },
        {
          name: 'disabled',
          label: 'Disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Disable button interaction',
        },
      ],
      templateGenerator: (props) => {
        const expand = props['expand'] !== 'default' ? ` expand="${props['expand']}"` : '';
        const fill = props['fill'] !== 'solid' ? ` fill="${props['fill']}"` : '';
        const size = props['size'] !== 'default' ? ` size="${props['size']}"` : '';
        const color = props['color'] !== 'primary' ? ` color="${props['color']}"` : '';
        const shape = props['shape'] !== 'default' ? ` shape="${props['shape']}"` : '';
        const disabled = props['disabled'] ? ' [disabled]="true"' : '';

        return `<ion-button${expand}${fill}${size}${color}${shape}${disabled}>
  ${props['text']}
</ion-button>`;
      },
      typescriptGenerator: (props) => {
        return `import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-example',
  template: \`
    <ion-button${props['expand'] !== 'default' ? ` expand="${props['expand']}"` : ''}${props['fill'] !== 'solid' ? ` fill="${props['fill']}"` : ''}${props['size'] !== 'default' ? ` size="${props['size']}"` : ''}${props['color'] !== 'primary' ? ` color="${props['color']}"` : ''}${props['shape'] !== 'default' ? ` shape="${props['shape']}"` : ''}${props['disabled'] ? ' [disabled]="true"' : ''}>
      ${props['text']}
    </ion-button>
  \`,
  standalone: true,
  imports: [IonButton],
})
export class ExampleComponent {}`;
      },
    },

    // IonCard Demo
    {
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
    },

    // IonList Demo
    {
      id: 'ion-list',
      name: 'IonList',
      description: 'List container with various item styles',
      category: 'list',
      icon: 'list',
      defaultProps: {
        inset: false,
        lines: 'full',
        itemCount: 3,
      },
      propDefinitions: [
        {
          name: 'inset',
          label: 'Inset',
          type: 'boolean',
          defaultValue: false,
          description: 'Add margin around list',
        },
        {
          name: 'lines',
          label: 'Lines',
          type: 'select',
          options: [
            { value: 'full', label: 'Full' },
            { value: 'inset', label: 'Inset' },
            { value: 'none', label: 'None' },
          ],
          defaultValue: 'full',
          description: 'Border line style',
        },
        {
          name: 'itemCount',
          label: 'Item Count',
          type: 'number',
          defaultValue: 3,
          description: 'Number of list items (1-5)',
        },
      ],
      templateGenerator: (props) => {
        const inset = props['inset'] ? ' inset="true"' : '';
        const lines = props['lines'] !== 'full' ? ` lines="${props['lines']}"` : '';
        const count = Math.min(Math.max(props['itemCount'] || 3, 1), 5);

        const items = Array.from({ length: count }, (_, i) =>
          `  <ion-item>
    <ion-label>List Item ${i + 1}</ion-label>
  </ion-item>`
        ).join('\n');

        return `<ion-list${inset}${lines}>
${items}
</ion-list>`;
      },
      typescriptGenerator: (props) => {
        const count = Math.min(Math.max(props['itemCount'] || 3, 1), 5);
        const items = Array.from({ length: count }, (_, i) =>
          `    <ion-item>
      <ion-label>List Item ${i + 1}</ion-label>
    </ion-item>`
        ).join('\n');

        return `import { Component } from '@angular/core';
import { IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-example',
  template: \`
    <ion-list${props['inset'] ? ' inset="true"' : ''}${props['lines'] !== 'full' ? ` lines="${props['lines']}"` : ''}>
${items}
    </ion-list>
  \`,
  standalone: true,
  imports: [IonList, IonItem, IonLabel],
})
export class ExampleComponent {}`;
      },
    },

    // IonInput Demo
    {
      id: 'ion-input',
      name: 'IonInput',
      description: 'Text input field with various types',
      category: 'input',
      icon: 'create-outline',
      defaultProps: {
        type: 'text',
        label: 'Email',
        labelPlacement: 'floating',
        placeholder: 'Enter your email',
        disabled: false,
        readonly: false,
        clearInput: true,
      },
      propDefinitions: [
        {
          name: 'type',
          label: 'Input Type',
          type: 'select',
          options: [
            { value: 'text', label: 'Text' },
            { value: 'email', label: 'Email' },
            { value: 'password', label: 'Password' },
            { value: 'number', label: 'Number' },
            { value: 'tel', label: 'Telephone' },
            { value: 'url', label: 'URL' },
          ],
          defaultValue: 'text',
          description: 'Input field type',
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          defaultValue: 'Email',
          description: 'Input label text',
        },
        {
          name: 'labelPlacement',
          label: 'Label Placement',
          type: 'select',
          options: [
            { value: 'floating', label: 'Floating' },
            { value: 'stacked', label: 'Stacked' },
            { value: 'fixed', label: 'Fixed' },
          ],
          defaultValue: 'floating',
          description: 'Label position',
        },
        {
          name: 'placeholder',
          label: 'Placeholder',
          type: 'text',
          defaultValue: 'Enter your email',
          description: 'Placeholder text',
        },
        {
          name: 'disabled',
          label: 'Disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Disable input interaction',
        },
        {
          name: 'readonly',
          label: 'Readonly',
          type: 'boolean',
          defaultValue: false,
          description: 'Make input read-only',
        },
        {
          name: 'clearInput',
          label: 'Clear Button',
          type: 'boolean',
          defaultValue: true,
          description: 'Show clear button',
        },
      ],
      templateGenerator: (props) => {
        const type = props['type'] !== 'text' ? ` type="${props['type']}"` : '';
        const labelPlacement = props['labelPlacement'] !== 'floating' ? ` labelPlacement="${props['labelPlacement']}"` : '';
        const placeholder = props['placeholder'] ? ` placeholder="${props['placeholder']}"` : '';
        const disabled = props['disabled'] ? ' [disabled]="true"' : '';
        const readonly = props['readonly'] ? ' readonly' : '';
        const clearInput = props['clearInput'] ? ' clearInput' : '';

        return `<ion-input${type}${labelPlacement}${placeholder}${disabled}${readonly}${clearInput}>
  <div slot="label">${props['label']}</div>
</ion-input>`;
      },
      typescriptGenerator: (props) => {
        return `import { Component } from '@angular/core';
import { IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-example',
  template: \`
    <ion-input${props['type'] !== 'text' ? ` type="${props['type']}"` : ''}${props['labelPlacement'] !== 'floating' ? ` labelPlacement="${props['labelPlacement']}"` : ''}${props['placeholder'] ? ` placeholder="${props['placeholder']}"` : ''}${props['disabled'] ? ' [disabled]="true"' : ''}${props['readonly'] ? ' readonly' : ''}${props['clearInput'] ? ' clearInput' : ''}>
      <div slot="label">${props['label']}</div>
    </ion-input>
  \`,
  standalone: true,
  imports: [IonInput],
})
export class ExampleComponent {}`;
      },
    },

    // IonToggle Demo
    {
      id: 'ion-toggle',
      name: 'IonToggle',
      description: 'Toggle switch component',
      category: 'toggle',
      icon: 'toggle',
      defaultProps: {
        checked: false,
        color: 'primary',
        disabled: false,
        label: 'Enable notifications',
      },
      propDefinitions: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          defaultValue: 'Enable notifications',
          description: 'Toggle label text',
        },
        {
          name: 'checked',
          label: 'Checked',
          type: 'boolean',
          defaultValue: false,
          description: 'Initial checked state',
        },
        {
          name: 'color',
          label: 'Color',
          type: 'select',
          options: [
            { value: 'primary', label: 'Primary' },
            { value: 'secondary', label: 'Secondary' },
            { value: 'tertiary', label: 'Tertiary' },
            { value: 'success', label: 'Success' },
            { value: 'warning', label: 'Warning' },
            { value: 'danger', label: 'Danger' },
          ],
          defaultValue: 'primary',
          description: 'Toggle color theme',
        },
        {
          name: 'disabled',
          label: 'Disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Disable toggle interaction',
        },
      ],
      templateGenerator: (props) => {
        const checked = props['checked'] ? ' [checked]="true"' : '';
        const color = props['color'] !== 'primary' ? ` color="${props['color']}"` : '';
        const disabled = props['disabled'] ? ' [disabled]="true"' : '';

        return `<ion-item>
  <ion-toggle${checked}${color}${disabled}>
    ${props['label']}
  </ion-toggle>
</ion-item>`;
      },
      typescriptGenerator: (props) => {
        return `import { Component } from '@angular/core';
import { IonItem, IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-example',
  template: \`
    <ion-item>
      <ion-toggle${props['checked'] ? ' [checked]="true"' : ''}${props['color'] !== 'primary' ? ` color="${props['color']}"` : ''}${props['disabled'] ? ' [disabled]="true"' : ''}>
        ${props['label']}
      </ion-toggle>
    </ion-item>
  \`,
  standalone: true,
  imports: [IonItem, IonToggle],
})
export class ExampleComponent {}`;
      },
    },
  ];

  constructor() {}

  getDemosByChapterId(chapterId: number): DemoComponent[] {
    // Map chapter IDs to demo components
    const chapterDemoMap: Record<number, string[]> = {
      2: ['ion-button', 'ion-card', 'ion-list'], // Ionic Components chapter
      3: ['ion-input', 'ion-toggle'], // Navigation chapter (could show nav-related)
      4: ['ion-input'], // Forms chapter
    };

    const demoIds = chapterDemoMap[chapterId] || [];
    return this.demoComponents.filter(demo => demoIds.includes(demo.id));
  }

  getAllDemos(): DemoComponent[] {
    return this.demoComponents;
  }

  getDemoById(id: string): DemoComponent | undefined {
    return this.demoComponents.find(demo => demo.id === id);
  }

  getDemoCategories(): DemoCategory[] {
    const categories: DemoCategory[] = [
      {
        id: 'button',
        name: 'Buttons',
        description: 'Interactive button components',
        components: this.demoComponents.filter(d => d.category === 'button'),
      },
      {
        id: 'input',
        name: 'Inputs',
        description: 'Form input components',
        components: this.demoComponents.filter(d => d.category === 'input'),
      },
      {
        id: 'card',
        name: 'Cards',
        description: 'Content container components',
        components: this.demoComponents.filter(d => d.category === 'card'),
      },
      {
        id: 'list',
        name: 'Lists',
        description: 'List and item components',
        components: this.demoComponents.filter(d => d.category === 'list'),
      },
      {
        id: 'toggle',
        name: 'Toggles',
        description: 'Toggle and checkbox components',
        components: this.demoComponents.filter(d => d.category === 'toggle'),
      },
    ];

    return categories.filter(cat => cat.components.length > 0);
  }
}
