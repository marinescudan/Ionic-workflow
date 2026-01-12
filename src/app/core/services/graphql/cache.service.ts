import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { InMemoryCache, OperationVariables } from '@apollo/client/core';

/**
 * Cache Management Service
 *
 * Provides utilities for managing Apollo InMemoryCache:
 * - Read/write cache data
 * - Evict cache entries
 * - Update cache after mutations
 * - Cache introspection for debugging
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: InMemoryCache;

  constructor(private apollo: Apollo) {
    this.cache = this.apollo.client.cache as InMemoryCache;
  }

  /**
   * Read data from cache by query
   * @param query GraphQL query document
   * @param variables Query variables
   * @returns Cached data or null
   */
  readQuery<T = any, V extends OperationVariables = OperationVariables>(query: any, variables?: V): T | null {
    try {
      return this.cache.readQuery<T, V>({ query, variables });
    } catch (error) {
      console.warn('Cache read failed:', error);
      return null;
    }
  }

  /**
   * Write data to cache for a query
   * @param query GraphQL query document
   * @param data Data to write
   * @param variables Query variables
   */
  writeQuery<T = any, V extends OperationVariables = OperationVariables>(query: any, data: T, variables?: V): void {
    try {
      this.cache.writeQuery<T, V>({ query, data, variables });
    } catch (error) {
      console.error('Cache write failed:', error);
    }
  }

  /**
   * Read a fragment from cache
   * @param id Cache ID (e.g., 'Chapter:1')
   * @param fragment GraphQL fragment document
   * @returns Fragment data or null
   */
  readFragment<T = any>(id: string, fragment: any): T | null {
    try {
      return this.cache.readFragment<T>({ id, fragment });
    } catch (error) {
      console.warn('Fragment read failed:', error);
      return null;
    }
  }

  /**
   * Write a fragment to cache
   * @param id Cache ID (e.g., 'Chapter:1')
   * @param fragment GraphQL fragment document
   * @param data Fragment data
   */
  writeFragment<T = any>(id: string, fragment: any, data: T): void {
    try {
      this.cache.writeFragment<T>({ id, fragment, data });
    } catch (error) {
      console.error('Fragment write failed:', error);
    }
  }

  /**
   * Evict a specific cache entry
   * @param id Cache ID (e.g., 'Chapter:1')
   * @param fieldName Optional field name to evict
   */
  evict(id: string, fieldName?: string): void {
    try {
      this.cache.evict({ id, fieldName });
      this.cache.gc(); // Garbage collect
    } catch (error) {
      console.error('Cache evict failed:', error);
    }
  }

  /**
   * Modify cache data directly
   * @param id Cache ID
   * @param fields Object with field modifiers
   * @example
   * cacheService.modify('Chapter:1', {
   *   completed: () => true,
   *   progress: (existing) => ({ ...existing, percentage: 100 })
   * });
   */
  modify(id: string, fields: Record<string, any>): void {
    try {
      this.cache.modify({ id, fields });
    } catch (error) {
      console.error('Cache modify failed:', error);
    }
  }

  /**
   * Get cache ID for a type and ID
   * @param typeName GraphQL type name
   * @param id Entity ID
   * @returns Cache ID (e.g., 'Chapter:1')
   */
  getCacheId(typeName: string, id: string | number): string {
    return `${typeName}:${id}`;
  }

  /**
   * Extract cache data for debugging
   * @returns Cache contents as object
   */
  extractCacheData(): any {
    return this.cache.extract();
  }

  /**
   * Get cache size estimate (number of entities)
   * @returns Number of cached entities
   */
  getCacheSize(): number {
    const data = this.cache.extract();
    return Object.keys(data).length;
  }

  /**
   * Clear all cache data
   */
  clearCache(): void {
    this.cache.reset();
  }

  /**
   * Update cache after a mutation (optimistic or real)
   * Useful for adding/removing items from lists
   * @param query Query to update
   * @param updateFn Function to update the data
   * @param variables Query variables
   */
  updateQueryCache<T = any, V extends OperationVariables = OperationVariables>(
    query: any,
    updateFn: (data: T) => T,
    variables?: V
  ): void {
    try {
      const data = this.readQuery<T, V>(query, variables);
      if (data) {
        const updatedData = updateFn(data);
        this.writeQuery(query, updatedData, variables);
      }
    } catch (error) {
      console.error('Cache update failed:', error);
    }
  }

  /**
   * Check if query data exists in cache
   * @param query GraphQL query document
   * @param variables Query variables
   * @returns true if data exists in cache
   */
  hasQueryData<V extends OperationVariables = OperationVariables>(query: any, variables?: V): boolean {
    return this.readQuery(query, variables) !== null;
  }
}
