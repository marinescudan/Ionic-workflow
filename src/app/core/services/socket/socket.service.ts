// src/app/core/services/socket/socket.service.ts

import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { SOCKET_CONFIG } from './socket.config';
import io from 'socket.io-client';

// Type for socket instance
type SocketType = ReturnType<typeof io>;

export type ConnectionState =
  | 'connecting'
  | 'connected'
  | 'disconnecting'
  | 'disconnected'
  | 'reconnecting';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private config = inject(SOCKET_CONFIG);
  private socket: SocketType;

  // Connection state as Observable
  private connectionState$ = new BehaviorSubject<ConnectionState>('disconnected');
  private reconnectAttempts$ = new BehaviorSubject<number>(0);

  constructor() {
    // Initialize socket instance (but don't connect yet)
    // This allows effects to set up listeners before connection
    console.log('Initializing socket instance:', this.config.url);
    this.socket = io(this.config.url, {
      ...this.config.options,
      autoConnect: false, // Don't auto-connect, wait for explicit connect() call
    });

    // Set up connection event listeners
    this.setupConnectionListeners();
  }

  /**
   * Get current connection state
   */
  get state$(): Observable<ConnectionState> {
    return this.connectionState$.asObservable();
  }

  /**
   * Get current connection state value
   */
  get isConnected(): boolean {
    return this.socket.connected;
  }

  /**
   * Get reconnection attempts count
   */
  get reconnectAttempts(): Observable<number> {
    return this.reconnectAttempts$.asObservable();
  }

  /**
   * Connect to socket server
   */
  connect(): void {
    if (this.socket.connected) {
      console.log('Socket already connected');
      return;
    }

    console.log('Connecting to socket server:', this.config.url);
    this.connectionState$.next('connecting');

    // Connect the socket (instance already created in constructor)
    this.socket.connect();
  }

  /**
   * Disconnect from socket server
   */
  disconnect(): void {
    console.log('Disconnecting from socket server');
    this.connectionState$.next('disconnecting');
    this.socket.disconnect();
    this.connectionState$.next('disconnected');
  }

  /**
   * Emit event to server
   * @example this.socket.emit('message', { text: 'Hello' })
   */
  emit<T = any>(event: string, data?: T): void {
    if (!this.socket.connected) {
      console.warn('Socket not connected. Message not sent:', event);
      return;
    }

    this.socket.emit(event, data);
  }

  /**
   * Emit event with acknowledgment
   * @example
   * this.socket.emitWithAck('message', { text: 'Hello' })
   *   .subscribe(response => console.log('Server responded:', response))
   */
  emitWithAck<T = any, R = any>(event: string, data?: T): Observable<R> {
    return new Observable((observer) => {
      if (!this.socket.connected) {
        observer.error(new Error('Socket not connected'));
        return;
      }

      this.socket.emit(event, data, (response: R) => {
        observer.next(response);
        observer.complete();
      });
    });
  }

  /**
   * Listen for events from server
   * @example
   * this.socket.on<Message>('new_message')
   *   .subscribe(msg => console.log('New message:', msg))
   */
  on<T = any>(event: string): Observable<T> {
    return fromEvent<T>(this.socket, event);
  }

  /**
   * Listen for event once (auto-unsubscribe after first emission)
   */
  once<T = any>(event: string): Observable<T> {
    return new Observable((observer) => {
      this.socket.once(event, (data: T) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  /**
   * Join a room
   */
  joinRoom(roomId: string, data?: any): void {
    this.emit('join_room', { roomId, ...data });
  }

  /**
   * Leave a room
   */
  leaveRoom(roomId: string): void {
    this.emit('leave_room', { roomId });
  }

  /**
   * Set up connection lifecycle event listeners
   */
  private setupConnectionListeners(): void {
    // Connection successful
    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);
      this.connectionState$.next('connected');
      this.reconnectAttempts$.next(0);
    });

    // Connection lost
    this.socket.on('disconnect', (reason: string) => {
      console.log('❌ Socket disconnected:', reason);
      this.connectionState$.next('disconnected');

      // Automatic reconnection if disconnect wasn't intentional
      if (reason === 'io server disconnect') {
        // Server forcefully closed connection, manually reconnect
        this.socket.connect();
      }
    });

    // Reconnection attempt
    this.socket.on('reconnect_attempt', (attempt: number) => {
      console.log(`🔄 Reconnecting... Attempt ${attempt}`);
      this.connectionState$.next('reconnecting');
      this.reconnectAttempts$.next(attempt);
    });

    // Reconnection successful
    this.socket.on('reconnect', (attempt: number) => {
      console.log(`✅ Reconnected after ${attempt} attempts`);
      this.connectionState$.next('connected');
    });

    // Reconnection failed
    this.socket.on('reconnect_failed', () => {
      console.error('❌ Reconnection failed');
      this.connectionState$.next('disconnected');
    });

    // Connection error
    this.socket.on('connect_error', (error: Error) => {
      console.error('❌ Connection error:', error.message);
    });

    // Connection timeout
    this.socket.on('connect_timeout', () => {
      console.error('⏱️ Connection timeout');
    });
  }
}

/*
💡 INTERVIEW: Socket Service Pattern
- Wrap Socket.IO client in Angular service
- Expose connection state as Observable
- Provide type-safe emit/on methods
- Handle all lifecycle events
- Use BehaviorSubject for state management
- Support rooms and namespaces
- Implement acknowledgments for critical messages
- Graceful handling of disconnections
*/
