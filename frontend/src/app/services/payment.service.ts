import {Inject, Injectable} from '@angular/core';
import {PaymentType} from '../models/payment-type.enum';
import {ORDER_SERVICE} from './services.token';
import {ModalService} from './modal.service';
import {OrderService} from './order/order.service';
import {PaymentModalComponent} from '../ui/molecules/payment-modal/payment-modal.component';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private paymentType: PaymentType = PaymentType.ONE_TIME;//arbitrary value

  private totalAmountPaid: number=0;

  private currentPaymentStep: number=1;//soit le numéro actuel du paiement ("paiement 1 sur 5"), soit le nombre de produits réglés du panier ("3 produits sur 9")
  private totalPaymentSteps: number=1;

  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService,
              private modalService: ModalService) {}

  /**
   * Appelée quand on paye en "répartition customisée" ou "division égale" pour savoir si il faut continuer de faire payer les gens
   */
  isOrderFullyPaid(): boolean {
    //TODO : il est possible que cette logique ne soit pas suffisante.
    //TODO (peut être): pour la répartition customisée, vérifier que le panier ne contient plus d'items à payer ???
    return this.orderService.getTotalOrderPrice() <= this.totalAmountPaid;
  }

  getPaymentType() {
    return this.paymentType;
  }

  setPaymentType(paymentType: PaymentType) {
    this.paymentType=paymentType;
  }

  setCurrentPaymentStep(step: number) {
    this.currentPaymentStep=step;
  }

  setTotalPaymentSteps(step: number) {
    this.totalPaymentSteps=step;
  }

  getPriceToPay(): number {
    if(this.paymentType === PaymentType.SPLIT_PAYMENT) {
      return this.orderService.getTotalOrderPrice() / this.totalPaymentSteps;// = "divise le prix total par le nombre de gens qui payent"
    }
    else {
      //TODO: calculate the price that needs to be paid
      return 5;
    }
  }

  startPayment() {
    this.modalService.open(PaymentModalComponent, {
      price: this.getPriceToPay(),
      paymentType: this.getPaymentType(),
      currentPaymentStep: this.currentPaymentStep,
      totalPaymentSteps: this.totalPaymentSteps
    }, false);
  }

  waitForPayment(){
    return new Promise(resolve => setTimeout(resolve, 3000));
  }
}
