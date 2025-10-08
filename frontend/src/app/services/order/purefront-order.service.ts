import { OrderService } from './order.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, concatMap, from, map, Observable, of, toArray} from 'rxjs';
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
  private baseUrl = "http://localhost:9500/dining";


  createOrder(): Observable<void> {
    //EMPTY FOR PURE FRONT
    this.bipperNumber=0;
    console.log("Order created locally");
    return of();
  }

  addBipperNumber(bipper: number): void {
    this.bipperNumber = bipper;
  }

  completeOrder(): Observable<void> {
    return this.http.post(`${this.baseUrl}/tableOrders`, {
      tableNumber: this.bipperNumber,
      customersCount: 1
    }).pipe(
      concatMap((res: any) => {
        const tableOrderId = res._id;

        return from(this.cart).pipe(
          concatMap(cartItem =>
            this.http.post(`${this.baseUrl}/tableOrders/${tableOrderId}`, {
              menuItemId: cartItem.menuItem._id,
              menuItemShortName: cartItem.menuItem.shortName,
              howMany: (cartItem.howMany>1 ? this.subtractKeepingDecimals(cartItem.howMany, 1) : 1)  //ensures the right amount of items is sent to preparation
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
