import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-price-display',
  standalone: true,
  templateUrl: './price-display.component.html',
  styleUrl: './price-display.component.scss'
})
export class PriceDisplayComponent {
  @Input() price: number = 0;
  @Input() isSplitPayment: boolean=false;
  @Input() currentPayment = 1;//arbitrary values to fill
  @Input() totalPayments = 5;//arbitrary values to fill
}
