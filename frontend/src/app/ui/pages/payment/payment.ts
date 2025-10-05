import { Component } from '@angular/core';
import {PaymentStepsNavbarComponent} from '../../molecules/payment-steps-navbar/payment-steps-navbar.component';

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

}
