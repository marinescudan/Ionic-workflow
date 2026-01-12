// src/app/features/realtime/components/connection-status/connection-status.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SocketService, ConnectionState } from '@app/core/services/socket/socket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-chip [color]="getChipColor(state$ | async)" class="connection-chip">
      <ion-icon [name]="getIconName(state$ | async)"></ion-icon>
      <ion-label>{{ getStatusText(state$ | async) }}</ion-label>

      @if ((socketService.reconnectAttempts | async)! > 0) {
        <ion-label class="attempt-count">
          ({{ socketService.reconnectAttempts | async }})
        </ion-label>
      }
    </ion-chip>
  `,
  styles: [`
    .connection-chip {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
    }

    ion-icon {
      margin-right: 4px;
    }

    .attempt-count {
      margin-left: 4px;
      font-size: 0.8em;
    }
  `],
})
export class ConnectionStatusComponent {
  socketService = inject(SocketService);
  state$: Observable<ConnectionState> = this.socketService.state$;

  getChipColor(state: ConnectionState | null): string {
    switch (state) {
      case 'connected': return 'success';
      case 'connecting': return 'warning';
      case 'reconnecting': return 'warning';
      case 'disconnecting': return 'medium';
      case 'disconnected': return 'danger';
      default: return 'medium';
    }
  }

  getIconName(state: ConnectionState | null): string {
    switch (state) {
      case 'connected': return 'wifi';
      case 'connecting': return 'hourglass-outline';
      case 'reconnecting': return 'sync';
      case 'disconnecting': return 'close-circle-outline';
      case 'disconnected': return 'wifi-outline';
      default: return 'help-circle-outline';
    }
  }

  getStatusText(state: ConnectionState | null): string {
    switch (state) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'reconnecting': return 'Reconnecting...';
      case 'disconnecting': return 'Disconnecting...';
      case 'disconnected': return 'Offline';
      default: return 'Unknown';
    }
  }
}

/*
💡 INTERVIEW: UI Feedback for Connection State
- Always show connection status to user
- Use color coding (green=good, red=bad)
- Indicate reconnection attempts
- Non-intrusive UI (chip/badge)
- Real-time updates via Observable
*/
