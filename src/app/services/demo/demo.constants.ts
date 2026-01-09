// src/app/services/demo/demo.constants.ts
// Demo components data with generator functions

import { DemoComponent } from '@app/models/demo.model';

/**
 * Maps chapter IDs to their associated demo component IDs
 */
export const CHAPTER_DEMO_MAP: Record<number, string[]> = {
  2: ['ion-button', 'ion-card', 'ion-list'], // Chapter 2: Ionic Components
  5: ['rxjs-map'],                            // Chapter 5: RxJS
  // Chapter 6: Navigation demos handled separately in demo.page.ts
  7: ['reactive-form', 'form-validation'],    // Chapter 7: Forms & Validation
};

/**
 * All demo components with their configurations and generators
 */
export const DEMO_COMPONENTS: DemoComponent[] = [
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

  // RxJS Demos
  {
    id: 'rxjs-map',
    name: 'map Operator',
    description: 'Transform values with map',
    category: 'display',
    icon: 'git-network',
    defaultProps: {
      inputValue: 5,
      multiplier: 2,
    },
    propDefinitions: [
      {
        name: 'inputValue',
        label: 'Input Value',
        type: 'number',
        defaultValue: 5,
        description: 'Value to transform',
      },
      {
        name: 'multiplier',
        label: 'Multiplier',
        type: 'number',
        defaultValue: 2,
        description: 'Multiply by this number',
      },
    ],
    templateGenerator: (props) => {
      return `<!-- Input value: ${props['inputValue']} -->
<!-- map(x => x * ${props['multiplier']}) -->
<!-- Output: ${props['inputValue'] * props['multiplier']} -->

<div class="rxjs-demo">
  <div class="demo-value input">Input: ${props['inputValue']}</div>
  <div class="demo-operator">map(x => x * ${props['multiplier']})</div>
  <div class="demo-value output">Output: ${props['inputValue'] * props['multiplier']}</div>
</div>

<style>
.rxjs-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  text-align: center;
}
.demo-value {
  padding: 16px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: 600;
}
.demo-value.input {
  background: #e3f2fd;
  color: #1976d2;
}
.demo-value.output {
  background: #c8e6c9;
  color: #388e3c;
}
.demo-operator {
  padding: 12px;
  background: #fff3e0;
  border-radius: 8px;
  font-family: monospace;
  color: #f57c00;
}
</style>`;
    },
    typescriptGenerator: (props) => {
      return `import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  template: \`
    <p>Input: {{ input }}</p>
    <p>Output: {{ output }}</p>
  \`
})
export class ExampleComponent {
  input = ${props['inputValue']};
  output = 0;

  ngOnInit() {
    of(this.input).pipe(
      map(x => x * ${props['multiplier']})
    ).subscribe(result => {
      this.output = result;
    });
  }
}`;
    },
  },

  // Forms Demos (Chapter 7)
  {
    id: 'reactive-form',
    name: 'Reactive Form',
    description: 'Form with FormBuilder and validators',
    category: 'input',
    icon: 'create-outline',
    defaultProps: {
      showLabels: true,
      labelPlacement: 'floating',
      required: true,
    },
    propDefinitions: [
      {
        name: 'showLabels',
        label: 'Show Labels',
        type: 'boolean',
        defaultValue: true,
        description: 'Display input labels',
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
        name: 'required',
        label: 'Required',
        type: 'boolean',
        defaultValue: true,
        description: 'Make fields required',
      },
    ],
    templateGenerator: (props) => {
      const labelPlacement = `labelPlacement="${props['labelPlacement']}"`;
      return `<form [formGroup]="form">
  <ion-item>
    <ion-input
      formControlName="email"
      type="email"
      label="Email"
      ${labelPlacement}
    ></ion-input>
  </ion-item>

  <ion-item>
    <ion-input
      formControlName="password"
      type="password"
      label="Password"
      ${labelPlacement}
    ></ion-input>
  </ion-item>

  <ion-button type="submit" expand="block">
    Submit
  </ion-button>
</form>`;
    },
    typescriptGenerator: (props) => {
      const required = props['required'] ? 'Validators.required, ' : '';
      return `import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonItem, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, IonItem, IonInput, IonButton],
  template: \`/* see HTML tab */\`
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [${required}Validators.email]],
    password: ['', [${required}Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder) {}
}`;
    },
  },

  // Form Validation Demo
  {
    id: 'form-validation',
    name: 'Form Validation',
    description: 'Validation states and error display',
    category: 'input',
    icon: 'checkmark-circle',
    defaultProps: {
      showErrors: true,
      validationType: 'sync',
    },
    propDefinitions: [
      {
        name: 'showErrors',
        label: 'Show Errors',
        type: 'boolean',
        defaultValue: true,
        description: 'Display error messages',
      },
      {
        name: 'validationType',
        label: 'Validation Type',
        type: 'select',
        options: [
          { value: 'sync', label: 'Synchronous' },
          { value: 'async', label: 'Asynchronous' },
        ],
        defaultValue: 'sync',
        description: 'Type of validation',
      },
    ],
    templateGenerator: (props) => {
      const showErrors = props['showErrors'];
      return `<ion-item [class.ion-invalid]="email.invalid && email.touched">
  <ion-input
    formControlName="email"
    type="email"
    label="Email"
    labelPlacement="floating"
  ></ion-input>
</ion-item>

${showErrors ? `@if (email.invalid && email.touched) {
  <ion-text color="danger">
    @if (email.errors?.['required']) {
      <p>Email is required</p>
    }
    @if (email.errors?.['email']) {
      <p>Invalid email format</p>
    }
  </ion-text>
}` : '<!-- Errors hidden -->'}`;
    },
    typescriptGenerator: (props) => {
      const isAsync = props['validationType'] === 'async';
      return `// Control states:
// - valid/invalid: Validation passed/failed
// - pristine/dirty: Value changed?
// - touched/untouched: Field focused?
// - pending: Async validation in progress

get email() {
  return this.form.get('email')!;
}

// Check specific error
hasError(field: string, error: string): boolean {
  const control = this.form.get(field);
  return control?.hasError(error) && control?.touched || false;
}${isAsync ? `

// Async validator
emailValidator(): AsyncValidatorFn {
  return (control) => timer(500).pipe(
    switchMap(() => checkEmailAPI(control.value)),
    map(exists => exists ? { emailTaken: true } : null)
  );
}` : ''}`;
    },
  },
];
