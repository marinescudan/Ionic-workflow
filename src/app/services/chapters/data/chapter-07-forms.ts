// src/app/services/chapters/data/chapter-07-forms.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_07_DATA: Chapter = {
  id: 7,
  title: 'Forms & Validation',
  description: 'Build reactive forms with complex validation patterns',
  icon: 'create-outline',
  category: 'intermediate',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 70,
      title: 'Template vs Reactive Forms',
      content: `
        <h2>Two Approaches to Forms</h2>
        <p>Angular provides two approaches to handling forms: template-driven and reactive forms.</p>

        <h3>Template-Driven Forms</h3>
        <ul>
          <li><strong>Declarative:</strong> Form logic defined in template with directives</li>
          <li><strong>Two-way binding:</strong> Uses [(ngModel)] for data binding</li>
          <li><strong>Simpler:</strong> Less code, easier for simple forms</li>
          <li><strong>Async:</strong> Form state changes asynchronously</li>
        </ul>

        <h3>Reactive Forms (Recommended)</h3>
        <ul>
          <li><strong>Imperative:</strong> Form logic defined in component class</li>
          <li><strong>Observable-based:</strong> Access form state as streams</li>
          <li><strong>Testable:</strong> Easier to unit test</li>
          <li><strong>Synchronous:</strong> Predictable state changes</li>
          <li><strong>Powerful:</strong> Dynamic forms, complex validation</li>
        </ul>

        <h3>When to Use Which?</h3>
        <table>
          <tr>
            <th>Use Case</th>
            <th>Recommended</th>
          </tr>
          <tr>
            <td>Simple login/signup</td>
            <td>Either works</td>
          </tr>
          <tr>
            <td>Complex validation</td>
            <td>Reactive Forms</td>
          </tr>
          <tr>
            <td>Dynamic fields</td>
            <td>Reactive Forms</td>
          </tr>
          <tr>
            <td>Cross-field validation</td>
            <td>Reactive Forms</td>
          </tr>
          <tr>
            <td>Async validation</td>
            <td>Reactive Forms</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 700,
          language: 'typescript',
          title: 'Template-Driven Form',
          code: `// Template-driven: Uses ngModel directives
import { FormsModule } from '@angular/forms';

@Component({
  template: \`
    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
      <ion-input
        [(ngModel)]="user.email"
        name="email"
        required
        email
      ></ion-input>

      <ion-input
        [(ngModel)]="user.password"
        name="password"
        type="password"
        required
        minlength="6"
      ></ion-input>

      <ion-button type="submit" [disabled]="!loginForm.valid">
        Login
      </ion-button>
    </form>
  \`,
  imports: [FormsModule, IonInput, IonButton]
})
export class LoginComponent {
  user = { email: '', password: '' };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form data:', this.user);
    }
  }
}`,
          copyable: true,
        },
        {
          id: 701,
          language: 'typescript',
          title: 'Reactive Form',
          code: `// Reactive: Form defined in component class
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  template: \`
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <ion-input
        formControlName="email"
        type="email"
        label="Email"
        labelPlacement="floating"
      ></ion-input>

      <ion-input
        formControlName="password"
        type="password"
        label="Password"
        labelPlacement="floating"
      ></ion-input>

      <ion-button type="submit" [disabled]="loginForm.invalid">
        Login
      </ion-button>
    </form>
  \`,
  imports: [ReactiveFormsModule, IonInput, IonButton]
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form data:', this.loginForm.value);
    }
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Reactive Forms are preferred for complex forms',
        'Template-driven uses FormsModule, Reactive uses ReactiveFormsModule',
        'Reactive Forms provide synchronous access to form state',
        'Both can coexist in same application',
      ],
    },
    {
      id: 71,
      title: 'FormControl, FormGroup & FormArray',
      content: `
        <h2>Building Blocks of Reactive Forms</h2>
        <p>Reactive forms use three main building blocks to represent form structure.</p>

        <h3>FormControl</h3>
        <p>Represents a single input element. Tracks value and validation status.</p>

        <h3>FormGroup</h3>
        <p>Groups multiple controls together. The form itself is usually a FormGroup.</p>

        <h3>FormArray</h3>
        <p>Array of controls for dynamic lists (e.g., multiple phone numbers).</p>

        <h3>Control States</h3>
        <ul>
          <li><strong>valid/invalid:</strong> Validation status</li>
          <li><strong>pristine/dirty:</strong> Has value changed?</li>
          <li><strong>touched/untouched:</strong> Has field been focused?</li>
          <li><strong>pending:</strong> Async validation in progress</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 702,
          language: 'typescript',
          title: 'FormControl Basics',
          code: `import { FormControl, Validators } from '@angular/forms';

// Create a FormControl
const email = new FormControl('', [
  Validators.required,
  Validators.email
]);

// Access value
console.log(email.value); // ''

// Update value
email.setValue('test@example.com');
email.patchValue('new@example.com');

// Check status
console.log(email.valid);      // true/false
console.log(email.invalid);    // true/false
console.log(email.pristine);   // true (unchanged)
console.log(email.dirty);      // false
console.log(email.touched);    // false (not focused yet)
console.log(email.errors);     // { required: true } or null

// Subscribe to value changes (RxJS!)
email.valueChanges.subscribe(value => {
  console.log('Email changed:', value);
});

// Subscribe to status changes
email.statusChanges.subscribe(status => {
  console.log('Status:', status); // 'VALID', 'INVALID', 'PENDING'
});`,
          description: 'FormControl tracks value and validation of single input',
          copyable: true,
        },
        {
          id: 703,
          language: 'typescript',
          title: 'FormGroup for Nested Data',
          code: `import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({...})
export class ProfileFormComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      // Basic fields
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      // Nested FormGroup for address
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['', Validators.pattern(/^\\d{5}$/)]
      })
    });
  }

  // Access nested control
  get street() {
    return this.profileForm.get('address.street');
  }

  // Get entire address group
  get addressGroup() {
    return this.profileForm.get('address') as FormGroup;
  }
}

// Template
// <form [formGroup]="profileForm">
//   <ion-input formControlName="firstName"></ion-input>
//
//   <div formGroupName="address">
//     <ion-input formControlName="street"></ion-input>
//     <ion-input formControlName="city"></ion-input>
//   </div>
// </form>`,
          copyable: true,
        },
        {
          id: 704,
          language: 'typescript',
          title: 'FormArray for Dynamic Lists',
          code: `import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  template: \`
    <form [formGroup]="orderForm">
      <div formArrayName="items">
        @for (item of items.controls; track $index) {
          <div [formGroupName]="$index" class="item-row">
            <ion-input formControlName="name" label="Item"></ion-input>
            <ion-input formControlName="quantity" type="number"></ion-input>
            <ion-input formControlName="price" type="number"></ion-input>
            <ion-button fill="clear" (click)="removeItem($index)">
              <ion-icon name="trash"></ion-icon>
            </ion-button>
          </div>
        }
      </div>

      <ion-button (click)="addItem()">
        <ion-icon name="add" slot="start"></ion-icon>
        Add Item
      </ion-button>
    </form>
  \`
})
export class OrderFormComponent {
  orderForm = this.fb.group({
    customerName: ['', Validators.required],
    items: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {
    // Add initial item
    this.addItem();
  }

  // Getter for items FormArray
  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  // Create a new item group
  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  // Calculate total
  getTotal(): number {
    return this.items.controls.reduce((sum, item) => {
      const qty = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      return sum + (qty * price);
    }, 0);
  }
}`,
          description: 'FormArray for dynamic lists of form controls',
          copyable: true,
        },
      ],
      interviewTips: [
        'FormControl = single input, FormGroup = object, FormArray = array',
        'Use FormBuilder for cleaner syntax',
        'valueChanges and statusChanges are Observables',
        'Always use getters for FormArray access in templates',
      ],
    },
    {
      id: 72,
      title: 'Built-in Validators',
      content: `
        <h2>Angular Built-in Validators</h2>
        <p>Angular provides common validators out of the box.</p>

        <h3>Available Validators</h3>
        <ul>
          <li><strong>required:</strong> Field must have value</li>
          <li><strong>requiredTrue:</strong> Checkbox must be checked</li>
          <li><strong>email:</strong> Must be valid email format</li>
          <li><strong>minLength(n):</strong> Minimum character count</li>
          <li><strong>maxLength(n):</strong> Maximum character count</li>
          <li><strong>min(n):</strong> Minimum numeric value</li>
          <li><strong>max(n):</strong> Maximum numeric value</li>
          <li><strong>pattern(regex):</strong> Must match regex pattern</li>
        </ul>

        <h3>Error Object Structure</h3>
        <p>When validation fails, the errors property contains an object with error details:</p>
        <ul>
          <li><code>{ required: true }</code></li>
          <li><code>{ email: true }</code></li>
          <li><code>{ minlength: { requiredLength: 6, actualLength: 3 } }</code></li>
          <li><code>{ pattern: { requiredPattern: "^[a-z]+$", actualValue: "ABC" } }</code></li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 705,
          language: 'typescript',
          title: 'Using Built-in Validators',
          code: `import { FormBuilder, Validators } from '@angular/forms';

@Component({...})
export class RegistrationComponent {
  registerForm = this.fb.group({
    // Required field
    username: ['', Validators.required],

    // Email validation
    email: ['', [Validators.required, Validators.email]],

    // Multiple validators
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      // Password pattern: at least one uppercase, lowercase, and number
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$/)
    ]],

    // Numeric validation
    age: [null, [
      Validators.required,
      Validators.min(18),
      Validators.max(120)
    ]],

    // Checkbox must be checked
    acceptTerms: [false, Validators.requiredTrue],

    // Phone number pattern
    phone: ['', Validators.pattern(/^\\+?[1-9]\\d{9,14}$/)]
  });

  constructor(private fb: FormBuilder) {}
}`,
          copyable: true,
        },
        {
          id: 706,
          language: 'html',
          title: 'Displaying Validation Errors',
          code: `<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
  <!-- Email field with error display -->
  <ion-item>
    <ion-input
      formControlName="email"
      type="email"
      label="Email"
      labelPlacement="floating"
      [class.ion-invalid]="email.invalid && email.touched"
    ></ion-input>
  </ion-item>

  <!-- Error messages -->
  @if (email.invalid && email.touched) {
    <ion-text color="danger" class="error-message">
      @if (email.errors?.['required']) {
        <p>Email is required</p>
      }
      @if (email.errors?.['email']) {
        <p>Please enter a valid email</p>
      }
    </ion-text>
  }

  <!-- Password with multiple errors -->
  <ion-item>
    <ion-input
      formControlName="password"
      type="password"
      label="Password"
      labelPlacement="floating"
    ></ion-input>
  </ion-item>

  @if (password.invalid && password.touched) {
    <ion-text color="danger" class="error-message">
      @if (password.errors?.['required']) {
        <p>Password is required</p>
      }
      @if (password.errors?.['minlength']) {
        <p>
          Password must be at least
          {{ password.errors?.['minlength'].requiredLength }} characters
          (currently {{ password.errors?.['minlength'].actualLength }})
        </p>
      }
      @if (password.errors?.['pattern']) {
        <p>Password must contain uppercase, lowercase, and number</p>
      }
    </ion-text>
  }

  <ion-button type="submit" expand="block" [disabled]="registerForm.invalid">
    Register
  </ion-button>
</form>`,
          copyable: true,
        },
        {
          id: 707,
          language: 'typescript',
          title: 'Getter Methods for Clean Templates',
          code: `@Component({...})
export class RegistrationComponent {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  });

  // Getters for easy template access
  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  // Helper method for checking specific error
  hasError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control?.hasError(errorName) && control?.touched || false;
  }

  // Usage in template:
  // @if (hasError('email', 'required')) { <p>Email required</p> }
  // @if (hasError('email', 'email')) { <p>Invalid email</p> }
}`,
          description: 'Use getters and helper methods for cleaner templates',
          copyable: true,
        },
      ],
      interviewTips: [
        'Combine multiple validators in an array',
        'Validators are functions that return null (valid) or error object',
        'Check touched/dirty before showing errors to avoid premature messages',
        'Use getters for cleaner template access',
      ],
    },
    {
      id: 73,
      title: 'Custom Validators',
      content: `
        <h2>Creating Custom Validators</h2>
        <p>Build custom validators for business-specific validation rules.</p>

        <h3>Validator Function Signature</h3>
        <p>A validator is a function that receives a control and returns:</p>
        <ul>
          <li><strong>null:</strong> Validation passed</li>
          <li><strong>Error object:</strong> Validation failed</li>
        </ul>

        <h3>Types of Custom Validators</h3>
        <ul>
          <li><strong>Sync validators:</strong> Return immediately</li>
          <li><strong>Async validators:</strong> Return Observable or Promise</li>
          <li><strong>Cross-field validators:</strong> Validate multiple fields together</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 708,
          language: 'typescript',
          title: 'Simple Custom Validator',
          code: `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validator factory function (allows parameters)
export function forbiddenValueValidator(forbidden: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate empty values (use required for that)
    }

    const isForbidden = control.value.toLowerCase() === forbidden.toLowerCase();

    return isForbidden
      ? { forbiddenValue: { value: control.value, forbidden } }
      : null;
  };
}

// Simple validator (no parameters)
export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const hasWhitespace = /\\s/.test(control.value);
  return hasWhitespace ? { whitespace: true } : null;
}

// Strong password validator
export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const errors: ValidationErrors = {};

  if (!/[A-Z]/.test(value)) {
    errors['noUppercase'] = true;
  }
  if (!/[a-z]/.test(value)) {
    errors['noLowercase'] = true;
  }
  if (!/\\d/.test(value)) {
    errors['noNumber'] = true;
  }
  if (!/[!@#$%^&*]/.test(value)) {
    errors['noSpecial'] = true;
  }

  return Object.keys(errors).length ? errors : null;
}

// Usage
registerForm = this.fb.group({
  username: ['', [
    Validators.required,
    forbiddenValueValidator('admin'),
    noWhitespaceValidator
  ]],
  password: ['', [
    Validators.required,
    Validators.minLength(8),
    strongPasswordValidator
  ]]
});`,
          copyable: true,
        },
        {
          id: 709,
          language: 'typescript',
          title: 'Cross-Field Validator',
          code: `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Password match validator (applied to FormGroup)
export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    // Don't validate if either field is empty
    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  };
}

// Date range validator
export function dateRangeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;

    if (!start || !end) return null;

    const startDate = new Date(start);
    const endDate = new Date(end);

    return startDate <= endDate
      ? null
      : { invalidDateRange: { start, end } };
  };
}

// Apply to FormGroup
@Component({...})
export class SignupComponent {
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, {
    // Apply validator to entire group
    validators: [passwordMatchValidator()]
  });

  // Check group-level error
  get passwordMismatch(): boolean {
    return this.signupForm.hasError('passwordMismatch');
  }
}`,
          copyable: true,
        },
        {
          id: 710,
          language: 'html',
          title: 'Displaying Custom Validation Errors',
          code: `<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
  <ion-item>
    <ion-input
      formControlName="username"
      label="Username"
      labelPlacement="floating"
    ></ion-input>
  </ion-item>

  @if (username.invalid && username.touched) {
    <ion-text color="danger">
      @if (username.errors?.['forbiddenValue']) {
        <p>
          "{{ username.errors?.['forbiddenValue'].value }}" is not allowed
        </p>
      }
      @if (username.errors?.['whitespace']) {
        <p>Username cannot contain spaces</p>
      }
    </ion-text>
  }

  <ion-item>
    <ion-input
      formControlName="password"
      type="password"
      label="Password"
      labelPlacement="floating"
    ></ion-input>
  </ion-item>

  <!-- Password strength indicator -->
  @if (password.value) {
    <div class="password-requirements">
      <p [class.valid]="!password.errors?.['noUppercase']">
        Uppercase letter
      </p>
      <p [class.valid]="!password.errors?.['noLowercase']">
        Lowercase letter
      </p>
      <p [class.valid]="!password.errors?.['noNumber']">
        Number
      </p>
      <p [class.valid]="!password.errors?.['noSpecial']">
        Special character (!@#$%^&*)
      </p>
    </div>
  }

  <ion-item>
    <ion-input
      formControlName="confirmPassword"
      type="password"
      label="Confirm Password"
      labelPlacement="floating"
    ></ion-input>
  </ion-item>

  <!-- Cross-field error (group level) -->
  @if (signupForm.errors?.['passwordMismatch'] && confirmPassword.touched) {
    <ion-text color="danger">
      <p>Passwords do not match</p>
    </ion-text>
  }

  <ion-button type="submit" [disabled]="signupForm.invalid">
    Sign Up
  </ion-button>
</form>`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Validators return null for valid, error object for invalid',
        'Use validator factory functions for configurable validators',
        'Cross-field validators are applied at FormGroup level',
        'Check both control errors and group errors in templates',
      ],
    },
    {
      id: 74,
      title: 'Async Validators',
      content: `
        <h2>Asynchronous Validation</h2>
        <p>Validate against server data, like checking if username is taken.</p>

        <h3>Async Validator Characteristics</h3>
        <ul>
          <li><strong>Returns Observable or Promise:</strong> For async operations</li>
          <li><strong>Pending state:</strong> Control shows PENDING while validating</li>
          <li><strong>Runs after sync validators:</strong> Only if sync validators pass</li>
          <li><strong>Debounce recommended:</strong> Avoid excessive API calls</li>
        </ul>

        <h3>Common Use Cases</h3>
        <ul>
          <li>Check if username/email is available</li>
          <li>Validate against database records</li>
          <li>Real-time server-side validation</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 711,
          language: 'typescript',
          title: 'Async Validator Service',
          code: `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  constructor(private http: HttpClient) {}

  // Check if username is available
  usernameAvailable(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return control.valueChanges.pipe(
        debounceTime(300), // Wait 300ms after user stops typing
        switchMap(value =>
          this.http.get<{ available: boolean }>(
            \`/api/check-username?username=\${value}\`
          )
        ),
        map(response =>
          response.available ? null : { usernameTaken: true }
        ),
        catchError(() => of(null)), // On error, allow submission
        first() // Complete after first emission
      );
    };
  }

  // Check if email is already registered
  emailUnique(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      // Simulated API call
      return of(control.value).pipe(
        debounceTime(500),
        switchMap(email => this.checkEmail(email)),
        map(isUnique => isUnique ? null : { emailExists: true }),
        first()
      );
    };
  }

  private checkEmail(email: string): Observable<boolean> {
    // Simulate API call
    const existingEmails = ['test@example.com', 'admin@example.com'];
    return of(!existingEmails.includes(email.toLowerCase()));
  }
}`,
          copyable: true,
        },
        {
          id: 712,
          language: 'typescript',
          title: 'Using Async Validators',
          code: `import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-signup',
  template: \`
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <ion-item>
        <ion-input
          formControlName="username"
          label="Username"
          labelPlacement="floating"
        ></ion-input>

        <!-- Show spinner while validating -->
        @if (username.pending) {
          <ion-spinner slot="end" name="dots"></ion-spinner>
        }
      </ion-item>

      @if (username.errors?.['usernameTaken'] && username.touched) {
        <ion-text color="danger">
          <p>Username is already taken</p>
        </ion-text>
      }

      <ion-item>
        <ion-input
          formControlName="email"
          type="email"
          label="Email"
          labelPlacement="floating"
        ></ion-input>

        @if (email.pending) {
          <ion-spinner slot="end" name="dots"></ion-spinner>
        }
      </ion-item>

      @if (email.errors?.['emailExists']) {
        <ion-text color="danger">
          <p>Email is already registered</p>
        </ion-text>
      }

      <ion-button
        type="submit"
        expand="block"
        [disabled]="signupForm.invalid || signupForm.pending"
      >
        @if (signupForm.pending) {
          <ion-spinner name="crescent"></ion-spinner>
        } @else {
          Sign Up
        }
      </ion-button>
    </form>
  \`
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private validationService = inject(ValidationService);

  signupForm = this.fb.group({
    username: ['',
      [Validators.required, Validators.minLength(3)], // Sync validators
      [this.validationService.usernameAvailable()]     // Async validators
    ],
    email: ['',
      [Validators.required, Validators.email],
      [this.validationService.emailUnique()]
    ],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  get username() { return this.signupForm.get('username')!; }
  get email() { return this.signupForm.get('email')!; }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
    }
  }
}`,
          copyable: true,
        },
        {
          id: 713,
          language: 'typescript',
          title: 'Simplified Async Validator',
          code: `// Simpler approach without service injection
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// Simulate checking username availability
export function checkUsernameAsync(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  if (!control.value) {
    return of(null);
  }

  // Simulate API delay
  return timer(500).pipe(
    switchMap(() => {
      // Simulate taken usernames
      const takenUsernames = ['admin', 'root', 'user', 'test'];
      const isTaken = takenUsernames.includes(control.value.toLowerCase());

      return of(isTaken ? { usernameTaken: true } : null);
    })
  );
}

// Usage in component
signupForm = this.fb.group({
  username: ['',
    [Validators.required],
    [checkUsernameAsync]  // Pass function reference
  ]
});`,
          description: 'Simplified async validator without service',
          copyable: true,
        },
      ],
      interviewTips: [
        'Async validators are the third argument to FormControl',
        'Always debounce async validators to reduce API calls',
        'Use control.pending to show loading state',
        'Async validators only run if sync validators pass',
      ],
    },
    {
      id: 75,
      title: 'Form State & updateOn',
      content: `
        <h2>Controlling When Validation Runs</h2>
        <p>By default, Angular validates on every change. You can control this behavior.</p>

        <h3>updateOn Options</h3>
        <ul>
          <li><strong>change (default):</strong> Validate on every input change</li>
          <li><strong>blur:</strong> Validate when field loses focus</li>
          <li><strong>submit:</strong> Validate only on form submission</li>
        </ul>

        <h3>When to Use Each</h3>
        <table>
          <tr>
            <th>Option</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>change</td>
            <td>Real-time feedback (default)</td>
          </tr>
          <tr>
            <td>blur</td>
            <td>Reduce validation noise, better for async validators</td>
          </tr>
          <tr>
            <td>submit</td>
            <td>Traditional form behavior, batch validation</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 714,
          language: 'typescript',
          title: 'Setting updateOn',
          code: `import { FormBuilder, Validators } from '@angular/forms';

@Component({...})
export class FormComponent {
  // Per-control updateOn
  form = this.fb.group({
    // Validate on change (default)
    email: ['', [Validators.required, Validators.email]],

    // Validate on blur
    username: this.fb.control('', {
      validators: [Validators.required],
      asyncValidators: [this.checkUsername()],
      updateOn: 'blur'  // Better for async validators
    }),

    // Validate on submit only
    comments: this.fb.control('', {
      validators: [Validators.maxLength(500)],
      updateOn: 'submit'
    })
  });

  // Or set for entire form
  blurForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  }, {
    updateOn: 'blur'  // All controls validate on blur
  });

  // Submit-only validation
  submitForm = this.fb.group({
    field1: ['', Validators.required],
    field2: ['', Validators.required]
  }, {
    updateOn: 'submit'
  });

  constructor(private fb: FormBuilder) {}
}`,
          copyable: true,
        },
        {
          id: 715,
          language: 'typescript',
          title: 'Manual Validation Control',
          code: `@Component({...})
export class FormComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder) {}

  // Mark all controls as touched to show errors
  validateForm(): void {
    this.form.markAllAsTouched();
  }

  // Reset form to pristine state
  resetForm(): void {
    this.form.reset();
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }

  // Update validators dynamically
  makeFieldRequired(fieldName: string): void {
    const control = this.form.get(fieldName);
    control?.setValidators([Validators.required]);
    control?.updateValueAndValidity();
  }

  // Clear validators
  removeValidation(fieldName: string): void {
    const control = this.form.get(fieldName);
    control?.clearValidators();
    control?.updateValueAndValidity();
  }

  // Set errors manually
  setServerErrors(errors: Record<string, string>): void {
    Object.keys(errors).forEach(field => {
      const control = this.form.get(field);
      control?.setErrors({ serverError: errors[field] });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.validateForm(); // Show all errors
      return;
    }

    // Submit form...
  }
}`,
          description: 'Manual control over form validation state',
          copyable: true,
        },
      ],
      interviewTips: [
        'updateOn: blur is ideal for async validators',
        'markAllAsTouched() useful for showing errors on submit',
        'setErrors() allows setting server-side errors',
        'updateValueAndValidity() recalculates validation',
      ],
    },
    {
      id: 76,
      title: 'Dynamic Forms',
      content: `
        <h2>Building Forms Dynamically</h2>
        <p>Create forms based on configuration or API response.</p>

        <h3>Use Cases</h3>
        <ul>
          <li>Survey builders</li>
          <li>CMS-driven forms</li>
          <li>Configurable settings pages</li>
          <li>Multi-step wizards</li>
        </ul>

        <h3>Key Techniques</h3>
        <ul>
          <li>Build FormGroup from configuration</li>
          <li>Dynamically add/remove controls</li>
          <li>Conditional field visibility</li>
          <li>Render different input types</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 716,
          language: 'typescript',
          title: 'Dynamic Form Model',
          code: `// models/form-field.model.ts
export interface FormFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'textarea';
  value?: any;
  validators?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    email?: boolean;
    pattern?: string;
  };
  options?: { value: any; label: string }[]; // For select
  placeholder?: string;
  hint?: string;
  conditionalOn?: {
    field: string;
    value: any;
  };
}

// Example configuration
export const CONTACT_FORM_CONFIG: FormFieldConfig[] = [
  {
    key: 'name',
    label: 'Full Name',
    type: 'text',
    validators: { required: true, minLength: 2 }
  },
  {
    key: 'email',
    label: 'Email Address',
    type: 'email',
    validators: { required: true, email: true }
  },
  {
    key: 'contactType',
    label: 'Contact Type',
    type: 'select',
    validators: { required: true },
    options: [
      { value: 'general', label: 'General Inquiry' },
      { value: 'support', label: 'Technical Support' },
      { value: 'sales', label: 'Sales' }
    ]
  },
  {
    key: 'priority',
    label: 'Priority',
    type: 'select',
    conditionalOn: { field: 'contactType', value: 'support' },
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ]
  },
  {
    key: 'message',
    label: 'Message',
    type: 'textarea',
    validators: { required: true, maxLength: 1000 }
  }
];`,
          copyable: true,
        },
        {
          id: 717,
          language: 'typescript',
          title: 'Dynamic Form Service',
          code: `import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { FormFieldConfig } from './form-field.model';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}

  createForm(fields: FormFieldConfig[]): FormGroup {
    const group: Record<string, any> = {};

    fields.forEach(field => {
      const validators = this.buildValidators(field.validators);
      group[field.key] = [field.value || '', validators];
    });

    return this.fb.group(group);
  }

  private buildValidators(config?: FormFieldConfig['validators']): ValidatorFn[] {
    if (!config) return [];

    const validators: ValidatorFn[] = [];

    if (config.required) {
      validators.push(Validators.required);
    }
    if (config.minLength) {
      validators.push(Validators.minLength(config.minLength));
    }
    if (config.maxLength) {
      validators.push(Validators.maxLength(config.maxLength));
    }
    if (config.min !== undefined) {
      validators.push(Validators.min(config.min));
    }
    if (config.max !== undefined) {
      validators.push(Validators.max(config.max));
    }
    if (config.email) {
      validators.push(Validators.email);
    }
    if (config.pattern) {
      validators.push(Validators.pattern(config.pattern));
    }

    return validators;
  }

  // Add a field dynamically
  addField(form: FormGroup, field: FormFieldConfig): void {
    const validators = this.buildValidators(field.validators);
    form.addControl(field.key, this.fb.control(field.value || '', validators));
  }

  // Remove a field
  removeField(form: FormGroup, key: string): void {
    form.removeControl(key);
  }
}`,
          copyable: true,
        },
        {
          id: 718,
          language: 'typescript',
          title: 'Dynamic Form Component',
          code: `import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IonItem, IonInput, IonSelect, IonSelectOption,
         IonTextarea, IonCheckbox, IonText } from '@ionic/angular/standalone';
import { FormFieldConfig } from './form-field.model';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonCheckbox,
    IonText
  ],
  template: \`
    <form [formGroup]="form">
      @for (field of fields; track field.key) {
        @if (shouldShowField(field)) {
          <div class="form-field">
            @switch (field.type) {
              @case ('text') {
                <ion-item>
                  <ion-input
                    [formControlName]="field.key"
                    [label]="field.label"
                    labelPlacement="floating"
                    [placeholder]="field.placeholder"
                  ></ion-input>
                </ion-item>
              }
              @case ('email') {
                <ion-item>
                  <ion-input
                    type="email"
                    [formControlName]="field.key"
                    [label]="field.label"
                    labelPlacement="floating"
                  ></ion-input>
                </ion-item>
              }
              @case ('select') {
                <ion-item>
                  <ion-select
                    [formControlName]="field.key"
                    [label]="field.label"
                    labelPlacement="floating"
                  >
                    @for (opt of field.options; track opt.value) {
                      <ion-select-option [value]="opt.value">
                        {{ opt.label }}
                      </ion-select-option>
                    }
                  </ion-select>
                </ion-item>
              }
              @case ('textarea') {
                <ion-item>
                  <ion-textarea
                    [formControlName]="field.key"
                    [label]="field.label"
                    labelPlacement="floating"
                    [rows]="4"
                  ></ion-textarea>
                </ion-item>
              }
              @case ('checkbox') {
                <ion-item>
                  <ion-checkbox [formControlName]="field.key">
                    {{ field.label }}
                  </ion-checkbox>
                </ion-item>
              }
            }

            <!-- Error display -->
            @if (getControl(field.key)?.invalid && getControl(field.key)?.touched) {
              <ion-text color="danger" class="error-text">
                <small>{{ getErrorMessage(field) }}</small>
              </ion-text>
            }
          </div>
        }
      }
    </form>
  \`
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormFieldConfig[] = [];

  form!: FormGroup;
  private dynamicFormService = inject(DynamicFormService);

  ngOnInit(): void {
    this.form = this.dynamicFormService.createForm(this.fields);
  }

  shouldShowField(field: FormFieldConfig): boolean {
    if (!field.conditionalOn) return true;

    const dependentValue = this.form.get(field.conditionalOn.field)?.value;
    return dependentValue === field.conditionalOn.value;
  }

  getControl(key: string) {
    return this.form.get(key);
  }

  getErrorMessage(field: FormFieldConfig): string {
    const control = this.getControl(field.key);
    if (!control?.errors) return '';

    if (control.errors['required']) return \`\${field.label} is required\`;
    if (control.errors['email']) return 'Invalid email format';
    if (control.errors['minlength']) {
      return \`Minimum \${control.errors['minlength'].requiredLength} characters\`;
    }
    if (control.errors['maxlength']) {
      return \`Maximum \${control.errors['maxlength'].requiredLength} characters\`;
    }

    return 'Invalid value';
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Dynamic forms are built from configuration objects',
        'Use addControl/removeControl for dynamic fields',
        'Track conditional visibility with form value changes',
        'Centralize validator building in a service',
      ],
    },
    {
      id: 77,
      title: 'Ionic Form Components',
      content: `
        <h2>Forms with Ionic Components</h2>
        <p>Ionic provides enhanced form components optimized for mobile.</p>

        <h3>Key Ionic Form Components</h3>
        <ul>
          <li><strong>ion-input:</strong> Text input with floating labels</li>
          <li><strong>ion-textarea:</strong> Multi-line text input</li>
          <li><strong>ion-select:</strong> Dropdown/picker selection</li>
          <li><strong>ion-checkbox:</strong> Checkbox input</li>
          <li><strong>ion-toggle:</strong> On/off switch</li>
          <li><strong>ion-radio-group:</strong> Radio button group</li>
          <li><strong>ion-range:</strong> Slider input</li>
          <li><strong>ion-datetime:</strong> Date/time picker</li>
        </ul>

        <h3>Mobile-First Features</h3>
        <ul>
          <li>Native keyboard types (email, tel, number)</li>
          <li>Touch-friendly sizing</li>
          <li>Platform-specific styling</li>
          <li>Accessibility built-in</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 719,
          language: 'typescript',
          title: 'Complete Ionic Form',
          code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonTextarea, IonSelect,
  IonSelectOption, IonCheckbox, IonToggle, IonRange,
  IonRadioGroup, IonRadio, IonDatetime, IonDatetimeButton,
  IonModal, IonButton, IonNote
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-complete-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonTextarea, IonSelect,
    IonSelectOption, IonCheckbox, IonToggle, IonRange,
    IonRadioGroup, IonRadio, IonDatetime, IonDatetimeButton,
    IonModal, IonButton, IonNote
  ],
  template: \`
    <ion-content class="ion-padding">
      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
        <ion-list>
          <!-- Text Input -->
          <ion-item>
            <ion-input
              formControlName="fullName"
              label="Full Name"
              labelPlacement="floating"
              placeholder="Enter your name"
              [clearInput]="true"
            ></ion-input>
          </ion-item>

          <!-- Email Input -->
          <ion-item>
            <ion-input
              formControlName="email"
              type="email"
              label="Email"
              labelPlacement="floating"
              inputmode="email"
            ></ion-input>
          </ion-item>

          <!-- Phone Input -->
          <ion-item>
            <ion-input
              formControlName="phone"
              type="tel"
              label="Phone"
              labelPlacement="floating"
              inputmode="tel"
            ></ion-input>
          </ion-item>

          <!-- Select -->
          <ion-item>
            <ion-select
              formControlName="country"
              label="Country"
              labelPlacement="floating"
              interface="action-sheet"
            >
              <ion-select-option value="us">United States</ion-select-option>
              <ion-select-option value="uk">United Kingdom</ion-select-option>
              <ion-select-option value="ca">Canada</ion-select-option>
              <ion-select-option value="au">Australia</ion-select-option>
            </ion-select>
          </ion-item>

          <!-- Date Picker -->
          <ion-item>
            <ion-input
              label="Birth Date"
              labelPlacement="floating"
              [value]="birthDateFormatted"
              readonly
            >
              <ion-datetime-button datetime="birthdate" slot="end"></ion-datetime-button>
            </ion-input>
          </ion-item>

          <ion-modal [keepContentsMounted]="true">
            <ng-template>
              <ion-datetime
                id="birthdate"
                formControlName="birthDate"
                presentation="date"
                [max]="maxDate"
              ></ion-datetime>
            </ng-template>
          </ion-modal>

          <!-- Radio Group -->
          <ion-radio-group formControlName="gender">
            <ion-item>
              <ion-radio value="male">Male</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="female">Female</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="other">Other</ion-radio>
            </ion-item>
          </ion-radio-group>

          <!-- Range Slider -->
          <ion-item>
            <ion-range
              formControlName="experience"
              [min]="0"
              [max]="20"
              [pin]="true"
              [snaps]="true"
              [ticks]="true"
            >
              <span slot="start">0</span>
              <span slot="end">20 years</span>
            </ion-range>
          </ion-item>

          <!-- Textarea -->
          <ion-item>
            <ion-textarea
              formControlName="bio"
              label="Bio"
              labelPlacement="floating"
              [rows]="4"
              [counter]="true"
              [maxlength]="200"
            ></ion-textarea>
          </ion-item>

          <!-- Toggle -->
          <ion-item>
            <ion-toggle formControlName="newsletter">
              Subscribe to newsletter
            </ion-toggle>
          </ion-item>

          <!-- Checkbox -->
          <ion-item>
            <ion-checkbox formControlName="terms">
              I accept the terms and conditions
            </ion-checkbox>
          </ion-item>
        </ion-list>

        <ion-button
          type="submit"
          expand="block"
          [disabled]="profileForm.invalid"
        >
          Save Profile
        </ion-button>
      </form>
    </ion-content>
  \`
})
export class CompleteFormComponent {
  maxDate = new Date().toISOString();

  profileForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern(/^\\+?[1-9]\\d{9,14}$/)],
    country: ['', Validators.required],
    birthDate: [''],
    gender: [''],
    experience: [5],
    bio: ['', Validators.maxLength(200)],
    newsletter: [true],
    terms: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder) {}

  get birthDateFormatted(): string {
    const date = this.profileForm.get('birthDate')?.value;
    return date ? new Date(date).toLocaleDateString() : '';
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile data:', this.profileForm.value);
    }
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Use inputmode for mobile keyboard optimization',
        'interface="action-sheet" is more mobile-friendly for selects',
        'ion-datetime-button provides better UX than inline datetime',
        'Use counter and maxlength together for textarea feedback',
      ],
    },
    {
      id: 78,
      title: 'Error Handling Patterns',
      content: `
        <h2>Professional Error Handling</h2>
        <p>Create reusable error handling components and patterns.</p>

        <h3>Best Practices</h3>
        <ul>
          <li>Show errors only after user interaction (touched)</li>
          <li>Provide clear, actionable error messages</li>
          <li>Handle server-side validation errors</li>
          <li>Create reusable error display components</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 720,
          language: 'typescript',
          title: 'Reusable Error Component',
          code: `// components/form-errors/form-errors.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { IonText, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircle } from 'ionicons/icons';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [CommonModule, IonText, IonIcon],
  template: \`
    @if (control && control.invalid && (control.touched || showAll)) {
      <div class="error-container">
        @for (error of errorMessages; track error) {
          <ion-text color="danger" class="error-message">
            <ion-icon name="alert-circle"></ion-icon>
            <span>{{ error }}</span>
          </ion-text>
        }
      </div>
    }
  \`,
  styles: [\`
    .error-container {
      padding: 4px 16px;
    }
    .error-message {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      margin: 4px 0;
    }
    ion-icon {
      font-size: 14px;
    }
  \`]
})
export class FormErrorsComponent {
  @Input() control?: AbstractControl | null;
  @Input() showAll = false;
  @Input() customMessages: Record<string, string> = {};

  private defaultMessages: Record<string, (err: any) => string> = {
    required: () => 'This field is required',
    email: () => 'Please enter a valid email',
    minlength: (err) => \`Minimum \${err.requiredLength} characters required\`,
    maxlength: (err) => \`Maximum \${err.requiredLength} characters allowed\`,
    min: (err) => \`Minimum value is \${err.min}\`,
    max: (err) => \`Maximum value is \${err.max}\`,
    pattern: () => 'Invalid format',
    usernameTaken: () => 'Username is already taken',
    emailExists: () => 'Email is already registered',
    passwordMismatch: () => 'Passwords do not match',
    serverError: (err) => err
  };

  constructor() {
    addIcons({ alertCircle });
  }

  get errorMessages(): string[] {
    if (!this.control?.errors) return [];

    return Object.entries(this.control.errors).map(([key, value]) => {
      // Check custom messages first
      if (this.customMessages[key]) {
        return this.customMessages[key];
      }

      // Use default message generator
      const messageFn = this.defaultMessages[key];
      return messageFn ? messageFn(value) : \`Validation error: \${key}\`;
    });
  }
}

// Usage in template:
// <ion-input formControlName="email"></ion-input>
// <app-form-errors [control]="form.get('email')"></app-form-errors>`,
          copyable: true,
        },
        {
          id: 721,
          language: 'typescript',
          title: 'Server Error Handling',
          code: `import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';

interface ServerValidationError {
  field: string;
  message: string;
}

@Component({...})
export class RegistrationComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isLoading = false;
  generalError = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.generalError = '';

    this.authService.register(this.form.value).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleServerError(error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: () => {
        // Success - navigate to dashboard
        this.router.navigate(['/dashboard']);
      }
    });
  }

  private handleServerError(error: HttpErrorResponse): void {
    if (error.status === 422 && error.error?.errors) {
      // Validation errors from server
      const errors: ServerValidationError[] = error.error.errors;

      errors.forEach(err => {
        const control = this.form.get(err.field);
        if (control) {
          control.setErrors({ serverError: err.message });
        }
      });
    } else if (error.status === 409) {
      // Conflict - email/username already exists
      this.form.get('email')?.setErrors({
        serverError: 'Email already registered'
      });
    } else {
      // General error
      this.generalError = error.error?.message ||
        'An unexpected error occurred. Please try again.';
    }
  }
}`,
          copyable: true,
        },
        {
          id: 722,
          language: 'html',
          title: 'Complete Form with Errors',
          code: `<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- General error alert -->
  @if (generalError) {
    <ion-item color="danger" lines="none">
      <ion-icon name="alert-circle" slot="start"></ion-icon>
      <ion-label class="ion-text-wrap">{{ generalError }}</ion-label>
      <ion-button fill="clear" slot="end" (click)="generalError = ''">
        <ion-icon name="close" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-item>
  }

  <ion-list>
    <!-- Email -->
    <ion-item [class.ion-invalid]="email.invalid && email.touched">
      <ion-input
        formControlName="email"
        type="email"
        label="Email"
        labelPlacement="floating"
        errorText="Please enter a valid email"
      ></ion-input>
    </ion-item>
    <app-form-errors [control]="email"></app-form-errors>

    <!-- Username -->
    <ion-item [class.ion-invalid]="username.invalid && username.touched">
      <ion-input
        formControlName="username"
        label="Username"
        labelPlacement="floating"
      ></ion-input>
      @if (username.pending) {
        <ion-spinner slot="end" name="dots"></ion-spinner>
      }
    </ion-item>
    <app-form-errors
      [control]="username"
      [customMessages]="{ minlength: 'Username must be at least 3 characters' }"
    ></app-form-errors>

    <!-- Password -->
    <ion-item>
      <ion-input
        formControlName="password"
        type="password"
        label="Password"
        labelPlacement="floating"
      ></ion-input>
    </ion-item>
    <app-form-errors [control]="password"></app-form-errors>
  </ion-list>

  <ion-button
    type="submit"
    expand="block"
    [disabled]="form.invalid || isLoading"
  >
    @if (isLoading) {
      <ion-spinner name="crescent"></ion-spinner>
    } @else {
      Register
    }
  </ion-button>
</form>`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Create reusable error components for consistency',
        'Handle both client and server validation errors',
        'Use setErrors() for server-side errors',
        'Provide clear, user-friendly error messages',
      ],
    },
  ],
};
