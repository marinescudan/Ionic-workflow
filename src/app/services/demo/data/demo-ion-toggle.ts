// src/app/services/demo/data/demo-ion-toggle.ts

import { DemoComponent } from '@app/models/demo.model';

export const DEMO_ION_TOGGLE: DemoComponent = {
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
};
