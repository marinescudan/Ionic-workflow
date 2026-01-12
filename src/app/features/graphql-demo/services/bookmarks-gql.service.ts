import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphQLService } from '../../../core/services/graphql/graphql.service';
import { CacheService } from '../../../core/services/graphql/cache.service';
import {
  CreateBookmarkDocument,
  UpdateBookmarkDocument,
  DeleteBookmarkDocument,
  Bookmark,
  BookmarkInput,
  CreateBookmarkMutation,
  UpdateBookmarkMutation,
  DeleteBookmarkMutation,
} from '../../../graphql/generated/types';

/**
 * Bookmarks GraphQL Service
 *
 * Provides type-safe methods for interacting with bookmark-related GraphQL operations:
 * - Mutations: Create, update, and delete bookmarks
 * - Cache management for bookmarks
 */
@Injectable({
  providedIn: 'root',
})
export class BookmarksGqlService {
  constructor(
    private graphqlService: GraphQLService,
    private cacheService: CacheService
  ) {}

  /**
   * Create a new bookmark
   * @param input Bookmark input data
   * @returns Observable of created bookmark
   */
  createBookmark(input: BookmarkInput): Observable<Bookmark> {
    // Optimistic response for instant UI updates
    const optimisticResponse: CreateBookmarkMutation = {
      __typename: 'Mutation',
      createBookmark: {
        __typename: 'Bookmark',
        id: `temp-${Date.now()}`,
        chapterId: input.chapterId,
        sectionId: input.sectionId,
        note: input.note || null,
        createdAt: new Date().toISOString(),
      },
    };

    return this.graphqlService
      .mutate<CreateBookmarkMutation>(
        CreateBookmarkDocument,
        { input },
        optimisticResponse
      )
      .pipe(map((data) => data.createBookmark));
  }

  /**
   * Update an existing bookmark
   * @param id Bookmark ID
   * @param note Updated note text
   * @returns Observable of updated bookmark (partial - only id and note)
   */
  updateBookmark(id: string, note: string): Observable<Bookmark> {
    return this.graphqlService
      .mutate<UpdateBookmarkMutation>(UpdateBookmarkDocument, { id, note })
      .pipe(map((data) => data.updateBookmark as Bookmark));
  }

  /**
   * Delete a bookmark
   * @param id Bookmark ID
   * @returns Observable of deletion success
   */
  deleteBookmark(id: string): Observable<boolean> {
    return this.graphqlService
      .mutate<DeleteBookmarkMutation>(DeleteBookmarkDocument, { id })
      .pipe(map((data) => data.deleteBookmark));
  }

  /**
   * Read bookmark from cache
   * @param id Bookmark ID
   * @returns Cached bookmark or null
   */
  readBookmarkFromCache(id: string): Bookmark | null {
    const cacheId = this.cacheService.getCacheId('Bookmark', id);
    return this.cacheService.readFragment(cacheId, {
      __typename: 'Bookmark',
    }) as Bookmark | null;
  }

  /**
   * Evict bookmark from cache
   * @param id Bookmark ID
   */
  evictBookmark(id: string): void {
    const cacheId = this.cacheService.getCacheId('Bookmark', id);
    this.cacheService.evict(cacheId);
  }

  /**
   * Update bookmark in cache
   * @param id Bookmark ID
   * @param updates Partial bookmark updates
   */
  updateBookmarkInCache(id: string, updates: Partial<Bookmark>): void {
    const cacheId = this.cacheService.getCacheId('Bookmark', id);
    this.cacheService.modify(cacheId, updates);
  }
}
