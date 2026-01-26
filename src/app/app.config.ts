import { ApplicationConfig, isDevMode, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideApollo } from 'apollo-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { notesReducer } from './features/notes/store/notes.reducer';
import { NotesEffects } from './features/notes/store/notes.effects';
import { realtimeReducer } from './features/realtime/store/realtime.reducer';
import { RealtimeEffects } from './features/realtime/store/realtime.effects';
import { i18nReducer } from './features/i18n-demo/store/i18n.reducer';
import { I18nEffects } from './features/i18n-demo/store/i18n.effects';
import { loggingInterceptor } from '@app/core/interceptors/logging.interceptor';
import { authInterceptor } from '@app/core/interceptors/auth.interceptor';
import { cacheInterceptor } from '@app/core/interceptors/cache.interceptor';
import { errorInterceptor } from '@app/core/interceptors/error.interceptor';
import { SOCKET_CONFIG, defaultSocketConfig } from '@app/core/services/socket/socket.config';
import { createApollo } from './core/services/graphql/apollo.config';

// Translation loader factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Modern HttpClient setup (Angular 15+)
    provideHttpClient(
      withInterceptors([
        // Order matters! Interceptors execute in array order
        loggingInterceptor,   // 1. Log request
        authInterceptor,      // 2. Add auth token
        cacheInterceptor,     // 3. Check/update cache
        errorInterceptor,     // 4. Handle errors
      ])
    ),
    provideIonicAngular(),

    // Internationalization (i18n)
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),

    // Socket.IO Configuration
    { provide: SOCKET_CONFIG, useValue: defaultSocketConfig },

    // Apollo GraphQL
    provideApollo(createApollo),

    // NgRx Store - register feature reducers
    provideStore({
      notes: notesReducer,
      realtime: realtimeReducer,
      i18n: i18nReducer,
      // Add more feature reducers here
    }),

    // NgRx Effects - register effect classes
    provideEffects([
      NotesEffects,
      RealtimeEffects,
      I18nEffects,
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
