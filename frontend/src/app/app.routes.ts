import { Routes } from '@angular/router';
import {MenuComponent} from './ui/pages/menu/menu.component';
import {PaymentComponent} from './ui/pages/payment/payment';
import {LandingPageComponent} from './ui/pages/landing-page-component/landing-page.component';
import {CheckStatus} from './ui/pages/check-status/check-status';
import {UpdatingStatusComponent} from './ui/pages/updating-status/updating-status.component';

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
  },
  {
    path: "update-status",
    component: UpdatingStatusComponent
  },
  {
    path: "check-status",
    component: CheckStatus
  }
];
