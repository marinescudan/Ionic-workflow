import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '@services/storage/storage.service';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  // Derived observable for login status
  public isLoggedIn$: Observable<boolean> = new Observable(subscriber => {
    this.user$.subscribe(user => subscriber.next(!!user));
  });

  constructor(private storage: StorageService) {
    this.loadUser();
  }

  private loadUser(): void {
    const user = this.storage.get<User>('auth-user');
    if (user) {
      this.userSubject.next(user);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable(subscriber => {
      // Mock authentication
      setTimeout(() => {
        const user: User = {
          id: 1,
          name: 'John Doe',
          email,
          role: email.includes('admin') ? 'admin' : 'user',
        };

        this.userSubject.next(user);
        this.storage.set('auth-user', user);
        subscriber.next(true);
        subscriber.complete();
      }, 500);
    });
  }

  logout(): void {
    this.userSubject.next(null);
    this.storage.remove('auth-user');
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  getToken(): string | null {
    // Mock token - in real app, would be stored during login
    const user = this.getCurrentUser();
    return user ? `mock-jwt-token-${user.id}` : null;
  }
}
