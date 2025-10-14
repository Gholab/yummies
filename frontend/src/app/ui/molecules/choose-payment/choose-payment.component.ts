import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {PaymentOptionComponent} from '../../atoms/payment-option/payment-option.component';
import {PaymentType} from '../../../models/payment-type.enum';
import {Router} from '@angular/router';
import {ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';
import {PaymentService} from '../../../services/payment.service';
import {ModalService} from '../../../services/modal.service';
import {PaymentModalComponent} from '../payment-modal/payment-modal.component';
import {
  ChooseNumberOfPartsEqualDivisionComponent
} from '../choose-number-of-parts-equal-division/choose-number-of-parts-equal-division.component';

@Component({
  selector: 'app-choose-payment',
  imports: [PaymentOptionComponent],
  standalone: true,
  templateUrl: './choose-payment.component.html',
  styleUrl: './choose-payment.component.scss'
})
export class ChoosePaymentComponent {

  constructor(private router: Router,
              @Inject(ORDER_SERVICE) private orderService: OrderService,
              private paymentService : PaymentService,
              private modalService : ModalService) {
  }
  @Output() nextStep = new EventEmitter<void>();

  finishPayment() {
    console.log("Finish payment clicked");
    this.orderService.completeOrder().subscribe(() => {
      this.router.navigate(['/cashEndPage']);
    })
  }

  onePaymentOptionClick() {
    console.log('[Frontend] ChoosePaymentComponent: One payment option clicked');
    this.paymentService.setPaymentType(PaymentType.ONE_TIME);
    this.modalService.open(PaymentModalComponent, {
      price: this.orderService.getTotalOrderPrice(),
      paymentType: this.paymentService.getPaymentType()
    })
  }
  splitPaymentOptionClick() {
    console.log('[Frontend] ChoosePaymentComponent: Split payment option clicked');
    this.paymentService.setPaymentType(PaymentType.SPLIT_PAYMENT);
    this.modalService.open(ChooseNumberOfPartsEqualDivisionComponent, {}, false);
  }

  customSplitPaymentOptionClick() {
    console.log('[Frontend] ChoosePaymentComponent: Custom split payment option clicked');
    this.paymentService.setPaymentType(PaymentType.CUSTOMIZED_REPARTITION);
    this.paymentService.setTotalPaymentSteps(this.computeTotalItemsCount());
    this.nextStep.emit();
  }

  computeTotalItemsCount(): number {
    let totalItemsCount=0;
    for(let item of this.orderService.getCart()) {
      totalItemsCount+=Math.trunc(item.howMany);
    }

    return totalItemsCount;
  }
}
