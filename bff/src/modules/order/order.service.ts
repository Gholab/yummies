import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { BackOrderItemDTO } from './dto/backOrderItemDTO';
import {HttpService} from '@nestjs/axios';
import { first, firstValueFrom } from 'rxjs';
import {OrderWithCustomersDTO} from "./dto/order-with-customers.dto";
import {FrontOrderItemDTO} from "./dto/frontOrderItemDTO";
import { logHttp } from 'src/common/utils/log-http';

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
    console.log('[BFF] OrdersService: Created new order locally with id', newOrder.id);
    console.log('[BFF] OrdersService: Current orders:', this.orders);
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
    console.log(`[BFF] OrdersService: Locally set Bipper id ${bipper} for order of id ${id}`);
    return order;
  }

  async completeOrder(id: string, orderItems: FrontOrderItemDTO[]) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    //étape 1: create order
    const startCreate = Date.now();
    const createResponse = await firstValueFrom(
      this.http.post(
      `${this.baseUrl}/tableOrders`, {
        tableNumber: order.tableNumber,
        customersCount: 1//arbitrary value
      })
    );
    logHttp(createResponse, startCreate, {
      tableNumber: order.tableNumber, customersCount: 1
    })
    const tableOrderId = createResponse.data._id;
    console.log('[BFF] OrdersService: Table order created in backend with ID:', tableOrderId);

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
      const startAddItem = Date.now();
      const addItemResponse = await firstValueFrom(
        this.http.post(
          `${this.baseUrl}/tableOrders/${tableOrderId}`, item)
      );
      logHttp(addItemResponse, startAddItem, item);
      // console.log(`Added item ${item.menuItemId} to table order ${tableOrderId}`);
    }

    // // étape 3: preparer la commande
    const startPrepare = Date.now();
    const prepareResponse = await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/tableOrders/${tableOrderId}/prepare`, {})
    );
    logHttp(prepareResponse, startPrepare, {});
    // console.log(`Order ${tableOrderId} is now being prepared`);

    // étape 4: finaliser la commande
    const startBill = Date.now();
    const billResponse = await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/tableOrders/${tableOrderId}/bill`, {})
    );
    logHttp(billResponse, startBill, {});
    // console.log(`Order ${tableOrderId} set to billed`);

    return { message: `Order ${id} completed and sent to dining service as table order ${tableOrderId}` };

  }
}
