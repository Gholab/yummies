import {InjectionToken} from '@angular/core';
import {MenuService} from './menu/menu.service';

export const MENU_SERVICE = new InjectionToken<MenuService>('MENU_SERVICE');
