import { Component, Input } from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {PaymentItem} from '../payment-item/payment-item.component';
import {CartItem} from '../../../models/cart-item-model';
import {ButtonComponent} from '../../atoms/button/button.component';

@Component({
  selector: 'app-custom-payment',
  imports: [
    TitleComponent,
    PaymentItem,
    ButtonComponent
  ],
  standalone: true,
  templateUrl: './custom-payment.component.html',
  styleUrl: './custom-payment.component.scss'
})


export class CustomPayment {
  private selectedQuantities: number[] = [];

  onSelectionChange(e: { index: number; quantity: number }) {
    this.selectedQuantities[e.index] = e.quantity;
  }

  get total(): number {

    return this.cartMock.reduce((sum, line, idx) => {
      const q = this.selectedQuantities[idx] ?? 0;
      return sum + q * line.menuItem.price;
    }, 0);
  }


  IMG = 'https://cdn.pixabay.com/photo/2022/04/11/08/52/iced-tea-7125271_960_720.jpg';
  cartMock: ReadonlyArray<CartItem> = [
    {
      menuItem: {
        _id: '201',
        shortName: 'Burger',
        price: 9.9,
        category: 'MAIN',
        image: this.IMG,
        description: 'Un burger juteux avec pain brioché, steak haché et fromage fondant.',
        ingredients: [
          { name: 'boeuf', range: '1-2-3' },
          { name: 'fromage', range: '0-1-2' },
          { name: 'oignon', range: '0-1-2' },
          { name: 'sauce', range: '0-1-2' },
        ],
        allergenes: ['gluten', 'lait', 'oeuf'],
      },
      howMany: 2,
      modifications: {
        boeuf: 3,
        fromage: 2,
        oignon: 1,
        sauce: 1,
      },
    },
    {
      menuItem: {
        _id: '202',
        shortName: 'Wrap',
        price: 8.5,
        category: 'MAIN',
        image: this.IMG,
        description: 'Wrap de poulet grillé accompagné de crudités croquantes.',
        ingredients: [
          { name: 'poulet', range: '1-2-3' },
          { name: 'tortilla', range: '1-1-1' },
          { name: 'tomate', range: '0-1-2' },
          { name: 'mayo', range: '0-1-2' },
        ],
        allergenes: ['gluten', 'oeuf'],
      },
      howMany: 1,
      modifications: {
        poulet: 2,
        mayo: 0,
        tomate: 2,
      },
    },
    {
      menuItem: {
        _id: '202',
        shortName: 'Wrap',
        price: 8.5,
        category: 'MAIN',
        image: this.IMG,
        description: 'Wrap de poulet grillé accompagné de crudités croquantes.',
        ingredients: [
          { name: 'poulet', range: '1-2-3' },
          { name: 'tortilla', range: '1-1-1' },
          { name: 'tomate', range: '0-1-2' },
          { name: 'mayo', range: '0-1-2' },
        ],
        allergenes: ['gluten', 'oeuf'],
      },
      howMany: 1,
      modifications: {
        poulet: 2,
        mayo: 0,
        tomate: 2,
      },
    }
  ]
  protected readonly onselectionchange = onselectionchange;
}
