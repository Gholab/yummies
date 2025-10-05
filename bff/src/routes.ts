import { OrderDTO } from "./modules/order/dto/order.dto";

export const routes = {
  orders: {
    base: '/order',
    addItem: (orderId: string) => `/order/${orderId}/add-item`,
    removeItem: (orderId: string, menuItemId: string) => `/order/${orderId}/remove-item/${menuItemId}`,
    complete: (orderId: string) => `/order/${orderId}/complete`,
    createOrder: (dto: OrderDTO) => '/order/create-order',
  },
  menu: {
    base: '/menu',
  },

};