import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

/**
 * Simple in-memory cache for GET requests
 */
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

  // Return cached response if available and not expired
  if (cached) {
    const age = Date.now() - Number(cached.headers.get('X-Cache-Time'));
    if (age < CACHE_TTL) {
      console.log(`📦 Cache HIT: ${cacheKey}`);
      return of(cached.clone());
    } else {
      // Expired - remove from cache
      cache.delete(cacheKey);
    }
  }

  console.log(`🌐 Cache MISS: ${cacheKey}`);

  // Proceed with request and cache the response
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        // Clone response and add cache timestamp
        const cachedResponse = event.clone({
          headers: event.headers.set('X-Cache-Time', Date.now().toString()),
        });
        cache.set(cacheKey, cachedResponse);
      }
    })
  );
};

/**
 * Helper: Clear cache manually
 */
export function clearHttpCache() {
  cache.clear();
  console.log('🗑️ HTTP cache cleared');
}

/**
 * Helper: Remove specific cache entry
 */
export function clearCacheEntry(url: string) {
  cache.delete(url);
  console.log(`🗑️ Cache entry cleared: ${url}`);
}
