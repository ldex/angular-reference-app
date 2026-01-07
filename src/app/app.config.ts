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
import { AppTitleStrategy } from './app-title-strategy';

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
    {provide: TitleStrategy, useClass: AppTitleStrategy},
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
    provideClientHydration(withEventReplay()),
  ],
};
