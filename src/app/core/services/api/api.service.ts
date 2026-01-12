import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: string[];
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

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
   * @example this.api.get<User>('/users/123')
   */
  get<T>(endpoint: string, options?: QueryOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const httpOptions = this.buildHttpOptions(options);

    return this.http.get<T>(url, httpOptions);
  }

  /**
   * Generic POST request
   * @example this.api.post<User>('/users', { name: 'John' })
   */
  post<T>(endpoint: string, body: any, options?: QueryOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const httpOptions = this.buildHttpOptions(options);

    return this.http.post<T>(url, body, httpOptions);
  }

  /**
   * Generic PUT request
   * @example this.api.put<User>('/users/123', { name: 'Jane' })
   */
  put<T>(endpoint: string, body: any, options?: QueryOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const httpOptions = this.buildHttpOptions(options);

    return this.http.put<T>(url, body, httpOptions);
  }

  /**
   * Generic PATCH request
   * @example this.api.patch<User>('/users/123', { name: 'Jane' })
   */
  patch<T>(endpoint: string, body: any, options?: QueryOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const httpOptions = this.buildHttpOptions(options);

    return this.http.patch<T>(url, body, httpOptions);
  }

  /**
   * Generic DELETE request
   * @example this.api.delete('/users/123')
   */
  delete<T = void>(endpoint: string, options?: QueryOptions): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const httpOptions = this.buildHttpOptions(options);

    return this.http.delete<T>(url, httpOptions);
  }

  /**
   * Helper: Build HTTP options from QueryOptions
   */
  private buildHttpOptions(options?: QueryOptions): { params?: HttpParams; headers?: HttpHeaders } {
    const httpOptions: { params?: HttpParams; headers?: HttpHeaders } = {};

    if (options?.params) {
      let params = new HttpParams();
      Object.entries(options.params).forEach(([key, value]) => {
        params = params.set(key, String(value));
      });
      httpOptions.params = params;
    }

    if (options?.headers) {
      httpOptions.headers = new HttpHeaders(options.headers);
    }

    return httpOptions;
  }
}
