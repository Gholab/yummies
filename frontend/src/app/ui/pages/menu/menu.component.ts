/*import {AfterViewInit, ChangeDetectorRef, Component, QueryList, TemplateRef, ViewChildren} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {TabItem, TabsComponent} from '../../atoms/tabs/tabs.component';
import {ProductGridComponent} from '../../molecules/product-grid/product-grid.component';

export type ProductItem = {
  id: number;
  shortName: string;
  image: string;
  price: number;
};

@Component({
  selector: 'app-menu',
  imports: [TitleComponent, TabsComponent, ProductGridComponent],
  templateUrl: './menu.component.html',
  standalone: true,
  styleUrl: './menu.component.scss'
})

export type MenuCategory = {
  title: string;
  items: ProductItem[];
};
const IMG = 'https://cdn.pixabay.com/photo/2022/04/11/08/52/iced-tea-7125271_960_720.jpg';

export class MenuComponent implements AfterViewInit{
  @ViewChildren('tabTpl') tabTpls!: QueryList<TemplateRef<unknown>>;
  constructor(private cdr: ChangeDetectorRef) {}

  tabItems: TabItem[] = [];

  menuMock: ReadonlyArray<MenuCategory> = [
    {
      title: 'Populaire',
      items: [
        { id: 101, shortName: 'Iced Tea',  image: IMG, price: 5.20 },
        { id: 102, shortName: 'Lemonade',  image: IMG, price: 4.80 },
        { id: 103, shortName: 'Cold Brew', image: IMG, price: 6.00 },
        { id: 104, shortName: 'Matcha',    image: IMG, price: 5.90 },
        { id: 105, shortName: 'Smoothie',  image: IMG, price: 6.50 },
        { id: 106, shortName: 'Milkshake', image: IMG, price: 5.70 },
      ],
    },
    {
      title: 'Plat',
      items: [
        { id: 201, shortName: 'Burger',  image: IMG, price: 9.90 },
        { id: 202, shortName: 'Wrap',    image: IMG, price: 8.50 },
        { id: 203, shortName: 'Salade',  image: IMG, price: 7.80 },
        { id: 204, shortName: 'Frites',  image: IMG, price: 3.50 },
        { id: 205, shortName: 'Nuggets', image: IMG, price: 5.90 },
        { id: 206, shortName: 'Hot Dog', image: IMG, price: 6.20 },
      ],
    },
    {
      title: 'Dessert',
      items: [
        { id: 301, shortName: 'Donut',      image: IMG, price: 2.80 },
        { id: 302, shortName: 'Brownie',    image: IMG, price: 3.50 },
        { id: 303, shortName: 'Cookie',     image: IMG, price: 2.40 },
        { id: 304, shortName: 'Sundae',     image: IMG, price: 3.90 },
        { id: 305, shortName: 'Cheesecake', image: IMG, price: 4.20 },
        { id: 306, shortName: 'Macaron',    image: IMG, price: 2.90 },
      ],
    },
    {
      title: 'Boisson',
      items: [
        { id: 401, shortName: 'Cola',     image: IMG, price: 3.00 },
        { id: 402, shortName: 'Eau',      image: IMG, price: 2.00 },
        { id: 403, shortName: 'Jus',      image: IMG, price: 3.50 },
        { id: 404, shortName: 'Café',     image: IMG, price: 2.50 },
        { id: 405, shortName: 'Thé',      image: IMG, price: 2.30 },
        { id: 406, shortName: 'Smoothie', image: IMG, price: 4.80 },
      ],
    },
  ];

  ngAfterViewInit(): void {
    const tplArray = this.tabTpls.toArray();
    this.tabItems = this.menuMock.map((cat, i) => ({
      title: cat.title,
      template: tplArray[i]
    }));
    this.cdr.detectChanges();
  }
}*/


import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { TitleComponent } from '../../atoms/title/title.component';
import { TabItem, TabsComponent } from '../../atoms/tabs/tabs.component';
import { CartComponent } from '../../molecules/cart/cart.component';
import { ProductGridComponent } from '../../molecules/product-grid/product-grid.component';
import {NgIf} from '@angular/common';

export type ProductItem = {
  id: number;
  shortName: string;
  image: string;
  price: number;
};

export type MenuCategory = {
  title: string;
  items: ProductItem[];
};

const IMG = 'https://cdn.pixabay.com/photo/2022/04/11/08/52/iced-tea-7125271_960_720.jpg';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TitleComponent, TabsComponent, ProductGridComponent, NgIf, CartComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  @ViewChildren('tabTpl') tabTpls!: QueryList<TemplateRef<unknown>>;

  tabItems: TabItem[] = [];

  // Mock
  menuMock: ReadonlyArray<MenuCategory> = [
    {
      title: 'Populaire',
      items: [
        { id: 101, shortName: 'Iced Tea', image: IMG, price: 5.2 },
        { id: 102, shortName: 'Lemonade', image: IMG, price: 4.8 },
        { id: 103, shortName: 'Cold Brew', image: IMG, price: 6.0 },
        { id: 104, shortName: 'Matcha', image: IMG, price: 5.9 },
        { id: 105, shortName: 'Smoothie', image: IMG, price: 6.5 },
        { id: 106, shortName: 'Milkshake', image: IMG, price: 5.7 },
        { id: 101, shortName: 'Iced Tea', image: IMG, price: 5.2 },
        { id: 102, shortName: 'Lemonade', image: IMG, price: 4.8 },
        { id: 103, shortName: 'Cold Brew', image: IMG, price: 6.0 },
        { id: 104, shortName: 'Matcha', image: IMG, price: 5.9 },
        { id: 105, shortName: 'Smoothie', image: IMG, price: 6.5 },
        { id: 106, shortName: 'Milkshake', image: IMG, price: 5.7 },
      ],
    },
    {
      title: 'Plat',
      items: [
        { id: 201, shortName: 'Burger', image: IMG, price: 9.9 },
        { id: 202, shortName: 'Wrap', image: IMG, price: 8.5 },
        { id: 203, shortName: 'Salade', image: IMG, price: 7.8 },
        { id: 204, shortName: 'Frites', image: IMG, price: 3.5 },
        { id: 205, shortName: 'Nuggets', image: IMG, price: 5.9 },
        { id: 206, shortName: 'Hot Dog', image: IMG, price: 6.2 },
      ],
    },
    {
      title: 'Dessert',
      items: [
        { id: 301, shortName: 'Donut', image: IMG, price: 2.8 },
        { id: 302, shortName: 'Brownie', image: IMG, price: 3.5 },
        { id: 303, shortName: 'Cookie', image: IMG, price: 2.4 },
        { id: 304, shortName: 'Sundae', image: IMG, price: 3.9 },
        { id: 305, shortName: 'Cheesecake', image: IMG, price: 4.2 },
        { id: 306, shortName: 'Macaron', image: IMG, price: 2.9 },
      ],
    },
    {
      title: 'Boisson',
      items: [
        { id: 401, shortName: 'Cola', image: IMG, price: 3.0 },
        { id: 402, shortName: 'Eau', image: IMG, price: 2.0 },
        { id: 403, shortName: 'Jus', image: IMG, price: 3.5 },
        { id: 404, shortName: 'Café', image: IMG, price: 2.5 },
        { id: 405, shortName: 'Thé', image: IMG, price: 2.3 },
        { id: 406, shortName: 'Smoothie', image: IMG, price: 4.8 },
      ],
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const buildTabs = () => {
      const tpls = this.tabTpls.toArray();
      this.tabItems = this.menuMock.map((cat, i) => ({
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
}

