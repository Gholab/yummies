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
    this.http.post<any>(`${this.baseUrl}/create-order`, {}).subscribe({
      next: (data: any) => {
        this.setOrderId(data.id);
      }
    });
    return of();
  }

  override addMenuItem(item: CartItem): Observable<any> {
    super.addMenuItem(item);
    return this.http.post<"">(`${this.baseUrl}/${this.getOrderId()}/add-item`, item);
  }

  override removeMenuItem(menuItemId: string): boolean {
    if (super.removeMenuItem(menuItemId)) {
      this.http.delete<"">(`${this.baseUrl}/${this.getOrderId()}/remove-item/${menuItemId}`).subscribe(() => {});//we need to subscribe to start the DELETE request
      return true;
    }

    return false;
  }

  completeOrder(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${this.getOrderId()}/complete`, {});
  }
  addBipperNumber(bipper: number): void {
    this.bipperNumber = bipper;
    this.http.post<"">(`${this.baseUrl}/${this.getOrderId()}/add-bipper/${bipper}`, {}).subscribe();
  }
}
