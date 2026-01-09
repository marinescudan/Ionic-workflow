// src/app/services/demo/data/demo-ion-button.ts

import { DemoComponent } from '@app/models/demo.model';

export const DEMO_ION_BUTTON: DemoComponent = {
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
};
