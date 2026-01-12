// src/app/features/realtime/models/presence.model.ts

export interface OnlineUser {
  userId: string;
  username: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  currentChapter?: number;
  joinedAt: string;
  lastActivity: string;
}

export interface PresenceState {
  onlineUsers: OnlineUser[];
  totalOnline: number;
  currentUserId: string | null;
}
