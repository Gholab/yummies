import { Component } from '@angular/core';
import {PriceDisplayComponent} from '../../atoms/price-display/price-display.component';
import {ButtonComponent} from '../../atoms/button/button.component';

@Component({
  selector: 'app-payment-modal',
  imports: [PriceDisplayComponent, ButtonComponent],
  standalone: true,
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss'
})
export class PaymentModalComponent {
  public price = 15.48;
  public title = "Diviser en parts égales";
  public escapeButtonText = "Modifier la sélection";
}
