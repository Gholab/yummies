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
import {MenuCategory} from '../../../models/menu-item.model';


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

  constructor(private cdr: ChangeDetectorRef) {
  }

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

  menuMock: ReadonlyArray<MenuCategory> = [
    {
      title: 'Entrées',
      items: [
        {
          _id: '101',
          shortName: 'Iced Tea',
          price: 5.2,
          category: 'STARTER',
          image: IMG,
          description:
            "Un thé glacé rafraîchissant au goût doux et citronné, parfait pour bien commencer le repas.",
          ingredients: [
            {name: 'thé noir', range: '1-2-3'},
            {name: 'citron', range: '0-1-2'},
          ],
          allergenes: ['aucun'],
        },
        {
          _id: '102',
          shortName: 'Lemonade',
          price: 4.8,
          category: 'STARTER',
          image: IMG,
          description:
            "Une limonade pétillante faite maison pour une mise en bouche désaltérante.",
          ingredients: [
            {name: 'citron', range: '1-2'},
            {name: 'sucre', range: '0-1-2'},
          ],
          allergenes: ['aucun'],
        },
        {
          _id: '103',
          shortName: 'Cold Brew',
          price: 6.0,
          category: 'STARTER',
          image: IMG,
          description:
            "Café infusé à froid, riche en arômes et en douceur naturelle.",
          ingredients: [
            {name: 'café arabica', range: '1-2'},
            {name: 'eau filtrée', range: '1-1-1'},
          ],
          allergenes: ['aucun'],
        },
      ],
    },
    {
      title: 'Plats',
      items: [
        {
          _id: '201',
          shortName: 'Burger',
          price: 9.9,
          category: 'MAIN',
          image: IMG,
          description:
            "Un burger juteux avec pain brioché, steak haché et fromage fondant.",
          ingredients: [
            {name: 'boeuf', range: '2-3'},
            {name: 'fromage', range: '1-2'},
          ],
          allergenes: ['gluten', 'lait', 'oeuf'],
        },
        {
          _id: '202',
          shortName: 'Wrap',
          price: 8.5,
          category: 'MAIN',
          image: IMG,
          description:
            "Wrap de poulet grillé accompagné de crudités croquantes.",
          ingredients: [
            {name: 'poulet', range: '2-3'},
            {name: 'tortilla', range: '1-1-1'},
          ],
          allergenes: ['gluten'],
        },
        {
          _id: '203',
          shortName: 'Salade',
          price: 7.8,
          category: 'MAIN',
          image: IMG,
          description:
            "Salade fraîche composée de légumes de saison et vinaigrette maison.",
          ingredients: [
            {name: 'laitue', range: '1-2'},
            {name: 'tomate', range: '1-1-2'},
          ],
          allergenes: ['moutarde'],
        },
      ],
    },
    {
      title: 'Desserts',
      items: [
        {
          _id: '301',
          shortName: 'Donut',
          price: 2.8,
          category: 'DESSERT',
          image: IMG,
          description: 'Donut moelleux glacé au sucre.',
          ingredients: [
            {name: 'farine', range: '2-3'},
            {name: 'sucre', range: '1-2'},
          ],
          allergenes: ['gluten', 'oeuf', 'lait'],
        },
        {
          _id: '302',
          shortName: 'Brownie',
          price: 3.5,
          category: 'DESSERT',
          image: IMG,
          description: 'Brownie fondant au chocolat noir et aux noix.',
          ingredients: [
            {name: 'chocolat', range: '2-3'},
            {name: 'noix', range: '0-1'},
          ],
          allergenes: ['gluten', 'lait', 'fruits à coque'],
        },
        {
          _id: '303',
          shortName: 'Cookie',
          price: 2.4,
          category: 'DESSERT',
          image: IMG,
          description:
            "Cookie croustillant à l’extérieur et moelleux à l’intérieur.",
          ingredients: [
            {name: 'beurre', range: '1-2'},
            {name: 'pépites de chocolat', range: '1-2-3'},
          ],
          allergenes: ['gluten', 'oeuf', 'lait'],
        },
      ],
    },
    {
      title: 'Boissons',
      items: [
        {
          _id: '401',
          shortName: 'Cola',
          price: 3.0,
          category: 'BEVERAGE',
          image: IMG,
          description:
            'Boisson gazeuse sucrée au goût caramel et caféine.',
          ingredients: [
            {name: 'eau gazeuse', range: '1-2'},
            {name: 'sucre', range: '1-2'},
          ],
          allergenes: ['aucun'],
        },
        {
          _id: '402',
          shortName: 'Eau',
          price: 2.0,
          category: 'BEVERAGE',
          image: IMG,
          description: 'Eau de source pure et rafraîchissante.',
          ingredients: [{name: 'eau', range: '1-1-1'}],
          allergenes: ['aucun'],
        },
        {
          _id: '403',
          shortName: 'Jus',
          price: 3.5,
          category: 'BEVERAGE',
          image: IMG,
          description:
            'Jus de fruits 100% naturel, pressé à froid.',
          ingredients: [
            {name: 'pomme', range: '1-2'},
            {name: 'orange', range: '1-2-3'},
          ],
          allergenes: ['aucun'],
        },
      ],
    },
  ];
}


