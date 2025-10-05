import { Routes } from '@angular/router';
import {MenuComponent} from './ui/pages/menu/menu.component';
import {PaymentComponent} from './ui/pages/payment/payment';
import {LandingPageComponent} from './ui/pages/landing-page-component/landing-page.component';

export const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: "",
    component: LandingPageComponent
  }
];
