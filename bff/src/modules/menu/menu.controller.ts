import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu') // => /menu
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('')
  getMenuItems() {
    console.log('Received create order request');
    return this.menuService.getItems();
  }

  @Get('/:menuId')
  getMenuItemById(@Param('menuId') menuId: string) {
    return this.menuService.getItemById(menuId);
  }

}