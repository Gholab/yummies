import { OrderService } from './order.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import { Observable, of } from 'rxjs';
import { MenuItem } from '../../models/menu-item.model';
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
  private static orderCounter = 1; // pour générer des ids d'ordres uniques
  private baseUrl = "http://localhost:9500/tableOrders";


  createOrder(bipperNumber: number, customersCount: number): Observable<void> {
    //EMPTY FOR PURE FRONT
    return of();
  }


  addMenuItem(item: CartItem): Observable<void> {
    for(let cartItem of this.cart){
      if(cartItem.menuItem._id === item.menuItem._id && JSON.stringify(cartItem.modifications) === JSON.stringify(item.modifications)){
        cartItem.howMany += item.howMany;
        console.log("incremented already present item")
        return of();
      }
    }
    this.cart.push(item);
    console.log('Menu item added locally:', item.menuItem._id, this.cart);
    return of();
  }

  removeMenuItem(index: number): Observable<CartItem | undefined> {
    let optionalSingleItemAsArray=this.cart.splice(index);

    let optionalFoundValue= (optionalSingleItemAsArray.length >= 1) ? optionalSingleItemAsArray[0] : undefined;

    return of(optionalFoundValue);
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
