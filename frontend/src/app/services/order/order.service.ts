import { Observable } from 'rxjs';
import {PaymentType} from '../../models/payment-type.enum';
import {ModalService} from '../modal.service';
import {PaymentModalComponent} from '../../ui/molecules/payment-modal/payment-modal.component';
import {CartItem} from '../../models/cart-item-model';
// definir le order à partir de plusieurs menu items
export abstract class OrderService {
  protected cart: CartItem[] = [];

  private paymentType: PaymentType = PaymentType.ONE_TIME;//arbitrary value

  private totalAmountPaid: number=0;

  private currentPaymentStep: number=1;//soit le numéro actuel du paiement ("paiement 1 sur 5"), soit le nombre de produits réglés du panier ("3 produits sur 9")
  private totalPaymentSteps: number=1;
  
  protected bipperNumber = 0;
  protected customerCount = 1;

  constructor(protected modalService: ModalService) {}


  abstract createOrder(): Observable<void>;
  abstract addMenuItem(orderItem: CartItem): Observable<void>;

  /**
   * Returns the removed item, if it was found. undefined otherwise
   * @param menuItemId
   */
  abstract removeMenuItem(menuItemId: string): Observable<CartItem | undefined>;

  abstract addBipperNumber(bipper: number): void;

  abstract completeOrder(): Observable<void>;

  getTotalOrderPrice(): number {
    return this.cart.reduce((total, item) => total + item.menuItem.price * item.howMany, 0);
    return 50.88;//TODO: renvoyer le vrai prix du panier
  }

  getCart() {
    return this.cart;
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
