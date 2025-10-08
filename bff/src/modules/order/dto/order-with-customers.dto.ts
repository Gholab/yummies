import { BackOrderItemDTO } from "./backOrderItemDTO";

export class OrderWithCustomersDTO {
  id?: string; // optionnel car généré par le backend
  tableNumber: number;
  customersCount: number;
  items: BackOrderItemDTO[];
}
