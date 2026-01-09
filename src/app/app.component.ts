import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { App, URLOpenListenerEvent } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setupDeepLinks();
    });
  }

  setupDeepLinks() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const url = event.url;
      console.log('Deep link opened:', url);

      // Parse URL
      // ionic-workflow://chapters/123 -> /chapters/123
      const slug = url.split('.app').pop() || url.split('://').pop();

      if (slug) {
        this.router.navigateByUrl(slug);
      }
    });
  }
}
