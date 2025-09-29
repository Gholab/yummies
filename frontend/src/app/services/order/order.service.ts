import { Observable } from 'rxjs';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
// definir le order à partir de plusieurs menu items
export abstract class OrderService {
  abstract addMenuItem(orderItem: OrderItem): Observable<Order>;
  abstract removeMenuItem(menuItemId: string): Observable<Order>;
  abstract completeOrder(): Observable<Order>;
}
