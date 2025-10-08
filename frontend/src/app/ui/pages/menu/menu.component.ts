import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, Inject, OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { TitleComponent } from '../../atoms/title/title.component';
import { TabItem, TabsComponent } from '../../atoms/tabs/tabs.component';
import { CartComponent } from '../../molecules/cart/cart.component';
import { ProductGridComponent } from '../../molecules/product-grid/product-grid.component';
import {NgIf} from '@angular/common';
import {MenuCategory} from '../../../models/menu-item.model';
import {MENU_SERVICE} from '../../../services/services.token';
import {MenuService} from '../../../services/menu/menu.service';
import {resolve} from '@angular/compiler-cli';
import {map, Observable} from 'rxjs';


const IMG = 'https://cdn.pixabay.com/photo/2022/04/11/08/52/iced-tea-7125271_960_720.jpg';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TitleComponent, TabsComponent, ProductGridComponent, NgIf, CartComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit, OnInit {
  @ViewChildren('tabTpl') tabTpls!: QueryList<TemplateRef<unknown>>;

  tabItems: TabItem[] = [];
  menuItemsList: MenuCategory[] = [];

  constructor(private cdr: ChangeDetectorRef,
              @Inject(MENU_SERVICE) private menuService: MenuService) {
  }

  ngOnInit(): void{
    this.populateMenuItemsList().subscribe(() => {
      console.log("list populated")
    });
  }

  ngAfterViewInit(): void{
    const buildTabs = () => {
      const tpls = this.tabTpls.toArray();
      this.tabItems = this.menuItemsList.map((cat, i) => ({
        title: cat.title,
        template: tpls[i],
      }));
      this.cdr.detectChanges(); // assure l’update immédiat
    };

    buildTabs();
    // Si jamais menuMock/templates changeaient dynamiquement :
    this.tabTpls.changes.subscribe(() => {
      buildTabs();
    });
  }

  private populateMenuItemsList(): Observable<void>{
    return this.menuService.getMenuItems().pipe(map((items)=> {
      let categories:any = {};
      for(let menuItem of items){
        if(Object.keys(categories).includes(menuItem.category)){
          this.menuItemsList[categories[menuItem.category]].items.push(menuItem)
        }else{
          categories[menuItem.category] = this.menuItemsList.length;
          this.menuItemsList.push({
            title: menuItem.category,
            items: [menuItem]
          });
        }
      }
    }));
  }
}


