import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';

/**
 * Class-based interceptor (Angular <15 pattern)
 * Still valid but functional interceptors are preferred
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (!token || req.url.includes('/auth/')) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authReq);
  }
}

// Register in app.config.ts (old way):
// providers: [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// ]