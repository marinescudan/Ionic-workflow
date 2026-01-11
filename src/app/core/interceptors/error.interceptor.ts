import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Intercepts HTTP errors and handles them gracefully
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    // Retry failed requests (except 4xx errors)
    retry({
      count: 2,
      delay: (error: HttpErrorResponse, retryCount) => {
        // Don't retry client errors (400-499)
        if (error.status >= 400 && error.status < 500) {
          throw error;
        }

        // Exponential backoff: 1s, 2s
        return timer(retryCount * 1000);
      },
    }),

    // Catch and handle errors
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Network error: ${error.error.message}`;
      } else {
        // Backend error
        errorMessage = handleBackendError(error);
      }

      // Handle specific status codes
      switch (error.status) {
        case 401:
          // Unauthorized - redirect to login
          router.navigate(['/login']);
          break;
        case 403:
          // Forbidden
          console.error('Access denied');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
        case 502:
        case 503:
          // Server errors
          console.error('Server error - please try again later');
          break;
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};

/**
 * Helper: Extract error message from backend response
 */
function handleBackendError(error: HttpErrorResponse): string {
  // Try to extract error message from various response formats
  if (error.error?.message) {
    return error.error.message;
  }
  if (error.error?.error) {
    return error.error.error;
  }
  if (typeof error.error === 'string') {
    return error.error;
  }
  return `Server error: ${error.status} ${error.statusText}`;
}
