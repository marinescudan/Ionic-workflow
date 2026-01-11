// src/app/features/realtime/store/realtime.actions.ts

import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { OnlineUser } from '../models/presence.model';
import { RealtimeNotification } from '../models/notification.model';
import { ConnectionState } from '@app/core/services/socket/socket.service';

export const RealtimeActions = createActionGroup({
  source: 'Realtime',
  events: {
    // Socket Connection
    'Connect Socket': emptyProps(),
    'Disconnect Socket': emptyProps(),
    'Socket Connected': emptyProps(),
    'Socket Disconnected': props<{ reason?: string }>(),
    'Connection State Changed': props<{ state: ConnectionState }>(),

    // Presence
    'User Joined': props<{ user: OnlineUser }>(),
    'User Left': props<{ userId: string }>(),
    'Update Presence': props<{ users: OnlineUser[] }>(),

    // Notifications
    'Notification Received': props<{ notification: RealtimeNotification }>(),
    'Clear Notifications': emptyProps(),
    'Remove Notification': props<{ id: string }>(),

    // Chapter Completion
    'Chapter Completed': props<{
      userId: string;
      username: string;
      chapterId: number;
      chapterTitle: string;
    }>(),
  },
});

/*
💡 INTERVIEW: NgRx Actions for WebSockets
- Separate actions for socket events
- Connection state changes trigger actions
- Incoming events dispatch actions
- Outgoing events triggered by actions
- Type-safe payloads
*/
