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
    console.log("Creating order in bff")
    this.http.post<any>(`${this.baseUrl}`, {}).subscribe({
      next: (data: any) => {
        console.log("Order created in BFF, orderId: ", data.id)
        this.setOrderId(data.id);
      }
    });
    return of();
  }

  completeOrder(): Observable<any> {
    console.log("Complete order and send cart content to BFF")
    return this.http.post<any>(`${this.baseUrl}/${this.getOrderId()}/complete`, [
      ...this.cart
    ]);
  }
  addBipperNumber(bipper: number): void {
    this.bipperNumber = bipper;
    console.log("sending bipper Id to BFF")
    this.http.post<"">(`${this.baseUrl}/${this.getOrderId()}/bipper/${bipper}`, {}).subscribe();
  }
}
