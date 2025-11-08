import { Routes } from '@angular/router';
import {MenuComponent} from './ui/pages/menu/menu.component';
import {PaymentComponent} from './ui/pages/payment/payment';
import {LandingPageComponent} from './ui/pages/landing-page-component/landing-page.component';
import {CheckStatus} from './ui/pages/check-status/check-status';
import {UpdatingStatusComponent} from './ui/pages/updating-status/updating-status.component';
import {Endpage} from './ui/pages/endpage/endpage';
import {CashEndpage} from './ui/pages/cash-endpage/cash-endpage.component';
import {GroupMenuComponent} from './ui/pages/group-menu/group-menu.component';
import {ChooseTypeComponent} from './ui/pages/choose-type/choose-type.component';
import {CreateReservation} from './ui/pages/create-reservation/create-reservation';
import {ReservationList} from './ui/pages/reservation-list/reservation-list';

export const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'menu/group',
    component: GroupMenuComponent
  },
  {
    path: "chooseType",
    component: ChooseTypeComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'endPage',
    component: Endpage
  },
  {
    path: 'cashEndPage',
    component: CashEndpage
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
  },
  {
    path: "reservation/new",
    component: CreateReservation

  },
  {
    path: "reservations",
    component: ReservationList
  }
];
