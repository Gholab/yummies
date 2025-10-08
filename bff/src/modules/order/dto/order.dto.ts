import { OrderItemDTO } from "./orderItem.dto";

export class OrderDTO {
  id?: string; // optionnel car généré par le backend
  tableNumber: number;
  customersCount: number;
  items: OrderItemDTO[];
}
