import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  selector: 'app-fullpage-modal',
  templateUrl: './fullpage-modal.component.html',
  styleUrls: ['./fullpage-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonIcon,
  ],
})
export class FullpageModalComponent {
  @Input() title = 'Details';
  @Input() content = '';

  constructor(private modalCtrl: ModalController) {
    addIcons({ close });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
