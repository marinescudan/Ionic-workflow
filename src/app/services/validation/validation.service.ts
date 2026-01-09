import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export interface ValidationMessage {
  key: string;
  message: string | ((error: any) => string);
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  // Default error messages
  private defaultMessages: Record<string, string | ((err: any) => string)> = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: (err) => `Minimum ${err.requiredLength} characters required (currently ${err.actualLength})`,
    maxlength: (err) => `Maximum ${err.requiredLength} characters allowed`,
    min: (err) => `Value must be at least ${err.min}`,
    max: (err) => `Value cannot exceed ${err.max}`,
    pattern: 'Invalid format',

    // Custom validators
    whitespace: 'Value cannot contain spaces',
    forbiddenValue: (err) => `"${err.value}" is not allowed`,
    noUppercase: 'Must contain an uppercase letter',
    noLowercase: 'Must contain a lowercase letter',
    noNumber: 'Must contain a number',
    noSpecial: 'Must contain a special character (!@#$%^&*)',
    passwordMismatch: 'Passwords do not match',
    usernameTaken: 'Username is already taken',
    emailExists: 'Email is already registered',
    invalidUrl: 'Please enter a valid URL',
    tooYoung: (err) => `Must be at least ${err.min} years old`,
    tooOld: (err) => `Must be under ${err.max} years old`,
    serverError: (err) => err // Server error is the message itself
  };

  constructor() {}

  /**
   * Get all error messages for a control
   */
  getErrors(control: AbstractControl | null, customMessages?: Record<string, string>): string[] {
    if (!control?.errors) return [];

    return Object.entries(control.errors).map(([key, value]) => {
      // Check custom messages first
      if (customMessages?.[key]) {
        return customMessages[key];
      }

      // Use default message
      const defaultMsg = this.defaultMessages[key];
      if (typeof defaultMsg === 'function') {
        return defaultMsg(value);
      }
      return defaultMsg || `Validation error: ${key}`;
    });
  }

  /**
   * Get first error message for a control
   */
  getFirstError(control: AbstractControl | null, customMessages?: Record<string, string>): string {
    const errors = this.getErrors(control, customMessages);
    return errors[0] || '';
  }

  /**
   * Check if control has specific error
   */
  hasError(control: AbstractControl | null, errorKey: string): boolean {
    return control?.hasError(errorKey) || false;
  }

  /**
   * Check if control should show error (invalid and touched)
   */
  shouldShowError(control: AbstractControl | null): boolean {
    return control ? control.invalid && control.touched : false;
  }

  /**
   * Mark all controls as touched to show all errors
   */
  markAllAsTouched(form: FormGroup): void {
    form.markAllAsTouched();
  }

  /**
   * Set server-side errors on form controls
   */
  setServerErrors(form: FormGroup, errors: Record<string, string>): void {
    Object.entries(errors).forEach(([field, message]) => {
      const control = form.get(field);
      if (control) {
        control.setErrors({ serverError: message });
      }
    });
  }

  /**
   * Calculate password strength (0-100)
   */
  getPasswordStrength(password: string): number {
    if (!password) return 0;

    let strength = 0;

    // Length
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;

    // Character types
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;

    return Math.min(100, strength);
  }

  /**
   * Get password strength label
   */
  getPasswordStrengthLabel(password: string): { label: string; color: string } {
    const strength = this.getPasswordStrength(password);

    if (strength < 30) return { label: 'Weak', color: 'danger' };
    if (strength < 60) return { label: 'Fair', color: 'warning' };
    if (strength < 80) return { label: 'Good', color: 'primary' };
    return { label: 'Strong', color: 'success' };
  }
}
