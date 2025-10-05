import {Component, Input} from '@angular/core';
import {NumpadComponent} from '../numpad/numpad.component';
import {TitleComponent} from '../../atoms/title/title.component';
import {ChoosePaymentComponent} from '../choose-payment/choose-payment.component';
import {CustomPayment} from '../custom-payment/custom-payment.component';

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
  public tabs: PaymentTab[] = [
    { title: 'Préparez votre bipper', section: 'Bipper' },
    { title: 'Choisissez un mode de paiement', section: 'Modes de paiement' },
    { title: 'Répartition customisée', section: 'Paiement' },
    { title: 'Dégustez votre commande', section: 'Dégustez' },
  ];
  @Input() public currentTabIndex = 0;
  protected readonly print = print;


}
