import {Component, Input} from '@angular/core';
import {CardItemComponent} from '../cardItem/cardItem.component';
import {NumberSelectorComponent} from '../../atoms/number-selector/number-selector.component';

@Component({
  selector: 'app-payment-item.component',
  imports: [
    CardItemComponent,
    NumberSelectorComponent
  ],
  templateUrl: './payment-item.component.html',
  standalone: true,
  styleUrl: './payment-item.component.scss'
})

export class PaymentItem {

  @Input() item: CartItem;
}
