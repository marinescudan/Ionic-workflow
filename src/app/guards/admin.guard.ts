import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { ToastController } from '@ionic/angular';

export const adminGuard = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastCtrl = inject(ToastController);

  const user = authService.getCurrentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  if (user.role !== 'admin') {
    const toast = await toastCtrl.create({
      message: 'Admin access required',
      duration: 2000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();

    router.navigate(['/tabs/home']);
    return false;
  }

  return true;
};
