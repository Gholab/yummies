import { OrderService } from './order.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PurefrontOrderService extends OrderService {

  constructor(private http: HttpClient) {
    super();
  }
  private static orderCounter = 1; // pour générer des ids d'ordres uniques
  private baseUrl = "http://localhost:9500/tableOrders";
  private order?: Order; // l'ordre en cours


  createOrder(tableNumber: number, customersCount: number): Observable<Order> {
    const id = `order-${PurefrontOrderService.orderCounter++}`;
    this.order = {
      _id: id,
      tableNumber,
      customersCount,
      opened: '',
      lines: [] as {
        item: { _id: '', shortName: '' },
        howMany: 0,
        sentForPreparation: false
      }[],
      preparations: [{
        _id: '',
        shouldBeReadyAt: '',
        preparedItems: [{ _id: '', shortName: '' }]
      }],
      billed: '',
    };
    console.log('order created loccally:', this.order._id, this.order);
    return of(this.order);
  }

  addMenuItem(item: OrderItem): Observable<Order> {
    if (!this.order) {
      throw new Error('Order not created yet. Call createOrder() first.');
    }
    const line = {
      item: {
        _id: item.menuItemId,
        shortName: item.menuItemShortName.name // modifications are ignored here  
      },
      howMany: item.howMany,
      sentForPreparation: false
    };
    this.order.lines.push(line);
    console.log('Menu item added locally:', item.menuItemId, this.order);
    return of(this.order);
  }
  removeMenuItem(id: string): Observable<Order> {
    if (!this.order) {
      throw new Error('Order not created yet. Call createOrder() first.');
    }
    this.order.lines = this.order.lines.filter(line => line.item._id !== id);
    console.log('Menu item removed locally:', id, this.order);
    return of(this.order);
  }
  completeOrder(): Observable<Order> {
    if (!this.order) {
      throw new Error('Order not created yet. Call createOrder() first.');
    }
    console.log('Order completed locally:', this.order._id, this.order);
    return of(this.order);
    
  }

}
