import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {CardItemComponent} from '../cardItem/cardItem.component';
import {NumberSelectorComponent} from '../../atoms/number-selector/number-selector.component';
import {CartItem} from '../../../models/cart-item-model';
import { Observable } from "rxjs";

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
  @Input() quantity$?: Observable<number>;

  ngOnInit() {
    this.quantity$?.subscribe(value => {
      this.chosenQuantity = value;
    });
  }

  getNumberRemaining(){
    return Math.trunc(this.item.howMany - this.chosenQuantity);
  }

  onQuantityChange(val: number) {
    this.chosenQuantity = val;
    this.selectionChange.emit({ index: this.index, quantity: val });
  }
}
