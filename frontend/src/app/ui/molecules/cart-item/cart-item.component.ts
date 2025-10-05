import {Component, Input} from '@angular/core';
import {CardItemComponent} from '../cardItem/cardItem.component';
import {CartItem} from '../../../models/cart-item-model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item! : CartItem;
}
