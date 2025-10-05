import {Component, Input} from '@angular/core';
import {PriceDisplayComponent} from '../../atoms/price-display/price-display.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {PaymentType} from '../../../models/payment-type.enum';

@Component({
  selector: 'app-payment-modal',
  imports: [PriceDisplayComponent, ButtonComponent],
  standalone: true,
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss'
})
export class PaymentModalComponent {
  @Input() public price = 9;

  @Input() public paymentType: PaymentType = PaymentType.ONE_TIME;

  /**
   * currentPaymentStep = soit le numéro actuel du paiement ("paiement 1 sur 5"), soit le nombre de produits réglés du panier ("3 produits sur 9")
   */
  @Input() public currentPaymentStep=5;
  @Input() public totalPaymentSteps=9;

  public isSplitPayment() {
    return this.paymentType === PaymentType.SPLIT_PAYMENT;
  }

  public isCustomizedRepartition() {
    return this.paymentType === PaymentType.CUSTOMIZED_REPARTITION;
  }

  public getTitle(): string {
    switch(this.paymentType) {
      case PaymentType.CUSTOMIZED_REPARTITION:
        return 'Répartition personnalisée';
      case PaymentType.SPLIT_PAYMENT:
        return "Diviser en parts égales";
      case PaymentType.ONE_TIME:
        return "Paiement en une fois";
    }
  }

  public getEscapeButtonText(): string {
    switch(this.paymentType) {
      case PaymentType.CUSTOMIZED_REPARTITION:
        return 'Modifier la sélection';
      case PaymentType.SPLIT_PAYMENT:
      case PaymentType.ONE_TIME:
        return "Changer de mode de paiement";
    }
  }
}
