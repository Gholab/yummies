import {Component, Inject, Input, OnInit} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {PaymentItem} from '../payment-item/payment-item.component';
import {CartItem} from '../../../models/cart-item-model';
import {ButtonComponent} from '../../atoms/button/button.component';
import {ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';
import {PaymentType} from '../../../models/payment-type.enum';
import {PaymentService} from '../../../services/payment.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-custom-payment',
  imports: [
    TitleComponent,
    PaymentItem,
    ButtonComponent
  ],
  standalone: true,
  templateUrl: './custom-payment.component.html',
  styleUrl: './custom-payment.component.scss'
})


export class CustomPayment implements OnInit{
  private selectedQuantities: number[] = [];
  totalOrder: CartItem[] = [];

  public quantitySubject: Subject<number> = new Subject();

  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService,
              private paymentService: PaymentService){}

  ngOnInit() {
    this.totalOrder = JSON.parse(JSON.stringify(this.orderService.getCart()));
  }

  onSelectionChange(e: { index: number; quantity: number }) {
    this.selectedQuantities[e.index] = e.quantity;
  }

  get total(): number {
    return this.totalOrder.reduce((sum, line, idx) => {
      const q = this.selectedQuantities[idx] ?? 0;
      return sum + q * line.menuItem.price;
    }, 0);
  }

  paySelectedItems() {
    let selectedItemsCount = this.getSelectedItemsCount();

    let totalItemsCount: number=this.totalOrder.map(item => Math.trunc(item.howMany)).reduce((total, currentAmount) => {
      return total + currentAmount;
    });

    this.paymentService.setCurrentPaymentStep(selectedItemsCount);
    this.paymentService.setTotalPaymentSteps(totalItemsCount);
    this.paymentService.setCustomRepartitionSelectedItemsPrice(this.total);

    this.paymentService.startPayment().then(() => {
      let itemsToKeep: CartItem[] = [];//helps to filter the items that reaches the quantity "0"

      for(let index=0; index < this.totalOrder.length; index++) {
        if(this.selectedQuantities[index]) {
          this.totalOrder[index].howMany-=Math.trunc(this.selectedQuantities[index]);
        }

        if(Math.trunc(this.totalOrder[index].howMany) > 0) {
          itemsToKeep.push(this.totalOrder[index]);
        }
      }

      this.totalOrder=itemsToKeep;
      this.selectedQuantities=[];

      this.resetAllInputs();
    });
  }

  private getSelectedItemsCount() {
    if(this.selectedQuantities.length == 0) return 0;

    let selectedItemsCount = this.selectedQuantities.reduce((total, currentAmount) => {
      if (total == 0) {
        return Math.trunc(currentAmount);
      } else if (currentAmount == undefined) {
        return total;
      } else {
        return Math.trunc(total) + Math.trunc(currentAmount);
      }
    });
    return selectedItemsCount;
  }

  public resetAllInputs() {
    this.quantitySubject.next(0);
  }

  isPaymentDisabled(){
    return this.getSelectedItemsCount() === 0;
  }

  protected readonly onselectionchange = onselectionchange;
}
