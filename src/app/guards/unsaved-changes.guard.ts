import { inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

// Component interface
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const unsavedChangesGuard = async (
  component: CanComponentDeactivate
) => {
  const alertCtrl = inject(AlertController);

  // Check if component has unsaved changes
  if (component.canDeactivate()) {
    return true; // Allow navigation
  }

  // Show confirmation dialog
  const alert = await alertCtrl.create({
    header: 'Unsaved Changes',
    message: 'You have unsaved changes. Do you want to discard them?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Discard',
        role: 'destructive',
      },
    ],
  });

  await alert.present();
  const { role } = await alert.onDidDismiss();

  return role === 'destructive';
};
