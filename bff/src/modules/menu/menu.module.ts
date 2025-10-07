import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import {HttpModule} from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [MenuController], // les controllers qui gèrent les routes
  providers: [MenuService],      // les services injectables
  exports: [MenuService],        // si tu veux réutiliser le service ailleurs (optionnel)
})
export class MenuModule {}
