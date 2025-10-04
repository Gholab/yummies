import {Component, Input} from '@angular/core';
import {NumpadComponent} from '../numpad/numpad.component';

@Component({
  selector: 'app-payment-steps-navbar',
  imports: [NumpadComponent],
  standalone: true,
  templateUrl: './payment-steps-navbar.component.html',
  styleUrl: './payment-steps-navbar.component.scss'
})
export class PaymentStepsNavbarComponent {
  public tabs: string[] = ['Bipper', 'Modes de paiement', 'Paiement', "Dégustez"];

  @Input() public currentTabIndex = 0;
}
