import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './order.service';
import { BackOrderItemDTO } from './dto/backOrderItemDTO';
import {FrontOrderItemDTO} from "./dto/frontOrderItemDTO";

@Controller('order') // => /order
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create-order')
  create() {
    console.log('Received create order request');
    return this.ordersService.create();
  }

  @Post(':orderId/add-item')
  addMenuItem(@Param('orderId') orderId: string, @Body() orderItem: FrontOrderItemDTO) {
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

  @Post(':orderId/add-bipper/:bipper')
  addBipper(@Param('orderId') orderId: string, @Param('bipper') bipper: number) {
    return this.ordersService.addBipper(orderId, Number(bipper));
  }
}