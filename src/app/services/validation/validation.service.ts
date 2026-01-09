import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { VALIDATION_MESSAGES } from '@constants/validation-messages.constants';

export interface ValidationMessage {
  key: string;
  message: string | ((error: any) => string);
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  // Default error messages (from app constants)
  private defaultMessages = VALIDATION_MESSAGES;

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
