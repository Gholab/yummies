import { Component } from '@angular/core';
import {PaymentStepsNavbarComponent} from '../../molecules/payment-steps-navbar/payment-steps-navbar.component';
import {CustomPayment} from '../../molecules/custom-payment/custom-payment.component';
import {ChoosePaymentComponent} from '../../molecules/choose-payment/choose-payment.component';
import {NumpadComponent} from '../../molecules/numpad/numpad.component';

@Component({
  selector: 'app-payment',
  imports: [
    PaymentStepsNavbarComponent
  ],
  templateUrl: './payment.html',
  standalone: true,
  styleUrl: './payment.scss'
})
export class PaymentComponent {

  tabs = [
    { title: 'Préparez votre bipper', section: 'Bipper', component: NumpadComponent },
    { title: 'Choisissez un mode de paiement', section: 'Modes de paiement', component: ChoosePaymentComponent },
    { title: 'Répartition customisée', section: 'Paiement', component: CustomPayment }
  ];

}
