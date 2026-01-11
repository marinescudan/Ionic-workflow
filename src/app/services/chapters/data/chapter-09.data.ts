// src/app/services/chapters/data/chapter-09.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_09_DATA: Chapter = {
  id: 9,
  title: 'HTTP & API Integration',
  description: 'Master HTTP communication with interceptors, caching, and NgRx effects',
  icon: 'cloud-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 90,
      title: 'HttpClient Fundamentals',
      content: `
        <h2>Understanding HTTP in Angular</h2>
        <p>Angular's HttpClient is a powerful service for making HTTP requests. It's built on RxJS Observables and provides type safety, interceptors, and automatic JSON parsing.</p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Observable-based:</strong> Returns RxJS Observables, not Promises</li>
          <li><strong>Type-safe:</strong> Use TypeScript generics for compile-time checking</li>
          <li><strong>Interceptors:</strong> Middleware for requests and responses</li>
          <li><strong>Automatic JSON:</strong> Parses JSON responses automatically</li>
          <li><strong>Request/Response transformation:</strong> Pipe operators for data manipulation</li>
        </ul>

        <h3>HTTP Methods Overview</h3>
        <table>
          <tr>
            <th>Method</th>
            <th>Purpose</th>
            <th>Has Body</th>
            <th>Idempotent</th>
          </tr>
          <tr>
            <td>GET</td>
            <td>Retrieve data</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>Create new resource</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>PUT</td>
            <td>Replace entire resource</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>PATCH</td>
            <td>Partial update</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>DELETE</td>
            <td>Remove resource</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
        </table>

        <h3>Setup Requirements</h3>
        <p>Modern Angular (15+) uses functional configuration:</p>
        <ul>
          <li><strong>Old way:</strong> Import HttpClientModule in @NgModule</li>
          <li><strong>New way:</strong> Use provideHttpClient() in providers</li>
          <li>New approach is tree-shakable and works with standalone components</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 900,
          language: 'typescript',
          title: 'HTTP Communication Flow',
          code: `// HTTP Communication Flow in Angular:
//
// ┌──────────────┐
// │  COMPONENT   │
// │   (calls)    │
// └──────┬───────┘
//        │
//        ▼
// ┌──────────────┐
// │   SERVICE    │
// │  (HttpClient)│
// └──────┬───────┘
//        │
//        ▼
// ┌──────────────┐
// │ INTERCEPTORS │ ← Auth, Error, Cache, Logging
// │  (chain)     │
// └──────┬───────┘
//        │
//        ▼
// ┌──────────────┐
// │ HTTP REQUEST │ → Network (Backend API)
// └──────┬───────┘
//        │
//        ▼
// ┌──────────────┐
// │ HTTP RESPONSE│ ← Network (Backend API)
// └──────┬───────┘
//        │
//        ▼
// ┌──────────────┐
// │ INTERCEPTORS │ ← Process response
// │  (reverse)   │
// └──────┬───────┘
//        │
//        ▼
// ┌──────────────┐
// │   SERVICE    │
// │  (Observable)│
// └──────┬───────┘
//        │
//        ▼
// ┌──────────────┐
// │  COMPONENT   │
// │ (subscribes) │
// └──────────────┘`,
          description: 'Understanding the HTTP request/response lifecycle',
          copyable: true,
        },
        {
          id: 901,
          language: 'typescript',
          title: 'HttpClient Setup',
          code: `// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // Modern HttpClient setup (Angular 15+)
    provideHttpClient(),
  ],
};`,
          description: 'Modern HttpClient configuration',
          copyable: true,
        },
        {
          id: 902,
          language: 'typescript',
          title: 'Basic GET Request',
          code: `// src/app/services/users-api.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.example.com/users';

  // GET: Fetch all users
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // GET: Fetch single user by ID
  getById(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.baseUrl}/\${id}\`);
  }

  // GET: With query parameters
  search(query: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, {
      params: { q: query, limit: '10' }
    });
  }
}`,
          description: 'Type-safe GET requests with HttpClient',
          copyable: true,
        },
        {
          id: 903,
          language: 'typescript',
          title: 'POST, PUT, PATCH, DELETE Requests',
          code: `// src/app/services/users-api.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CreateUserDto {
  name: string;
  email: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.example.com/users';

  // POST: Create new user
  create(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.baseUrl, dto);
  }

  // PUT: Full update
  update(id: number, dto: UpdateUserDto): Observable<User> {
    return this.http.put<User>(\`\${this.baseUrl}/\${id}\`, dto);
  }

  // PATCH: Partial update (preferred)
  patch(id: number, dto: Partial<User>): Observable<User> {
    return this.http.patch<User>(\`\${this.baseUrl}/\${id}\`, dto);
  }

  // DELETE: Remove user
  delete(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.baseUrl}/\${id}\`);
  }
}`,
          description: 'Complete CRUD operations with HttpClient',
          copyable: true,
        },
      ],
      interviewTips: [
        'HttpClient returns Observables, not Promises - must subscribe to execute',
        'Use TypeScript generics <T> for type safety in requests',
        'Observables are cold - request only fires when subscribed',
        'Automatic JSON parsing for response bodies',
        'provideHttpClient() is the modern setup (Angular 15+)',
      ],
    },
    {
      id: 91,
      title: 'Generic API Service Pattern',
      content: `
        <h2>Building Reusable API Services</h2>
        <p>A generic API service reduces boilerplate and provides consistent HTTP handling across your application.</p>

        <h3>Benefits of Generic Services</h3>
        <ul>
          <li><strong>DRY Principle:</strong> Write once, use everywhere</li>
          <li><strong>Type Safety:</strong> Generic types ensure compile-time checking</li>
          <li><strong>Centralized Configuration:</strong> Base URL, headers, error handling</li>
          <li><strong>Easier Testing:</strong> Mock single service instead of many</li>
          <li><strong>Consistent Patterns:</strong> All API calls follow same structure</li>
        </ul>

        <h3>Service Architecture</h3>
        <pre>
Generic ApiService (base)
    ↓
Feature Services (users, posts, etc.)
    ↓
Components (dispatch/call)
        </pre>

        <h3>Best Practices</h3>
        <ul>
          <li>Use interfaces for request/response types</li>
          <li>Separate DTOs (Data Transfer Objects) from domain models</li>
          <li>Handle errors at service level when possible</li>
          <li>Provide type parameters for all HTTP methods</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 910,
          language: 'typescript',
          title: 'Generic API Service',
          code: `// src/app/core/services/api/api.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface QueryOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.example.com';

  /**
   * Generic GET request
   */
  get<T>(endpoint: string, options?: QueryOptions): Observable<T> {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const httpOptions = this.buildHttpOptions(options);
    return this.http.get<T>(url, httpOptions);
  }

  /**
   * Generic POST request
   */
  post<T>(endpoint: string, body: any, options?: QueryOptions): Observable<T> {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const httpOptions = this.buildHttpOptions(options);
    return this.http.post<T>(url, body, httpOptions);
  }

  /**
   * Generic PUT request
   */
  put<T>(endpoint: string, body: any, options?: QueryOptions): Observable<T> {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const httpOptions = this.buildHttpOptions(options);
    return this.http.put<T>(url, body, httpOptions);
  }

  /**
   * Generic PATCH request
   */
  patch<T>(endpoint: string, body: any, options?: QueryOptions): Observable<T> {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const httpOptions = this.buildHttpOptions(options);
    return this.http.patch<T>(url, body, httpOptions);
  }

  /**
   * Generic DELETE request
   */
  delete<T = void>(endpoint: string, options?: QueryOptions): Observable<T> {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const httpOptions = this.buildHttpOptions(options);
    return this.http.delete<T>(url, httpOptions);
  }

  /**
   * Helper: Build HTTP options
   */
  private buildHttpOptions(options?: QueryOptions) {
    const httpOptions: any = {};

    if (options?.params) {
      httpOptions.params = new HttpParams();
      Object.entries(options.params).forEach(([key, value]) => {
        httpOptions.params = httpOptions.params.set(key, String(value));
      });
    }

    if (options?.headers) {
      httpOptions.headers = new HttpHeaders(options.headers);
    }

    return httpOptions;
  }
}`,
          description: 'Reusable generic API service for all HTTP operations',
          copyable: true,
        },
        {
          id: 911,
          language: 'typescript',
          title: 'Feature Service Using Generic API',
          code: `// src/app/features/posts/services/posts.service.ts

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@app/core/services/api/api.service';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostDto {
  title: string;
  body: string;
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private api = inject(ApiService);

  getAll(): Observable<Post[]> {
    return this.api.get<Post[]>('/posts');
  }

  getById(id: number): Observable<Post> {
    return this.api.get<Post>(\`/posts/\${id}\`);
  }

  getByUser(userId: number): Observable<Post[]> {
    return this.api.get<Post[]>('/posts', {
      params: { userId }
    });
  }

  create(dto: CreatePostDto): Observable<Post> {
    return this.api.post<Post>('/posts', dto);
  }

  update(id: number, dto: Partial<Post>): Observable<Post> {
    return this.api.patch<Post>(\`/posts/\${id}\`, dto);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(\`/posts/\${id}\`);
  }
}`,
          description: 'Clean feature service using generic API',
          copyable: true,
        },
      ],
      interviewTips: [
        'Generic services reduce boilerplate across the application',
        'Use TypeScript generics <T> for flexible, type-safe APIs',
        'Centralize base URL and common configuration',
        'Feature services inject generic API service',
        'Easier to mock for testing',
      ],
    },
    {
      id: 92,
      title: 'HTTP Interceptors',
      content: `
        <h2>Interceptors: HTTP Middleware</h2>
        <p>Interceptors allow you to inspect and transform HTTP requests and responses. They're essential for cross-cutting concerns like authentication, logging, and error handling.</p>

        <h3>Common Use Cases</h3>
        <ul>
          <li><strong>Authentication:</strong> Add auth tokens to requests</li>
          <li><strong>Error Handling:</strong> Catch and transform errors globally</li>
          <li><strong>Logging:</strong> Log all requests/responses for debugging</li>
          <li><strong>Caching:</strong> Cache GET requests to reduce server load</li>
          <li><strong>Loading Indicators:</strong> Track active requests</li>
          <li><strong>Header Injection:</strong> Add common headers to all requests</li>
        </ul>

        <h3>Interceptor Execution Order</h3>
        <table>
          <tr>
            <th>Phase</th>
            <th>Order</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>Request</td>
            <td>First → Last</td>
            <td>Interceptors run in registration order</td>
          </tr>
          <tr>
            <td>Response</td>
            <td>Last → First</td>
            <td>Reverse order (like middleware stack)</td>
          </tr>
        </table>

        <h3>Functional vs Class-Based</h3>
        <ul>
          <li><strong>Functional (Angular 15+):</strong> Preferred, tree-shakable, simpler</li>
          <li><strong>Class-based (Legacy):</strong> Still valid but more verbose</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 920,
          language: 'typescript',
          title: 'Authentication Interceptor',
          code: `// src/app/core/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

/**
 * Adds authentication token to all requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Skip auth for login/register endpoints
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }

  // Clone request and add Authorization header
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: \`Bearer \${token}\`,
      },
    });
    return next(authReq);
  }

  return next(req);
};`,
          description: 'Automatically inject auth tokens into requests',
          copyable: true,
        },
        {
          id: 921,
          language: 'typescript',
          title: 'Error Handling Interceptor',
          code: `// src/app/core/interceptors/error.interceptor.ts

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    // Retry failed requests (except 4xx)
    retry({
      count: 2,
      delay: (error: HttpErrorResponse, retryCount) => {
        // Don't retry client errors
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
        // Client-side error
        errorMessage = \`Network error: \${error.error.message}\`;
      } else {
        // Backend error
        errorMessage = error.error?.message || \`Error \${error.status}\`;
      }

      // Handle specific status codes
      if (error.status === 401) {
        router.navigate(['/login']);
      }

      console.error('HTTP Error:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};`,
          description: 'Global error handling with retry logic',
          copyable: true,
        },
        {
          id: 922,
          language: 'typescript',
          title: 'Caching Interceptor',
          code: `// src/app/core/interceptors/cache.interceptor.ts

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

const cache = new Map<string, HttpResponse<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  // Skip cache for requests with 'X-Skip-Cache' header
  if (req.headers.has('X-Skip-Cache')) {
    return next(req);
  }

  const cacheKey = req.urlWithParams;
  const cached = cache.get(cacheKey);

  // Return cached response if valid
  if (cached) {
    const age = Date.now() - Number(cached.headers.get('X-Cache-Time'));
    if (age < CACHE_TTL) {
      console.log('📦 Cache HIT:', cacheKey);
      return of(cached.clone());
    }
    cache.delete(cacheKey);
  }

  console.log('🌐 Cache MISS:', cacheKey);

  // Fetch and cache response
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const cachedResponse = event.clone({
          headers: event.headers.set('X-Cache-Time', Date.now().toString()),
        });
        cache.set(cacheKey, cachedResponse);
      }
    })
  );
};

export function clearHttpCache() {
  cache.clear();
}`,
          description: 'In-memory caching for GET requests',
          copyable: true,
        },
        {
          id: 923,
          language: 'typescript',
          title: 'Logging Interceptor',
          code: `// src/app/core/interceptors/logging.interceptor.ts

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  console.log(\`🚀 HTTP Request: \${req.method} \${req.url}\`);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          console.log(\`✅ HTTP Response: \${req.method} \${req.url} (\${duration}ms)\`);
          console.log('   Status:', event.status);
        }
      },
      error: (error) => {
        const duration = Date.now() - startTime;
        console.error(\`❌ HTTP Error: \${req.method} \${req.url} (\${duration}ms)\`);
        console.error('   Error:', error);
      },
    })
  );
};`,
          description: 'Log all HTTP requests and responses',
          copyable: true,
        },
        {
          id: 924,
          language: 'typescript',
          title: 'Registering Interceptors',
          code: `// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@app/core/interceptors/auth.interceptor';
import { errorInterceptor } from '@app/core/interceptors/error.interceptor';
import { loggingInterceptor } from '@app/core/interceptors/logging.interceptor';
import { cacheInterceptor } from '@app/core/interceptors/cache.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        loggingInterceptor,   // 1. Log first
        authInterceptor,      // 2. Add auth
        cacheInterceptor,     // 3. Cache
        errorInterceptor,     // 4. Handle errors
      ])
    ),
  ],
};`,
          description: 'Configure interceptor chain',
          copyable: true,
        },
      ],
      interviewTips: [
        'Interceptors form a chain - order matters for requests, reverse for responses',
        'Must clone HttpRequest (immutable)',
        'Use inject() for dependencies in functional interceptors',
        'Functional interceptors preferred (Angular 15+) - tree-shakable',
        'next() forwards request to next interceptor or backend',
      ],
    },
    {
      id: 93,
      title: 'Error Handling & Retry Logic',
      content: `
        <h2>Robust Error Handling</h2>
        <p>Production applications need comprehensive error handling to provide good UX and debug issues effectively.</p>

        <h3>Error Types</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Cause</th>
            <th>Handling Strategy</th>
          </tr>
          <tr>
            <td>Network Error (status 0)</td>
            <td>No internet, CORS, DNS failure</td>
            <td>Retry, show connection error</td>
          </tr>
          <tr>
            <td>4xx Client Errors</td>
            <td>Bad request, unauthorized, not found</td>
            <td>Don't retry, show validation errors</td>
          </tr>
          <tr>
            <td>5xx Server Errors</td>
            <td>Server crash, database down</td>
            <td>Retry with backoff, show generic error</td>
          </tr>
          <tr>
            <td>Timeout</td>
            <td>Request too slow</td>
            <td>Cancel, retry, show timeout message</td>
          </tr>
        </table>

        <h3>Error Handling Levels</h3>
        <ul>
          <li><strong>Interceptor Level:</strong> Global handling (401 redirect, retry)</li>
          <li><strong>Service Level:</strong> Transform errors, normalize data</li>
          <li><strong>Component Level:</strong> Display errors to user</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Don't retry 4xx errors (client mistakes)</li>
          <li>Use exponential backoff for retries</li>
          <li>Limit retry count to avoid infinite loops</li>
          <li>Show user-friendly error messages</li>
          <li>Log errors for debugging</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 930,
          language: 'typescript',
          title: 'Component-Level Error Handling',
          code: `// src/app/features/posts/pages/posts-list.page.ts

import { Component, OnInit, inject, signal } from '@angular/core';
import { PostsService, Post } from '../../services/posts.service';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  standalone: true,
})
export class PostsListPage implements OnInit {
  private postsService = inject(PostsService);

  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading.set(true);
    this.error.set(null);

    this.postsService
      .getAll()
      .pipe(
        catchError((err) => {
          this.error.set(err.message || 'Failed to load posts');
          return of([]);
        }),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe((posts) => {
        this.posts.set(posts);
      });
  }
}`,
          description: 'Handle errors at component level with signals',
          copyable: true,
        },
        {
          id: 931,
          language: 'typescript',
          title: 'Service-Level Error Handling',
          code: `// src/app/features/posts/services/posts.service.ts

import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { ApiService } from '@app/core/services/api/api.service';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private api = inject(ApiService);
  private readonly REQUEST_TIMEOUT = 10000;

  getAll(): Observable<Post[]> {
    return this.api.get<Post[]>('/posts').pipe(
      timeout(this.REQUEST_TIMEOUT),
      map((posts) => posts.map(this.normalizePost)),
      catchError((error) => {
        console.error('Failed to fetch posts:', error);
        const message = this.getErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  private normalizePost(post: any): Post {
    return {
      id: Number(post.id),
      title: post.title?.trim() || 'Untitled',
      body: post.body?.trim() || '',
      userId: Number(post.userId),
    };
  }

  private getErrorMessage(error: any): string {
    if (error.name === 'TimeoutError') {
      return 'Request timed out. Please check your connection.';
    }
    if (error.status === 0) {
      return 'Network error. Please check your internet.';
    }
    if (error.status >= 500) {
      return 'Server error. Please try again later.';
    }
    return error.message || 'An unexpected error occurred';
  }
}`,
          description: 'Transform and handle errors at service level',
          copyable: true,
        },
        {
          id: 932,
          language: 'typescript',
          title: 'Retry Logic with Exponential Backoff',
          code: `// Retry with exponential backoff

import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

getData(): Observable<Data> {
  return this.http.get<Data>(url).pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => {
        // Don't retry 4xx errors
        if (error.status >= 400 && error.status < 500) {
          throw error;
        }
        // Exponential backoff: 1s, 2s, 4s
        const delayMs = Math.pow(2, retryCount - 1) * 1000;
        console.log(\`Retry \${retryCount}/3 in \${delayMs}ms\`);
        return timer(delayMs);
      }
    }),
    catchError((error) => {
      console.error('Request failed after retries:', error);
      return throwError(() => error);
    })
  );
}`,
          description: 'Smart retry with exponential backoff',
          copyable: true,
        },
        {
          id: 933,
          language: 'typescript',
          title: 'Global Error Handler',
          code: `// src/app/core/services/global-error-handler.service.ts

import { ErrorHandler, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private router = inject(Router);

  handleError(error: Error | HttpErrorResponse) {
    console.error('🚨 Global Error:', error);

    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else {
      this.handleClientError(error);
    }
  }

  private handleHttpError(error: HttpErrorResponse) {
    console.error(\`HTTP Error \${error.status}:\`, error.message);

    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
  }

  private handleClientError(error: Error) {
    console.error('Client Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Register in app.config.ts:
// { provide: ErrorHandler, useClass: GlobalErrorHandler }`,
          description: 'Catch all unhandled errors globally',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use catchError() to handle errors in observable streams',
        'finalize() runs on both success and error (like finally)',
        'Don\'t retry 4xx errors - they\'re client mistakes',
        'Exponential backoff reduces server load during retries',
        'throwError() propagates errors to subscribers',
      ],
    },
    {
      id: 94,
      title: 'File Upload & Download',
      content: `
        <h2>Working with Files</h2>
        <p>File operations require special handling - multipart/form-data for uploads and Blob for downloads.</p>

        <h3>File Upload Best Practices</h3>
        <ul>
          <li><strong>FormData:</strong> Use FormData API for multipart/form-data</li>
          <li><strong>Progress Tracking:</strong> Enable reportProgress for upload feedback</li>
          <li><strong>File Validation:</strong> Check size and type on client before upload</li>
          <li><strong>Multiple Files:</strong> Append multiple files to single FormData</li>
        </ul>

        <h3>HTTP Event Types</h3>
        <table>
          <tr>
            <th>Event Type</th>
            <th>Description</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>Sent</td>
            <td>Request sent to server</td>
            <td>Initial state</td>
          </tr>
          <tr>
            <td>UploadProgress</td>
            <td>Upload progress update</td>
            <td>Show upload %</td>
          </tr>
          <tr>
            <td>DownloadProgress</td>
            <td>Download progress update</td>
            <td>Show download %</td>
          </tr>
          <tr>
            <td>Response</td>
            <td>Complete response received</td>
            <td>Final result</td>
          </tr>
        </table>

        <h3>File Download Options</h3>
        <ul>
          <li><strong>Blob Response:</strong> responseType: 'blob' for binary data</li>
          <li><strong>URL.createObjectURL:</strong> Create download link</li>
          <li><strong>Programmatic Download:</strong> Trigger download via <a> element</li>
          <li><strong>Memory Management:</strong> Revoke object URLs after use</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 940,
          language: 'typescript',
          title: 'File Upload Service with Progress',
          code: `// src/app/services/file-upload.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface UploadResult {
  url: string;
  filename: string;
  size: number;
}

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private http = inject(HttpClient);
  private uploadUrl = 'https://api.example.com/upload';

  uploadWithProgress(file: File): Observable<number | UploadResult> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .post<UploadResult>(this.uploadUrl, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const percentDone = event.total
                ? Math.round((100 * event.loaded) / event.total)
                : 0;
              return percentDone;
            case HttpEventType.Response:
              return event.body as UploadResult;
            default:
              return 0;
          }
        })
      );
  }

  uploadMultiple(files: File[]): Observable<UploadResult[]> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(\`file\${index}\`, file, file.name);
    });
    return this.http.post<UploadResult[]>(this.uploadUrl, formData);
  }
}`,
          description: 'Upload files with progress tracking',
          copyable: true,
        },
        {
          id: 941,
          language: 'typescript',
          title: 'File Upload Component',
          code: `// src/app/pages/file-upload.page.ts

import { Component, inject, signal } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  template: \`
    <input type="file" (change)="onFileSelected($event)" />

    @if (uploading()) {
      <ion-progress-bar [value]="progress() / 100"></ion-progress-bar>
      <p>Uploading: {{ progress() }}%</p>
    }

    @if (uploadedFile()) {
      <p>✅ Upload successful!</p>
      <a [href]="uploadedFile()!.url">View file</a>
    }

    @if (error()) {
      <p>❌ {{ error() }}</p>
      <ion-button (click)="retry()">Retry</ion-button>
    }
  \`,
  standalone: true,
})
export class FileUploadPage {
  private fileUploadService = inject(FileUploadService);

  uploading = signal(false);
  progress = signal(0);
  uploadedFile = signal<any>(null);
  error = signal<string | null>(null);
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files?.[0];
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile);
    }
  }

  uploadFile(file: File) {
    this.uploading.set(true);
    this.error.set(null);

    this.fileUploadService.uploadWithProgress(file).subscribe({
      next: (result) => {
        if (typeof result === 'number') {
          this.progress.set(result);
        } else {
          this.uploadedFile.set(result);
          this.uploading.set(false);
        }
      },
      error: (err) => {
        this.error.set(err.message);
        this.uploading.set(false);
      },
    });
  }

  retry() {
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile);
    }
  }
}`,
          description: 'Component with file upload UI and progress',
          copyable: true,
        },
        {
          id: 942,
          language: 'typescript',
          title: 'File Download Service',
          code: `// src/app/services/file-download.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FileDownloadService {
  private http = inject(HttpClient);

  downloadWithProgress(url: string): Observable<number | Blob> {
    return this.http
      .get(url, {
        responseType: 'blob',
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.DownloadProgress:
              const percentDone = event.total
                ? Math.round((100 * event.loaded) / event.total)
                : 0;
              return percentDone;
            case HttpEventType.Response:
              return event.body as Blob;
            default:
              return 0;
          }
        })
      );
  }

  download(url: string, filename: string): void {
    this.downloadWithProgress(url).subscribe({
      next: (result) => {
        if (result instanceof Blob) {
          const downloadUrl = window.URL.createObjectURL(result);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = filename;
          link.click();
          window.URL.revokeObjectURL(downloadUrl);
        }
      },
    });
  }
}`,
          description: 'Download files with progress tracking',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use FormData for file uploads (multipart/form-data)',
        'reportProgress: true enables progress tracking',
        'observe: "events" gives access to all HTTP events',
        'responseType: "blob" for binary file downloads',
        'window.URL.createObjectURL() creates download link',
        'Always revoke object URLs to prevent memory leaks',
      ],
    },
    {
      id: 95,
      title: 'NgRx Effects + HTTP',
      content: `
        <h2>Integrating HTTP with NgRx</h2>
        <p>NgRx Effects handle side effects like HTTP requests in a reactive, testable way. They listen for actions, make API calls, and dispatch success/failure actions.</p>

        <h3>Effects Pattern</h3>
        <pre>
Component dispatches action
    ↓
Effect listens with ofType()
    ↓
Effect calls service (HTTP)
    ↓
Service returns Observable
    ↓
Effect maps to success/failure action
    ↓
Reducer updates state
    ↓
Component receives updated state
        </pre>

        <h3>RxJS Operators for Effects</h3>
        <table>
          <tr>
            <th>Operator</th>
            <th>Behavior</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>switchMap</td>
            <td>Cancel previous request</td>
            <td>Search, navigation, refresh</td>
          </tr>
          <tr>
            <td>exhaustMap</td>
            <td>Ignore new until current completes</td>
            <td>Login, form submit</td>
          </tr>
          <tr>
            <td>concatMap</td>
            <td>Queue and process in order</td>
            <td>Updates, deletes</td>
          </tr>
          <tr>
            <td>mergeMap</td>
            <td>Process all concurrently</td>
            <td>Independent operations</td>
          </tr>
        </table>

        <h3>Benefits</h3>
        <ul>
          <li><strong>Separation of Concerns:</strong> HTTP logic separate from components</li>
          <li><strong>Testability:</strong> Mock services easily</li>
          <li><strong>Reusability:</strong> Effects can respond to multiple actions</li>
          <li><strong>Centralized Side Effects:</strong> All async operations in one place</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 950,
          language: 'typescript',
          title: 'Posts Actions',
          code: `// src/app/features/posts/store/posts.actions.ts

import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Post, CreatePostDto, UpdatePostDto } from '../models/post.model';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Failure': props<{ error: string }>(),

    'Create Post': props<{ post: CreatePostDto }>(),
    'Create Post Success': props<{ post: Post }>(),
    'Create Post Failure': props<{ error: string }>(),

    'Update Post': props<{ post: UpdatePostDto }>(),
    'Update Post Success': props<{ post: Post }>(),
    'Update Post Failure': props<{ error: string }>(),

    'Delete Post': props<{ id: number }>(),
    'Delete Post Success': props<{ id: number }>(),
    'Delete Post Failure': props<{ error: string }>(),
  },
});`,
          description: 'Actions for HTTP operations',
          copyable: true,
        },
        {
          id: 951,
          language: 'typescript',
          title: 'Posts Effects with HTTP',
          code: `// src/app/features/posts/store/posts.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap, concatMap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { PostsActions } from './posts.actions';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      switchMap(() =>
        this.postsService.getAll().pipe(
          map((posts) => PostsActions.loadPostsSuccess({ posts })),
          catchError((error) =>
            of(PostsActions.loadPostsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPost),
      exhaustMap(({ post }) =>
        this.postsService.create(post).pipe(
          map((createdPost) => PostsActions.createPostSuccess({ post: createdPost })),
          catchError((error) =>
            of(PostsActions.createPostFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.updatePost),
      concatMap(({ post }) =>
        this.postsService.update(post.id, post).pipe(
          map((updatedPost) => PostsActions.updatePostSuccess({ post: updatedPost })),
          catchError((error) =>
            of(PostsActions.updatePostFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deletePost),
      concatMap(({ id }) =>
        this.postsService.delete(id).pipe(
          map(() => PostsActions.deletePostSuccess({ id })),
          catchError((error) =>
            of(PostsActions.deletePostFailure({ error: error.message }))
          )
        )
      )
    )
  );
}`,
          description: 'NgRx Effects handling HTTP operations',
          copyable: true,
        },
        {
          id: 952,
          language: 'typescript',
          title: 'Posts Reducer with Entity Adapter',
          code: `// src/app/features/posts/store/posts.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../models/post.model';
import { PostsActions } from './posts.actions';

export interface PostsState extends EntityState<Post> {
  loading: boolean;
  error: string | null;
}

export const postsAdapter = createEntityAdapter<Post>();

const initialState: PostsState = postsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const postsReducer = createReducer(
  initialState,

  on(PostsActions.loadPosts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) =>
    postsAdapter.setAll(posts, { ...state, loading: false })
  ),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(PostsActions.createPostSuccess, (state, { post }) =>
    postsAdapter.addOne(post, { ...state })
  ),
  on(PostsActions.updatePostSuccess, (state, { post }) =>
    postsAdapter.updateOne({ id: post.id, changes: post }, { ...state })
  ),
  on(PostsActions.deletePostSuccess, (state, { id }) =>
    postsAdapter.removeOne(id, { ...state })
  )
);`,
          description: 'Reducer handling HTTP action results',
          copyable: true,
        },
        {
          id: 953,
          language: 'typescript',
          title: 'Component Using NgRx + HTTP',
          code: `// src/app/features/posts/pages/posts-list.page.ts

import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsActions } from '../../store/posts.actions';
import {
  selectAllPosts,
  selectPostsLoading,
  selectPostsError,
} from '../../store/posts.selectors';

@Component({
  selector: 'app-posts-list',
  template: \`
    @if (loading$ | async) {
      <ion-spinner></ion-spinner>
    } @else if (error$ | async; as error) {
      <p>{{ error }}</p>
      <ion-button (click)="onRefresh()">Retry</ion-button>
    } @else {
      <ion-list>
        @for (post of posts$ | async; track post.id) {
          <ion-item>{{ post.title }}</ion-item>
        }
      </ion-list>
    }
  \`,
  standalone: true,
})
export class PostsListPage implements OnInit {
  private store = inject(Store);

  posts$ = this.store.select(selectAllPosts);
  loading$ = this.store.select(selectPostsLoading);
  error$ = this.store.select(selectPostsError);

  ngOnInit() {
    this.store.dispatch(PostsActions.loadPosts());
  }

  onRefresh() {
    this.store.dispatch(PostsActions.loadPosts());
  }
}`,
          description: 'Component dispatching actions instead of calling services',
          copyable: true,
        },
      ],
      interviewTips: [
        'Effects listen for actions with ofType()',
        'switchMap cancels previous (search), exhaustMap ignores new (login), concatMap queues (updates)',
        'Always handle success AND error cases',
        'Use of() to return actions synchronously',
        'catchError must return action, not throw',
        'Components dispatch actions, don\'t call services directly',
      ],
    },
    {
      id: 96,
      title: 'Testing HTTP Services',
      content: `
        <h2>Testing HTTP Code</h2>
        <p>Angular provides HttpClientTestingModule for testing HTTP services without making real network requests.</p>

        <h3>Testing Strategy</h3>
        <ul>
          <li><strong>Unit Tests:</strong> Test services in isolation with mocked HTTP</li>
          <li><strong>Integration Tests:</strong> Test components + services together</li>
          <li><strong>E2E Tests:</strong> Test real HTTP calls (Cypress, Playwright)</li>
        </ul>

        <h3>HttpTestingController</h3>
        <p>Mock HTTP backend that intercepts requests and provides mock responses:</p>
        <ul>
          <li><strong>expectOne():</strong> Verify single request was made</li>
          <li><strong>expectNone():</strong> Verify no request was made</li>
          <li><strong>flush():</strong> Provide mock response data</li>
          <li><strong>error():</strong> Simulate error response</li>
          <li><strong>verify():</strong> Assert no outstanding requests</li>
        </ul>

        <h3>What to Test</h3>
        <ul>
          <li>Correct HTTP method (GET, POST, etc.)</li>
          <li>Correct URL construction</li>
          <li>Request body content</li>
          <li>Query parameters</li>
          <li>Headers</li>
          <li>Success response handling</li>
          <li>Error response handling</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 960,
          language: 'typescript',
          title: 'Testing HTTP Service',
          code: `// src/app/services/users-api.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersApiService } from './users-api.service';

describe('UsersApiService', () => {
  let service: UsersApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersApiService],
    });

    service = TestBed.inject(UsersApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all users', () => {
    const mockUsers = [
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' },
    ];

    service.getAll().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should create user', () => {
    const newUser = { name: 'John', email: 'john@example.com' };
    const createdUser = { id: 1, ...newUser };

    service.create(newUser).subscribe((user) => {
      expect(user).toEqual(createdUser);
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });

  it('should handle error', () => {
    service.getById(999).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne('https://api.example.com/users/999');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});`,
          description: 'Comprehensive HTTP service testing',
          copyable: true,
        },
        {
          id: 961,
          language: 'typescript',
          title: 'Testing Interceptors',
          code: `// src/app/core/interceptors/auth.interceptor.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '@services/auth/auth.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header when token exists', () => {
    authService.getToken.and.returnValue('test-token');

    httpClient.get('/api/users').subscribe();

    const req = httpMock.expectOne('/api/users');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });

  it('should not add header when no token', () => {
    authService.getToken.and.returnValue(null);

    httpClient.get('/api/users').subscribe();

    const req = httpMock.expectOne('/api/users');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });
});`,
          description: 'Testing HTTP interceptors',
          copyable: true,
        },
        {
          id: 962,
          language: 'typescript',
          title: 'Testing NgRx Effects',
          code: `// src/app/features/posts/store/posts.effects.spec.ts

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { PostsEffects } from './posts.effects';
import { PostsService } from '../services/posts.service';
import { PostsActions } from './posts.actions';

describe('PostsEffects', () => {
  let actions$: Observable<any>;
  let effects: PostsEffects;
  let postsService: jasmine.SpyObj<PostsService>;

  beforeEach(() => {
    const postsServiceSpy = jasmine.createSpyObj('PostsService', ['getAll']);

    TestBed.configureTestingModule({
      providers: [
        PostsEffects,
        provideMockActions(() => actions$),
        { provide: PostsService, useValue: postsServiceSpy },
      ],
    });

    effects = TestBed.inject(PostsEffects);
    postsService = TestBed.inject(PostsService) as jasmine.SpyObj<PostsService>;
  });

  it('should return loadPostsSuccess on success', (done) => {
    const posts = [{ id: 1, title: 'Test', body: 'Content', userId: 1 }];
    postsService.getAll.and.returnValue(of(posts));

    actions$ = of(PostsActions.loadPosts());

    effects.loadPosts$.subscribe((action) => {
      expect(action).toEqual(PostsActions.loadPostsSuccess({ posts }));
      done();
    });
  });

  it('should return loadPostsFailure on error', (done) => {
    const error = new Error('Failed');
    postsService.getAll.and.returnValue(throwError(() => error));

    actions$ = of(PostsActions.loadPosts());

    effects.loadPosts$.subscribe((action) => {
      expect(action).toEqual(
        PostsActions.loadPostsFailure({ error: error.message })
      );
      done();
    });
  });
});`,
          description: 'Testing NgRx effects with HTTP',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use HttpClientTestingModule for testing',
        'HttpTestingController mocks HTTP backend',
        'expectOne() verifies request and returns mock controller',
        'flush() provides mock response data',
        'verify() ensures no outstanding requests',
        'Test both success and error scenarios',
      ],
    },
    {
      id: 97,
      title: 'Advanced Patterns',
      content: `
        <h2>Advanced HTTP Patterns</h2>
        <p>Production applications require sophisticated patterns for performance, reliability, and user experience.</p>

        <h3>Request Cancellation</h3>
        <p>Cancel in-flight requests to save bandwidth and prevent race conditions:</p>
        <ul>
          <li><strong>switchMap:</strong> Automatic cancellation (search)</li>
          <li><strong>takeUntil:</strong> Manual cancellation (user action)</li>
          <li><strong>AbortController:</strong> Browser-level cancellation (advanced)</li>
        </ul>

        <h3>Debouncing & Throttling</h3>
        <ul>
          <li><strong>debounceTime:</strong> Wait for pause in input (search)</li>
          <li><strong>throttleTime:</strong> Limit request rate (scroll, resize)</li>
          <li><strong>distinctUntilChanged:</strong> Skip duplicate values</li>
        </ul>

        <h3>Polling & Real-time Updates</h3>
        <table>
          <tr>
            <th>Pattern</th>
            <th>Use Case</th>
            <th>Implementation</th>
          </tr>
          <tr>
            <td>Polling</td>
            <td>Check for updates periodically</td>
            <td>interval() + switchMap()</td>
          </tr>
          <tr>
            <td>WebSocket</td>
            <td>Real-time bidirectional</td>
            <td>WebSocket API or libraries</td>
          </tr>
          <tr>
            <td>Server-Sent Events</td>
            <td>Real-time unidirectional</td>
            <td>EventSource API</td>
          </tr>
        </table>

        <h3>Performance Optimizations</h3>
        <ul>
          <li><strong>Response Caching:</strong> Reduce redundant requests</li>
          <li><strong>Request Batching:</strong> Combine multiple requests</li>
          <li><strong>Parallel Requests:</strong> Use forkJoin for concurrent calls</li>
          <li><strong>Lazy Loading:</strong> Load data on demand</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 970,
          language: 'typescript',
          title: 'Request Cancellation Pattern',
          code: `// Search with automatic cancellation

import { Component, inject, OnDestroy } from '@angular/core';
import { Subject, takeUntil, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
})
export class SearchPage implements OnDestroy {
  private searchService = inject(SearchService);
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  results = signal<any[]>([]);

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.searchService.search(query)),
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.results.set(results);
      });
  }

  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
          description: 'Debounced search with automatic cancellation',
          copyable: true,
        },
        {
          id: 971,
          language: 'typescript',
          title: 'Polling Pattern',
          code: `// Poll API every 5 seconds

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { interval, Subject, switchMap, takeUntil } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
})
export class DashboardPage implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  private destroy$ = new Subject<void>();

  data = signal<any>(null);

  ngOnInit() {
    // Poll every 5 seconds
    interval(5000)
      .pipe(
        switchMap(() => this.dataService.getData()),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.data.set(data);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
          description: 'Polling pattern for periodic updates',
          copyable: true,
        },
        {
          id: 972,
          language: 'typescript',
          title: 'Parallel Requests with forkJoin',
          code: `// Execute multiple requests in parallel

import { Injectable, inject } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private usersApi = inject(UsersApiService);
  private postsApi = inject(PostsApiService);
  private commentsApi = inject(CommentsApiService);

  loadDashboardData(): Observable<DashboardData> {
    return forkJoin({
      users: this.usersApi.getAll(),
      posts: this.postsApi.getAll(),
      comments: this.commentsApi.getRecent(),
    }).pipe(
      map(({ users, posts, comments }) => ({
        userCount: users.length,
        postCount: posts.length,
        recentComments: comments.slice(0, 5),
      }))
    );
  }
}

// All requests execute in parallel
// Result emits only when ALL complete
this.dashboardService.loadDashboardData().subscribe((data) => {
  console.log('All data loaded:', data);
});`,
          description: 'Parallel HTTP requests with forkJoin',
          copyable: true,
        },
        {
          id: 973,
          language: 'typescript',
          title: 'Request Deduplication',
          code: `// Prevent duplicate concurrent requests

import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private cachedRequest$: Observable<Data> | null = null;

  getData(): Observable<Data> {
    // If request is in-flight, return existing observable
    if (this.cachedRequest$) {
      return this.cachedRequest$;
    }

    // Create new request and cache it
    this.cachedRequest$ = this.http.get<Data>('/api/data').pipe(
      share(), // Share single subscription among multiple subscribers
      finalize(() => {
        // Clear cache when request completes
        this.cachedRequest$ = null;
      })
    );

    return this.cachedRequest$;
  }
}

// Multiple concurrent calls share same request
this.dataService.getData().subscribe(); // Makes HTTP request
this.dataService.getData().subscribe(); // Reuses same request
this.dataService.getData().subscribe(); // Reuses same request`,
          description: 'Deduplicate concurrent requests',
          copyable: true,
        },
      ],
      interviewTips: [
        'switchMap cancels previous requests automatically',
        'debounceTime reduces request rate for search/autocomplete',
        'forkJoin waits for all observables to complete',
        'share() allows multiple subscribers to one request',
        'takeUntil pattern for cleanup on component destroy',
      ],
    },
  ],
};
