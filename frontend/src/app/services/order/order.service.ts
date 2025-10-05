import { Observable } from 'rxjs';
import {PaymentType} from '../../models/payment-type.enum';
import {ModalService} from '../modal.service';
import {PaymentModalComponent} from '../../ui/molecules/payment-modal/payment-modal.component';
import {CartItem} from '../../models/cart-item-model';
// definir le order à partir de plusieurs menu items
export abstract class OrderService {
  protected cart: CartItem[] = [];

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
    return this.cart.reduce((total, item) => total + item.menuItem.price * Math.trunc(item.howMany), 0);
    return 50.88;//TODO: renvoyer le vrai prix du panier
  }

  getCart() {
    return this.cart;
  }

  getBipperId() {
    return this.bipperNumber;
  }
}
