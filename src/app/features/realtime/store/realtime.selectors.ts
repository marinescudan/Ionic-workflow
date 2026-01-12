// src/app/features/realtime/store/realtime.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RealtimeState } from './realtime.reducer';

export const selectRealtimeState = createFeatureSelector<RealtimeState>('realtime');

export const selectConnectionState = createSelector(
  selectRealtimeState,
  (state) => state.connectionState
);

export const selectIsConnected = createSelector(
  selectConnectionState,
  (state) => state === 'connected'
);

export const selectOnlineUsers = createSelector(
  selectRealtimeState,
  (state) => state.onlineUsers
);

export const selectOnlineUserCount = createSelector(
  selectOnlineUsers,
  (users) => users.length
);

export const selectNotifications = createSelector(
  selectRealtimeState,
  (state) => state.notifications
);

export const selectUnreadNotificationCount = createSelector(
  selectNotifications,
  (notifications) => notifications.length
);

export const selectRecentNotifications = createSelector(
  selectNotifications,
  (notifications) => notifications.slice(0, 5)
);

/*
💡 INTERVIEW: Selectors for Derived State
- Memoized for performance
- Compute derived values
- Compose selectors
- Component-friendly data shapes
*/
