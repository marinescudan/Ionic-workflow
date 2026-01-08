import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonLabel,
  ],
})
export class FormModalComponent implements OnInit {
  @Input() title = 'Add Item';
  @Input() data?: any;

  form!: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || ''],
      priority: [this.data?.priority || 'medium'],
    });
  }

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value, 'confirm');
    }
  }
}
