  import {OrderService} from './order.service';
  import {Injectable} from '@angular/core';
  import {MenuItem} from '../../models/menu-item.model';
  import {HttpClient} from '@angular/common/http';
  import {UnparsedMenuItem} from '../../models/unparsed/unparsed-menu-item.model';
  import {map, Observable} from 'rxjs';
import { OrderItem } from '../../models/order-item.model';

  @Injectable({
    providedIn: "root"
  })
  export class PurefrontOrderService extends OrderService {
     private baseUrl= "http://localhost:9500/order";

    constructor(private http: HttpClient) {
      super();
    }
    override addMenuItem(orderItem: OrderItem): void {
      throw new Error('Method not implemented.');
    }
    override removeMenuItem(menuItemId: string): void {
      throw new Error('Method not implemented.');
    }
    override completeOrder(): void {
      throw new Error('Method not implemented.');
    }
    
  }
