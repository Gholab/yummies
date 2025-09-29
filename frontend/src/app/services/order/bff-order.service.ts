import { OrderService } from './order.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: "root"
})
export class BffOrderService extends OrderService {
  private static orderCounter = 1; // pour générer des ids d'ordres uniques
  private baseUrl = "http://localhost:9500/order"; // je ne sais pas d'ou elle sort cette url
  private order?: Order; // l'ordre en cours

  constructor(private http: HttpClient) {
    super();
  }
  createOrder(tableNumber: number, customersCount: number): void {
    const id = `order-${BffOrderService.orderCounter++}`;
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
  }

  addMenuItem(item: OrderItem): void {
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
  }
  removeMenuItem(id: string): void {
    if (!this.order) {
      throw new Error('Order not created yet. Call createOrder() first.');
    }
    this.order.lines = this.order.lines.filter(line => line.item._id !== id);
    const mapped: OrderItem[] = this.order.lines.map(line => ({
      menuItemId: line.item._id,
      menuItemShortName: { name: line.item.shortName, modifications: {} }, // modifications are ignored here
      howMany: line.howMany
    }));
  }
  completeOrder(): void {
    if (!this.order) {
      throw new Error('Order not created yet. Call createOrder() first.');
    }
    // Logique pour compléter la commande
    this.order.opened = new Date().toISOString();
  }
}
