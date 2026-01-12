// src/app/services/chapters/data/chapter-11.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_11_DATA: Chapter = {
  id: 11,
  title: 'GraphQL with Apollo Client',
  description: 'Master GraphQL queries, mutations, subscriptions with type-safe Apollo Client',
  icon: 'git-network-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 110,
      title: 'GraphQL Fundamentals',
      content: `
        <h2>Understanding GraphQL</h2>
        <p>GraphQL is a query language for APIs and a runtime for executing those queries. Unlike REST, GraphQL lets clients request exactly the data they need.</p>

        <h3>GraphQL vs REST</h3>
        <table>
          <tr>
            <th>Feature</th>
            <th>REST</th>
            <th>GraphQL</th>
          </tr>
          <tr>
            <td>Endpoints</td>
            <td>Multiple (one per resource)</td>
            <td>Single (/graphql)</td>
          </tr>
          <tr>
            <td>Data Fetching</td>
            <td>Fixed structure</td>
            <td>Client specifies</td>
          </tr>
          <tr>
            <td>Over-fetching</td>
            <td>Common</td>
            <td>Never</td>
          </tr>
          <tr>
            <td>Under-fetching</td>
            <td>Common (N+1)</td>
            <td>Solved</td>
          </tr>
          <tr>
            <td>Versioning</td>
            <td>URL versions</td>
            <td>Schema evolution</td>
          </tr>
          <tr>
            <td>Caching</td>
            <td>HTTP cache</td>
            <td>Normalized cache</td>
          </tr>
        </table>

        <h3>Core Concepts</h3>
        <ul>
          <li><strong>Schema:</strong> Contract between client and server</li>
          <li><strong>Query:</strong> Read operation (like GET)</li>
          <li><strong>Mutation:</strong> Write operation (like POST/PUT/DELETE)</li>
          <li><strong>Subscription:</strong> Real-time updates via WebSocket</li>
          <li><strong>Type System:</strong> Strongly typed (Int, String, Boolean, custom types)</li>
          <li><strong>Resolver:</strong> Function that returns data for a field</li>
        </ul>

        <h3>When to Use GraphQL</h3>
        <p><strong>Good for:</strong></p>
        <ul>
          <li>Mobile apps (reduce bandwidth)</li>
          <li>Complex nested relationships</li>
          <li>Multiple clients with different needs</li>
          <li>Rapid frontend development</li>
          <li>Real-time features</li>
        </ul>

        <p><strong>Not ideal for:</strong></p>
        <ul>
          <li>Simple CRUD operations</li>
          <li>File downloads (large binaries)</li>
          <li>Teams unfamiliar with GraphQL</li>
          <li>When HTTP caching is critical</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1100,
          language: 'typescript',
          title: 'GraphQL vs REST Comparison',
          code: `// REST: Multiple requests for related data
// GET /api/chapters/1
// GET /api/chapters/1/progress
// GET /api/chapters/1/bookmarks

// GraphQL: Single request
query {
  chapter(id: 1) {
    id
    title
    progress { percentage }
    bookmarks { note }
  }
}

// Benefits:
// ✅ No over-fetching
// ✅ No under-fetching
// ✅ One network request
// ✅ Strongly typed`,
          description: 'GraphQL eliminates over-fetching and under-fetching',
          copyable: true,
        },
        {
          id: 1101,
          language: 'graphql',
          title: 'GraphQL Schema Definition',
          code: `# Define types
type Chapter {
  id: ID!
  title: String!
  description: String
  category: ChapterCategory!
  completed: Boolean!
  progress: Progress
  bookmarks: [Bookmark!]!
}

enum ChapterCategory {
  FUNDAMENTALS
  ESSENTIALS
  INTERMEDIATE
  ADVANCED
}

type Progress {
  percentage: Float!
  timeSpent: Int!
}

# Root query type
type Query {
  chapters: [Chapter!]!
  chapter(id: ID!): Chapter
}

# Root mutation type
type Mutation {
  completeChapter(id: ID!): Chapter!
}`,
          description: 'Schema defines the contract between client and server',
          copyable: true,
        },
      ],
      interviewTips: [
        'GraphQL uses single endpoint vs REST multiple endpoints',
        'Client specifies exact data needed (no over/under-fetching)',
        'Schema is strongly typed contract',
        'Query for reads, Mutation for writes, Subscription for real-time',
        'Solves N+1 query problem with batching',
      ],
    },
    {
      id: 111,
      title: 'Apollo Client Setup',
      content: `
        <h2>Setting Up Apollo Client</h2>
        <p>Apollo Client is the most popular GraphQL client for JavaScript. It handles querying, caching, and state management.</p>

        <h3>Installation</h3>
        <pre>npm install @apollo/client graphql
npm install --save-dev @graphql-codegen/cli</pre>

        <h3>Key Components</h3>
        <ul>
          <li><strong>HttpLink:</strong> HTTP connection for queries/mutations</li>
          <li><strong>WebSocketLink:</strong> WebSocket for subscriptions</li>
          <li><strong>InMemoryCache:</strong> Normalized caching layer</li>
          <li><strong>split():</strong> Route operations to appropriate link</li>
          <li><strong>ApolloProvider:</strong> Provides client to Angular app</li>
        </ul>

        <h3>Apollo Client Features</h3>
        <ul>
          <li>Intelligent caching with normalization</li>
          <li>Optimistic UI updates</li>
          <li>Query batching</li>
          <li>Pagination support</li>
          <li>Error handling</li>
          <li>DevTools integration</li>
          <li>TypeScript support</li>
        </ul>

        <h3>Cache Configuration</h3>
        <p>Apollo's InMemoryCache normalizes data by type and ID, enabling automatic updates across queries.</p>
      `,
      codeSnippets: [
        {
          id: 1110,
          language: 'bash',
          title: 'Install Dependencies',
          code: `# Core packages
npm install @apollo/client graphql

# Code generation tools
npm install --save-dev @graphql-codegen/cli
npm install --save-dev @graphql-codegen/typescript
npm install --save-dev @graphql-codegen/typescript-operations
npm install --save-dev @graphql-codegen/typescript-apollo-angular`,
          description: 'Install Apollo Client and code generation tools',
          copyable: true,
        },
        {
          id: 1111,
          language: 'typescript',
          title: 'Apollo Client Configuration',
          code: `import { HttpLink, InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

// HTTP link for queries/mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
  })
);

// Split based on operation type
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Configure cache
const cache = new InMemoryCache({
  typePolicies: {
    Chapter: {
      keyFields: ['id'],  // Unique identifier
    },
  },
});`,
          description: 'Complete Apollo Client setup with HTTP and WebSocket support',
          copyable: true,
        },
        {
          id: 1112,
          language: 'typescript',
          title: 'GraphQL Service Wrapper',
          code: `import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentNode } from 'graphql';

@Injectable({ providedIn: 'root' })
export class GraphQLService {
  private apollo = inject(Apollo);

  query<T, V = any>(
    query: DocumentNode,
    variables?: V
  ): Observable<T> {
    return this.apollo
      .query<T, V>({ query, variables })
      .pipe(map((result) => result.data));
  }

  mutate<T, V = any>(
    mutation: DocumentNode,
    variables?: V
  ): Observable<T> {
    return this.apollo
      .mutate<T, V>({ mutation, variables })
      .pipe(map((result) => result.data!));
  }

  subscribe<T, V = any>(
    subscription: DocumentNode,
    variables?: V
  ): Observable<T> {
    return this.apollo
      .subscribe<T, V>({ query: subscription, variables })
      .pipe(map((result) => result.data!));
  }
}`,
          description: 'Type-safe GraphQL service wrapper',
          copyable: true,
        },
      ],
      interviewTips: [
        'Apollo Client = GraphQL client + caching + state management',
        'HttpLink for queries/mutations, WebSocketLink for subscriptions',
        'InMemoryCache normalizes data by type + ID',
        'split() routes operations to appropriate transport',
        'Wrap in service for consistent API',
      ],
    },
    {
      id: 112,
      title: 'Type Generation with graphql-codegen',
      content: `
        <h2>Automatic TypeScript Type Generation</h2>
        <p>GraphQL Code Generator automatically creates TypeScript types from your GraphQL schema and operations.</p>

        <h3>Benefits</h3>
        <ul>
          <li><strong>Type Safety:</strong> Compile-time checking for all GraphQL operations</li>
          <li><strong>Auto-completion:</strong> IDE suggests available fields</li>
          <li><strong>Refactoring:</strong> Rename fields safely</li>
          <li><strong>Documentation:</strong> Types serve as docs</li>
          <li><strong>Less Errors:</strong> Catch typos at compile time</li>
        </ul>

        <h3>Generated Outputs</h3>
        <ul>
          <li><strong>types.ts:</strong> Schema types (Chapter, Progress, etc.)</li>
          <li><strong>operations.ts:</strong> Query/Mutation/Subscription types</li>
          <li><strong>services.ts:</strong> Angular services for each operation</li>
        </ul>

        <h3>Workflow</h3>
        <ol>
          <li>Write GraphQL operation (.graphql file)</li>
          <li>Run code generator</li>
          <li>Import generated types</li>
          <li>Use type-safe service</li>
        </ol>
      `,
      codeSnippets: [
        {
          id: 1120,
          language: 'yaml',
          title: 'Code Generator Configuration',
          code: `# codegen.yml
schema: http://localhost:4000/graphql
documents:
  - 'src/**/*.graphql'
  - 'src/**/*.ts'
generates:
  src/app/graphql/generated/types.ts:
    plugins:
      - typescript
  src/app/graphql/generated/operations.ts:
    plugins:
      - typescript
      - typescript-operations
  src/app/graphql/generated/services.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-apollo-angular
config:
  strict: true
  scalars:
    DateTime: string
    Upload: File`,
          description: 'GraphQL Code Generator configuration',
          copyable: true,
        },
        {
          id: 1121,
          language: 'graphql',
          title: 'GraphQL Operation Definition',
          code: `# src/app/graphql/queries/chapters.graphql
query GetChapters($category: ChapterCategory) {
  chapters(category: $category) {
    id
    title
    description
    completed
  }
}

query GetChapter($id: ID!) {
  chapter(id: $id) {
    id
    title
    progress {
      percentage
      timeSpent
    }
  }
}`,
          description: 'Define GraphQL operations in .graphql files',
          copyable: true,
        },
        {
          id: 1122,
          language: 'typescript',
          title: 'Using Generated Types',
          code: `// Generated types are automatically imported
import {
  GetChaptersQuery,
  GetChaptersQueryVariables,
  GetChapterQuery,
  GetChapterQueryVariables,
} from '@app/graphql/generated/operations';

@Injectable()
export class ChaptersGqlService {
  private gql = inject(GraphQLService);

  getChapters(variables?: GetChaptersQueryVariables): Observable<GetChaptersQuery> {
    return this.gql.query<GetChaptersQuery, GetChaptersQueryVariables>(
      GET_CHAPTERS,
      variables
    );
  }

  getChapter(id: string): Observable<GetChapterQuery> {
    return this.gql.query<GetChapterQuery, GetChapterQueryVariables>(
      GET_CHAPTER,
      { id }
    );
  }
}`,
          description: 'Type-safe GraphQL service with generated types',
          copyable: true,
        },
        {
          id: 1123,
          language: 'bash',
          title: 'Run Code Generation',
          code: `# Generate types once
npm run codegen

# Watch mode (regenerate on file changes)
npm run codegen:watch

# Add to package.json scripts:
{
  "scripts": {
    "codegen": "graphql-codegen --config codegen.yml",
    "codegen:watch": "graphql-codegen --config codegen.yml --watch"
  }
}`,
          description: 'Run code generation commands',
          copyable: true,
        },
      ],
      interviewTips: [
        'graphql-codegen generates TypeScript types from schema',
        'Types ensure compile-time safety for all operations',
        'IDE auto-completion for GraphQL fields',
        'Run codegen after schema changes',
        'Generated services reduce boilerplate',
      ],
    },
    {
      id: 113,
      title: 'Writing Queries',
      content: `
        <h2>GraphQL Queries</h2>
        <p>Queries are read-only operations that fetch data from the server. They're similar to GET requests in REST.</p>

        <h3>Query Features</h3>
        <ul>
          <li><strong>Fields:</strong> Specify exactly what data you need</li>
          <li><strong>Arguments:</strong> Filter, sort, paginate results</li>
          <li><strong>Variables:</strong> Dynamic values passed to query</li>
          <li><strong>Aliases:</strong> Rename fields in response</li>
          <li><strong>Fragments:</strong> Reusable field selections</li>
          <li><strong>Directives:</strong> Conditional inclusion (@include, @skip)</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Request only needed fields</li>
          <li>Use variables instead of string interpolation</li>
          <li>Use fragments for reusable field sets</li>
          <li>Name your queries</li>
          <li>Handle loading and error states</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1130,
          language: 'graphql',
          title: 'Basic Query',
          code: `# Simple query
query {
  chapters {
    id
    title
  }
}

# Query with arguments
query {
  chapter(id: "1") {
    id
    title
    description
  }
}

# Query with variables
query GetChapter($id: ID!) {
  chapter(id: $id) {
    id
    title
  }
}`,
          description: 'Basic GraphQL query examples',
          copyable: true,
        },
        {
          id: 1131,
          language: 'graphql',
          title: 'Nested Queries',
          code: `query GetChapterWithDetails($id: ID!) {
  chapter(id: $id) {
    id
    title
    description
    # Nested relationships
    progress {
      percentage
      timeSpent
      lastAccessed
    }
    bookmarks {
      id
      sectionId
      note
      createdAt
    }
    sections {
      id
      title
      codeSnippets {
        language
        code
      }
    }
  }
}`,
          description: 'Query with nested relationships',
          copyable: true,
        },
        {
          id: 1132,
          language: 'graphql',
          title: 'Fragments',
          code: `# Define reusable fragment
fragment ChapterFields on Chapter {
  id
  title
  description
  category
  completed
}

# Use fragment in queries
query GetChapters {
  chapters {
    ...ChapterFields
  }
}

query GetChapter($id: ID!) {
  chapter(id: $id) {
    ...ChapterFields
    progress {
      percentage
    }
  }
}`,
          description: 'Fragments for reusable field selections',
          copyable: true,
        },
        {
          id: 1133,
          language: 'typescript',
          title: 'Query in Component',
          code: `import { Component, OnInit, inject } from '@angular/core';
import { ChaptersGqlService } from '../../services/chapters-gql.service';

@Component({
  selector: 'app-chapters-list',
  template: \`
    @if (loading) {
      <ion-spinner></ion-spinner>
    }
    @if (error) {
      <ion-text color="danger">{{ error }}</ion-text>
    }
    @if (chapters) {
      <ion-list>
        @for (chapter of chapters; track chapter.id) {
          <ion-item>{{ chapter.title }}</ion-item>
        }
      </ion-list>
    }
  \`,
})
export class ChaptersListComponent implements OnInit {
  private chaptersGql = inject(ChaptersGqlService);

  chapters: any[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit() {
    this.loadChapters();
  }

  loadChapters() {
    this.loading = true;
    this.chaptersGql.getChapters().subscribe({
      next: (data) => {
        this.chapters = data.chapters;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}`,
          description: 'Using GraphQL query in Angular component',
          copyable: true,
        },
      ],
      interviewTips: [
        'Queries are read-only operations',
        'Request only fields you need (avoid over-fetching)',
        'Use variables for dynamic values',
        'Fragments promote reusability',
        'Handle loading, error, and success states',
      ],
    },
    {
      id: 114,
      title: 'Mutations and Optimistic UI',
      content: `
        <h2>GraphQL Mutations</h2>
        <p>Mutations are write operations that modify data on the server. They're similar to POST, PUT, DELETE in REST.</p>

        <h3>Mutation Features</h3>
        <ul>
          <li><strong>Side Effects:</strong> Create, update, delete data</li>
          <li><strong>Return Values:</strong> Return modified data</li>
          <li><strong>Optimistic Response:</strong> Update UI before server responds</li>
          <li><strong>Cache Updates:</strong> Automatically update cache</li>
          <li><strong>Refetch Queries:</strong> Re-fetch affected queries</li>
        </ul>

        <h3>Optimistic UI</h3>
        <p>Update UI immediately before server responds, creating instant feedback. Apollo automatically rolls back if mutation fails.</p>

        <h3>Cache Update Strategies</h3>
        <ul>
          <li><strong>Automatic:</strong> Cache updates automatically (if normalized)</li>
          <li><strong>update():</strong> Manually update cache</li>
          <li><strong>refetchQueries:</strong> Re-fetch queries (simpler but slower)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1140,
          language: 'graphql',
          title: 'Mutation Definitions',
          code: `mutation CompleteChapter($id: ID!) {
  completeChapter(id: $id) {
    id
    completed
    completedAt
  }
}

mutation UpdateProgress($chapterId: ID!, $percentage: Float!) {
  updateProgress(chapterId: $chapterId, percentage: $percentage) {
    id
    percentage
    timeSpent
  }
}

mutation CreateBookmark($input: BookmarkInput!) {
  createBookmark(input: $input) {
    id
    chapterId
    note
    createdAt
  }
}`,
          description: 'GraphQL mutation definitions',
          copyable: true,
        },
        {
          id: 1141,
          language: 'typescript',
          title: 'Basic Mutation',
          code: `@Injectable()
export class ChaptersGqlService {
  private apollo = inject(Apollo);

  completeChapter(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: COMPLETE_CHAPTER,
      variables: { id },
    }).pipe(
      map((result) => result.data)
    );
  }
}

// Usage in component
this.chaptersGql.completeChapter('1').subscribe({
  next: (data) => {
    console.log('Chapter completed:', data);
  },
  error: (error) => {
    console.error('Failed:', error);
  },
});`,
          description: 'Basic mutation execution',
          copyable: true,
        },
        {
          id: 1142,
          language: 'typescript',
          title: 'Optimistic UI Update',
          code: `completeChapterOptimistic(id: string): Observable<any> {
  return this.apollo.mutate({
    mutation: COMPLETE_CHAPTER,
    variables: { id },
    // Optimistic response - UI updates immediately
    optimisticResponse: {
      __typename: 'Mutation',
      completeChapter: {
        __typename: 'Chapter',
        id,
        completed: true,
        completedAt: new Date().toISOString(),
      },
    },
  });
}

// UI updates instantly, then syncs with server
// If mutation fails, Apollo automatically rolls back`,
          description: 'Optimistic UI for instant feedback',
          copyable: true,
        },
        {
          id: 1143,
          language: 'typescript',
          title: 'Manual Cache Update',
          code: `createBookmark(input: BookmarkInput): Observable<any> {
  return this.apollo.mutate({
    mutation: CREATE_BOOKMARK,
    variables: { input },
    update: (cache, { data }) => {
      if (!data) return;

      // Read existing data from cache
      const existing = cache.readQuery({
        query: GET_CHAPTER,
        variables: { id: input.chapterId },
      });

      if (!existing?.chapter) return;

      // Write updated data to cache
      cache.writeQuery({
        query: GET_CHAPTER,
        variables: { id: input.chapterId },
        data: {
          chapter: {
            ...existing.chapter,
            bookmarks: [
              ...existing.chapter.bookmarks,
              data.createBookmark,
            ],
          },
        },
      });
    },
  });
}`,
          description: 'Manually update cache after mutation',
          copyable: true,
        },
        {
          id: 1144,
          language: 'typescript',
          title: 'RefetchQueries Pattern',
          code: `deleteBookmark(id: string, chapterId: string): Observable<any> {
  return this.apollo.mutate({
    mutation: DELETE_BOOKMARK,
    variables: { id },
    // Re-fetch these queries after mutation
    refetchQueries: [
      {
        query: GET_CHAPTER,
        variables: { id: chapterId },
      },
    ],
    // Wait for refetch before resolving
    awaitRefetchQueries: true,
  });
}

// Simpler than manual cache update
// But requires extra network request`,
          description: 'Refetch queries after mutation (simpler approach)',
          copyable: true,
        },
      ],
      interviewTips: [
        'Mutations modify data (create, update, delete)',
        'Optimistic UI updates immediately, rolls back on error',
        'update() for manual cache updates (complex)',
        'refetchQueries for simple cache updates (extra request)',
        'Always include __typename for cache normalization',
      ],
    },
    {
      id: 115,
      title: 'Real-time Subscriptions',
      content: `
        <h2>GraphQL Subscriptions</h2>
        <p>Subscriptions enable real-time updates from server to client using WebSocket connections.</p>

        <h3>Use Cases</h3>
        <ul>
          <li>Live chat messages</li>
          <li>Real-time notifications</li>
          <li>Progress updates</li>
          <li>User presence</li>
          <li>Live sports scores</li>
          <li>Stock price updates</li>
        </ul>

        <h3>How Subscriptions Work</h3>
        <ol>
          <li>Client opens WebSocket connection</li>
          <li>Client subscribes to specific event</li>
          <li>Server pushes data when event occurs</li>
          <li>Client receives data instantly</li>
          <li>Connection stays open until unsubscribe</li>
        </ol>

        <h3>Best Practices</h3>
        <ul>
          <li>Unsubscribe in ngOnDestroy()</li>
          <li>Handle connection errors</li>
          <li>Update cache when receiving data</li>
          <li>Don't overuse (expensive to maintain connections)</li>
          <li>Consider polling for non-critical updates</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1150,
          language: 'graphql',
          title: 'Subscription Definitions',
          code: `subscription OnProgressUpdated($chapterId: ID!) {
  progressUpdated(chapterId: $chapterId) {
    chapterId
    percentage
    timeSpent
    lastAccessed
  }
}

subscription OnChapterCompleted {
  chapterCompleted {
    id
    title
    completed
    completedAt
  }
}`,
          description: 'GraphQL subscription definitions',
          copyable: true,
        },
        {
          id: 1151,
          language: 'typescript',
          title: 'Subscription Service',
          code: `import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProgressGqlService {
  private apollo = inject(Apollo);

  subscribeToProgress(chapterId: string): Observable<any> {
    return this.apollo
      .subscribe({
        query: PROGRESS_SUBSCRIPTION,
        variables: { chapterId },
      })
      .pipe(
        map((result) => result.data?.progressUpdated)
      );
  }

  subscribeToChapterCompletions(): Observable<any> {
    return this.apollo
      .subscribe({
        query: CHAPTER_COMPLETED_SUBSCRIPTION,
      })
      .pipe(
        map((result) => result.data?.chapterCompleted)
      );
  }
}`,
          description: 'Service for GraphQL subscriptions',
          copyable: true,
        },
        {
          id: 1152,
          language: 'typescript',
          title: 'Subscription in Component',
          code: `import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressGqlService } from '../../services/progress-gql.service';

@Component({
  selector: 'app-progress-viewer',
  template: \`
    <ion-card>
      <ion-card-header>
        <ion-card-title>Real-time Progress</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        @if (progress) {
          <p>Progress: {{ progress.percentage }}%</p>
          <p>Last Updated: {{ progress.lastAccessed | date:'short' }}</p>
        }
      </ion-card-content>
    </ion-card>
  \`,
})
export class ProgressViewerComponent implements OnInit, OnDestroy {
  private progressGql = inject(ProgressGqlService);
  private subscription?: Subscription;

  progress: any = null;

  ngOnInit() {
    // Subscribe to real-time updates
    this.subscription = this.progressGql
      .subscribeToProgress('1')
      .subscribe({
        next: (data) => {
          console.log('Progress updated:', data);
          this.progress = data;
        },
        error: (error) => {
          console.error('Subscription error:', error);
        },
      });
  }

  ngOnDestroy() {
    // IMPORTANT: Unsubscribe to prevent memory leaks
    this.subscription?.unsubscribe();
  }
}`,
          description: 'Using subscription in component with proper cleanup',
          copyable: true,
        },
      ],
      interviewTips: [
        'Subscriptions use WebSocket for real-time updates',
        'Server pushes data to client (not polling)',
        'Always unsubscribe in ngOnDestroy()',
        'More expensive than queries (persistent connection)',
        'Good for: chat, notifications, live updates',
      ],
    },
    {
      id: 116,
      title: 'Apollo Cache Management',
      content: `
        <h2>Understanding Apollo Cache</h2>
        <p>Apollo's InMemoryCache is a normalized caching layer that stores GraphQL data efficiently.</p>

        <h3>Cache Normalization</h3>
        <p>Objects are stored once and referenced by pointers, enabling automatic updates across all queries.</p>

        <h3>Cache Structure</h3>
        <pre>{
  "Chapter:1": {
    __typename: "Chapter",
    id: "1",
    title: "Introduction",
    progress: { __ref: "Progress:1" }
  },
  "Progress:1": {
    __typename: "Progress",
    id: "1",
    percentage: 75
  }
}</pre>

        <h3>Benefits</h3>
        <ul>
          <li><strong>Automatic Updates:</strong> Updating one object updates all queries</li>
          <li><strong>Deduplication:</strong> Objects stored once</li>
          <li><strong>Consistency:</strong> Single source of truth</li>
          <li><strong>Performance:</strong> Reads from cache are instant</li>
        </ul>

        <h3>Fetch Policies</h3>
        <ul>
          <li><strong>cache-first:</strong> Try cache, then network (default)</li>
          <li><strong>cache-and-network:</strong> Return cache, fetch network in background</li>
          <li><strong>network-only:</strong> Always fetch from network</li>
          <li><strong>no-cache:</strong> Don't use cache at all</li>
          <li><strong>cache-only:</strong> Only use cache (error if not cached)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1160,
          language: 'typescript',
          title: 'Cache Configuration',
          code: `const cache = new InMemoryCache({
  typePolicies: {
    Chapter: {
      // Unique identifier
      keyFields: ['id'],

      fields: {
        // Computed field
        displayTitle: {
          read(_, { readField }) {
            const title = readField<string>('title');
            const completed = readField<boolean>('completed');
            return completed ? \`✓ \${title}\` : title;
          },
        },
      },
    },

    Progress: {
      // Composite key
      keyFields: ['chapterId', 'userId'],
    },

    Query: {
      fields: {
        // Pagination merge strategy
        paginatedChapters: {
          keyArgs: ['category'],
          merge(existing = { edges: [] }, incoming) {
            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges],
            };
          },
        },
      },
    },
  },
});`,
          description: 'Advanced cache configuration with type policies',
          copyable: true,
        },
        {
          id: 1161,
          language: 'typescript',
          title: 'Reading from Cache',
          code: `import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';

@Injectable()
export class CacheService {
  private apollo = inject(Apollo);

  // Read query from cache
  readChapterFromCache(id: string) {
    try {
      return this.apollo.client.cache.readQuery({
        query: GET_CHAPTER,
        variables: { id },
      });
    } catch {
      return null;  // Not in cache
    }
  }

  // Read fragment from cache
  readChapterFragment(id: string) {
    return this.apollo.client.cache.readFragment({
      id: \`Chapter:\${id}\`,
      fragment: gql\`
        fragment ChapterData on Chapter {
          id
          title
          completed
        }
      \`,
    });
  }

  // Check if exists in cache
  hasChapterInCache(id: string): boolean {
    return this.readChapterFragment(id) !== null;
  }
}`,
          description: 'Reading data from Apollo cache',
          copyable: true,
        },
        {
          id: 1162,
          language: 'typescript',
          title: 'Writing to Cache',
          code: `// Write query to cache
writeChapterToCache(chapter: Chapter) {
  this.apollo.client.cache.writeQuery({
    query: GET_CHAPTER,
    variables: { id: chapter.id },
    data: { chapter },
  });
}

// Write fragment to cache
updateChapterInCache(id: string, updates: Partial<Chapter>) {
  this.apollo.client.cache.writeFragment({
    id: \`Chapter:\${id}\`,
    fragment: gql\`
      fragment ChapterData on Chapter {
        id
        title
        completed
      }
    \`,
    data: {
      __typename: 'Chapter',
      id,
      ...updates,
    },
  });
}

// Modify specific fields
markChapterCompleted(id: string) {
  this.apollo.client.cache.modify({
    id: \`Chapter:\${id}\`,
    fields: {
      completed: () => true,
      completedAt: () => new Date().toISOString(),
    },
  });
}`,
          description: 'Writing and modifying cache data',
          copyable: true,
        },
      ],
      interviewTips: [
        'Apollo cache normalizes data by __typename + id',
        'Objects stored once, referenced by pointers',
        'Updating cache updates ALL queries using that object',
        'cache-first: Fast but may show stale data',
        'cache-and-network: Best of both worlds',
      ],
    },
    {
      id: 117,
      title: 'Pagination Strategies',
      content: `
        <h2>Pagination in GraphQL</h2>
        <p>GraphQL supports multiple pagination strategies. Choose based on your use case.</p>

        <h3>Offset-based Pagination</h3>
        <p><strong>How it works:</strong> Skip N items, return M items</p>
        <p><strong>Pros:</strong> Simple, familiar (SQL OFFSET)</p>
        <p><strong>Cons:</strong> Duplicates on additions, inefficient for large offsets</p>

        <h3>Cursor-based Pagination</h3>
        <p><strong>How it works:</strong> Use opaque cursor to point to position</p>
        <p><strong>Pros:</strong> No duplicates, efficient, handles additions/deletions</p>
        <p><strong>Cons:</strong> Can't jump to arbitrary page</p>

        <h3>Relay Specification</h3>
        <p>Standard for cursor pagination with consistent API across GraphQL servers.</p>

        <h3>When to Use Each</h3>
        <table>
          <tr>
            <th>Strategy</th>
            <th>Use For</th>
          </tr>
          <tr>
            <td>Offset</td>
            <td>Admin pages, numbered pages</td>
          </tr>
          <tr>
            <td>Cursor</td>
            <td>Infinite scroll, mobile feeds</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1170,
          language: 'graphql',
          title: 'Offset-based Pagination',
          code: `query PaginatedChapters($offset: Int!, $limit: Int!) {
  paginatedChapters(offset: $offset, limit: $limit) {
    edges {
      node {
        id
        title
      }
    }
    totalCount
    pageInfo {
      hasNextPage
    }
  }
}

# Usage:
# Page 1: offset=0, limit=10
# Page 2: offset=10, limit=10
# Page 3: offset=20, limit=10`,
          description: 'Offset-based pagination query',
          copyable: true,
        },
        {
          id: 1171,
          language: 'graphql',
          title: 'Cursor-based Pagination',
          code: `query CursorPaginatedChapters($after: String, $first: Int!) {
  paginatedChapters(after: $after, first: $first) {
    edges {
      node {
        id
        title
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

# Usage:
# Page 1: after=null, first=10
# Page 2: after=endCursor, first=10
# Page 3: after=newEndCursor, first=10`,
          description: 'Cursor-based pagination query (Relay spec)',
          copyable: true,
        },
        {
          id: 1172,
          language: 'typescript',
          title: 'Infinite Scroll Component',
          code: `import { Component, inject } from '@angular/core';
import { ChaptersGqlService } from '../../services/chapters-gql.service';

@Component({
  selector: 'app-chapters-infinite',
  template: \`
    <ion-content>
      <ion-list>
        @for (chapter of chapters; track chapter.id) {
          <ion-item>{{ chapter.title }}</ion-item>
        }
      </ion-list>

      <ion-infinite-scroll
        (ionInfinite)="loadMore($event)"
        [disabled]="!hasMore">
        <ion-infinite-scroll-content
          loadingText="Loading...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  \`,
})
export class ChaptersInfiniteComponent {
  private chaptersGql = inject(ChaptersGqlService);

  chapters: any[] = [];
  endCursor: string | null = null;
  hasMore = true;

  loadMore(event: any) {
    this.chaptersGql
      .loadCursorPage(this.endCursor, 10)
      .subscribe((data) => {
        const newChapters = data.paginatedChapters.edges.map(
          (e) => e.node
        );
        this.chapters = [...this.chapters, ...newChapters];
        this.endCursor = data.paginatedChapters.pageInfo.endCursor;
        this.hasMore = data.paginatedChapters.pageInfo.hasNextPage;
        event.target.complete();
      });
  }
}`,
          description: 'Infinite scroll with cursor pagination',
          copyable: true,
        },
      ],
      interviewTips: [
        'Offset: Simple but has issues with additions/deletions',
        'Cursor: More robust, no duplicates',
        'Relay spec: Standard for cursor pagination',
        'Use cursor for infinite scroll',
        'Use offset for numbered pages',
      ],
    },
    {
      id: 118,
      title: 'File Uploads',
      content: `
        <h2>File Uploads with GraphQL</h2>
        <p>GraphQL supports file uploads using multipart requests and the Upload scalar type.</p>

        <h3>How it Works</h3>
        <ol>
          <li>Define Upload scalar in schema</li>
          <li>Create mutation with Upload argument</li>
          <li>Apollo Client handles FormData automatically</li>
          <li>Server processes multipart request</li>
        </ol>

        <h3>Limitations</h3>
        <ul>
          <li>Not ideal for very large files (>100MB)</li>
          <li>No native progress tracking</li>
          <li>Consider pre-signed URLs + REST for large files</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Validate file type on client and server</li>
          <li>Set size limits</li>
          <li>Show upload progress</li>
          <li>Handle errors gracefully</li>
          <li>Store files on CDN</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1180,
          language: 'graphql',
          title: 'File Upload Schema',
          code: `scalar Upload

type Mutation {
  uploadFile(file: Upload!): String!
  uploadFiles(files: [Upload!]!): [String!]!
  uploadWithMetadata(
    file: Upload!
    title: String!
    description: String
  ): FileUploadResult!
}

type FileUploadResult {
  url: String!
  filename: String!
  mimetype: String!
  size: Int!
}`,
          description: 'GraphQL schema for file uploads',
          copyable: true,
        },
        {
          id: 1181,
          language: 'typescript',
          title: 'File Upload Service',
          code: `import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { map } from 'rxjs/operators';

const UPLOAD_FILE = gql\`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
\`;

@Injectable({ providedIn: 'root' })
export class FileUploadGqlService {
  private apollo = inject(Apollo);

  uploadFile(file: File) {
    return this.apollo
      .mutate({
        mutation: UPLOAD_FILE,
        variables: { file },
        context: {
          useMultipart: true,  // Enable multipart
        },
      })
      .pipe(map((result) => result.data?.uploadFile));
  }
}`,
          description: 'File upload service with Apollo',
          copyable: true,
        },
        {
          id: 1182,
          language: 'typescript',
          title: 'File Upload Component',
          code: `@Component({
  selector: 'app-file-upload-gql',
  template: \`
    <ion-card>
      <ion-card-header>
        <ion-card-title>Upload File</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <input
          type="file"
          (change)="onFileSelected($event)"
          accept="image/*">

        @if (uploading) {
          <ion-progress-bar type="indeterminate"></ion-progress-bar>
        }

        @if (uploadedUrl) {
          <p>Uploaded: {{ uploadedUrl }}</p>
          <img [src]="uploadedUrl" style="max-width: 200px;">
        }
      </ion-card-content>
    </ion-card>
  \`,
})
export class FileUploadGqlComponent {
  private uploadService = inject(FileUploadGqlService);

  uploading = false;
  uploadedUrl: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Max 5MB.');
      return;
    }

    this.uploadFile(file);
  }

  uploadFile(file: File) {
    this.uploading = true;

    this.uploadService.uploadFile(file).subscribe({
      next: (url) => {
        this.uploadedUrl = url;
        this.uploading = false;
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.uploading = false;
      },
    });
  }
}`,
          description: 'File upload component',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use Upload scalar for file uploads',
        'Apollo Client handles multipart automatically',
        'context: { useMultipart: true } enables file upload',
        'Not ideal for very large files (use pre-signed URLs)',
        'Validate file type and size',
      ],
    },
    {
      id: 119,
      title: 'NgRx Integration',
      content: `
        <h2>Integrating GraphQL with NgRx</h2>
        <p>Combine Apollo Client's caching with NgRx state management for complex apps.</p>

        <h3>When to Use Both</h3>
        <p><strong>Apollo Cache alone:</strong></p>
        <ul>
          <li>Simple apps</li>
          <li>Server data only</li>
          <li>Minimal client-side state</li>
        </ul>

        <p><strong>Apollo + NgRx:</strong></p>
        <ul>
          <li>Complex client state</li>
          <li>Need Redux DevTools</li>
          <li>Centralized state management</li>
          <li>Team familiar with NgRx</li>
        </ul>

        <h3>Integration Pattern</h3>
        <ul>
          <li><strong>Actions:</strong> Trigger GraphQL operations</li>
          <li><strong>Effects:</strong> Execute GraphQL queries/mutations</li>
          <li><strong>Reducers:</strong> Store results in NgRx store</li>
          <li><strong>Selectors:</strong> Provide data to components</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1190,
          language: 'typescript',
          title: 'GraphQL Actions',
          code: `import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const GraphQLActions = createActionGroup({
  source: 'GraphQL',
  events: {
    // Queries
    'Load Chapters': emptyProps(),
    'Load Chapters Success': props<{ chapters: Chapter[] }>(),
    'Load Chapters Failure': props<{ error: string }>(),

    // Mutations
    'Complete Chapter': props<{ id: string }>(),
    'Complete Chapter Success': props<{ chapter: Chapter }>(),
    'Complete Chapter Failure': props<{ error: string }>(),

    // Subscriptions
    'Subscribe To Progress': props<{ chapterId: string }>(),
    'Progress Updated': props<{ progress: Progress }>(),
  },
});`,
          description: 'NgRx actions for GraphQL operations',
          copyable: true,
        },
        {
          id: 1191,
          language: 'typescript',
          title: 'GraphQL Effects',
          code: `import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ChaptersGqlService } from '../services/chapters-gql.service';
import { GraphQLActions } from './graphql.actions';

@Injectable()
export class GraphQLEffects {
  private actions$ = inject(Actions);
  private chaptersGql = inject(ChaptersGqlService);

  loadChapters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GraphQLActions.loadChapters),
      switchMap(() =>
        this.chaptersGql.getChapters().pipe(
          map((data) =>
            GraphQLActions.loadChaptersSuccess({
              chapters: data.chapters,
            })
          ),
          catchError((error) =>
            of(
              GraphQLActions.loadChaptersFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  completeChapter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GraphQLActions.completeChapter),
      switchMap(({ id }) =>
        this.chaptersGql.completeChapter(id).pipe(
          map((data) =>
            GraphQLActions.completeChapterSuccess({
              chapter: data.completeChapter,
            })
          ),
          catchError((error) =>
            of(
              GraphQLActions.completeChapterFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}`,
          description: 'NgRx effects trigger GraphQL operations',
          copyable: true,
        },
        {
          id: 1192,
          language: 'typescript',
          title: 'GraphQL Reducer',
          code: `import { createReducer, on } from '@ngrx/store';
import { GraphQLActions } from './graphql.actions';

export interface GraphQLState {
  chapters: Chapter[];
  loading: boolean;
  error: string | null;
}

const initialState: GraphQLState = {
  chapters: [],
  loading: false,
  error: null,
};

export const graphqlReducer = createReducer(
  initialState,

  on(GraphQLActions.loadChapters, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(GraphQLActions.loadChaptersSuccess, (state, { chapters }) => ({
    ...state,
    chapters,
    loading: false,
  })),

  on(GraphQLActions.loadChaptersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(GraphQLActions.completeChapterSuccess, (state, { chapter }) => ({
    ...state,
    chapters: state.chapters.map((c) =>
      c.id === chapter.id ? chapter : c
    ),
  }))
);`,
          description: 'NgRx reducer stores GraphQL results',
          copyable: true,
        },
      ],
      interviewTips: [
        'Apollo cache + NgRx = dual state management',
        'Effects trigger GraphQL operations',
        'Reducers store results in NgRx store',
        'Consider: Do you need both? (cache often enough)',
        'NgRx adds complexity but provides DevTools',
      ],
    },
  ],
};
