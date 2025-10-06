import {AfterViewInit, Component, Inject, Input} from '@angular/core';
import {PriceDisplayComponent} from '../../atoms/price-display/price-display.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {PaymentType} from '../../../models/payment-type.enum';
import {ModalService} from '../../../services/modal.service';
import {PaymentService} from '../../../services/payment.service';
import {Router} from '@angular/router';
import {ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';

@Component({
  selector: 'app-payment-modal',
  imports: [PriceDisplayComponent, ButtonComponent],
  standalone: true,
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss'
})
export class PaymentModalComponent implements AfterViewInit{
  @Input() public price = 9;

  @Input() public paymentType: PaymentType = PaymentType.ONE_TIME;

  /**
   * currentPaymentStep = soit le numéro actuel du paiement ("paiement 1 sur 5"), soit le nombre de produits réglés du panier ("3 produits sur 9")
   */
  @Input() public currentPaymentStep=5;
  @Input() public totalPaymentSteps=9;

  constructor(private modalService: ModalService,
              private paymentService: PaymentService,
              private router: Router,
              @Inject(ORDER_SERVICE) private orderService: OrderService) {
  }

  async ngAfterViewInit(){
    switch(this.paymentType){
      case PaymentType.ONE_TIME:
        await this.paymentService.waitForPayment();
        this.orderService.completeOrder().subscribe(() => {
          this.modalService.close(true)
          this.router.navigate(['/endPage']);

        })
        break;
      case PaymentType.SPLIT_PAYMENT:
        await this.handleUniformSplit();
        break;
      case PaymentType.CUSTOMIZED_REPARTITION:
        await this.paymentService.waitForPayment();
        this.modalService.close(true);

        if (this.paymentService.isOrderFullyPaid()) {
          this.router.navigate(['/endPage']);
        }

        break;
    }
  }

  private async handleUniformSplit(){
    for(;this.currentPaymentStep<=this.totalPaymentSteps; this.currentPaymentStep++){
      await this.paymentService.waitForPayment();
    }
    this.orderService.completeOrder().subscribe(() => {
      this.modalService.close(true)
      this.router.navigate(['/endPage']);
    })

  }

  public isSplitPayment() {
    return this.paymentType === PaymentType.SPLIT_PAYMENT;
  }

  public isCustomizedRepartition() {
    return this.paymentType === PaymentType.CUSTOMIZED_REPARTITION;
  }

  public shouldDisplayCloseButton(){
    if(this.paymentType === PaymentType.ONE_TIME){
      return true;
    }
    return this.currentPaymentStep === 1;
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

  public closeModal() {
    this.modalService.close(false);
  }
}
