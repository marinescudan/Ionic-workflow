// src/app/features/realtime/models/notification.model.ts

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
}
