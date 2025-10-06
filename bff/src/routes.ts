import { OrderDTO } from "./modules/order/dto/order.dto";

export const routes = {
  orders: {
    base: '/order',
    addItem: (orderId: string) => `/order/${orderId}/add-item`,
    removeItem: (orderId: string, menuItemId: string) => `/order/${orderId}/remove-item/${menuItemId}`,
    complete: (orderId: string) => `/order/${orderId}/complete`,
    createOrder: () => '/order/create-order',
    addBipper: (orderId: string, bipper: number) => `/order/${orderId}/add-bipper/${bipper}`,
  },
  menu: {
    base: '/menu',
  },

};