import { Observable } from 'rxjs';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import {PaymentType} from '../../models/payment-type.enum';
import {ModalService} from '../modal.service';
import {PaymentModalComponent} from '../../ui/molecules/payment-modal/payment-modal.component';
import {CartItem} from '../../models/cart-item-model';
// definir le order à partir de plusieurs menu items
export abstract class OrderService {
  abstract createOrder(tableNumber: number, customersCount: number): Observable<void>;
  abstract addMenuItem(orderItem: CartItem): Observable<void>;

  /**
   * Returns the removed item, if it was found. undefined otherwise
   * @param index
   */
  abstract removeMenuItem(index: number): Observable<CartItem | undefined>;
  abstract completeOrder(): Observable<void>;

  protected cart: CartItem[] = [];

  constructor(protected modalService: ModalService) {}

  getTotalOrderPrice(): number {
    //METHODE VIDE POUR L'INSTANT MAIS IL FAUDRA BIEN LUI FAIRE CALCULER LE VRAI PRIX DU PANIER
    return 50.88;//TODO: renvoyer le vrai prix du panier
  }

  getCart() {
    return this.cart;
  }

}
