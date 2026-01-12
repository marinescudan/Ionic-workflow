// src/app/core/services/socket/socket-events.ts

/**
 * Type-safe socket event definitions
 */

// Events emitted by CLIENT to SERVER
export enum ClientSocketEvents {
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  SEND_MESSAGE = 'send_message',
  UPDATE_PRESENCE = 'update_presence',
  CHAPTER_COMPLETED = 'chapter_completed',
}

// Events emitted by SERVER to CLIENT
export enum ServerSocketEvents {
  CONNECTED = 'connected',
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
  NEW_MESSAGE = 'new_message',
  PRESENCE_UPDATE = 'presence_update',
  CHAPTER_COMPLETED = 'chapter_completed',
  NOTIFICATION = 'notification',
}

// Event payload interfaces
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
  currentChapter?: number;
}

export interface RealtimeNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  userId?: string;
  username?: string;
}

export interface ChapterCompletedPayload {
  userId: string;
  username: string;
  chapterId: number;
  chapterTitle: string;
  timestamp: string;
}

/*
💡 INTERVIEW: Type Safety with WebSockets
- Define enums for event names (prevents typos)
- Create interfaces for event payloads
- Use generics for emit/on methods
- Validates data at compile-time
- Makes code self-documenting
*/
