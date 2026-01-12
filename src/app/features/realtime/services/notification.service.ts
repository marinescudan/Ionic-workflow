// src/app/features/realtime/services/notification.service.ts

import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { SocketService } from '@app/core/services/socket/socket.service';
import { RealtimeNotification } from '../models/notification.model';
import {
  ServerSocketEvents,
  ChapterCompletedPayload
} from '@app/core/services/socket/socket-events';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private socket = inject(SocketService);
  private toastController = inject(ToastController);

  private notifications$ = new BehaviorSubject<RealtimeNotification[]>([]);

  get all$(): Observable<RealtimeNotification[]> {
    return this.notifications$.asObservable();
  }

  get unreadCount$(): Observable<number> {
    return this.notifications$.pipe(
      map((notifications) => notifications.length)
    );
  }

  /**
   * Initialize notification listener
   */
  init(): void {
    this.socket
      .on<RealtimeNotification>(ServerSocketEvents.NOTIFICATION)
      .subscribe((notification) => {
        console.log('Received notification:', notification);
        this.addNotification(notification);
        this.showToast(notification);
      });

    // Listen for chapter completions
    this.socket
      .on<ChapterCompletedPayload>(ServerSocketEvents.CHAPTER_COMPLETED)
      .subscribe((payload) => {
        const notification: RealtimeNotification = {
          id: Date.now().toString(),
          type: 'success',
          title: 'Chapter Completed!',
          message: `${payload.username} completed ${payload.chapterTitle}`,
          timestamp: payload.timestamp,
          userId: payload.userId,
          username: payload.username,
        };
        this.addNotification(notification);
        this.showToast(notification);
      });
  }

  /**
   * Show toast notification
   */
  private async showToast(notification: RealtimeNotification): Promise<void> {
    const color = this.getToastColor(notification.type);
    const icon = this.getToastIcon(notification.type);

    const toast = await this.toastController.create({
      header: notification.title,
      message: notification.message,
      duration: 4000,
      position: 'top',
      color,
      icon,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }

  /**
   * Add notification to list
   */
  private addNotification(notification: RealtimeNotification): void {
    const current = this.notifications$.value;
    this.notifications$.next([notification, ...current]);

    // Keep only last 50 notifications
    if (this.notifications$.value.length > 50) {
      this.notifications$.next(this.notifications$.value.slice(0, 50));
    }
  }

  /**
   * Clear all notifications
   */
  clearAll(): void {
    this.notifications$.next([]);
  }

  /**
   * Remove notification
   */
  remove(id: string): void {
    const filtered = this.notifications$.value.filter((n) => n.id !== id);
    this.notifications$.next(filtered);
  }

  private getToastColor(type: RealtimeNotification['type']): string {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'primary';
      default: return 'medium';
    }
  }

  private getToastIcon(type: RealtimeNotification['type']): string {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'alert-circle';
      case 'warning': return 'warning';
      case 'info': return 'information-circle';
      default: return 'notifications';
    }
  }
}

/*
💡 INTERVIEW: Real-time Notifications
- Use toast/banner for immediate feedback
- Queue notifications (don't overwhelm user)
- Persistent notification history
- Different types (success, error, warning, info)
- Dismissible and actionable
- Sound/vibration (optional)
*/
