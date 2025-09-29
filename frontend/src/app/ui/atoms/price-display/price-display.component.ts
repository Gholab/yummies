import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-price-display',
  standalone: true,
  templateUrl: './price-display.component.html',
  styleUrl: './price-display.component.scss'
})
export class PriceDisplayComponent {
  @Input() price: number = 0;
}
