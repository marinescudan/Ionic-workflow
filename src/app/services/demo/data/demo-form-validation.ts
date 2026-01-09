// src/app/services/demo/data/demo-form-validation.ts

import { DemoComponent } from '@app/models/demo.model';

export const DEMO_FORM_VALIDATION: DemoComponent = {
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
};
