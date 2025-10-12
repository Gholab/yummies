import {BehaviorSubject, Observable, of} from 'rxjs';
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

  resetOrder() {
    this.cart = [];
    this.bipperNumber=0;
    this._cart$.next(this.cart);
  }

  getTotalItemsCount() {
    if(this.cart.length === 0) return 0;

    return this.cart.map(item => Math.trunc(item.howMany)).reduce((total, currentAmount) => {
      return total + currentAmount;
    });
  }

  addMenuItem(item: CartItem): Observable<void> {
    for(let cartItem of this.cart){
      if(cartItem.menuItem._id === item.menuItem._id && (cartItem.howMany - Math.trunc(cartItem.howMany) ) === (item.howMany-Math.trunc(item.howMany)) ){
        cartItem.howMany = this.addKeepingDecimals(cartItem.howMany, Math.trunc(item.howMany));
        console.log("locally incremented already present item: ", this.cart)
        return of();
      }
    }
    this.cart.push(item);
    this._cart$.next(this.cart);
    console.log('Menu item added locally:', item.menuItem._id, this.cart);
    return of();
  }

  /**
   * Returns true if the item was found and deleted, false otherwise
   * @param menuItemId
   */
  removeMenuItem(menuItemId: string): boolean {
    const index = this.cart.findIndex(ci => ci.menuItem._id === menuItemId);
    if (index === -1) {
      console.error(`item with id ${menuItemId} not found in cart`);
      return false;
    }
    if (Math.trunc(this.cart[index].howMany) === 1) {
      const [removedItem] = this.cart.splice(index, 1);
      this._cart$.next(this.cart);
      console.log('Menu item removed locally:', menuItemId, this.cart);
      return true;
    } else {
      this.cart[index].howMany = this.subtractKeepingDecimals(this.cart[index].howMany, 1);
      this._cart$.next(this.cart);
      return true;
    }
  }

  abstract addBipperNumber(bipper: number): void;

  abstract completeOrder(): Observable<void>;

  getTotalOrderPrice(): number {
    return this.cart.reduce((total, item) => total + item.menuItem.price * Math.trunc(item.howMany), 0);
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

  protected addKeepingDecimals(a: number, b: number): number {
    // Convertit le nombre en chaîne pour compter les décimales
    const str = a.toString();
    const decimalPart = str.split('.')[1];
    const decimals = decimalPart ? decimalPart.length : 0;

    // Effectue l’addition, puis arrondit à ce même nombre de décimales
    return Number((a + b).toFixed(decimals));
  }

  protected subtractKeepingDecimals(a: number, b: number): number {
      const str = a.toString();
      const decimalPart = str.split('.')[1];
      const decimals = decimalPart ? decimalPart.length : 0;

      return Number((a - b).toFixed(decimals));
  }
}
