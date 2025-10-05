import { Observable } from 'rxjs';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import {PaymentType} from '../../models/payment-type.enum';
import {ModalService} from '../modal.service';
import {PaymentModalComponent} from '../../ui/molecules/payment-modal/payment-modal.component';
// definir le order à partir de plusieurs menu items
export abstract class OrderService {
  abstract createOrder(tableNumber: number, customersCount: number): Observable<Order>;
  abstract addMenuItem(orderItem: OrderItem): Observable<Order>;
  abstract removeMenuItem(itemIndex: number): Observable<Order>;
  abstract completeOrder(): Observable<Order>;

  private paymentType: PaymentType = PaymentType.ONE_TIME;//arbitrary value

  private totalAmountPaid: number=0;

  private currentPaymentStep: number=1;//soit le numéro actuel du paiement ("paiement 1 sur 5"), soit le nombre de produits réglés du panier ("3 produits sur 9")
  private totalPaymentSteps: number=1;

  constructor(protected modalService: ModalService) {}

  getTotalOrderPrice(): number {
    //METHODE VIDE POUR L'INSTANT MAIS IL FAUDRA BIEN LUI FAIRE CALCULER LE VRAI PRIX DU PANIER
    return 50.88;//TODO: renvoyer le vrai prix du panier
  }

  /**
   * Appelée quand on paye en "répartition customisée" ou "division égale" pour savoir si il faut continuer de faire payer les gens
   */
  isOrderFullyPaid(): boolean {
    //TODO : il est possible que cette logique ne soit pas suffisante.
    //TODO (peut être): pour la répartition customisée, vérifier que le panier ne contient plus d'items à payer ???
    return this.getTotalOrderPrice() <= this.totalAmountPaid;
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
      return this.getTotalOrderPrice() / this.totalPaymentSteps;// = "divise le prix total par le nombre de gens qui payent"
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
    });
  }
}
