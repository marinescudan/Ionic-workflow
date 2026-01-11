import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

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

  // GET: Fetch all users
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // GET: Fetch single user by ID
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // GET: With query parameters
  search(query: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, {
      params: { q: query, limit: '10' }
    });
  }

  // POST: Create new user
  create(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.baseUrl, dto);
  }

  // PUT: Full update (replaces entire resource)
  update(id: number, dto: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, dto);
  }

  // PATCH: Partial update (only updates provided fields)
  patch(id: number, dto: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, dto);
  }

  // DELETE: Remove user
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // POST: With custom headers
  createWithHeaders(dto: CreateUserDto): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'custom-value',
    });

    return this.http.post<User>(this.baseUrl, dto, { headers });
  }
}
