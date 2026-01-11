import { ErrorHandler, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * Global error handler for uncaught errors
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private router = inject(Router);

  handleError(error: Error | HttpErrorResponse) {
    console.error('🚨 Global Error Handler:', error);

    if (error instanceof HttpErrorResponse) {
      // HTTP error
      this.handleHttpError(error);
    } else {
      // Client-side error
      this.handleClientError(error);
    }
  }

  private handleHttpError(error: HttpErrorResponse) {
    console.error(`HTTP Error ${error.status}:`, error.message);

    // Could show toast notification here
    // this.toastService.show(error.message, 'error');

    // Redirect on certain errors
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
  }

  private handleClientError(error: Error) {
    console.error('Client Error:', error.message);
    console.error('Stack:', error.stack);

    // Could report to error tracking service (Sentry, Rollbar)
    // this.errorReportingService.reportError(error);
  }
}

// Register in app.config.ts:
// providers: [
//   { provide: ErrorHandler, useClass: GlobalErrorHandler }
// ]