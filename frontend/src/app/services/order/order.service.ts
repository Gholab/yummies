import {BehaviorSubject, Observable} from 'rxjs';
import {PaymentType} from '../../models/payment-type.enum';
import {ModalService} from '../modal.service';
import {PaymentModalComponent} from '../../ui/molecules/payment-modal/payment-modal.component';
import {CartItem} from '../../models/cart-item-model';
// definir le order à partir de plusieurs menu items
export abstract class OrderService {
  protected cart: CartItem[] = [];
  private readonly _cart$ = new BehaviorSubject<CartItem[]>(this.cart);


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

  get cart$(): Observable<CartItem[]> {
    return this._cart$.asObservable();
  }

  protected notifyCartChange(): void {
    this._cart$.next([...this.cart]); // on envoie une copie pour forcer la détection
  }


  getBipperId() {
    return this.bipperNumber;
  }

}
