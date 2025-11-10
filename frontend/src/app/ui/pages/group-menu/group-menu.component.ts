import {Component, Inject, OnInit} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {ProductGridComponent} from '../../molecules/product-grid/product-grid.component';
import {MenuItem} from '../../../models/menu-item.model';
import {CardItemCarousel} from '../../molecules/cart-item-carousel/card-item-carousel';
import {CartComponent} from '../../molecules/cart/cart.component';
import {GroupService} from '../../../services/group.service';
import {MENU_SERVICE} from '../../../services/services.token';
import {MenuService} from '../../../services/menu/menu.service';

@Component({
  selector: 'app-group-menu.component',
  imports: [
    TitleComponent,
    ProductGridComponent,
    CardItemCarousel,
    CartComponent
  ],
  templateUrl: './group-menu.component.html',
  standalone: true,
  styleUrl: './group-menu.component.scss'
})
export class GroupMenuComponent implements OnInit{

  group_starters : MenuItem[] = [];
  extra_starters : MenuItem[] = [];
  group_mains : MenuItem[] = [];
  extra_mains : MenuItem[] = [];
  group_desserts : MenuItem[] = [];
  extra_desserts : MenuItem[] = [];

  constructor(private groupService: GroupService,
              @Inject(MENU_SERVICE)private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getGroupMenuItems().subscribe({
      next: (items: any) => {
        this.group_starters = items.groupStarters;
        this.extra_starters = items.extraStarters;
        this.group_mains = items.groupMains;
        this.extra_mains = items.extraMains;
        this.group_desserts = items.groupDesserts;
        this.extra_desserts = items.extraDesserts;
      },
      error: (err: any) => {
        console.log("Error fetching group menuItems", err);
      }
    });
  }


  get groupName(){
    return this.groupService.getGroupName();
  }
}
