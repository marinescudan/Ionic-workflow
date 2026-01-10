import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { notesReducer } from './features/notes/store/notes.reducer';
import { NotesEffects } from './features/notes/store/notes.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideIonicAngular(),

    // NgRx Store - register feature reducers
    provideStore({
      notes: notesReducer,
      // Add more feature reducers here
    }),

    // NgRx Effects - register effect classes
    provideEffects([
      NotesEffects,
      // Add more effects classes here
    ]),

    // Redux DevTools (development only)
    provideStoreDevtools({
      // Maximum number of actions to keep in history
      maxAge: 25,

      // In production, only log actions (no state inspection)
      logOnly: !isDevMode(),

      // Pause recording when navigating
      autoPause: true,

      // Enable action stack traces (performance impact)
      trace: false,
      traceLimit: 75,

      // Sanitize actions/state before sending to DevTools
      // Use for sensitive data
      actionSanitizer: (action) => action,
      stateSanitizer: (state) => state,

      // Filter actions by type (commented out to allow all actions)
      // actionsBlocklist: ['@ngrx/router-store/*'],
      // actionsSafelist: ['[Notes]*'],

      // Connect in Angular zone for change detection
      connectInZone: true,
    }),
  ],
};
