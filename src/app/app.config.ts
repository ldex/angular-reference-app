import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners, isDevMode,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withDebugTracing,
  withViewTransitions,
  TitleStrategy,
} from '@angular/router';

import { routes } from './app.routes';
import { JwtModule } from '@auth0/angular-jwt';
import { config } from '../environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAppErrorHandler } from './core/global-error-handler';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppTitleStrategy, provideAppTitleStrategy } from './app-title-strategy';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppErrorHandler(),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        httpErrorInterceptor
      ]),
      withFetch()
    ),
    provideSignalFormsConfig({
      classes: NG_STATUS_CLASSES,
    }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      //withDebugTracing(),
      withViewTransitions()
    ),
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAppTitleStrategy(),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem(config.storageTokenKey);
          },
          allowedDomains: ['localhost:4200'],
        },
      })
    ),
  ],
};
