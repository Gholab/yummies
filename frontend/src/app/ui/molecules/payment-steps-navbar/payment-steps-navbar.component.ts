import {Component, Input} from '@angular/core';
import {NumpadComponent} from '../numpad/numpad.component';
import {TitleComponent} from '../../atoms/title/title.component';
import {ChoosePaymentComponent} from '../choose-payment/choose-payment.component';
import {CustomPayment} from '../custom-payment/custom-payment.component';
import { PaymentType } from '../../../models/payment-type.enum';

type PaymentTab = {
  /** Titre affiché au-dessus de la nav bar pour l’étape courante */
  title: string;
  /** Libellé affiché dans la nav bar */
  section: string;
};

@Component({
  selector: 'app-payment-steps-navbar',
  imports: [NumpadComponent, TitleComponent, ChoosePaymentComponent, CustomPayment],
  standalone: true,
  templateUrl: './payment-steps-navbar.component.html',
  styleUrl: './payment-steps-navbar.component.scss'
})
export class PaymentStepsNavbarComponent {
  public selectedPaymentType: PaymentType | null = null;
  public tabs: PaymentTab[] = [
    { title: 'Préparez votre bipper', section: 'Bipper' },
    { title: 'Choisissez un mode de paiement', section: 'Modes de paiement' },
    { title: 'Répartition customisée', section: 'Paiement' },
  ];
  @Input() public currentTabIndex = 0;
  protected readonly print = print;

  goToNextStep() {
    this.currentTabIndex++;
  }

  goBackOneStep() {
    this.currentTabIndex--;
  }

  onPaymentTypeSelected(paymentType: PaymentType) {
    this.selectedPaymentType = paymentType;
    console.log('Selected payment type:', this.selectedPaymentType);
    this.goToNextStep();
  }

}
