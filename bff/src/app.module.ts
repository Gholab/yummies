import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';
import {MenuModule} from "./modules/menu/menu.module";
import { HttpLoggerModule } from './common/http-logger.module';


@Module({
  imports: [OrderModule, MenuModule, HttpLoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
