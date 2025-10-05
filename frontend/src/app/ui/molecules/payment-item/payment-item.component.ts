import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardItemComponent} from '../cardItem/cardItem.component';
import {NumberSelectorComponent} from '../../atoms/number-selector/number-selector.component';
import {CartItem} from '../../../models/cart-item-model';

@Component({
  selector: 'app-payment-item',
  imports: [
    CardItemComponent,
    NumberSelectorComponent
  ],
  templateUrl: './payment-item.component.html',
  standalone: true,
  styleUrl: './payment-item.component.scss',
  host: { '[class.has-quantity]': 'chosenQuantity > 0'}
})

export class PaymentItem {

  @Input() item!: CartItem ;
  chosenQuantity = 0;
  @Input() index! : number;
  @Output() selectionChange = new EventEmitter<{ index: number; quantity: number }>();

  getNumberRemaining(){
    return this.item.howMany - this.chosenQuantity;
  }

  onQuantityChange(val: number) {
    this.chosenQuantity = val;
    this.selectionChange.emit({ index: this.index, quantity: val });
  }

}
