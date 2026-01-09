// src/app/services/demo/data/demo-ion-input.ts

import { DemoComponent } from '@app/models/demo.model';

export const DEMO_ION_INPUT: DemoComponent = {
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
};
