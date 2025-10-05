import {ChangeDetectionStrategy, Component, HostListener, Inject} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {CartItem} from '../../../models/cart-item-model';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {MENU_SERVICE, ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';
import {MenuService} from '../../../services/menu/menu.service';
import {MenuItem} from '../../../models/menu-item.model';

const IMG = 'https://cdn.pixabay.com/photo/2022/04/11/08/52/iced-tea-7125271_960_720.jpg';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent, ButtonComponent, CartItemComponent]
})

export class CartComponent {
  open = false;

  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService) {}

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }
  trackById(index: number, item: CartItem) {
    return item.menuItem._id;
  }

  cartItems: CartItem[] = [];

  ngOnInit() {
    this.cartItems=this.orderService.getCart();
  }
}
