import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderItemDTO } from './dto/orderItem.dto';
@Injectable()
export class OrdersService {
  private orders: OrderDTO[] = []; 
  // Créer une commande
  create(dto: OrderDTO) {
    // to do : à modifier
    const newOrder: OrderDTO = {
      id: 'order-' + (this.orders.length + 1),
      tableNumber: dto.tableNumber,
      customersCount: dto.customersCount,
      items: dto.items,
    };
    this.orders.push(newOrder);
    console.log('Order created:', newOrder);
    console.log('Current orders:', this.orders);
    return newOrder;
  }
  // Supprimer une commande
  removeItem(id: string, menuItemId: string) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    const itemIndex = order.items.findIndex((item) => item.menuItemId === menuItemId);
    if (itemIndex === -1) {
      throw new NotFoundException(`Order item with id ${menuItemId} not found`);
    }
    const [deleted] = order.items.splice(itemIndex, 1);
    return deleted;
  }
  addItem(id: string, orderItem: OrderItemDTO) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    order.items.push(orderItem);
    return order;
  }
  completeOrder(id: string) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    // to do : envoyer la commande à la cuisine, etc.
    console.log(`Order with id ${id} completed`);
    return order;
  }
}
