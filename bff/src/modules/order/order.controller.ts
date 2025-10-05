import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrdersService } from './order.service';
import { OrderItemDTO } from './dto/orderItem.dto';

@Controller('order') // => /order
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create-order')
  create(@Body() dto: OrderDTO) {
    console.log('Received create order request with data:', dto);
    return this.ordersService.create(dto);
  }

  @Post(':orderId/add-item')
  addMenuItem(@Param('orderId') orderId: string, @Body() orderItem: OrderItemDTO) {
    return this.ordersService.addItem(orderId, orderItem);
  }

  @Delete(':orderId/remove-item/:menuItemId')
  remove(@Param('orderId') orderId: string, @Param('menuItemId') menuItemId: string) {
    return this.ordersService.removeItem(orderId, menuItemId);
  }

  @Post(':orderId/complete')
  completeOrder(@Param('orderId') orderId: string) {
    return this.ordersService.completeOrder(orderId);
  }
}