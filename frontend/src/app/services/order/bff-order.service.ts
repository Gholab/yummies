import { OrderService } from './order.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BffOrderService extends OrderService {
  private static orderCounter = 1; // pour générer des ids d'ordres uniques
  private baseUrl = "http://localhost:9500/order"; 


  constructor(private http: HttpClient) {
    super();
  }
  createOrder(bipperNumber: number, customersCount: number): Observable<Order> {
    const id = `order-${BffOrderService.orderCounter++}`;
    return this.http.get<Order>(`${this.baseUrl}/${id}/create-order?bipperNumber=${bipperNumber}&customersCount=${customersCount}`);
  }
  getOrderId(): string {
    return `order-${BffOrderService.orderCounter - 1}`;
  }

  addMenuItem(item: OrderItem): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/${this.getOrderId()}/add-item`, item);
  }
  removeMenuItem(menuItemId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.baseUrl}/${this.getOrderId()}/remove-item/${menuItemId}`);
  }
  completeOrder(): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${this.getOrderId()}/complete`);
  }
}
