import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ApolloQueryResult,
  FetchPolicy,
  MutationOptions,
  OperationVariables,
  QueryOptions,
  SubscriptionOptions,
  WatchQueryOptions,
} from '@apollo/client/core';

/**
 * GraphQL Service Wrapper
 *
 * Provides a simplified interface to Apollo Client with:
 * - Type-safe query, mutation, and subscription methods
 * - Error handling and logging
 * - Loading state management
 * - Cache utilities
 */
@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  /**
   * Execute a GraphQL query
   * @param query GraphQL query document
   * @param variables Query variables
   * @param fetchPolicy Fetch policy (cache-first, network-only, etc.)
   * @returns Observable of query result
   */
  query<T = any, V extends OperationVariables = OperationVariables>(
    query: any,
    variables?: V,
    fetchPolicy: FetchPolicy = 'cache-first'
  ): Observable<T> {
    return this.apollo
      .query<T, V>({
        query,
        variables,
        fetchPolicy,
      } as any)
      .pipe(
        map((result) => {
          if (result.error) {
            console.error('GraphQL query errors:', result.error);
          }
          return result.data as T;
        })
      );
  }

  /**
   * Watch a GraphQL query (reactive updates from cache)
   * @param query GraphQL query document
   * @param variables Query variables
   * @param fetchPolicy Fetch policy
   * @returns Observable of query result (updates on cache changes)
   */
  watchQuery<T = any, V extends OperationVariables = OperationVariables>(
    query: any,
    variables?: V,
    fetchPolicy: FetchPolicy = 'cache-first'
  ): Observable<T> {
    return this.apollo
      .watchQuery<T, V>({
        query,
        variables,
        fetchPolicy,
      } as any)
      .valueChanges.pipe(
        map((result) => {
          if (result.error) {
            console.error('GraphQL watchQuery errors:', result.error);
          }
          return result.data as T;
        })
      );
  }

  /**
   * Execute a GraphQL mutation
   * @param mutation GraphQL mutation document
   * @param variables Mutation variables
   * @param optimisticResponse Optimistic response for instant UI updates
   * @returns Observable of mutation result
   */
  mutate<T = any, V extends OperationVariables = OperationVariables>(
    mutation: any,
    variables?: V,
    optimisticResponse?: T
  ): Observable<T> {
    const options: any = {
      mutation,
      variables,
    };

    if (optimisticResponse) {
      options.optimisticResponse = optimisticResponse;
    }

    return this.apollo.mutate<T, V>(options).pipe(
      map((result) => {
        if (result.error) {
          console.error('GraphQL mutation errors:', result.error);
        }
        return result.data!;
      })
    );
  }

  /**
   * Subscribe to a GraphQL subscription
   * @param subscription GraphQL subscription document
   * @param variables Subscription variables
   * @returns Observable of subscription data
   */
  subscribe<T = any, V extends OperationVariables = OperationVariables>(
    subscription: any,
    variables?: V
  ): Observable<T> {
    return this.apollo
      .subscribe<T, V>({
        query: subscription,
        variables,
      } as any)
      .pipe(
        map((result) => {
          if (result.error) {
            console.error('GraphQL subscription errors:', result.error);
          }
          return result.data!;
        })
      );
  }

  /**
   * Get the Apollo Client instance
   * @returns Apollo Client instance
   */
  getClient() {
    return this.apollo.client;
  }

  /**
   * Reset the Apollo store (clear cache)
   * @returns Promise that resolves when store is reset
   */
  resetStore(): Promise<any> {
    return this.apollo.client.resetStore();
  }

  /**
   * Clear the Apollo store without refetching queries
   * @returns Promise that resolves when store is cleared
   */
  clearStore(): Promise<any> {
    return this.apollo.client.clearStore();
  }

  /**
   * Refetch all active queries
   * @returns Promise that resolves when queries are refetched
   */
  refetchQueries(): Promise<any> {
    return this.apollo.client.refetchQueries({
      include: 'active',
    });
  }
}
