import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonBackButton, IonSegment, IonSegmentButton, IonLabel,
  IonList, IonItem, IonInput, IonButton, IonSpinner,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonIcon, IonText, IonNote
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personAdd, create, settings, checkmarkCircle,
  alertCircle, eye, eyeOff
} from 'ionicons/icons';

import { FormErrorsComponent } from '@components/form-errors/form-errors.component';
import { PasswordStrengthComponent } from '@components/password-strength/password-strength.component';
import { ValidationService } from '@services/validation/validation.service';
import {
  noWhitespaceValidator,
  forbiddenValueValidator,
  strongPasswordValidator,
  passwordMatchValidator
} from '@app/validators/custom.validators';
import {
  usernameAvailableValidator,
  emailUniqueValidator
} from '@app/validators/async.validators';

type FormType = 'registration' | 'profile' | 'dynamic';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonText,
    IonNote,
    FormErrorsComponent,
    PasswordStrengthComponent
],
  templateUrl: './forms-demo.page.html',
  styleUrls: ['./forms-demo.page.scss']
})
export class FormsDemoPage {
  private fb = inject(FormBuilder);
  public validationService = inject(ValidationService);

  selectedForm: FormType = 'registration';
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  submitSuccess = false;

  // Registration Form with all validations
  registrationForm = this.fb.group({
    username: ['',
      [Validators.required, Validators.minLength(3), noWhitespaceValidator, forbiddenValueValidator(['admin', 'root'])],
      [usernameAvailableValidator()]
    ],
    email: ['',
      [Validators.required, Validators.email],
      [emailUniqueValidator()]
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      strongPasswordValidator
    ]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: [passwordMatchValidator()]
  });

  // Profile Form with nested groups
  profileForm = this.fb.group({
    personalInfo: this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^\+?[1-9]\d{9,14}$/)]
    }),
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zipCode: ['', Validators.pattern(/^\d{5}(-\d{4})?$/)]
    }),
    preferences: this.fb.group({
      newsletter: [true],
      notifications: [true],
      theme: ['auto']
    })
  });

  constructor() {
    addIcons({
      personAdd, create, settings, checkmarkCircle,
      alertCircle, eye, eyeOff
    });
  }

  // Getters for registration form
  get username() { return this.registrationForm.get('username')!; }
  get email() { return this.registrationForm.get('email')!; }
  get password() { return this.registrationForm.get('password')!; }
  get confirmPassword() { return this.registrationForm.get('confirmPassword')!; }

  // Getters for profile form
  get personalInfo() { return this.profileForm.get('personalInfo')!; }
  get address() { return this.profileForm.get('address')!; }

  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSegmentChange(event: any): void {
    this.selectedForm = event.detail.value;
    this.submitSuccess = false;
  }

  async submitRegistration(): Promise<void> {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Registration data:', this.registrationForm.value);
    this.isSubmitting = false;
    this.submitSuccess = true;

    // Reset form after success
    setTimeout(() => {
      this.registrationForm.reset();
      this.submitSuccess = false;
    }, 3000);
  }

  async submitProfile(): Promise<void> {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Profile data:', this.profileForm.value);
    this.isSubmitting = false;
    this.submitSuccess = true;
  }
}
