import { OrderService } from './order.service';
import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ModalService} from '../modal.service';
import {CartItem} from '../../models/cart-item-model';

@Injectable({
  providedIn: "root"
})
export class BffOrderService extends OrderService {

  private baseUrl = "http://localhost:4000/order";
  private orderId: string = "";

  constructor(protected _modalService: ModalService, private http: HttpClient) {
    super(_modalService);
  }

  getOrderId(): string {
    return this.orderId;
  }
  setOrderId(id: string): void {
    this.orderId = id;
  }

  createOrder(): Observable<any> {
    // à changer avec le vrai appel HTTP
    console.log("[FRONTEND, BFF] OrderService: Creating order in BFF"); 
    this.http.post<any>(`${this.baseUrl}`, {}).subscribe({
      next: (data: any) => {
        console.log("[FRONTEND, BFF] OrderService: Order created in BFF, orderId: ", data.id)
        this.setOrderId(data.id);
      }
    });
    return of();
  }

  completeOrder(): Observable<any> {
    console.log("[FRONTEND, BFF] OrderService: Sending cart content to BFF");
    return this.http.post<any>(`${this.baseUrl}/${this.getOrderId()}/complete`, [
      ...this.cart
    ]);
  }
  addBipperNumber(bipper: number): void {
    this.bipperNumber = bipper;
    console.log(`[FRONTEND, BFF] OrderService: Configured bipper (table) number in BFF : ${bipper}`);
    this.http.post<"">(`${this.baseUrl}/${this.getOrderId()}/bipper/${bipper}`, {}).subscribe();
  }
}
