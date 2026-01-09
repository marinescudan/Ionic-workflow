// src/app/services/demo/data/demo-reactive-form.ts

import { DemoComponent } from '@app/models/demo.model';

export const DEMO_REACTIVE_FORM: DemoComponent = {
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
};
