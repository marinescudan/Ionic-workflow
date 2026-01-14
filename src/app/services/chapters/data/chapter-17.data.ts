// src/app/services/chapters/data/chapter-17.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_17_DATA: Chapter = {
  id: 17,
  title: 'Offline-First Architecture',
  description: 'Build apps that work seamlessly offline with sync, conflict resolution, and optimistic updates',
  icon: 'cloud-offline-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 170,
      title: 'Offline-First Principles',
      content: `
        <h2>Understanding Offline-First Architecture</h2>
        <p>Offline-first means building applications that work primarily with local data and sync with servers in the background. The local database is the source of truth.</p>

        <h3>Offline-First vs Online-First</h3>
        <table>
          <tr>
            <th>Aspect</th>
            <th>Offline-First</th>
            <th>Online-First</th>
          </tr>
          <tr>
            <td>Data Source</td>
            <td>Local database</td>
            <td>Server API</td>
          </tr>
          <tr>
            <td>Network Required</td>
            <td>No (sync when available)</td>
            <td>Yes (always required)</td>
          </tr>
          <tr>
            <td>User Experience</td>
            <td>Always fast and responsive</td>
            <td>Depends on network speed</td>
          </tr>
          <tr>
            <td>Loading States</td>
            <td>Minimal (local data instant)</td>
            <td>Frequent spinners</td>
          </tr>
          <tr>
            <td>Conflict Resolution</td>
            <td>Required (complex)</td>
            <td>Not needed (server authoritative)</td>
          </tr>
        </table>

        <h3>CAP Theorem for Mobile Apps</h3>
        <p>The CAP theorem states you can only have two of three properties:</p>
        <ul>
          <li><strong>Consistency:</strong> All nodes see the same data at the same time</li>
          <li><strong>Availability:</strong> Every request receives a response (success or failure)</li>
          <li><strong>Partition Tolerance:</strong> System continues despite network partitions</li>
        </ul>
        <p><strong>Mobile apps typically choose AP</strong> (Availability + Partition Tolerance) because users expect apps to work offline.</p>

        <h3>Key Principles</h3>
        <h4>1. Local-First</h4>
        <ul>
          <li>All operations work on local database first</li>
          <li>No network requests for reads or writes</li>
          <li>Instant UI updates, no loading spinners</li>
        </ul>

        <h4>2. Queue Operations</h4>
        <ul>
          <li>Queue CRUD operations for server sync</li>
          <li>Persist queue across app restarts</li>
          <li>Process queue when network available</li>
        </ul>

        <h4>3. Optimistic Updates</h4>
        <ul>
          <li>Update UI immediately (assume success)</li>
          <li>Rollback on failure</li>
          <li>Best perceived performance</li>
        </ul>

        <h4>4. Sync Intelligently</h4>
        <ul>
          <li>Bidirectional sync (push local, pull server changes)</li>
          <li>Incremental sync (only changed data)</li>
          <li>Background sync when idle</li>
        </ul>

        <h4>5. Handle Conflicts</h4>
        <ul>
          <li>Detect conflicts (version/timestamp mismatch)</li>
          <li>Multiple resolution strategies</li>
          <li>User involvement when needed</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1700,
          language: 'typescript',
          title: 'Offline-First vs Online-First Comparison',
          copyable: true,
          code: `/*
💡 INTERVIEW: Offline-First Architecture

Q: What is offline-first architecture?
A: Offline-first means:
   - Local database is source of truth
   - All operations work locally first
   - Sync with server in background
   - App works seamlessly without network

Q: Why choose offline-first over online-first?
A: Benefits:
   - Better user experience (no loading states)
   - Works in poor network conditions
   - Instant UI feedback
   - Handles offline scenarios gracefully
   - Reduces server load

Q: What are the challenges?
A: Main challenges:
   - Conflict resolution (multiple edits)
   - Sync complexity (bidirectional)
   - Data consistency (eventual)
   - More complex architecture
   - Storage management

Q: When NOT to use offline-first?
A: Avoid when:
   - Real-time collaboration required
   - Server is authoritative (banking, payments)
   - Conflicts are unacceptable
   - Simple CRUD apps with good network
*/`
        }
      ]
    },
    {
      id: 171,
      title: 'Network Detection Service',
      content: `
        <h2>Network Monitoring</h2>
        <p>Detect network connectivity and quality to intelligently manage sync operations.</p>

        <h3>Network State Tracking</h3>
        <p>Monitor multiple network properties:</p>
        <ul>
          <li><strong>Online Status:</strong> Is device connected to internet?</li>
          <li><strong>Connection Type:</strong> WiFi, Cellular, Ethernet, None</li>
          <li><strong>Effective Type:</strong> 2g, 3g, 4g, slow-2g</li>
          <li><strong>Downlink Speed:</strong> Estimated bandwidth (Mbps)</li>
          <li><strong>RTT:</strong> Round-trip time latency (ms)</li>
        </ul>

        <h3>Detection Methods</h3>
        <h4>Browser (Web)</h4>
        <ul>
          <li>navigator.onLine - Basic online/offline</li>
          <li>navigator.connection - Network Information API</li>
          <li>window events - 'online' and 'offline' events</li>
          <li>Health checks - Periodic server pings</li>
        </ul>

        <h4>Native (iOS/Android)</h4>
        <ul>
          <li>Capacitor Network plugin - Connection status</li>
          <li>Platform-specific APIs - Detailed network info</li>
          <li>Reachability checks - Test actual connectivity</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1701,
          language: 'typescript',
          title: 'Network Service - Core Implementation',
          copyable: true,
          code: `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, fromEvent } from 'rxjs';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

export interface NetworkState {
  isOnline: boolean;
  connectionType: 'wifi' | 'cellular' | 'none' | 'unknown';
  effectiveType: '4g' | '3g' | '2g' | 'slow-2g';
  downlink: number;
  rtt: number;
  saveData: boolean;
  lastChecked: number;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private networkState$ = new BehaviorSubject<NetworkState>({
    isOnline: navigator.onLine,
    connectionType: 'unknown',
    effectiveType: '4g',
    downlink: 10,
    rtt: 50,
    saveData: false,
    lastChecked: Date.now()
  });

  get isOnline$(): Observable<boolean> {
    return this.networkState$.pipe(
      map(state => state.isOnline),
      distinctUntilChanged()
    );
  }

  get isOnline(): boolean {
    return this.networkState$.value.isOnline;
  }

  async initialize(): Promise<void> {
    const platform = Capacitor.getPlatform();

    if (platform === 'web') {
      this.monitorBrowserNetwork();
    } else {
      this.monitorNativeNetwork();
    }

    this.startHealthChecks();
  }

  private monitorBrowserNetwork(): void {
    // Listen to online/offline events
    fromEvent(window, 'online').subscribe(() => {
      this.updateNetworkState({ isOnline: true });
    });

    fromEvent(window, 'offline').subscribe(() => {
      this.updateNetworkState({ isOnline: false });
    });

    // Network Information API (if available)
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;

      // Initial state
      this.updateConnectionInfo(connection);

      // Listen for changes
      connection.addEventListener('change', () => {
        this.updateConnectionInfo(connection);
      });
    }
  }

  private async monitorNativeNetwork(): Promise<void> {
    // Get current status
    const status = await Network.getStatus();
    this.updateNetworkState({
      isOnline: status.connected,
      connectionType: status.connectionType as any
    });

    // Listen for changes
    Network.addListener('networkStatusChange', (status) => {
      this.updateNetworkState({
        isOnline: status.connected,
        connectionType: status.connectionType as any
      });
    });
  }

  private startHealthChecks(): void {
    timer(0, 30000).pipe(
      filter(() => this.networkState$.value.isOnline)
    ).subscribe(async () => {
      try {
        const start = Date.now();
        await fetch('/api/health', {
          method: 'HEAD',
          cache: 'no-cache'
        });
        const rtt = Date.now() - start;

        this.updateNetworkState({
          isOnline: true,
          rtt,
          lastChecked: Date.now()
        });
      } catch {
        this.updateNetworkState({
          isOnline: false,
          lastChecked: Date.now()
        });
      }
    });
  }

  private updateNetworkState(updates: Partial<NetworkState>): void {
    const current = this.networkState$.value;
    this.networkState$.next({ ...current, ...updates });
  }
}

/*
💡 INTERVIEW: Network Detection Patterns

Q: How do you detect offline/online status?
A: Multiple methods:
   - navigator.onLine (basic, unreliable alone)
   - window 'online'/'offline' events
   - Network Information API (connection quality)
   - Capacitor Network plugin (native)
   - Health check pings (verify actual connectivity)

Q: Why not rely solely on navigator.onLine?
A: Limitations:
   - Reports "online" if ANY network connection exists
   - Doesn't verify internet connectivity
   - Doesn't check server reachability
   - False positives common (connected but no internet)

Q: How do you determine connection quality?
A: Check multiple indicators:
   - effectiveType ('4g', '3g', '2g', 'slow-2g')
   - downlink (estimated bandwidth in Mbps)
   - rtt (round-trip time latency in ms)
   - Use this to defer large syncs on slow connections
*/`
        }
      ]
    },
    {
      id: 172,
      title: 'Sync Queue System',
      content: `
        <h2>Operation Queue Management</h2>
        <p>Queue CRUD operations locally and sync them to the server when online.</p>

        <h3>Sync Queue Architecture</h3>
        <p>The sync queue stores operations that need to be synced with the server:</p>
        <ul>
          <li><strong>Persistent:</strong> Stored in SQLite, survives app restarts</li>
          <li><strong>Ordered:</strong> Operations processed in correct order</li>
          <li><strong>Prioritized:</strong> Critical operations sync first</li>
          <li><strong>Retryable:</strong> Failed operations retry with backoff</li>
        </ul>

        <h3>Operation Types</h3>
        <table>
          <tr>
            <th>Operation</th>
            <th>Action</th>
            <th>Priority</th>
          </tr>
          <tr>
            <td>Create</td>
            <td>POST to server</td>
            <td>1 (High)</td>
          </tr>
          <tr>
            <td>Update</td>
            <td>PUT to server</td>
            <td>2 (Medium)</td>
          </tr>
          <tr>
            <td>Delete</td>
            <td>DELETE on server</td>
            <td>3 (Low)</td>
          </tr>
        </table>

        <h3>Retry Strategy</h3>
        <p><strong>Exponential Backoff:</strong> Delay increases exponentially with each retry</p>
        <ul>
          <li>Attempt 1: 1 second</li>
          <li>Attempt 2: 2 seconds</li>
          <li>Attempt 3: 4 seconds</li>
          <li>Attempt 4: 8 seconds</li>
          <li>Max: 60 seconds</li>
        </ul>
        <p>Jitter added to prevent thundering herd problem.</p>
      `,
      codeSnippets: [
        {
          id: 1702,
          language: 'typescript',
          title: 'Sync Operation Model',
          copyable: true,
          code: `export interface SyncOperation {
  id: string;
  entity: string;
  operation: 'create' | 'update' | 'delete';
  localId: number;
  serverId?: number;
  data: any;
  attempts: number;
  status: SyncOperationStatus;
  priority: number;
  createdAt: number;
  lastAttempt?: number;
  error?: string;
  apiEndpoint?: string;
}

export enum SyncOperationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
  FAILED = 'failed'
}`
        },
        {
          id: 1703,
          language: 'typescript',
          title: 'Sync Queue Service Implementation',
          copyable: true,
          code: `@Injectable({
  providedIn: 'root'
})
export class SyncQueueService {
  private queue$ = new BehaviorSubject<SyncOperation[]>([]);
  private isSyncing$ = new BehaviorSubject<boolean>(false);

  constructor(
    private db: DatabaseService,
    private http: HttpClient
  ) {}

  async initialize(): Promise<void> {
    await this.loadQueueFromDatabase();
  }

  async enqueue(operation: Omit<SyncOperation, 'id' | 'attempts' | 'status'>): Promise<string> {
    const op: SyncOperation = {
      id: this.generateOperationId(),
      ...operation,
      attempts: 0,
      status: SyncOperationStatus.PENDING
    };

    await this.db.insert('sync_queue', {...op}).toPromise();

    const queue = [...this.queue$.value, op];
    this.queue$.next(queue);

    return op.id;
  }

  async processQueue(): Promise<void> {
    if (this.isSyncing$.value) return;

    this.isSyncing$.next(true);

    const pendingOps = this.queue$.value
      .filter(op => op.status === SyncOperationStatus.PENDING)
      .sort((a, b) => a.priority - b.priority);

    for (const op of pendingOps) {
      try {
        await this.processOperation(op);
        await this.markSuccess(op.id);
      } catch (error) {
        await this.markFailed(op.id, error.message);

        if (op.attempts < 5) {
          const delay = this.getRetryDelay(op.attempts);
          setTimeout(() => this.retryOperation(op.id), delay);
        }
      }
    }

    this.isSyncing$.next(false);
  }

  getRetryDelay(attempts: number): number {
    const baseDelay = 1000;
    const maxDelay = 60000;
    const delay = Math.min(baseDelay * Math.pow(2, attempts), maxDelay);
    const jitter = delay * 0.2 * (Math.random() - 0.5);
    return Math.round(delay + jitter);
  }
}

/*
💡 INTERVIEW: Sync Queue Pattern

Q: Why use a sync queue instead of direct API calls?
A: Benefits:
   - Works offline (queue operations locally)
   - Handles failures gracefully (retry mechanism)
   - Maintains operation order (sequential processing)
   - Survives app restarts (persisted in database)
   - Reduces server load (batch processing)

Q: How do you handle failed sync operations?
A: Multi-layered approach:
   - Retry with exponential backoff
   - Maximum retry attempts (5)
   - Store error messages for debugging
   - Show error UI for user intervention
   - Allow manual retry

Q: What is exponential backoff and why use it?
A: Retry delay increases exponentially:
   - 1s, 2s, 4s, 8s, 16s, 32s, 60s (max)
   - Prevents overwhelming server
   - Gives network time to recover
   - Reduces battery drain
   - Add jitter to prevent thundering herd
*/`
        }
      ]
    },
    {
      id: 173,
      title: 'Conflict Resolution',
      content: `
        <h2>Handling Sync Conflicts</h2>
        <p>When local and server data differ, conflicts must be resolved intelligently.</p>

        <h3>Conflict Detection</h3>
        <p>Conflicts occur when:</p>
        <ul>
          <li>Same record modified locally and on server</li>
          <li>Version/timestamp mismatch</li>
          <li>Data field differences detected</li>
        </ul>

        <h3>Resolution Strategies</h3>

        <h4>1. Last-Write-Wins (LWW)</h4>
        <ul>
          <li>Most recent timestamp wins</li>
          <li>Simple, fully automatic</li>
          <li>Risk: May lose data</li>
          <li>Best for: Non-critical data</li>
        </ul>

        <h4>2. Server Wins</h4>
        <ul>
          <li>Server is always authoritative</li>
          <li>Discard local changes</li>
          <li>Best for: Reference data, shared resources</li>
        </ul>

        <h4>3. Client Wins</h4>
        <ul>
          <li>Local changes always win</li>
          <li>Overwrite server data</li>
          <li>Best for: User preferences, local-first data</li>
        </ul>

        <h4>4. Manual Resolution</h4>
        <ul>
          <li>Present conflict to user</li>
          <li>User chooses which version to keep</li>
          <li>Best for: Critical data, visible conflicts</li>
        </ul>

        <h4>5. Field-Level Merge</h4>
        <ul>
          <li>Merge non-conflicting fields</li>
          <li>Combine both versions intelligently</li>
          <li>Best for: Complex objects with many fields</li>
        </ul>

        <h4>6. CRDT (Advanced)</h4>
        <ul>
          <li>Conflict-free Replicated Data Types</li>
          <li>Mathematically guaranteed convergence</li>
          <li>Best for: Real-time collaboration</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1704,
          language: 'typescript',
          title: 'Conflict Resolution Implementation',
          copyable: true,
          code: `interface SyncConflict {
  entity: string;
  localId: number;
  serverId: number;
  localData: any;
  serverData: any;
  localTimestamp: number;
  serverTimestamp: number;
  conflictingFields: string[];
}

export class SyncService {
  async handleConflict(
    conflict: SyncConflict,
    strategy: 'lww' | 'server' | 'client' | 'manual' | 'merge'
  ): Promise<any> {
    switch (strategy) {
      case 'lww':
        return conflict.localTimestamp > conflict.serverTimestamp
          ? conflict.localData
          : conflict.serverData;

      case 'server':
        return conflict.serverData;

      case 'client':
        return conflict.localData;

      case 'manual':
        return await this.showConflictUI(conflict);

      case 'merge':
        return this.mergeData(conflict);

      default:
        return conflict.serverData;
    }
  }

  private mergeData(conflict: SyncConflict): any {
    const merged = { ...conflict.serverData };

    for (const field of Object.keys(conflict.localData)) {
      if (!conflict.conflictingFields.includes(field)) {
        merged[field] = conflict.localData[field];
      }
    }

    return merged;
  }

  private detectConflict(local: any, server: any): SyncConflict | null {
    if (local.updatedAt === server.updatedAt) {
      return null;
    }

    const conflictingFields: string[] = [];

    for (const key of Object.keys(local)) {
      if (local[key] !== server[key] && key !== 'updatedAt') {
        conflictingFields.push(key);
      }
    }

    if (conflictingFields.length === 0) {
      return null;
    }

    return {
      entity: 'todos',
      localId: local.id,
      serverId: server.id,
      localData: local,
      serverData: server,
      localTimestamp: local.updatedAt,
      serverTimestamp: server.updatedAt,
      conflictingFields
    };
  }
}

/*
💡 INTERVIEW: Conflict Resolution Strategies

Q: What causes sync conflicts?
A: Conflicts occur when:
   - Same record edited locally and on server
   - Network partition (offline period)
   - Concurrent edits by multiple users
   - Version/timestamp mismatch

Q: Which resolution strategy should you choose?
A: Depends on use case:
   - LWW: Non-critical data, simple apps
   - Server Wins: Reference data, shared resources
   - Client Wins: User preferences, local-first
   - Manual: Critical data, user must decide
   - Merge: Complex objects, minimize data loss

Q: How do you prevent conflicts?
A: Prevention strategies:
   - Shorter sync intervals (reduce offline window)
   - Lock records during edit (optimistic locking)
   - Real-time sync (WebSockets)
   - Partition data by user (avoid shared edits)
   - Use CRDT for automatic resolution

Q: What is operational transformation?
A: Advanced conflict resolution:
   - Transform operations based on concurrent changes
   - Used in Google Docs, collaborative editors
   - Complex to implement correctly
   - Guarantees eventual consistency
*/`
        }
      ]
    },
    {
      id: 174,
      title: 'NgRx Offline Integration',
      content: `
        <h2>Offline-Aware State Management</h2>
        <p>Integrate offline-first patterns with NgRx for predictable state updates.</p>

        <h3>Offline-First Actions Pattern</h3>
        <p>Use a three-action pattern for mutations:</p>
        <ol>
          <li><strong>Initial Action:</strong> User intent (Create Todo)</li>
          <li><strong>Optimistic Action:</strong> Immediate UI update</li>
          <li><strong>Success/Failure Actions:</strong> Server confirmation</li>
        </ol>

        <h3>Benefits</h3>
        <ul>
          <li>Immediate UI feedback (no loading spinners)</li>
          <li>Rollback capability on failure</li>
          <li>Queue operations when offline</li>
          <li>Sync state tracking</li>
        </ul>

        <h3>Effect Patterns</h3>
        <p>NgRx effects handle offline scenarios:</p>
        <ul>
          <li><strong>Local-first reads:</strong> Always from local DB</li>
          <li><strong>Optimistic writes:</strong> Immediate UI update</li>
          <li><strong>Queue operations:</strong> For sync when online</li>
          <li><strong>Handle transitions:</strong> Online/offline state changes</li>
          <li><strong>Rollback on failure:</strong> Restore previous state</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1705,
          language: 'typescript',
          title: 'Offline-First Actions',
          copyable: true,
          code: `// Create todo (optimistic update)
export const createTodo = createAction(
  '[Todos] Create Todo',
  props<{ todo: Omit<Todo, 'id'> }>()
);

export const createTodoOptimistic = createAction(
  '[Todos] Create Todo Optimistic',
  props<{ todo: Todo; tempId: string }>()
);

export const createTodoSuccess = createAction(
  '[Todos] Create Todo Success',
  props<{ todo: Todo; tempId: string }>()
);

export const createTodoFailure = createAction(
  '[Todos] Create Todo Failure',
  props<{ tempId: string; error: string }>()
);

/*
💡 INTERVIEW: Offline-First Actions Pattern

Q: How do you design NgRx actions for offline-first?
A: Use a three-action pattern for mutations:
   1. Initial action (user intent)
   2. Optimistic action (immediate UI update)
   3. Success/Failure actions (server confirmation)

Benefits:
- Immediate UI feedback (no loading spinners)
- Rollback capability on failure
- Queue operations when offline
- Sync state tracking
*/`
        },
        {
          id: 1706,
          language: 'typescript',
          title: 'Offline-Aware Effects',
          copyable: true,
          code: `@Injectable()
export class TodosEffects {
  /**
   * Create todo with optimistic update
   */
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createTodo),
      withLatestFrom(this.networkService.isOnline$),
      mergeMap(([action, isOnline]) => {
        const tempId = \`temp_\${Date.now()}\`;
        const todo: Todo = {
          id: tempId as any,
          ...action.todo,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          syncStatus: 'pending'
        };

        return from(this.todoRepo.insert(todo)).pipe(
          mergeMap(async (localId) => {
            const todoWithId = { ...todo, id: localId };

            // Queue for sync if online
            if (isOnline) {
              await this.syncQueue.enqueue({
                entity: 'todos',
                operation: 'create',
                localId,
                data: todoWithId,
                priority: 1
              });
            }

            return TodoActions.createTodoOptimistic({
              todo: todoWithId,
              tempId
            });
          }),
          catchError(error =>
            of(TodoActions.createTodoFailure({
              tempId,
              error: error.message
            }))
          )
        );
      })
    )
  );

  /**
   * Trigger sync when coming online
   */
  syncOnOnline$ = createEffect(() =>
    this.networkService.isOnline$.pipe(
      switchMap(isOnline => {
        if (isOnline) {
          return of(TodoActions.syncTodos());
        }
        return of({ type: 'NO_ACTION' });
      })
    )
  );
}`
        }
      ]
    },
    {
      id: 175,
      title: 'Optimistic Updates',
      content: `
        <h2>Instant UI Feedback</h2>
        <p>Optimistic updates mean updating the UI immediately when the user performs an action, before waiting for the server response.</p>

        <h3>Why Optimistic Updates?</h3>
        <ul>
          <li><strong>Instant feedback:</strong> No loading spinners for CRUD operations</li>
          <li><strong>Fast and responsive:</strong> App feels instant</li>
          <li><strong>Works offline:</strong> Seamless offline experience</li>
          <li><strong>Better perceived performance:</strong> User doesn't wait</li>
        </ul>

        <h3>Implementation Steps</h3>
        <ol>
          <li>Update UI immediately (optimistic)</li>
          <li>Save to local database</li>
          <li>Queue for server sync</li>
          <li>Save snapshot for rollback</li>
          <li>Trigger sync if online</li>
        </ol>

        <h3>Rollback Strategy</h3>
        <p>On sync failure:</p>
        <ul>
          <li>Create: Remove the created item</li>
          <li>Update: Restore original data from snapshot</li>
          <li>Delete: Restore deleted item</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1707,
          language: 'typescript',
          title: 'Optimistic Update Implementation',
          copyable: true,
          code: `async createTodoOptimistic(todo: Omit<Todo, 'id'>): Promise<string> {
  const tempId = \`temp_\${uuidv4()}\`;
  const newTodo: Todo = {
    id: tempId as any,
    ...todo,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    syncStatus: 'pending'
  };

  try {
    // 1. Update UI immediately (optimistic)
    this.store.dispatch(
      TodoActions.createTodoOptimistic({ todo: newTodo, tempId })
    );

    // 2. Save to local database
    const localId = await this.todoRepo.insert(newTodo);
    const todoWithId = { ...newTodo, id: localId };

    // 3. Queue for server sync
    const operationId = await this.syncQueue.enqueue({
      entity: 'todos',
      operation: 'create',
      localId,
      data: todoWithId,
      priority: 1
    });

    // 4. Save snapshot for potential rollback
    this.snapshots.set(operationId, {
      id: operationId,
      entity: 'todos',
      operation: 'create',
      originalData: null,
      timestamp: Date.now()
    });

    // 5. Trigger sync if online
    if (this.networkService.isOnline) {
      this.triggerSync();
    }

    return tempId;
  } catch (error) {
    // Rollback on error
    this.store.dispatch(
      TodoActions.createTodoFailure({
        tempId,
        error: error.message
      })
    );
    throw error;
  }
}

async rollback(operationId: string): Promise<void> {
  const snapshot = this.snapshots.get(operationId);
  if (!snapshot) return;

  try {
    switch (snapshot.operation) {
      case 'create':
        await this.todoRepo.delete(snapshot.originalData?.id);
        break;

      case 'update':
        if (snapshot.originalData) {
          await this.todoRepo.update(
            snapshot.originalData.id,
            snapshot.originalData
          );
        }
        break;

      case 'delete':
        if (snapshot.originalData) {
          await this.todoRepo.update(snapshot.originalData.id, {
            ...snapshot.originalData,
            deleted: false
          });
        }
        break;
    }

    this.snapshots.delete(operationId);
  } catch (error) {
    console.error('Rollback failed:', error);
  }
}

/*
💡 INTERVIEW: Optimistic Updates Pattern

Q: What are optimistic updates?
A: Updating the UI immediately when the user performs an action,
   before waiting for the server response. Assume success.

Q: How do you handle failures?
A: Three strategies:
   1. Rollback - Restore previous state
   2. Show error + keep pending state
   3. Queue for retry with indicator

Q: When NOT to use optimistic updates?
A: Avoid when:
   - Operation has side effects (payments, emails)
   - Server validation is complex
   - Conflicts are likely
   - Rollback would confuse user
*/`
        }
      ]
    },
    {
      id: 176,
      title: 'Background Sync',
      content: `
        <h2>Syncing When Idle</h2>
        <p>Background sync allows the app to sync data when the user is not actively using the app.</p>

        <h3>Ideal Sync Conditions</h3>
        <ul>
          <li><strong>App in background:</strong> Not blocking user</li>
          <li><strong>Network available:</strong> Online status</li>
          <li><strong>WiFi connection:</strong> To save cellular data</li>
          <li><strong>Device charging:</strong> To save battery</li>
          <li><strong>Device idle:</strong> Not in active use</li>
        </ul>

        <h3>Platform Implementations</h3>

        <h4>Web (Service Worker)</h4>
        <ul>
          <li>Background Sync API</li>
          <li>Register sync event</li>
          <li>Handle sync in service worker</li>
          <li>Fallback to periodic sync</li>
        </ul>

        <h4>iOS</h4>
        <ul>
          <li>Background Fetch</li>
          <li>Background Tasks</li>
          <li>Silent push notifications</li>
        </ul>

        <h4>Android</h4>
        <ul>
          <li>WorkManager</li>
          <li>JobScheduler</li>
          <li>Foreground services</li>
        </ul>

        <h3>Configuration Options</h3>
        <table>
          <tr>
            <th>Option</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>enabled</td>
            <td>true</td>
            <td>Enable/disable background sync</td>
          </tr>
          <tr>
            <td>interval</td>
            <td>15 min</td>
            <td>Sync interval in milliseconds</td>
          </tr>
          <tr>
            <td>onlyWhenIdle</td>
            <td>true</td>
            <td>Only sync when app in background</td>
          </tr>
          <tr>
            <td>requiresCharging</td>
            <td>false</td>
            <td>Only sync when charging</td>
          </tr>
          <tr>
            <td>requiresWifi</td>
            <td>false</td>
            <td>Only sync on WiFi</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1708,
          language: 'typescript',
          title: 'Background Sync Service',
          copyable: true,
          code: `@Injectable({
  providedIn: 'root'
})
export class BackgroundSyncService {
  private config$ = new BehaviorSubject<BackgroundSyncConfig>({
    enabled: true,
    interval: 15 * 60 * 1000, // 15 minutes
    onlyWhenIdle: true,
    requiresCharging: false,
    requiresWifi: false
  });

  async initialize(): Promise<void> {
    const platform = Capacitor.getPlatform();

    if (platform === 'web') {
      await this.initializeWebBackgroundSync();
    } else {
      await this.initializeNativeBackgroundSync();
    }
  }

  private async initializeWebBackgroundSync(): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('sync-queue');

        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data.type === 'SYNC_COMPLETE') {
            console.log('Sync completed by service worker');
          }
        });
      } catch (error) {
        console.error('Background sync registration failed:', error);
        this.startPeriodicSync();
      }
    } else {
      this.startPeriodicSync();
    }
  }

  private async initializeNativeBackgroundSync(): Promise<void> {
    App.addListener('appStateChange', (state: AppState) => {
      if (!state.isActive) {
        this.triggerBackgroundSync();
      }
    });

    this.startPeriodicSync();
  }

  private shouldSync(): boolean {
    const config = this.config$.value;

    if (!config.enabled) return false;
    if (config.onlyWhenIdle && this.appState.isActive) return false;
    if (!this.networkService.isOnline) return false;
    if (config.requiresWifi && this.networkService.getConnectionType() !== 'wifi') return false;

    return true;
  }

  async triggerBackgroundSync(): Promise<void> {
    if (!this.shouldSync()) return;

    try {
      await this.syncService.syncAll();
    } catch (error) {
      console.error('Background sync failed:', error);
    }
  }
}

/*
💡 INTERVIEW: Background Sync Strategies

Q: What is background sync?
A: Syncing data when the user is not actively using the app:
   - App in background
   - Device idle
   - Network available
   - Device charging (optional)

Q: How do you implement background sync on web?
A: Use Service Worker Background Sync API:
   1. Register service worker
   2. Register sync event
   3. Handle sync in service worker
   4. Fallback to periodic sync if not supported

Q: Best practices for background sync?
A:
   - Respect user preferences (WiFi only, charging)
   - Use exponential backoff for retries
   - Don't drain battery (reasonable intervals)
   - Handle app state changes
   - Graceful degradation if not supported
*/`
        },
        {
          id: 1709,
          language: 'javascript',
          title: 'Service Worker Background Sync',
          copyable: true,
          code: `// Service Worker for Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-queue') {
    event.waitUntil(syncQueue());
  }
});

async function syncQueue() {
  try {
    const db = await openDatabase();
    const operations = await getAllOperations(db);

    for (const operation of operations) {
      try {
        await syncOperation(operation);
        await deleteOperation(db, operation.id);
      } catch (error) {
        await updateOperation(db, operation.id, {
          attempts: operation.attempts + 1,
          lastAttempt: Date.now()
        });
      }
    }

    // Notify clients
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        count: operations.length
      });
    });
  } catch (error) {
    console.error('Sync failed:', error);
    throw error;
  }
}`
        }
      ]
    },
    {
      id: 177,
      title: 'Sync UI Components',
      content: `
        <h2>Visual Sync Feedback</h2>
        <p>Provide clear visual indicators of sync status and conflicts to users.</p>

        <h3>Sync Status Indicator</h3>
        <p>Shows current sync state:</p>
        <ul>
          <li><strong>Offline:</strong> Warning color, offline icon</li>
          <li><strong>Syncing:</strong> Spinning sync icon, primary color</li>
          <li><strong>Pending:</strong> Upload icon, pending count badge</li>
          <li><strong>Synced:</strong> Success color, checkmark icon</li>
        </ul>

        <h3>Offline Banner</h3>
        <p>Persistent banner when offline:</p>
        <ul>
          <li>Appears automatically when offline</li>
          <li>Shows helpful message</li>
          <li>Retry button for manual sync</li>
          <li>Auto-dismisses when online</li>
        </ul>

        <h3>Conflict Resolver</h3>
        <p>Interactive UI for resolving conflicts:</p>
        <ul>
          <li>Side-by-side comparison</li>
          <li>Timestamps for each version</li>
          <li>Three resolution options</li>
          <li>Preview of result</li>
        </ul>

        <h3>Resolution Options</h3>
        <ol>
          <li><strong>Keep Local:</strong> User's changes win</li>
          <li><strong>Use Server:</strong> Server's changes win</li>
          <li><strong>Merge Manually:</strong> User decides field-by-field</li>
        </ol>
      `,
      codeSnippets: [
        {
          id: 1710,
          language: 'typescript',
          title: 'Sync Status Indicator Component',
          copyable: true,
          code: `@Component({
  selector: 'app-sync-indicator',
  template: \`
    <div class="sync-indicator" [class.syncing]="isSyncing" [class.offline]="!isOnline">
      <ion-icon [name]="getIcon()" [color]="getColor()"></ion-icon>
      <span class="status-text">{{ getStatusText() }}</span>
      <ion-badge *ngIf="pendingCount > 0" color="warning">
        {{ pendingCount }}
      </ion-badge>
    </div>
  \`
})
export class SyncIndicatorComponent implements OnInit {
  isOnline = true;
  isSyncing = false;
  pendingCount = 0;

  ngOnInit(): void {
    this.networkService.isOnline$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOnline => this.isOnline = isOnline);

    this.syncQueue.isSyncing$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isSyncing => this.isSyncing = isSyncing);

    this.syncQueue.pendingCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => this.pendingCount = count);
  }

  getIcon(): string {
    if (!this.isOnline) return 'cloud-offline-outline';
    if (this.isSyncing) return 'sync-outline';
    if (this.pendingCount > 0) return 'cloud-upload-outline';
    return 'cloud-done-outline';
  }

  getColor(): string {
    if (!this.isOnline) return 'warning';
    if (this.isSyncing) return 'primary';
    if (this.pendingCount > 0) return 'medium';
    return 'success';
  }

  getStatusText(): string {
    if (!this.isOnline) return 'Offline';
    if (this.isSyncing) return 'Syncing...';
    if (this.pendingCount > 0) return \`\${this.pendingCount} pending\`;
    return 'Synced';
  }
}`
        },
        {
          id: 1711,
          language: 'typescript',
          title: 'Conflict Resolver Component',
          copyable: true,
          code: `@Component({
  selector: 'app-sync-conflict-resolver',
  template: \`
    <ion-card class="conflict-card">
      <ion-card-header>
        <ion-card-title>
          <ion-icon name="warning-outline" color="warning"></ion-icon>
          Sync Conflict Detected
        </ion-card-title>
        <ion-card-subtitle>
          This item was modified both locally and on the server
        </ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <div class="conflict-versions">
          <div class="version local-version">
            <h4>Your Local Changes</h4>
            <div class="version-data">
              <pre>{{ conflict.localData | json }}</pre>
            </div>
            <p class="version-time">
              Modified: {{ conflict.localTimestamp | date:'short' }}
            </p>
          </div>

          <div class="version-divider">
            <ion-icon name="swap-horizontal-outline"></ion-icon>
          </div>

          <div class="version server-version">
            <h4>Server Changes</h4>
            <div class="version-data">
              <pre>{{ conflict.serverData | json }}</pre>
            </div>
            <p class="version-time">
              Modified: {{ conflict.serverTimestamp | date:'short' }}
            </p>
          </div>
        </div>

        <ion-button-group class="resolution-buttons">
          <ion-button expand="block" (click)="resolveWithLocal()">
            <ion-icon name="phone-portrait-outline" slot="start"></ion-icon>
            Keep Local
          </ion-button>
          <ion-button expand="block" (click)="resolveWithServer()">
            <ion-icon name="cloud-outline" slot="start"></ion-icon>
            Use Server
          </ion-button>
          <ion-button expand="block" color="tertiary" (click)="showManualMerge()">
            <ion-icon name="git-merge-outline" slot="start"></ion-icon>
            Merge Manually
          </ion-button>
        </ion-button-group>
      </ion-card-content>
    </ion-card>
  \`
})
export class SyncConflictResolverComponent {
  @Input() conflict!: SyncConflict;
  @Output() resolved = new EventEmitter<{
    strategy: 'local' | 'server' | 'manual';
    data?: any;
  }>();

  resolveWithLocal(): void {
    this.resolved.emit({
      strategy: 'local',
      data: this.conflict.localData
    });
  }

  resolveWithServer(): void {
    this.resolved.emit({
      strategy: 'server',
      data: this.conflict.serverData
    });
  }

  showManualMerge(): void {
    this.resolved.emit({ strategy: 'manual' });
  }
}

/*
💡 INTERVIEW: Conflict Resolution UI

Q: How do you present sync conflicts to users?
A: Show clear comparison:
   - Display both versions side-by-side
   - Highlight differences
   - Show timestamps
   - Provide clear resolution options

Q: Should conflicts block the user?
A: It depends:
   - Critical data: Yes, block until resolved
   - Non-critical: Queue for later, show notification
   - Background data: Auto-resolve (last-write-wins)
*/`
        }
      ]
    }
  ]
};
