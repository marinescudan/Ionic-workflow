// src/app/features/realtime/pages/realtime-demo/realtime-demo.page.ts

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { RealtimeActions } from '../../store/realtime.actions';
import {
  selectOnlineUsers,
  selectIsConnected,
  selectConnectionState,
  selectNotifications,
} from '../../store/realtime.selectors';
import { ConnectionStatusComponent } from '../../components/connection-status/connection-status.component';
import { OnlineUsersComponent } from '../../components/online-users/online-users.component';

@Component({
  selector: 'app-realtime-demo',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ConnectionStatusComponent,
    OnlineUsersComponent,
  ],
  templateUrl: './realtime-demo.page.html',
  styleUrls: ['./realtime-demo.page.scss'],
})
export class RealtimeDemoPage implements OnInit, OnDestroy {
  private store = inject(Store);

  // Observables from store
  isConnected$ = this.store.select(selectIsConnected);
  connectionState$ = this.store.select(selectConnectionState);
  onlineUsers$ = this.store.select(selectOnlineUsers);
  notifications$ = this.store.select(selectNotifications);

  ngOnInit() {
    console.log('RealtimeDemo: Initializing');
    // Auto-connect when page loads
    this.store.dispatch(RealtimeActions.connectSocket());
  }

  ngOnDestroy() {
    console.log('RealtimeDemo: Cleaning up');
    // Disconnect when leaving page
    this.store.dispatch(RealtimeActions.disconnectSocket());
  }

  onConnect() {
    this.store.dispatch(RealtimeActions.connectSocket());
  }

  onDisconnect() {
    this.store.dispatch(RealtimeActions.disconnectSocket());
  }

  onClearNotifications() {
    this.store.dispatch(RealtimeActions.clearNotifications());
  }

  onRemoveNotification(id: string) {
    this.store.dispatch(RealtimeActions.removeNotification({ id }));
  }

  simulateChapterCompletion() {
    // This would normally be triggered by actual chapter completion
    const mockUserId = 'demo-user-' + Date.now();
    const mockUsername = 'Demo User';

    this.store.dispatch(
      RealtimeActions.chapterCompleted({
        userId: mockUserId,
        username: mockUsername,
        chapterId: 1,
        chapterTitle: 'Introduction to Ionic',
      })
    );
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'alert-circle';
      case 'warning': return 'warning';
      case 'info': return 'information-circle';
      default: return 'notifications';
    }
  }

  getNotificationColor(type: string): string {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'primary';
      default: return 'medium';
    }
  }
}
