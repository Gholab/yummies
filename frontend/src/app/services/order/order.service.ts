import { Observable } from 'rxjs';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
// definir le order à partir de plusieurs menu items
export abstract class OrderService {
  abstract createOrder(tableNumber: number, customersCount: number): Observable<Order>;
  abstract addMenuItem(orderItem: OrderItem): Observable<Order>;
  abstract removeMenuItem(itemIndex: number): Observable<Order>;
  abstract completeOrder(): Observable<Order>;
}
