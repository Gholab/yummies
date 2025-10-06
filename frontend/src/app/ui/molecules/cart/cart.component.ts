import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import {TitleComponent} from '../../atoms/title/title.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {CartItem} from '../../../models/cart-item-model';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';
import {Observable} from 'rxjs';

import {Router} from '@angular/router';

const IMG = 'https://cdn.pixabay.com/photo/2022/04/11/08/52/iced-tea-7125271_960_720.jpg';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent, ButtonComponent, CartItemComponent, AsyncPipe]
})


export class CartComponent {

  open = false

  cartItems: CartItem[] = [];

  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService,
              private router : Router) {
    this.orderService.cart$.subscribe(items => this.cartItems = items);
  }

  /*

  constructor(private router: Router, @Inject(ORDER_SERVICE) private orderService: OrderService) {}
  ngOnInit() {

    this.cartItems = this.orderService.getCart();
  }*/
  get total() {
    return this.orderService.getTotalOrderPrice();
  }
  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }

  trackById(index: number, item: CartItem) {
    return item.menuItem._id;
  }

  isPaymentDisabled(){
    return this.orderService.getCart().length <= 0;
  }

  paymentStep(): void {
    if(!this.isPaymentDisabled()){
      this.router.navigate(['/payment']);
    }
  }



}
