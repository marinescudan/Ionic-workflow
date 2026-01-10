import { Component, Input } from '@angular/core';

import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonIcon
],
})
export class SimpleModalComponent {
  @Input() title = 'Modal';
  @Input() message = 'This is a simple modal.';

  constructor(private modalCtrl: ModalController) {
    addIcons({ close });
  }

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss({ confirmed: true }, 'confirm');
  }
}
