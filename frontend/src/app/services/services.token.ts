import {InjectionToken} from '@angular/core';
import {MenuService} from './menu/menu.service';
import { OrderService } from './order/order.service';

export const MENU_SERVICE = new InjectionToken<MenuService>('MENU_SERVICE');
export const ORDER_SERVICE = new InjectionToken<OrderService>('ORDER_SERVICE');
