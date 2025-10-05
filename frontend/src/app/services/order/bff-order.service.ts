import { OrderService } from './order.service';
import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalService} from '../modal.service';
import {CartItem} from '../../models/cart-item-model';

@Injectable({
  providedIn: "root"
})
export class BffOrderService extends OrderService {
  
  private static orderCounter = 1; // pour générer des ids d'ordres uniques
  private baseUrl = "http://localhost:9500/order";


  constructor(protected _modalService: ModalService, private http: HttpClient) {
    super(_modalService);
  }
  createOrder(): Observable<any> {
    const id = `order-${BffOrderService.orderCounter++}`;
    // à changer avec le vrai appel HTTP
    return this.http.get<"">(`${this.baseUrl}/${id}/create-order`);

  }

  getOrderId(): string {
    return `order-${BffOrderService.orderCounter - 1}`;
  }

  addMenuItem(item: CartItem): Observable<any> {
        // à changer avec le vrai appel HTTP

    return this.http.post<"">(`${this.baseUrl}/${this.getOrderId()}/add-item`, item);
  }

  removeMenuItem(menuItemId: string): Observable<any> {
        // à changer avec le vrai appel HTTP

    return this.http.delete<"">(`${this.baseUrl}/${this.getOrderId()}/remove-item/${menuItemId}`);
  }

  completeOrder(): Observable<any> {
        // à changer avec le vrai appel HTTP

    return this.http.get<"">(`${this.baseUrl}/${this.getOrderId()}/complete`);
  }
  override addBipperNumber(bipper: number): void {
    this.bipperNumber = bipper;
    // TODO APRES
  }
}
