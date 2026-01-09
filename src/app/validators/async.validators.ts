import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError, first } from 'rxjs/operators';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Check if username is available (simulated)
 */
export function usernameAvailableValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value || control.value.length < 3) {
      return of(null);
    }

    // Simulate API call with timer
    return timer(500).pipe(
      switchMap(() => {
        // Simulated taken usernames
        const takenUsernames = ['admin', 'root', 'user', 'test', 'ionic', 'angular'];
        const isTaken = takenUsernames.includes(control.value.toLowerCase());

        return of(isTaken ? { usernameTaken: true } : null);
      }),
      first()
    );
  };
}

/**
 * Check if email is already registered (simulated)
 */
export function emailUniqueValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return timer(500).pipe(
      switchMap(() => {
        // Simulated registered emails
        const registeredEmails = [
          'test@example.com',
          'admin@example.com',
          'user@ionic.io'
        ];
        const exists = registeredEmails.includes(control.value.toLowerCase());

        return of(exists ? { emailExists: true } : null);
      }),
      first()
    );
  };
}

/**
 * Factory for HTTP-based async validator
 * Use when you have actual API endpoints
 */
export function createHttpValidator(
  endpoint: string,
  paramName: string
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const http = inject(HttpClient);

    if (!control.value) {
      return of(null);
    }

    return timer(300).pipe(
      switchMap(() =>
        http.get<{ available: boolean }>(`${endpoint}?${paramName}=${control.value}`)
      ),
      map(response => response.available ? null : { notAvailable: true }),
      catchError(() => of(null)), // On error, don't block form
      first()
    );
  };
}
