import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {MENU_SERVICE} from './services/services.token';
import {ORDER_SERVICE} from './services/services.token';
import {BffMenuService} from './services/menu/bff-menu.service';
import {PurefrontMenuService} from './services/menu/purefront-menu.service';
import {environment} from '../environments/environment';
import {provideHttpClient} from '@angular/common/http';
import { BffOrderService } from './services/order/bff-order.service';
import { PurefrontOrderService } from './services/order/purefront-order.service';

export const BFF_PROVIDES = [
  { provide: MENU_SERVICE, useClass: BffMenuService },
  { provide: ORDER_SERVICE, useClass: BffOrderService }
];

export const PUREFRONT_PROVIDES = [
  { provide: MENU_SERVICE, useClass: PurefrontMenuService },
  { provide: ORDER_SERVICE, useClass: PurefrontOrderService }

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

