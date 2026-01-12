// src/app/features/realtime/store/realtime.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import { SocketService } from '@app/core/services/socket/socket.service';
import { RealtimeActions } from './realtime.actions';
import {
  ServerSocketEvents,
  ChapterCompletedPayload,
} from '@app/core/services/socket/socket-events';
import { OnlineUser } from '../models/presence.model';
import { RealtimeNotification } from '../models/notification.model';

@Injectable()
export class RealtimeEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private socket = inject(SocketService);

  /**
   * Connect to socket when action dispatched
   */
  connectSocket$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RealtimeActions.connectSocket),
        tap(() => {
          console.log('Effect: Connecting socket');
          this.socket.connect();
        })
      ),
    { dispatch: false }
  );

  /**
   * Disconnect from socket
   */
  disconnectSocket$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RealtimeActions.disconnectSocket),
        tap(() => {
          console.log('Effect: Disconnecting socket');
          this.socket.disconnect();
        })
      ),
    { dispatch: false }
  );

  /**
   * Listen for socket connection state changes
   */
  connectionStateChanged$ = createEffect(() =>
    this.socket.state$.pipe(
      map((state) => RealtimeActions.connectionStateChanged({ state }))
    )
  );

  /**
   * Listen for user joined events
   */
  userJoined$ = createEffect(() =>
    this.socket.on<OnlineUser>(ServerSocketEvents.USER_JOINED).pipe(
      map((user) => RealtimeActions.userJoined({ user }))
    )
  );

  /**
   * Listen for user left events
   */
  userLeft$ = createEffect(() =>
    this.socket.on<{ userId: string }>(ServerSocketEvents.USER_LEFT).pipe(
      map(({ userId }) => RealtimeActions.userLeft({ userId }))
    )
  );

  /**
   * Listen for presence updates
   */
  presenceUpdate$ = createEffect(() =>
    this.socket.on<OnlineUser[]>(ServerSocketEvents.PRESENCE_UPDATE).pipe(
      map((users) => RealtimeActions.updatePresence({ users }))
    )
  );

  /**
   * Listen for notifications
   */
  notificationReceived$ = createEffect(() =>
    this.socket.on<RealtimeNotification>(ServerSocketEvents.NOTIFICATION).pipe(
      map((notification) => RealtimeActions.notificationReceived({ notification }))
    )
  );

  /**
   * Listen for chapter completions
   */
  chapterCompleted$ = createEffect(() =>
    this.socket.on<ChapterCompletedPayload>(ServerSocketEvents.CHAPTER_COMPLETED).pipe(
      map((payload) => RealtimeActions.chapterCompleted(payload))
    )
  );
}

/*
💡 INTERVIEW: Effects for WebSocket Integration
- Effects handle side effects (socket connection)
- Listen to socket events → dispatch actions
- Actions trigger socket emits
- Centralized WebSocket logic
- Easy to test (mock socket service)
- Separate concerns (UI vs communication)
*/
