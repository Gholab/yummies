import { Component } from '@angular/core';
import {PaymentOptionComponent} from '../../atoms/payment-option/payment-option.component';

@Component({
  selector: 'app-choose-payment',
  imports: [PaymentOptionComponent],
  standalone: true,
  templateUrl: './choose-payment.component.html',
  styleUrl: './choose-payment.component.scss'
})
export class ChoosePaymentComponent {

}
