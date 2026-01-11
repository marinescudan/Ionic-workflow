// src/app/features/realtime/store/realtime.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { OnlineUser } from '../models/presence.model';
import { RealtimeNotification } from '../models/notification.model';
import { RealtimeActions } from './realtime.actions';
import { ConnectionState } from '@app/core/services/socket/socket.service';

export interface RealtimeState {
  connectionState: ConnectionState;
  onlineUsers: OnlineUser[];
  notifications: RealtimeNotification[];
  error: string | null;
}

const initialState: RealtimeState = {
  connectionState: 'disconnected',
  onlineUsers: [],
  notifications: [],
  error: null,
};

export const realtimeReducer = createReducer(
  initialState,

  // Connection
  on(RealtimeActions.connectionStateChanged, (state, { state: newState }) => ({
    ...state,
    connectionState: newState,
  })),

  on(RealtimeActions.socketConnected, (state) => ({
    ...state,
    connectionState: 'connected' as ConnectionState,
    error: null,
  })),

  on(RealtimeActions.socketDisconnected, (state, { reason }) => ({
    ...state,
    connectionState: 'disconnected' as ConnectionState,
    error: reason || null,
  })),

  // Presence
  on(RealtimeActions.userJoined, (state, { user }) => {
    // Prevent duplicates
    const exists = state.onlineUsers.some((u) => u.userId === user.userId);
    if (exists) return state;

    return {
      ...state,
      onlineUsers: [...state.onlineUsers, user],
    };
  }),

  on(RealtimeActions.userLeft, (state, { userId }) => ({
    ...state,
    onlineUsers: state.onlineUsers.filter((u) => u.userId !== userId),
  })),

  on(RealtimeActions.updatePresence, (state, { users }) => ({
    ...state,
    onlineUsers: users,
  })),

  // Notifications
  on(RealtimeActions.notificationReceived, (state, { notification }) => ({
    ...state,
    notifications: [notification, ...state.notifications].slice(0, 50),
  })),

  on(RealtimeActions.clearNotifications, (state) => ({
    ...state,
    notifications: [],
  })),

  on(RealtimeActions.removeNotification, (state, { id }) => ({
    ...state,
    notifications: state.notifications.filter((n) => n.id !== id),
  }))
);

/*
💡 INTERVIEW: Reducer Pattern for Realtime
- Immutable state updates
- Handle all socket events
- Prevent duplicate users
- Limit notification history
- Clear state on disconnect (optional)
*/
