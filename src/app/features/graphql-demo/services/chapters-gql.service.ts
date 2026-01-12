import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphQLService } from '../../../core/services/graphql/graphql.service';
import { CacheService } from '../../../core/services/graphql/cache.service';
import {
  GetChaptersDocument,
  GetChapterDocument,
  SearchChaptersDocument,
  PaginatedChaptersDocument,
  CompleteChapterDocument,
  CompleteMultipleChaptersDocument,
  OnChapterCompletedDocument,
  Chapter,
  ChapterCategory,
  GetChaptersQuery,
  GetChapterQuery,
  SearchChaptersQuery,
  PaginatedChaptersQuery,
  CompleteChapterMutation,
  CompleteMultipleChaptersMutation,
  OnChapterCompletedSubscription,
} from '../../../graphql/generated/types';

/**
 * Chapters GraphQL Service
 *
 * Provides type-safe methods for interacting with chapter-related GraphQL operations:
 * - Queries: Get all chapters, get single chapter, search chapters, paginated chapters
 * - Mutations: Complete chapter, complete multiple chapters
 * - Subscriptions: Chapter completion events
 * - Cache management for chapters
 */
@Injectable({
  providedIn: 'root',
})
export class ChaptersGqlService {
  constructor(
    private graphqlService: GraphQLService,
    private cacheService: CacheService
  ) {}

  /**
   * Get all chapters with optional filtering
   * @param category Optional category filter
   * @param completed Optional completion status filter
   * @returns Observable of chapters array
   */
  getChapters(
    category?: ChapterCategory,
    completed?: boolean
  ): Observable<Chapter[]> {
    return this.graphqlService
      .query<GetChaptersQuery>(GetChaptersDocument, { category, completed })
      .pipe(map((data) => data.chapters as Chapter[]));
  }

  /**
   * Watch chapters query (reactive updates from cache)
   * @param category Optional category filter
   * @param completed Optional completion status filter
   * @returns Observable of chapters array (updates on cache changes)
   */
  watchChapters(
    category?: ChapterCategory,
    completed?: boolean
  ): Observable<Chapter[]> {
    return this.graphqlService
      .watchQuery<GetChaptersQuery>(GetChaptersDocument, {
        category,
        completed,
      })
      .pipe(map((data) => data.chapters as Chapter[]));
  }

  /**
   * Get a single chapter by ID
   * @param id Chapter ID
   * @returns Observable of chapter
   */
  getChapter(id: string): Observable<Chapter | null> {
    return this.graphqlService
      .query<GetChapterQuery>(GetChapterDocument, { id })
      .pipe(map((data) => data.chapter as Chapter | null));
  }

  /**
   * Watch a single chapter (reactive updates from cache)
   * @param id Chapter ID
   * @returns Observable of chapter (updates on cache changes)
   */
  watchChapter(id: string): Observable<Chapter | null> {
    return this.graphqlService
      .watchQuery<GetChapterQuery>(GetChapterDocument, { id })
      .pipe(map((data) => data.chapter as Chapter | null));
  }

  /**
   * Search chapters by query string
   * @param query Search query
   * @returns Observable of matching chapters
   */
  searchChapters(query: string): Observable<Chapter[]> {
    return this.graphqlService
      .query<SearchChaptersQuery>(SearchChaptersDocument, { query })
      .pipe(map((data) => data.searchChapters as Chapter[]));
  }

  /**
   * Get paginated chapters (offset-based)
   * @param offset Offset for pagination
   * @param limit Number of items per page
   * @returns Observable of paginated chapters with page info
   */
  getPaginatedChapters(offset: number, limit: number): Observable<any> {
    return this.graphqlService
      .query<PaginatedChaptersQuery>(PaginatedChaptersDocument, {
        offset,
        limit,
      })
      .pipe(map((data) => data.paginatedChapters));
  }

  /**
   * Complete a chapter
   * @param id Chapter ID
   * @returns Observable of completed chapter
   */
  completeChapter(id: string): Observable<Chapter> {
    // Optimistic response for instant UI updates
    const optimisticResponse: CompleteChapterMutation = {
      __typename: 'Mutation',
      completeChapter: {
        __typename: 'Chapter',
        id,
        completed: true,
        completedAt: new Date().toISOString(),
      } as Chapter,
    };

    return this.graphqlService
      .mutate<CompleteChapterMutation>(
        CompleteChapterDocument,
        { id },
        optimisticResponse
      )
      .pipe(map((data) => data.completeChapter as Chapter));
  }

  /**
   * Complete multiple chapters at once
   * @param ids Array of chapter IDs
   * @returns Observable of completed chapters
   */
  completeMultipleChapters(ids: string[]): Observable<Chapter[]> {
    return this.graphqlService
      .mutate<CompleteMultipleChaptersMutation>(
        CompleteMultipleChaptersDocument,
        { ids }
      )
      .pipe(map((data) => data.completeMultipleChapters as Chapter[]));
  }

  /**
   * Subscribe to chapter completion events
   * @returns Observable of completed chapters
   */
  onChapterCompleted(): Observable<Chapter> {
    return this.graphqlService
      .subscribe<OnChapterCompletedSubscription>(OnChapterCompletedDocument)
      .pipe(map((data) => data.chapterCompleted as Chapter));
  }

  /**
   * Read chapter from cache
   * @param id Chapter ID
   * @returns Cached chapter or null
   */
  readChapterFromCache(id: string): Chapter | null {
    return this.cacheService.readQuery<GetChapterQuery>(GetChapterDocument, {
      id,
    })?.chapter as Chapter | null;
  }

  /**
   * Update chapter in cache
   * @param id Chapter ID
   * @param updates Partial chapter updates
   */
  updateChapterInCache(id: string, updates: Partial<Chapter>): void {
    const cacheId = this.cacheService.getCacheId('Chapter', id);
    this.cacheService.modify(cacheId, updates);
  }

  /**
   * Evict chapter from cache
   * @param id Chapter ID
   */
  evictChapter(id: string): void {
    const cacheId = this.cacheService.getCacheId('Chapter', id);
    this.cacheService.evict(cacheId);
  }

  /**
   * Refetch all chapter queries
   */
  refetchChapters(): Promise<any> {
    return this.graphqlService.refetchQueries();
  }
}
