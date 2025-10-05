import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {CartItem} from '../../../models/cart-item-model';
import {CartItemComponent} from '../cart-item/cart-item.component';

const IMG = 'https://cdn.pixabay.com/photo/2022/04/11/08/52/iced-tea-7125271_960_720.jpg';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent, ButtonComponent, CartItemComponent]
})

export class CartComponent {
  open = false;

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }
  trackById(index: number, item: CartItem) {
    return item._id;
  }

  cartMock: ReadonlyArray<CartItem> = [
    {
      _id: '201',
      shortName: 'Burger',
      price: 9.9,
      category: 'MAIN',
      image: IMG,
      description: "Un burger juteux avec pain brioché, steak haché et fromage fondant.",
      ingredients: [
        { name: 'boeuf', range: '2-3' },
        { name: 'fromage', range: '1-2' },
      ],
      allergenes: ['gluten', 'lait', 'oeuf'],
      quantity: 2,
    },
    {
      _id: '301',
      shortName: 'Donut',
      price: 2.8,
      category: 'DESSERT',
      image: IMG,
      description: "Donut moelleux glacé au sucre.",
      ingredients: [
        { name: 'farine', range: '2-3' },
        { name: 'sucre', range: '1-2' },
      ],
      allergenes: ['gluten', 'oeuf', 'lait'],
      quantity: 3,
    },
    {
      _id: '403',
      shortName: 'Jus',
      price: 3.5,
      category: 'BEVERAGE',
      image: IMG,
      description: "Jus de fruits 100% naturel, pressé à froid.",
      ingredients: [
        { name: 'pomme', range: '1-2' },
        { name: 'orange', range: '1-2-3' },
      ],
      allergenes: ['aucun'],
      quantity: 1,
    },
    {
      _id: '102',
      shortName: 'Lemonade',
      price: 4.8,
      category: 'STARTER',
      image: IMG,
      description: "Une limonade pétillante faite maison pour une mise en bouche désaltérante.",
      ingredients: [
        { name: 'citron', range: '1-2' },
        { name: 'sucre', range: '0-1-2' },
      ],
      allergenes: ['aucun'],
      quantity: 2,
    },
  ];

}

