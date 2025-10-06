import {Component, Inject, Input, SimpleChanges} from '@angular/core';
import {ButtonComponent} from '../../atoms/button/button.component';
import {NumberSelectorComponent} from '../../atoms/number-selector/number-selector.component';
import {ModalService} from '../../../services/modal.service';
import {ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';
import { PaymentType } from "../../../models/payment-type.enum";
import {PaymentService} from '../../../services/payment.service';

@Component({
  selector: 'app-choose-number-of-parts-equal-division',
  imports: [ButtonComponent, NumberSelectorComponent],
  templateUrl: './choose-number-of-parts-equal-division.component.html',
  styleUrl: './choose-number-of-parts-equal-division.component.scss'
})
export class ChooseNumberOfPartsEqualDivisionComponent {
  public totalPrice: number = 588.99;
  public singlePartPrice: number = 588.99;
  public numberOfParts: number = 1;

  constructor(private modalService: ModalService,
              @Inject(ORDER_SERVICE) private orderService: OrderService,
              private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.totalPrice=this.orderService.getTotalOrderPrice();
    this.updatePartsPrice();
  }

  public onNumberOfPartsChange(parts: number) {
    this.numberOfParts=parts;
    this.updatePartsPrice();
  }

  private updatePartsPrice() {
    if(this.numberOfParts == 1) {
      this.singlePartPrice=this.totalPrice;
    }
    else {
      this.singlePartPrice = this.totalPrice / this.numberOfParts;
    }
  }

  public startPayment() {
    this.paymentService.setCurrentPaymentStep(1);
    this.modalService.close();
    this.paymentService.startPayment();
  }

  public closeModal() {
    this.modalService.close();
  }
}
