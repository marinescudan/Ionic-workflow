import { inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { environment } from '../../../../environments/environment';

/**
 * Apollo Client Configuration Factory
 *
 * Creates Apollo Client with:
 * - HttpLink for queries and mutations
 * - WebSocketLink for subscriptions
 * - InMemoryCache with type policies
 * - Split function to route operations to appropriate transport
 */
export function createApollo(): ApolloClientOptions {
  const httpLink = inject(HttpLink);

  // HTTP link for queries and mutations
  const http = httpLink.create({
    uri: environment.graphqlEndpoint || 'http://localhost:4000/graphql',
  });

  // WebSocket link for subscriptions
  const ws = new GraphQLWsLink(
    createClient({
      url: environment.graphqlWsEndpoint || 'ws://localhost:4000/graphql',
      connectionParams: () => {
        // Add authentication token if available
        const token = localStorage.getItem('auth_token');
        return token ? { authorization: `Bearer ${token}` } : {};
      },
      // Reconnection options
      shouldRetry: () => true,
      retryAttempts: 5,
      retryWait: async (retries) => {
        await new Promise(resolve => setTimeout(resolve, Math.min(1000 * 2 ** retries, 10000)));
      },
    })
  );

  // Split link - route operations to appropriate transport
  const link = split(
    // Split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    ws,  // Use WebSocket link for subscriptions
    http // Use HTTP link for queries and mutations
  );

  // Configure InMemoryCache with type policies
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Pagination handling for chapters
          chapters: {
            // Simple list field policy - overwrite on new fetch
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          // Pagination handling for paginated chapters (Relay-style)
          paginatedChapters: {
            keyArgs: false, // Don't include args in cache key
            merge(existing, incoming, { args }) {
              if (!existing) {
                return incoming;
              }

              // Handle offset-based pagination
              const merged = {
                ...incoming,
                edges: [...existing.edges],
              };

              // Append new edges
              const offset = args?.['offset'] || 0;
              for (let i = 0; i < incoming.edges.length; i++) {
                merged.edges[offset + i] = incoming.edges[i];
              }

              return merged;
            },
          },
        },
      },
      Chapter: {
        fields: {
          // Merge progress field properly
          progress: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
          // Merge bookmarks array
          bookmarks: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
      Progress: {
        // Key by chapterId for normalization
        keyFields: ['chapterId'],
      },
    },
  });

  return {
    link,
    cache,
    // Default options for queries
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  };
}
