import { ChangeDetectorRef, Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent, TabItem } from './ui/atoms/tabs/tabs.component';
import { ButtonComponent } from './ui/atoms/button/button.component';
import { TitleComponent } from './ui/atoms/title/title.component';
import { NumberSelectorComponent } from './ui/atoms/number-selector/number-selector.component';
import {CardItemComponent} from './ui/molecules/cardItem/cardItem.component';
import {DigitButtonComponent} from "./ui/atoms/digit-button/digit-button.component";
import { NumpadComponent } from './ui/molecules/numpad/numpad.component';
import { BffOrderService } from './services/order/bff-order.service';
import { PurefrontOrderService } from './services/order/purefront-order.service';
import { PurefrontMenuService } from './services/menu/purefront-menu.service';
import { OrderItem } from './models/order-item.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TitleComponent, ButtonComponent, NumberSelectorComponent, CardItemComponent, DigitButtonComponent, NumpadComponent, TabsComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private bffOrderService: BffOrderService, private purefrontOrderService: PurefrontOrderService, private purefrontMenuService: PurefrontMenuService) {}

  @ViewChild('tplA', { static: true }) tplA!: TemplateRef<unknown>;
  @ViewChild('tplB', { static: true }) tplB!: TemplateRef<unknown>;
  @ViewChild('tplC', { static: true }) tplC!: TemplateRef<unknown>;

  tabItems: TabItem[] = [];

  ngOnInit(): void {
    this.tabItems = [
      { title: 'Aperçu',     template: this.tplA },
      { title: 'Détails',    template: this.tplB },
      { title: 'Paramètres', template: this.tplC, disabled: false },
    ];
    
  }
  testCreateOrder(): void {
    this.purefrontOrderService.createOrder(); 
  }
  async testAddItem() {
    this.purefrontMenuService.getMenuItemById('68db8a119bbb351a3d11d3bd')
    .subscribe(menuItem => {
      if (!menuItem) {
        console.error('Menu item not found');
        return;
      }

      console.log('Menu item fetched by ID:', menuItem);

      let orderItem: OrderItem = this.purefrontOrderService.convertMenuItemToOrderItem(menuItem, 1);
      this.purefrontOrderService.addMenuItem(orderItem);
    });
  }

  testRemoveItem() {
    this.purefrontOrderService.removeMenuItem('68db8a119bbb351a3d11d3bd');
  }

  testCompleteOrder() {
    this.purefrontOrderService.completeOrder();
  }
}
  