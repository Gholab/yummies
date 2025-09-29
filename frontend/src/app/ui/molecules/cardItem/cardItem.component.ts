import {Component, Input} from '@angular/core';
import { NgClass } from '@angular/common';
import {ButtonComponent} from '../../atoms/button/button.component';

@Component({
  selector: 'card-item',
  imports: [NgClass, ButtonComponent],
  templateUrl: './cardItem.component.html',
  standalone: true,
  styleUrl: './cardItem.component.scss'
})

export class CardItemComponent {
  @Input() item: any;
  @Input() inlineMode : boolean = false;

  onEdit(event: MouseEvent) {
    event.stopPropagation();
    //TODO: display Edit Item
    console.log("edit item")
  }

  addItemToCart() {
    //TODO: add Item to cart via OrderService
    console.log("item added")
  }
}
