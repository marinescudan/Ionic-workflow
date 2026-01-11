import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/**
 * Logs all HTTP requests and responses (useful for debugging)
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  console.log(`🚀 HTTP Request: ${req.method} ${req.url}`);
  console.log('   Headers:', req.headers);
  if (req.body) {
    console.log('   Body:', req.body);
  }

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          console.log(`✅ HTTP Response: ${req.method} ${req.url} (${duration}ms)`);
          console.log('   Status:', event.status, event.statusText);
          console.log('   Body:', event.body);
        }
      },
      error: (error) => {
        const duration = Date.now() - startTime;
        console.error(`❌ HTTP Error: ${req.method} ${req.url} (${duration}ms)`);
        console.error('   Error:', error);
      },
    })
  );
};
