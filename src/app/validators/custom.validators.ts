import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator that checks if value contains no whitespace
 */
export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const hasWhitespace = /\s/.test(control.value);
  return hasWhitespace ? { whitespace: true } : null;
}

/**
 * Validator factory for forbidden values
 */
export function forbiddenValueValidator(forbidden: string | string[]): ValidatorFn {
  const forbiddenList = Array.isArray(forbidden) ? forbidden : [forbidden];

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const isForbidden = forbiddenList.some(
      f => control.value.toLowerCase() === f.toLowerCase()
    );

    return isForbidden
      ? { forbiddenValue: { value: control.value, forbidden: forbiddenList } }
      : null;
  };
}

/**
 * Strong password validator
 * Requires: uppercase, lowercase, number, special character
 */
export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const errors: ValidationErrors = {};

  if (!/[A-Z]/.test(value)) errors['noUppercase'] = true;
  if (!/[a-z]/.test(value)) errors['noLowercase'] = true;
  if (!/\d/.test(value)) errors['noNumber'] = true;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors['noSpecial'] = true;

  return Object.keys(errors).length ? errors : null;
}

/**
 * Password match validator (cross-field)
 * Apply to FormGroup containing password and confirmPassword
 */
export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

/**
 * Age range validator
 */
export function ageRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const age = Number(control.value);
    if (isNaN(age)) return { notANumber: true };

    if (age < min) return { tooYoung: { min, actual: age } };
    if (age > max) return { tooOld: { max, actual: age } };

    return null;
  };
}

/**
 * URL validator (more strict than pattern)
 */
export function urlValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  try {
    new URL(control.value);
    return null;
  } catch {
    return { invalidUrl: true };
  }
}
