import {Component, Inject, Input} from '@angular/core';
import {CardItemComponent} from '../cardItem/cardItem.component';
import {CartItem} from '../../../models/cart-item-model';
import { OrderService } from '../../../services/order/order.service';
import { ORDER_SERVICE } from '../../../services/services.token';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item! : CartItem;
  protected readonly Math = Math;
  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService) {
  }
  ngOnInit() {

  }
  removeItem(){
    // remove using id in cart
    this.orderService.removeMenuItem(this.item.menuItem._id);
  }
}
