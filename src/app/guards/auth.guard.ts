import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1), // Take only first emission
    map(isLoggedIn => {
      if (!isLoggedIn) {
        console.log('❌ Auth Guard: Not logged in, redirecting to login');
        router.navigate(['/login']);
        return false;
      }
      console.log('✅ Auth Guard: Authenticated, allowing access');
      return true;
    })
  );
};
