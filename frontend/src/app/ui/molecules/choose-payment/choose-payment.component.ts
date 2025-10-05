import { Component, EventEmitter, Output } from '@angular/core';
import {PaymentOptionComponent} from '../../atoms/payment-option/payment-option.component';
import { PaymentType } from '../../../models/payment-type.enum';

@Component({
  selector: 'app-choose-payment',
  imports: [PaymentOptionComponent],
  standalone: true,
  templateUrl: './choose-payment.component.html',
  styleUrl: './choose-payment.component.scss'
})
export class ChoosePaymentComponent {
  @Output() paymentTypeSelected = new EventEmitter<PaymentType>();

  finishPayment() {
    console.log("Finish payment clicked");
  }
  
  onePaymentOptionClick() {
    console.log("One payment option clicked");
    this.paymentTypeSelected.emit(PaymentType.ONE_TIME);
  }
  splitPaymentOptionClick() {
    console.log("Split payment option clicked");
    this.paymentTypeSelected.emit(PaymentType.SPLIT_PAYMENT);
  }
  customSplitPaymentOptionClick() {
    console.log("Custom split payment option clicked");
    this.paymentTypeSelected.emit(PaymentType.CUSTOMIZED_REPARTITION);
  }

}
