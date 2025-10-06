import {Component, Inject, Input, OnInit} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {PaymentItem} from '../payment-item/payment-item.component';
import {CartItem} from '../../../models/cart-item-model';
import {ButtonComponent} from '../../atoms/button/button.component';
import {ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';

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

  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService){}

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



  protected readonly onselectionchange = onselectionchange;
}
