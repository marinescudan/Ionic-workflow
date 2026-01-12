// src/app/features/realtime/services/presence.service.ts

import { Injectable, inject } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { SocketService } from '@app/core/services/socket/socket.service';
import { OnlineUser } from '../models/presence.model';
import {
  ServerSocketEvents,
  ClientSocketEvents,
  UserPresence,
} from '@app/core/services/socket/socket-events';

@Injectable({ providedIn: 'root' })
export class PresenceService {
  private socket = inject(SocketService);
  private onlineUsers$ = new BehaviorSubject<OnlineUser[]>([]);

  /**
   * Get list of online users
   */
  get users$(): Observable<OnlineUser[]> {
    return this.onlineUsers$.asObservable();
  }

  /**
   * Get count of online users
   */
  get count$(): Observable<number> {
    return this.onlineUsers$.pipe(map((users) => users.length));
  }

  /**
   * Initialize presence tracking
   */
  init(userId: string, username: string): void {
    // Listen for users joining
    this.socket
      .on<UserPresence>(ServerSocketEvents.USER_JOINED)
      .subscribe((presence) => {
        console.log('User joined:', presence.username);
        this.addUser(presence);
      });

    // Listen for users leaving
    this.socket
      .on<{ userId: string }>(ServerSocketEvents.USER_LEFT)
      .subscribe(({ userId }) => {
        console.log('User left:', userId);
        this.removeUser(userId);
      });

    // Listen for presence updates
    this.socket
      .on<UserPresence[]>(ServerSocketEvents.PRESENCE_UPDATE)
      .subscribe((users) => {
        console.log('Presence update:', users.length, 'users online');
        this.setUsers(users);
      });

    // Announce our presence
    this.socket.emit<UserPresence>(ClientSocketEvents.UPDATE_PRESENCE, {
      userId,
      username,
      status: 'online',
      lastSeen: new Date().toISOString(),
    });
  }

  /**
   * Update user status (online/away)
   */
  updateStatus(userId: string, status: 'online' | 'away'): void {
    this.socket.emit(ClientSocketEvents.UPDATE_PRESENCE, {
      userId,
      status,
      lastSeen: new Date().toISOString(),
    });
  }

  /**
   * Update current chapter
   */
  updateCurrentChapter(userId: string, chapterId: number): void {
    this.socket.emit(ClientSocketEvents.UPDATE_PRESENCE, {
      userId,
      currentChapter: chapterId,
      lastSeen: new Date().toISOString(),
    });
  }

  /**
   * Clean up presence tracking
   */
  destroy(): void {
    this.onlineUsers$.next([]);
  }

  private addUser(presence: UserPresence): void {
    const users = this.onlineUsers$.value;
    const exists = users.some((u) => u.userId === presence.userId);

    if (!exists) {
      const newUser: OnlineUser = {
        userId: presence.userId,
        username: presence.username,
        status: presence.status,
        currentChapter: presence.currentChapter,
        joinedAt: new Date().toISOString(),
        lastActivity: presence.lastSeen,
      };
      this.onlineUsers$.next([...users, newUser]);
    }
  }

  private removeUser(userId: string): void {
    const users = this.onlineUsers$.value.filter((u) => u.userId !== userId);
    this.onlineUsers$.next(users);
  }

  private setUsers(presences: UserPresence[]): void {
    const users: OnlineUser[] = presences.map((p) => ({
      userId: p.userId,
      username: p.username,
      status: p.status,
      currentChapter: p.currentChapter,
      joinedAt: new Date().toISOString(),
      lastActivity: p.lastSeen,
    }));
    this.onlineUsers$.next(users);
  }
}

/*
💡 INTERVIEW: Presence Tracking
- Track who's currently using the app
- Update presence on activity (typing, navigation)
- Handle join/leave events
- Set user status (online/away/offline)
- Show what each user is doing (current page/chapter)
- Clean up on disconnect
*/
