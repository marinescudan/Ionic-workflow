// src/app/features/realtime/components/online-users/online-users.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PresenceService } from '../../services/presence.service';

@Component({
  selector: 'app-online-users',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title>
          <ion-icon name="people"></ion-icon>
          Online Users ({{ (presenceService.count$ | async) || 0 }})
        </ion-card-title>
      </ion-card-header>

      <ion-card-content>
        @if ((presenceService.users$ | async)!.length === 0) {
          <p class="no-users">No users online</p>
        } @else {
          <ion-list>
            @for (user of (presenceService.users$ | async); track user.userId) {
              <ion-item>
                <ion-avatar slot="start">
                  <div class="avatar-placeholder">
                    {{ user.username.charAt(0).toUpperCase() }}
                  </div>
                </ion-avatar>

                <ion-label>
                  <h3>{{ user.username }}</h3>
                  @if (user.currentChapter) {
                    <p>Studying Chapter {{ user.currentChapter }}</p>
                  } @else {
                    <p>Browsing</p>
                  }
                </ion-label>

                <ion-badge
                  slot="end"
                  [color]="user.status === 'online' ? 'success' : 'warning'">
                  {{ user.status }}
                </ion-badge>
              </ion-item>
            }
          </ion-list>
        }
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    .no-users {
      text-align: center;
      color: var(--ion-color-medium);
      padding: 20px;
    }

    .avatar-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ion-color-primary);
      color: white;
      font-weight: bold;
      font-size: 1.2em;
      border-radius: 50%;
    }

    ion-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `],
})
export class OnlineUsersComponent {
  presenceService = inject(PresenceService);
}

/*
💡 INTERVIEW: Real-time User Lists
- Show who's currently active
- Display user status (online/away)
- Show what each user is doing
- Update in real-time
- Handle users joining/leaving smoothly
*/
