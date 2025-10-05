import {Component, Inject, Input} from '@angular/core';
import { NgClass } from '@angular/common';
import {ButtonComponent} from '../../atoms/button/button.component';
import {EditItemModalComponent} from '../edit-item-modal/edit-item-modal.component';
import {ModalService} from '../../../services/modal.service';
import {ModalComponent} from '../modal/modal.component';
import {MenuItem} from '../../../models/menu-item.model';
import {ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';
import {CartItem} from '../../../models/cart-item-model';

@Component({
  selector: 'card-item',
  imports: [NgClass, ButtonComponent],
  templateUrl: './cardItem.component.html',
  standalone: true,
  styleUrl: './cardItem.component.scss'
})

export class CardItemComponent {
  @Input() item!: MenuItem;
  @Input() inlineMode : boolean = false;

  constructor(private modalService: ModalService,
              @Inject(ORDER_SERVICE) private orderService: OrderService) {
  }

  onEdit(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.modalService.open(EditItemModalComponent, {
      menuItem: this.item})
  }

  addItemToCart() {
    if(this.inlineMode){
      return;
    }
    let cartItem: CartItem = {
      menuItem: this.item,
      howMany: this.computeItemDefaultHowMany()
    };
    this.orderService.addMenuItem(cartItem);
  }

  private computeItemDefaultHowMany(){
    let howMany = "1.";
    for(let ingredient of this.item.ingredients){
      let splittedRange = ingredient.range.split("-");
      howMany = howMany+splittedRange[1];
    }
    return parseFloat(howMany);
  }
}
