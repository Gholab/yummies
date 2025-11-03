import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MenuItem, MenuItemSchema } from './schemas/menu-item.schema';

import { MenusController } from './controllers/menus.controller';
import { MenusService } from './services/menus.service';
import {ReservationProxyService} from "./services/reservation-proxy.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [MongooseModule.forFeature([{ name: MenuItem.name, schema: MenuItemSchema }]), HttpModule],
  providers: [MenusService, ReservationProxyService],
  controllers: [MenusController],
})
export class MenusModule {}
