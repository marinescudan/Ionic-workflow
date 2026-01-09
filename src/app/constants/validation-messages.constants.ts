// src/app/constants/validation-messages.constants.ts
// App-level constant - validation error messages for forms
// Note: This stays in the app (not API) as it contains logic functions

/**
 * Default validation error messages
 * Maps validator keys to error messages (string or function for dynamic values)
 */
export const VALIDATION_MESSAGES: Record<string, string | ((err: any) => string)> = {
  // Built-in Angular validators
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minlength: (err) => `Minimum ${err.requiredLength} characters required (currently ${err.actualLength})`,
  maxlength: (err) => `Maximum ${err.requiredLength} characters allowed`,
  min: (err) => `Value must be at least ${err.min}`,
  max: (err) => `Value cannot exceed ${err.max}`,
  pattern: 'Invalid format',

  // Custom validators - password requirements
  whitespace: 'Value cannot contain spaces',
  forbiddenValue: (err) => `"${err.value}" is not allowed`,
  noUppercase: 'Must contain an uppercase letter',
  noLowercase: 'Must contain a lowercase letter',
  noNumber: 'Must contain a number',
  noSpecial: 'Must contain a special character (!@#$%^&*)',
  passwordMismatch: 'Passwords do not match',

  // Custom validators - async/server
  usernameTaken: 'Username is already taken',
  emailExists: 'Email is already registered',
  invalidUrl: 'Please enter a valid URL',

  // Custom validators - age
  tooYoung: (err) => `Must be at least ${err.min} years old`,
  tooOld: (err) => `Must be under ${err.max} years old`,

  // Server-side errors
  serverError: (err) => err, // Server error is the message itself
};
