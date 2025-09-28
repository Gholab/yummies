import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {MENU_SERVICE} from './services/services.token';
import {BffMenuService} from './services/menu/bff-menu.service';
import {PurefrontMenuService} from './services/menu/purefront-menu.service';
import {environment} from '../environments/environment';
import {provideHttpClient} from '@angular/common/http';

export const BFF_PROVIDES = [
  { provide: MENU_SERVICE, useClass: BffMenuService }
];

export const PUREFRONT_PROVIDES = [
  { provide: MENU_SERVICE, useClass: PurefrontMenuService }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ...(environment.useBff ? BFF_PROVIDES : PUREFRONT_PROVIDES)
  ]
};
