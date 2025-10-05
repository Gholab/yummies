import { OrderService } from './order.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import {concatMap, from, map, Observable, of, toArray} from 'rxjs';
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
  private baseUrl = "http://localhost:9500/dining";


  createOrder(bipperNumber: number, customersCount: number): Observable<void> {
    //EMPTY FOR PURE FRONT
    return of();
  }


  addMenuItem(item: CartItem): Observable<void> {
    for(let cartItem of this.cart){
      if(cartItem.menuItem._id === item.menuItem._id && (cartItem.howMany - Math.trunc(cartItem.howMany) ) === (item.howMany-Math.trunc(item.howMany)) ){
        cartItem.howMany = this.addKeepingDecimals(cartItem.howMany, Math.trunc(item.howMany));
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

  addKeepingDecimals(a: number, b: number): number {
    // Convertit le nombre en chaîne pour compter les décimales
    const str = a.toString();
    const decimalPart = str.split('.')[1];
    const decimals = decimalPart ? decimalPart.length : 0;

    // Effectue l’addition, puis arrondit à ce même nombre de décimales
    return Number((a + b).toFixed(decimals));
  }

  completeOrder(): Observable<void> {
    return this.http.post(`${this.baseUrl}/tableOrders`, {
      tableNumber: 2, // this.bipperId
      customersCount: 1
    }).pipe(
      concatMap((res: any) => {
        const tableOrderId = res._id;

        return from(this.cart).pipe(
          concatMap(cartItem =>
            this.http.post(`${this.baseUrl}/tableOrders/${tableOrderId}`, {
              menuItemId: cartItem.menuItem._id,
              menuItemShortName: cartItem.menuItem.shortName,
              howMany: this.subtractKeepingDecimals(cartItem.howMany, 1) //ensures the right amount of items is sent to preparation
            })
          ),
          toArray(), //permet d'attendre que tous les appels soient finis
          concatMap(() =>
            // Étape 3 : lancer la préparation
            this.http.post(`${this.baseUrl}/tableOrders/${tableOrderId}/prepare`, {})
          ),
          concatMap(() =>
            // Étape 4 : lancer la facturation
            this.http.post(`${this.baseUrl}/tableOrders/${tableOrderId}/bill`, {})
          ),
          map(() => void 0) // pour renvoyer un Observable<void>
        );
      })
    );
  }

  private subtractKeepingDecimals(a: number, b: number): number {
    const str = a.toString();
    const decimalPart = str.split('.')[1];
    const decimals = decimalPart ? decimalPart.length : 0;

    return Number((a - b).toFixed(decimals));
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
