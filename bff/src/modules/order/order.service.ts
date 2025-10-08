import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { BackOrderItemDTO } from './dto/backOrderItemDTO';
import {HttpService} from '@nestjs/axios';
import { first, firstValueFrom } from 'rxjs';
import {OrderWithCustomersDTO} from "./dto/order-with-customers.dto";
import {FrontOrderItemDTO} from "./dto/frontOrderItemDTO";

@Injectable()
export class OrdersService {
  private baseUrl = "http://localhost:9500/dining";
  private orders: OrderDTO[] = [];

  constructor(private http: HttpService) {}
  // Créer une commande
  create() {
    // to do : à modifier
    const newOrder: OrderWithCustomersDTO = {
      id: 'order-' + (this.orders.length + 1),
      tableNumber: 0,
      customersCount: 1,
      items: [],
    };
    this.orders.push(newOrder);
    console.log('Order created:', newOrder);
    console.log('Current orders:', this.orders);
    return {
        ...newOrder,
      customersCount: undefined,
    };
  }

  addBipper(id: string, bipper: number) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    order.tableNumber = bipper;

    return order;
  }

  async completeOrder(id: string, orderItems: FrontOrderItemDTO[]) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    //étape 1: create order
    const createResponse = await firstValueFrom(
      this.http.post(
      `${this.baseUrl}/tableOrders`, {
        tableNumber: order.tableNumber,
        customersCount: 1//arbitrary value
      })
    );
    const tableOrderId = createResponse.data._id;
    console.log('Table order created with ID:', tableOrderId);

    // étape 2: add items to order
    for (const frontItem of orderItems) {
    let item: BackOrderItemDTO = {
        menuItemId: frontItem.menuItem._id,
        menuItemShortName: frontItem.menuItem.shortName,
        howMany: frontItem.howMany
    };

      if (!item.menuItemId || item.howMany <= 0) {
        console.warn(`Skipping invalid item: ${JSON.stringify(item)}`);
        continue;
      }
      await firstValueFrom(
        this.http.post(
          `${this.baseUrl}/tableOrders/${tableOrderId}`, item)
      );
      console.log(`Added item ${item.menuItemId} to table order ${tableOrderId}`);
    }

    // // étape 3: preparer la commande
    await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/tableOrders/${tableOrderId}/prepare`, {})
    );
    console.log(`Order ${tableOrderId} is now being prepared`);

    // étape 4: finaliser la commande
    await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/tableOrders/${tableOrderId}/bill`, {})
    );
    console.log(`Order ${tableOrderId} has been billed`);

    return { message: `Order ${id} completed and sent to dining service as table order ${tableOrderId}` };

  }
}
