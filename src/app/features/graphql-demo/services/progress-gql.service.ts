import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphQLService } from '../../../core/services/graphql/graphql.service';
import { CacheService } from '../../../core/services/graphql/cache.service';
import {
  UpdateProgressDocument,
  OnProgressUpdatedDocument,
  OnAllProgressUpdatesDocument,
  Progress,
  UpdateProgressMutation,
  OnProgressUpdatedSubscription,
  OnAllProgressUpdatesSubscription,
} from '../../../graphql/generated/types';

/**
 * Progress GraphQL Service
 *
 * Provides type-safe methods for interacting with progress-related GraphQL operations:
 * - Mutations: Update progress
 * - Subscriptions: Progress updates for specific chapter, all progress updates
 * - Cache management for progress
 */
@Injectable({
  providedIn: 'root',
})
export class ProgressGqlService {
  constructor(
    private graphqlService: GraphQLService,
    private cacheService: CacheService
  ) {}

  /**
   * Update progress for a chapter
   * @param chapterId Chapter ID
   * @param percentage Progress percentage (0-100)
   * @param timeSpent Optional time spent in seconds
   * @returns Observable of updated progress
   */
  updateProgress(
    chapterId: string,
    percentage: number,
    timeSpent?: number
  ): Observable<Progress> {
    // Optimistic response for instant UI updates
    const optimisticResponse: UpdateProgressMutation = {
      __typename: 'Mutation',
      updateProgress: {
        __typename: 'Progress',
        id: `temp-${Date.now()}`,
        chapterId,
        percentage,
        timeSpent: timeSpent || 0,
        lastAccessed: new Date().toISOString(),
      },
    };

    return this.graphqlService
      .mutate<UpdateProgressMutation>(
        UpdateProgressDocument,
        { chapterId, percentage, timeSpent },
        optimisticResponse
      )
      .pipe(map((data) => data.updateProgress));
  }

  /**
   * Subscribe to progress updates for a specific chapter
   * @param chapterId Chapter ID
   * @returns Observable of progress updates
   */
  onProgressUpdated(chapterId: string): Observable<Progress> {
    return this.graphqlService
      .subscribe<OnProgressUpdatedSubscription>(OnProgressUpdatedDocument, {
        chapterId,
      })
      .pipe(map((data) => data.progressUpdated));
  }

  /**
   * Subscribe to all progress updates
   * @returns Observable of all progress updates
   */
  onAllProgressUpdates(): Observable<Progress> {
    return this.graphqlService
      .subscribe<OnAllProgressUpdatesSubscription>(
        OnAllProgressUpdatesDocument
      )
      .pipe(map((data) => data.allProgressUpdates));
  }

  /**
   * Update progress in cache
   * @param chapterId Chapter ID
   * @param updates Partial progress updates
   */
  updateProgressInCache(chapterId: string, updates: Partial<Progress>): void {
    const cacheId = this.cacheService.getCacheId('Progress', chapterId);
    this.cacheService.modify(cacheId, updates);
  }

  /**
   * Read progress from cache
   * @param chapterId Chapter ID
   * @returns Cached progress or null
   */
  readProgressFromCache(chapterId: string): Progress | null {
    const cacheId = this.cacheService.getCacheId('Progress', chapterId);
    return this.cacheService.readFragment(cacheId, {
      __typename: 'Progress',
    }) as Progress | null;
  }

  /**
   * Evict progress from cache
   * @param chapterId Chapter ID
   */
  evictProgress(chapterId: string): void {
    const cacheId = this.cacheService.getCacheId('Progress', chapterId);
    this.cacheService.evict(cacheId);
  }
}
