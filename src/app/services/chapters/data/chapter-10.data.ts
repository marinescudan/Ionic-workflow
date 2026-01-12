// src/app/services/chapters/data/chapter-10.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_10_DATA: Chapter = {
  id: 10,
  title: 'Real-time with WebSockets',
  description: 'Build real-time features with Socket.IO, presence tracking, and live notifications',
  icon: 'flash-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 100,
      title: 'WebSockets vs HTTP',
      content: `
        <h2>Understanding Communication Protocols</h2>
        <p>WebSockets and HTTP serve different purposes in web applications. Understanding when to use each is crucial for building efficient real-time features.</p>

        <h3>HTTP (Request-Response)</h3>
        <p>Traditional HTTP follows a request-response pattern where the client initiates every interaction:</p>
        <ul>
          <li>Client sends request → Server responds</li>
          <li>Server cannot push data to client</li>
          <li>New connection per request (or keep-alive)</li>
          <li>Overhead from headers on every request</li>
        </ul>

        <h3>WebSocket (Bidirectional)</h3>
        <p>WebSockets provide a persistent, bidirectional connection:</p>
        <ul>
          <li>Single persistent connection</li>
          <li>Server can push data anytime</li>
          <li>Low latency (no connection overhead)</li>
          <li>Minimal overhead after initial handshake</li>
        </ul>

        <h3>When to Use WebSockets</h3>
        <table>
          <tr>
            <th>Use WebSockets For</th>
            <th>Use HTTP For</th>
          </tr>
          <tr>
            <td>Real-time chat/messaging</td>
            <td>CRUD operations</td>
          </tr>
          <tr>
            <td>Live notifications</td>
            <td>File uploads</td>
          </tr>
          <tr>
            <td>Collaborative editing</td>
            <td>REST APIs</td>
          </tr>
          <tr>
            <td>Live updates (sports, stocks)</td>
            <td>Form submissions</td>
          </tr>
          <tr>
            <td>Multiplayer games</td>
            <td>One-time data fetching</td>
          </tr>
          <tr>
            <td>User presence tracking</td>
            <td>Cacheable requests</td>
          </tr>
        </table>

        <h3>Socket.IO vs Native WebSockets</h3>
        <p><strong>Socket.IO advantages:</strong></p>
        <ul>
          <li>Automatic reconnection with exponential backoff</li>
          <li>Rooms and namespaces for organization</li>
          <li>Acknowledgments (request-response over WebSocket)</li>
          <li>Fallback to HTTP long-polling if WebSocket unavailable</li>
          <li>Binary data support</li>
          <li>Built-in heartbeat mechanism</li>
        </ul>

        <p><strong>Native WebSocket:</strong> Lower-level API, simpler but requires more manual work for reconnection and rooms.</p>
      `,
      codeSnippets: [
        {
          id: 1000,
          language: 'typescript',
          title: 'HTTP vs WebSocket Communication Flow',
          code: `// HTTP (Request-Response):
// ┌──────────┐                    ┌──────────┐
// │ CLIENT   │──── Request ──────>│  SERVER  │
// │          │<─── Response ──────│          │
// └──────────┘                    └──────────┘

// WebSocket (Bidirectional):
// ┌──────────┐                    ┌──────────┐
// │ CLIENT   │<───── Data ────────│  SERVER  │
// │          │────── Data ────────>│          │
// │          │<───── Data ────────│          │
// └──────────┘                    └──────────┘`,
          description: 'Visual comparison of HTTP vs WebSocket communication patterns',
          copyable: true,
        },
        {
          id: 1001,
          language: 'typescript',
          title: 'WebSocket Connection Lifecycle',
          code: `// WebSocket Connection States:
//
// CONNECTING → CONNECTED → DISCONNECTING → DISCONNECTED
//                  ↑                            ↓
//                  └────── RECONNECTING ────────┘
//
// State Management:
type ConnectionState =
  | 'connecting'
  | 'connected'
  | 'disconnecting'
  | 'disconnected'
  | 'reconnecting';

// Track connection state
const connectionState$ = new BehaviorSubject<ConnectionState>('disconnected');`,
          description: 'WebSocket connection lifecycle states',
          copyable: true,
        },
      ],
      interviewTips: [
        'WebSockets are bidirectional; HTTP is unidirectional (client-initiated)',
        'Use WebSockets for real-time; HTTP for traditional request-response',
        'Socket.IO provides auto-reconnection; native WebSocket does not',
        'WebSockets maintain persistent connection; HTTP creates new connection per request',
        'Fallback to polling if WebSocket unavailable (Socket.IO feature)',
      ],
    },
    {
      id: 101,
      title: 'Socket.IO Setup & Configuration',
      content: `
        <h2>Setting Up Socket.IO Client</h2>
        <p>Socket.IO is a popular library that provides a robust WebSocket implementation with automatic reconnection, rooms, and fallback support.</p>

        <h3>Installation</h3>
        <p>Install the Socket.IO client library and TypeScript types:</p>
        <pre>npm install socket.io-client
npm install --save-dev @types/socket.io-client</pre>

        <h3>Configuration Options</h3>
        <p>Key Socket.IO configuration options:</p>
        <ul>
          <li><strong>transports:</strong> Connection methods (['websocket', 'polling'])</li>
          <li><strong>reconnection:</strong> Enable automatic reconnection (default: true)</li>
          <li><strong>reconnectionAttempts:</strong> Number of retry attempts (default: Infinity)</li>
          <li><strong>reconnectionDelay:</strong> Initial delay before reconnection (default: 1000ms)</li>
          <li><strong>reconnectionDelayMax:</strong> Maximum delay between attempts (default: 5000ms)</li>
          <li><strong>timeout:</strong> Connection timeout (default: 20000ms)</li>
          <li><strong>autoConnect:</strong> Auto-connect on creation (default: true)</li>
        </ul>

        <h3>Reconnection Strategy</h3>
        <p>Socket.IO uses exponential backoff for reconnection:</p>
        <ul>
          <li>Attempt 1: ~1 second</li>
          <li>Attempt 2: ~2 seconds</li>
          <li>Attempt 3: ~4 seconds</li>
          <li>Attempt 4+: Capped at reconnectionDelayMax</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Set <code>autoConnect: false</code> for manual connection control</li>
          <li>Use exponential backoff to prevent server overload</li>
          <li>Limit reconnection attempts to avoid infinite retries</li>
          <li>Show connection status to users</li>
          <li>Handle offline scenarios gracefully</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1010,
          language: 'bash',
          title: 'Install Socket.IO Client',
          code: `# Install Socket.IO client
npm install socket.io-client

# Install TypeScript types
npm install --save-dev @types/socket.io-client

# Verify installation
npm list socket.io-client`,
          description: 'Install Socket.IO client and TypeScript definitions',
          copyable: true,
        },
        {
          id: 1011,
          language: 'typescript',
          title: 'Socket.IO Configuration',
          code: `// src/app/core/services/socket/socket.config.ts

import { InjectionToken } from '@angular/core';

export interface SocketConfig {
  url: string;
  options?: {
    transports?: string[];
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
    reconnectionDelayMax?: number;
    timeout?: number;
    autoConnect?: boolean;
  };
}

export const SOCKET_CONFIG = new InjectionToken<SocketConfig>('SOCKET_CONFIG');

export const defaultSocketConfig: SocketConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
    autoConnect: false,
  },
};`,
          description: 'Socket.IO configuration with reconnection settings',
          copyable: true,
        },
        {
          id: 1012,
          language: 'typescript',
          title: 'Type-Safe Socket Events',
          code: `// src/app/core/services/socket/socket-events.ts

export enum ClientSocketEvents {
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  SEND_MESSAGE = 'send_message',
  UPDATE_PRESENCE = 'update_presence',
}

export enum ServerSocketEvents {
  CONNECTED = 'connected',
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
  NEW_MESSAGE = 'new_message',
  NOTIFICATION = 'notification',
}

export interface JoinRoomPayload {
  roomId: string;
  userId: string;
  username: string;
}

export interface UserPresence {
  userId: string;
  username: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: string;
}`,
          description: 'Type-safe event definitions for compile-time checking',
          copyable: true,
        },
      ],
      interviewTips: [
        'Socket.IO config uses exponential backoff for reconnection',
        'Set autoConnect: false for better control over connection lifecycle',
        'Limit reconnection attempts to prevent infinite retry loops',
        'Use InjectionToken for configuration in Angular DI system',
        'Define event enums and interfaces for type safety',
      ],
    },
    {
      id: 102,
      title: 'Socket Service Implementation',
      content: `
        <h2>Building a Socket Service Wrapper</h2>
        <p>Create a service that wraps Socket.IO client and provides a clean, type-safe API for your Angular application.</p>

        <h3>Service Responsibilities</h3>
        <ul>
          <li><strong>Connection Management:</strong> Connect, disconnect, track state</li>
          <li><strong>Event Handling:</strong> Emit events to server, listen for events from server</li>
          <li><strong>Type Safety:</strong> Generic methods for type-safe event handling</li>
          <li><strong>State Tracking:</strong> Expose connection state as Observable</li>
          <li><strong>Error Handling:</strong> Handle connection errors gracefully</li>
          <li><strong>Lifecycle Management:</strong> Set up listeners for connect/disconnect/reconnect</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li>Observable-based connection state</li>
          <li>Type-safe emit and on methods</li>
          <li>Support for acknowledgments (request-response over WebSocket)</li>
          <li>Room join/leave functionality</li>
          <li>Automatic reconnection tracking</li>
        </ul>

        <h3>Connection State Observable</h3>
        <p>Use <code>BehaviorSubject</code> to track and expose connection state:</p>
        <ul>
          <li>Components can subscribe to state changes</li>
          <li>Display connection status to users</li>
          <li>Disable features when offline</li>
          <li>Queue messages when disconnected (optional)</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Wrap Socket.IO in Angular service (dependency injection)</li>
          <li>Use RxJS Observables for event streams</li>
          <li>Provide type-safe methods with generics</li>
          <li>Handle all connection lifecycle events</li>
          <li>Log connection events for debugging</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1020,
          language: 'typescript',
          title: 'Core Socket Service (Part 1)',
          code: `// src/app/core/services/socket/socket.service.ts

import { Injectable, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { SOCKET_CONFIG, SocketConfig } from './socket.config';

export type ConnectionState =
  | 'connecting'
  | 'connected'
  | 'disconnecting'
  | 'disconnected'
  | 'reconnecting';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private config = inject(SOCKET_CONFIG);
  private socket: Socket | null = null;

  private connectionState$ = new BehaviorSubject<ConnectionState>('disconnected');
  private reconnectAttempts$ = new BehaviorSubject<number>(0);

  get state$(): Observable<ConnectionState> {
    return this.connectionState$.asObservable();
  }

  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  connect(): void {
    if (this.socket?.connected) return;

    console.log('Connecting to socket server:', this.config.url);
    this.connectionState$.next('connecting');

    this.socket = io(this.config.url, this.config.options);
    this.setupConnectionListeners();
  }

  disconnect(): void {
    if (!this.socket) return;

    console.log('Disconnecting from socket server');
    this.connectionState$.next('disconnecting');
    this.socket.disconnect();
    this.connectionState$.next('disconnected');
  }
}`,
          description: 'Socket service with connection management',
          copyable: true,
        },
        {
          id: 1021,
          language: 'typescript',
          title: 'Socket Service Emit/On Methods',
          code: `// Socket service emit/on methods

emit<T = any>(event: string, data?: T): void {
  if (!this.socket?.connected) {
    console.warn('Socket not connected. Message not sent:', event);
    return;
  }
  this.socket.emit(event, data);
}

emitWithAck<T = any, R = any>(event: string, data?: T): Observable<R> {
  return new Observable((observer) => {
    if (!this.socket?.connected) {
      observer.error(new Error('Socket not connected'));
      return;
    }

    this.socket.emit(event, data, (response: R) => {
      observer.next(response);
      observer.complete();
    });
  });
}

on<T = any>(event: string): Observable<T> {
  if (!this.socket) {
    throw new Error('Socket not initialized. Call connect() first.');
  }
  return fromEvent<T>(this.socket, event);
}

joinRoom(roomId: string, data?: any): void {
  this.emit('join_room', { roomId, ...data });
}

leaveRoom(roomId: string): void {
  this.emit('leave_room', { roomId });
}`,
          description: 'Type-safe emit and listen methods',
          copyable: true,
        },
        {
          id: 1022,
          language: 'typescript',
          title: 'Connection Lifecycle Listeners',
          code: `// Setup connection event listeners

private setupConnectionListeners(): void {
  if (!this.socket) return;

  this.socket.on('connect', () => {
    console.log('✅ Socket connected:', this.socket!.id);
    this.connectionState$.next('connected');
    this.reconnectAttempts$.next(0);
  });

  this.socket.on('disconnect', (reason: string) => {
    console.log('❌ Socket disconnected:', reason);
    this.connectionState$.next('disconnected');

    if (reason === 'io server disconnect') {
      this.socket?.connect();
    }
  });

  this.socket.on('reconnect_attempt', (attempt: number) => {
    console.log(\`🔄 Reconnecting... Attempt \${attempt}\`);
    this.connectionState$.next('reconnecting');
    this.reconnectAttempts$.next(attempt);
  });

  this.socket.on('reconnect', (attempt: number) => {
    console.log(\`✅ Reconnected after \${attempt} attempts\`);
    this.connectionState$.next('connected');
  });

  this.socket.on('connect_error', (error: Error) => {
    console.error('❌ Connection error:', error.message);
  });
}`,
          description: 'Handle connection lifecycle events',
          copyable: true,
        },
        {
          id: 1023,
          language: 'typescript',
          title: 'Connection Status Component',
          code: `// src/app/features/realtime/components/connection-status.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SocketService } from '@app/core/services/socket/socket.service';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: \`
    <ion-chip [color]="chipColor()" class="connection-chip">
      <ion-icon [name]="iconName()"></ion-icon>
      <ion-label>{{ statusText() }}</ion-label>
    </ion-chip>
  \`,
  styles: [\`
    .connection-chip {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
    }
  \`],
})
export class ConnectionStatusComponent {
  socketService = inject(SocketService);

  chipColor() {
    // Returns color based on connection state
  }

  iconName() {
    // Returns icon based on connection state
  }

  statusText() {
    // Returns text based on connection state
  }
}`,
          description: 'Display connection status in UI',
          copyable: true,
        },
      ],
      interviewTips: [
        'Wrap Socket.IO in Angular service for dependency injection',
        'Use BehaviorSubject to track and expose connection state',
        'Provide type-safe emit/on methods with TypeScript generics',
        'Handle all connection lifecycle events (connect, disconnect, reconnect)',
        'fromEvent() converts Socket.IO events to RxJS Observables',
      ],
    },
    {
      id: 103,
      title: 'User Presence Tracking',
      content: `
        <h2>Implementing Real-time Presence</h2>
        <p>User presence tracking shows who's currently active in your application, what they're doing, and their status.</p>

        <h3>Presence Features</h3>
        <ul>
          <li><strong>Online Status:</strong> Track who's connected (online/away/offline)</li>
          <li><strong>Activity Tracking:</strong> Show what users are doing (current page, typing, etc.)</li>
          <li><strong>Join/Leave Events:</strong> Notify when users connect or disconnect</li>
          <li><strong>Presence Updates:</strong> Sync presence state across all clients</li>
          <li><strong>Last Seen:</strong> Track last activity timestamp</li>
        </ul>

        <h3>Implementation Pattern</h3>
        <ol>
          <li>User connects → Emit presence update</li>
          <li>Server broadcasts to other clients → User joined</li>
          <li>User changes status/activity → Emit update</li>
          <li>User disconnects → Server broadcasts → User left</li>
        </ol>

        <h3>State Management</h3>
        <p>Track online users in a service or NgRx store:</p>
        <ul>
          <li>Maintain list of online users</li>
          <li>Update on join/leave events</li>
          <li>Display in UI component</li>
          <li>Show count of online users</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Broadcast presence on connect and activity</li>
          <li>Set "away" status after inactivity timeout</li>
          <li>Clean up on disconnect (server-side)</li>
          <li>Show user avatars and status indicators</li>
          <li>Update presence on page navigation</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1030,
          language: 'typescript',
          title: 'Presence Models',
          code: `// src/app/features/realtime/models/presence.model.ts

export interface OnlineUser {
  userId: string;
  username: string;
  avatar?: string;
  status: 'online' | 'away';
  currentChapter?: number;
  joinedAt: string;
  lastActivity: string;
}

export interface PresenceState {
  onlineUsers: OnlineUser[];
  totalOnline: number;
  currentUserId: string | null;
}`,
          description: 'Type definitions for presence tracking',
          copyable: true,
        },
        {
          id: 1031,
          language: 'typescript',
          title: 'Presence Service',
          code: `// src/app/features/realtime/services/presence.service.ts

import { Injectable, inject } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { SocketService } from '@app/core/services/socket/socket.service';
import { OnlineUser } from '../models/presence.model';

@Injectable({ providedIn: 'root' })
export class PresenceService {
  private socket = inject(SocketService);
  private onlineUsers$ = new BehaviorSubject<OnlineUser[]>([]);

  get users$(): Observable<OnlineUser[]> {
    return this.onlineUsers$.asObservable();
  }

  get count$(): Observable<number> {
    return this.onlineUsers$.pipe(map((users) => users.length));
  }

  init(userId: string, username: string): void {
    this.socket.on('user_joined').subscribe((presence) => {
      this.addUser(presence);
    });

    this.socket.on('user_left').subscribe(({ userId }) => {
      this.removeUser(userId);
    });

    this.socket.emit('update_presence', {
      userId,
      username,
      status: 'online',
    });
  }
}`,
          description: 'Service for managing user presence',
          copyable: true,
        },
        {
          id: 1032,
          language: 'typescript',
          title: 'Online Users Component',
          code: `// src/app/features/realtime/components/online-users.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PresenceService } from '../../services/presence.service';

@Component({
  selector: 'app-online-users',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: \`
    <ion-card>
      <ion-card-header>
        <ion-card-title>
          <ion-icon name="people"></ion-icon>
          Online Users ({{ (presenceService.count$ | async) }})
        </ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-list>
          @for (user of (presenceService.users$ | async); track user.userId) {
            <ion-item>
              <ion-label>
                <h3>{{ user.username }}</h3>
                @if (user.currentChapter) {
                  <p>Studying Chapter {{ user.currentChapter }}</p>
                }
              </ion-label>
              <ion-badge slot="end" [color]="user.status === 'online' ? 'success' : 'warning'">
                {{ user.status }}
              </ion-badge>
            </ion-item>
          }
        </ion-list>
      </ion-card-content>
    </ion-card>
  \`,
})
export class OnlineUsersComponent {
  presenceService = inject(PresenceService);
}`,
          description: 'Display list of online users',
          copyable: true,
        },
      ],
      interviewTips: [
        'Presence tracking requires bidirectional communication (WebSockets)',
        'Store online users in BehaviorSubject for reactive updates',
        'Broadcast presence on connect, disconnect, and status changes',
        'Server should clean up disconnected users',
        'Show user status with color-coded badges (green=online, yellow=away)',
      ],
    },
    {
      id: 104,
      title: 'Real-time Notifications',
      content: `
        <h2>Building Real-time Notification System</h2>
        <p>Real-time notifications keep users informed of events and activities as they happen.</p>

        <h3>Notification Types</h3>
        <ul>
          <li><strong>Info:</strong> General information (blue)</li>
          <li><strong>Success:</strong> Positive events (green)</li>
          <li><strong>Warning:</strong> Attention needed (yellow)</li>
          <li><strong>Error:</strong> Problems or failures (red)</li>
        </ul>

        <h3>Notification Delivery</h3>
        <ul>
          <li><strong>Toast Notifications:</strong> Non-intrusive, auto-dismiss</li>
          <li><strong>Badge Counters:</strong> Unread notification count</li>
          <li><strong>Notification List:</strong> Persistent history</li>
          <li><strong>Sound/Vibration:</strong> Alert user (optional)</li>
        </ul>

        <h3>Event Examples</h3>
        <ul>
          <li>User completed a chapter</li>
          <li>New message received</li>
          <li>System announcement</li>
          <li>Error occurred</li>
          <li>Action required</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Don't overwhelm users (queue/throttle notifications)</li>
          <li>Make notifications dismissible</li>
          <li>Provide context (who, what, when)</li>
          <li>Allow users to configure preferences</li>
          <li>Keep notification history (limited)</li>
          <li>Use color coding for quick recognition</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1040,
          language: 'typescript',
          title: 'Notification Models',
          code: `// src/app/features/realtime/models/notification.model.ts

export interface RealtimeNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  userId?: string;
  username?: string;
  actionUrl?: string;
}

export interface NotificationState {
  notifications: RealtimeNotification[];
  unreadCount: number;
}`,
          description: 'Notification data structures',
          copyable: true,
        },
        {
          id: 1041,
          language: 'typescript',
          title: 'Notification Service',
          code: `// src/app/features/realtime/services/notification.service.ts

import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { SocketService } from '@app/core/services/socket/socket.service';
import { RealtimeNotification } from '../models/notification.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private socket = inject(SocketService);
  private toastController = inject(ToastController);

  private notifications$ = new BehaviorSubject<RealtimeNotification[]>([]);

  init(): void {
    this.socket.on<RealtimeNotification>('notification')
      .subscribe((notification) => {
        this.addNotification(notification);
        this.showToast(notification);
      });
  }

  private async showToast(notification: RealtimeNotification): Promise<void> {
    const toast = await this.toastController.create({
      header: notification.title,
      message: notification.message,
      duration: 4000,
      position: 'top',
      color: this.getToastColor(notification.type),
      buttons: [{ text: 'Dismiss', role: 'cancel' }],
    });

    await toast.present();
  }

  private addNotification(notification: RealtimeNotification): void {
    const current = this.notifications$.value;
    this.notifications$.next([notification, ...current].slice(0, 50));
  }
}`,
          description: 'Service for managing real-time notifications',
          copyable: true,
        },
        {
          id: 1042,
          language: 'typescript',
          title: 'Toast Notification Example',
          code: `// Example: Show toast when user completes chapter

this.socket.on<ChapterCompletedPayload>('chapter_completed')
  .subscribe(async (payload) => {
    const toast = await this.toastController.create({
      header: 'Chapter Completed!',
      message: \`\${payload.username} completed \${payload.chapterTitle}\`,
      duration: 4000,
      position: 'top',
      color: 'success',
      icon: 'checkmark-circle',
      buttons: [
        {
          text: 'View',
          handler: () => {
            this.router.navigate(['/chapters', payload.chapterId]);
          },
        },
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  });`,
          description: 'Display toast notification for events',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use Ionic ToastController for non-intrusive notifications',
        'Queue notifications to avoid overwhelming user',
        'Keep notification history (limit to 50-100)',
        'Color-code by type (success=green, error=red, etc.)',
        'Make notifications actionable with buttons',
      ],
    },
    {
      id: 105,
      title: 'NgRx Integration with WebSockets',
      content: `
        <h2>Integrating WebSockets with State Management</h2>
        <p>NgRx Effects provide the perfect bridge between WebSocket events and your application state.</p>

        <h3>Integration Pattern</h3>
        <ul>
          <li><strong>Actions:</strong> Define actions for socket events (connect, disconnect, messages)</li>
          <li><strong>Effects:</strong> Listen to socket events → dispatch actions</li>
          <li><strong>Reducer:</strong> Update state based on actions</li>
          <li><strong>Selectors:</strong> Provide data to components</li>
        </ul>

        <h3>Data Flow</h3>
        <pre>
Socket Event → Effect → Action → Reducer → State → Selector → Component
        </pre>

        <h3>Benefits</h3>
        <ul>
          <li><strong>Centralized State:</strong> All real-time data in one place</li>
          <li><strong>Predictable Updates:</strong> State changes through actions only</li>
          <li><strong>DevTools Support:</strong> Debug socket events in Redux DevTools</li>
          <li><strong>Testability:</strong> Easy to mock socket service in tests</li>
          <li><strong>Time Travel:</strong> Replay socket events during debugging</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Create actions for all socket events</li>
          <li>Use Effects to listen to socket events</li>
          <li>Dispatch actions when socket emits events</li>
          <li>Keep socket service simple (emit/on only)</li>
          <li>All business logic in reducers, not socket service</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1050,
          language: 'typescript',
          title: 'Realtime Actions',
          code: `// src/app/features/realtime/store/realtime.actions.ts

import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { OnlineUser } from '../models/presence.model';

export const RealtimeActions = createActionGroup({
  source: 'Realtime',
  events: {
    // Socket Connection
    'Connect Socket': emptyProps(),
    'Disconnect Socket': emptyProps(),
    'Socket Connected': emptyProps(),
    'Socket Disconnected': props<{ reason?: string }>(),

    // Presence
    'User Joined': props<{ user: OnlineUser }>(),
    'User Left': props<{ userId: string }>(),
    'Update Presence': props<{ users: OnlineUser[] }>(),

    // Notifications
    'Notification Received': props<{ notification: RealtimeNotification }>(),
  },
});`,
          description: 'NgRx actions for real-time events',
          copyable: true,
        },
        {
          id: 1051,
          language: 'typescript',
          title: 'Realtime Reducer',
          code: `// src/app/features/realtime/store/realtime.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { RealtimeActions } from './realtime.actions';

export interface RealtimeState {
  connectionState: ConnectionState;
  onlineUsers: OnlineUser[];
  notifications: RealtimeNotification[];
}

const initialState: RealtimeState = {
  connectionState: 'disconnected',
  onlineUsers: [],
  notifications: [],
};

export const realtimeReducer = createReducer(
  initialState,

  on(RealtimeActions.socketConnected, (state) => ({
    ...state,
    connectionState: 'connected' as ConnectionState,
  })),

  on(RealtimeActions.userJoined, (state, { user }) => ({
    ...state,
    onlineUsers: [...state.onlineUsers, user],
  })),

  on(RealtimeActions.notificationReceived, (state, { notification }) => ({
    ...state,
    notifications: [notification, ...state.notifications].slice(0, 50),
  }))
);`,
          description: 'Reducer for real-time state',
          copyable: true,
        },
        {
          id: 1052,
          language: 'typescript',
          title: 'Realtime Effects',
          code: `// src/app/features/realtime/store/realtime.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import { SocketService } from '@app/core/services/socket/socket.service';
import { RealtimeActions } from './realtime.actions';

@Injectable()
export class RealtimeEffects {
  private actions$ = inject(Actions);
  private socket = inject(SocketService);

  connectSocket$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RealtimeActions.connectSocket),
        tap(() => this.socket.connect())
      ),
    { dispatch: false }
  );

  userJoined$ = createEffect(() =>
    this.socket.on<OnlineUser>('user_joined').pipe(
      map((user) => RealtimeActions.userJoined({ user }))
    )
  );

  notificationReceived$ = createEffect(() =>
    this.socket.on<RealtimeNotification>('notification').pipe(
      map((notification) => RealtimeActions.notificationReceived({ notification }))
    )
  );
}`,
          description: 'Effects bridge socket events to NgRx actions',
          copyable: true,
        },
        {
          id: 1053,
          language: 'typescript',
          title: 'Using Real-time State in Components',
          code: `// Component using NgRx for real-time data

import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RealtimeActions } from '../../store/realtime.actions';
import { selectOnlineUsers, selectIsConnected } from '../../store/realtime.selectors';

@Component({
  selector: 'app-realtime-demo',
  template: \`
    <ion-content>
      <app-connection-status></app-connection-status>

      @if (isConnected$ | async) {
        <app-online-users></app-online-users>
      }

      <ion-button (click)="connect()">Connect</ion-button>
      <ion-button (click)="disconnect()">Disconnect</ion-button>
    </ion-content>
  \`,
})
export class RealtimeDemoPage implements OnInit {
  private store = inject(Store);

  isConnected$ = this.store.select(selectIsConnected);
  onlineUsers$ = this.store.select(selectOnlineUsers);

  ngOnInit() {
    this.store.dispatch(RealtimeActions.connectSocket());
  }

  connect() {
    this.store.dispatch(RealtimeActions.connectSocket());
  }

  disconnect() {
    this.store.dispatch(RealtimeActions.disconnectSocket());
  }
}`,
          description: 'Component dispatches actions and selects state',
          copyable: true,
        },
      ],
      interviewTips: [
        'Effects listen to socket events and dispatch actions',
        'Actions trigger socket emits (e.g., connect socket)',
        'Reducers update state based on socket events',
        'Components dispatch actions, not call socket directly',
        'NgRx DevTools can debug real-time events',
      ],
    },
    {
      id: 106,
      title: 'Testing & Security',
      content: `
        <h2>Testing WebSocket Functionality</h2>
        <p>Testing real-time features requires mocking the socket service and verifying event handling.</p>

        <h3>Testing Strategies</h3>
        <ul>
          <li><strong>Mock Socket Service:</strong> Fake socket for unit tests</li>
          <li><strong>Test Effects:</strong> Verify socket events trigger correct actions</li>
          <li><strong>Test Reducers:</strong> Ensure state updates correctly</li>
          <li><strong>Integration Tests:</strong> Use test socket server</li>
        </ul>

        <h3>Security Best Practices</h3>
        <ul>
          <li><strong>Authentication:</strong> Send token during connection handshake</li>
          <li><strong>Authorization:</strong> Verify permissions before joining rooms</li>
          <li><strong>Input Validation:</strong> Validate all incoming data</li>
          <li><strong>Rate Limiting:</strong> Prevent spam/abuse</li>
          <li><strong>Use WSS:</strong> Secure WebSocket (wss://) in production</li>
          <li><strong>Sanitize Input:</strong> Prevent XSS in messages</li>
        </ul>

        <h3>Common Vulnerabilities</h3>
        <table>
          <tr>
            <th>Vulnerability</th>
            <th>Mitigation</th>
          </tr>
          <tr>
            <td>XSS</td>
            <td>Sanitize user input before displaying</td>
          </tr>
          <tr>
            <td>Unauthorized Access</td>
            <td>Authenticate and authorize all connections</td>
          </tr>
          <tr>
            <td>DDoS</td>
            <td>Implement rate limiting and timeouts</td>
          </tr>
          <tr>
            <td>Message Injection</td>
            <td>Validate message format and content</td>
          </tr>
          <tr>
            <td>CSRF</td>
            <td>Use auth tokens, not cookies</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1060,
          language: 'typescript',
          title: 'Mock Socket Service for Testing',
          code: `// socket.service.spec.ts

describe('SocketService', () => {
  let service: SocketService;
  let mockSocket: any;

  beforeEach(() => {
    mockSocket = {
      connected: false,
      connect: jasmine.createSpy('connect'),
      disconnect: jasmine.createSpy('disconnect'),
      emit: jasmine.createSpy('emit'),
      on: jasmine.createSpy('on'),
    };

    service = new SocketService(mockConfig);
    (service as any).socket = mockSocket;
  });

  it('should connect to server', () => {
    service.connect();
    expect(mockSocket.connect).toHaveBeenCalled();
  });

  it('should emit events', () => {
    service.emit('test', { data: 'value' });
    expect(mockSocket.emit).toHaveBeenCalledWith('test', { data: 'value' });
  });
});`,
          description: 'Unit test socket service with mocks',
          copyable: true,
        },
        {
          id: 1061,
          language: 'typescript',
          title: 'Authentication with Socket.IO',
          code: `// Client: Send token during connection
const socket = io(url, {
  auth: {
    token: authService.getToken(),
  },
});

// Server: Validate token
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (validateToken(token)) {
    socket.userId = extractUserId(token);
    next();
  } else {
    next(new Error('Authentication failed'));
  }
});`,
          description: 'Authenticate WebSocket connections',
          copyable: true,
        },
        {
          id: 1062,
          language: 'typescript',
          title: 'Input Validation & Rate Limiting',
          code: `// Server-side validation and rate limiting

const rateLimiter = new Map<string, number>();

socket.on('message', (data) => {
  // Validate message format
  if (!validateMessage(data)) {
    socket.emit('error', { message: 'Invalid message' });
    return;
  }

  // Rate limiting
  const count = rateLimiter.get(socket.userId) || 0;
  if (count > 10) {
    socket.emit('error', { message: 'Rate limit exceeded' });
    return;
  }
  rateLimiter.set(socket.userId, count + 1);

  // Sanitize before broadcasting
  const sanitized = sanitizeInput(data);
  io.to(roomId).emit('message', sanitized);

  // Reset rate limit after 1 minute
  setTimeout(() => {
    rateLimiter.delete(socket.userId);
  }, 60000);
});`,
          description: 'Validate input and implement rate limiting',
          copyable: true,
        },
      ],
      interviewTips: [
        'Always authenticate WebSocket connections (send token in handshake)',
        'Validate all incoming data to prevent injection attacks',
        'Implement rate limiting to prevent spam/DDoS',
        'Use WSS (secure WebSocket) in production',
        'Test with mock socket service for unit tests',
      ],
    },
  ],
};
