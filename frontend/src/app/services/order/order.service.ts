import { OrderItem } from '../../models/order-item.model';
// definir le order à partir de plusieurs menu items
export abstract class OrderService {
  abstract addMenuItem(orderItem: OrderItem): void;
  abstract removeMenuItem(menuItemId: string): void;
  abstract completeOrder(): void;
}
