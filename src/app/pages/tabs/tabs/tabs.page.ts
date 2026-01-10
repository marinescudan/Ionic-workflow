import { Component } from '@angular/core';

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  home,
  homeOutline,
  compass,
  compassOutline,
  notifications,
  notificationsOutline,
  person,
  personOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge
],
})
export class TabsPage {
  notificationCount = 5; // Mock notification count

  constructor() {
    addIcons({
      home,
      homeOutline,
      compass,
      compassOutline,
      notifications,
      notificationsOutline,
      person,
      personOutline,
    });
  }
}
