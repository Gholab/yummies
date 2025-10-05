import { OrderService } from './order.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {ModalService} from '../modal.service';
import {CartItem} from '../../models/cart-item-model';
import {AddMenuItemDto} from '../../models/add-menu-item-dto.model';

@Injectable({
  providedIn: "root"
})
export class PurefrontOrderService extends OrderService {

  constructor(protected _modalService: ModalService, private http: HttpClient) {
    super(_modalService);
  }
  private baseUrl = "http://localhost:9500/tableOrders";


  createOrder(): Observable<void> {
    //EMPTY FOR PURE FRONT
    console.log("Order created locally");
    return of();
  }

  addMenuItem(item: CartItem): Observable<void> {
    this.cart.push(item);
    console.log('Menu item added locally:', item.menuItem._id, this.cart);
    return of();
  }

  removeMenuItem(menuItemId: string): Observable<CartItem | undefined> {
    const index = this.cart.findIndex(ci => ci.menuItem._id === menuItemId);
    if (index === -1) {
      console.error(`item with id ${menuItemId} not found in cart`);
      return of(undefined);
    }
    const [removedItem] = this.cart.splice(index, 1);
    console.log('Menu item removed locally:', menuItemId, this.cart);
    return of(removedItem);
  }

  addBipperNumber(bipper: number): void {
    this.bipperNumber = bipper;
  }

  completeOrder(): Observable<void> {
    //TODO
    return of();
  }

  // sur cette fonction on dit aussi les personnalisations, par exemple la quantité
  // nom à changer, et modifications à ajouter
  convertCartItemToAddMenuItemDto(menuItem: CartItem, modifications: { [ingredientName: string]: number }, howMany: number): AddMenuItemDto {
    return {
      menuItemId: menuItem.menuItem._id,
      menuItemShortName: JSON.stringify({
        name: menuItem.menuItem.shortName,
        modifications: modifications
      }),
      howMany
    };
  }

}
