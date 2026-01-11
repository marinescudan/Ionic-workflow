import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { ApiService } from '@app/core/services/api/api.service';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
}

export interface CreatePostDto {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostDto {
  title?: string;
  body?: string;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private api = inject(ApiService);
  private readonly REQUEST_TIMEOUT = 10000; // 10 seconds

  getAll(): Observable<Post[]> {
    return this.api.get<Post[]>('/posts').pipe(
      timeout(this.REQUEST_TIMEOUT),
      map((posts) => {
        // Transform/validate data
        return posts.map((post) => this.normalizePost(post));
      }),
      catchError((error) => {
        // Log for debugging
        console.error('Failed to fetch posts:', error);

        // Transform error into user-friendly message
        const message = this.getErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  getById(id: number): Observable<Post> {
    return this.api.get<Post>(`/posts/${id}`);
  }

  getByUser(userId: number): Observable<Post[]> {
    return this.api.get<Post[]>('/posts', {
      params: { userId }
    });
  }

  create(dto: CreatePostDto): Observable<Post> {
    return this.api.post<Post>('/posts', dto).pipe(
      timeout(this.REQUEST_TIMEOUT),
      map((post) => this.normalizePost(post)),
      catchError((error) => {
        console.error('Failed to create post:', error);

        // Handle validation errors
        if (error.status === 400 && error.error?.errors) {
          const validationErrors = Object.values(error.error.errors).join(', ');
          return throwError(() => new Error(`Validation error: ${validationErrors}`));
        }

        const message = this.getErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  update(id: number, dto: UpdatePostDto): Observable<Post> {
    return this.api.patch<Post>(`/posts/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(`/posts/${id}`);
  }

  // Search with pagination
  search(query: string, page: number = 1, pageSize: number = 10): Observable<Post[]> {
    return this.api.get<Post[]>('/posts/search', {
      params: { q: query, page, pageSize }
    });
  }

  /**
   * Normalize post data (fix inconsistencies from backend)
   */
  private normalizePost(post: any): Post {
    return {
      id: Number(post.id),
      title: post.title?.trim() || 'Untitled',
      body: post.body?.trim() || '',
      userId: Number(post.userId),
      createdAt: post.createdAt || new Date().toISOString(),
    };
  }

  /**
   * Convert error into user-friendly message
   */
  private getErrorMessage(error: any): string {
    if (error.name === 'TimeoutError') {
      return 'Request timed out. Please check your connection.';
    }

    if (error.status === 0) {
      return 'Network error. Please check your internet connection.';
    }

    if (error.status >= 500) {
      return 'Server error. Please try again later.';
    }

    return error.message || 'An unexpected error occurred';
  }
}
