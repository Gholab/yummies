import { OrderService } from './order.service';
import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import {map, Observable} from 'rxjs';
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
  createOrder(bipperNumber: number, customersCount: number): Observable<any> {
    const id = `order-${BffOrderService.orderCounter++}`;
    return this.http.get<Order>(`${this.baseUrl}/${id}/create-order?bipperNumber=${bipperNumber}&customersCount=${customersCount}`);

  }

  getOrderId(): string {
    return `order-${BffOrderService.orderCounter - 1}`;
  }

  addMenuItem(item: CartItem): Observable<any> {
    return this.http.post<Order>(`${this.baseUrl}/${this.getOrderId()}/add-item`, item);
  }

  removeMenuItem(index: number): Observable<any> {
    return this.http.delete<Order>(`${this.baseUrl}/${this.getOrderId()}/remove-item/${index}`);
  }

  completeOrder(): Observable<any> {
    return this.http.get<Order>(`${this.baseUrl}/${this.getOrderId()}/complete`);
  }
}
