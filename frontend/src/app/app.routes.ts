import { Routes } from '@angular/router';
import {MenuComponent} from './ui/pages/menu/menu.component';
import {LandingPageComponent} from './ui/molecules/landing-page-component/landing-page.component';
import {PaymentComponent} from './ui/pages/payment/payment';

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
