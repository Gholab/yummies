import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import {HttpModule} from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [OrdersController], // les controllers qui gèrent les routes
  providers: [OrdersService],      // les services injectables
  exports: [OrdersService],        // si tu veux réutiliser le service ailleurs (optionnel)
})
export class OrderModule {}
