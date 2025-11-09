import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
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
  @Input() isSelected: boolean = false;
  @Input() isGroupMode: boolean = false;
  @Input() onlyView: boolean = false;
  @Input() maxSelectableItems = 1;
  @Input() currentSelectedCount = 0;

  @Output() itemSelected = new EventEmitter<MenuItem>();

  constructor(private modalService: ModalService,
              @Inject(ORDER_SERVICE) private orderService: OrderService) {
  }

  onEdit(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const { instance: modalInstance, closed } = this.modalService.open<EditItemModalComponent>(EditItemModalComponent, {
      menuItem: this.item,
      onlyView: this.onlyView,
      selected: this.isSelected,
      group: this.isGroupMode,
      maxSelectableItems: this.maxSelectableItems,
      currentSelectedCount: this.currentSelectedCount,

    });
    modalInstance.itemAdded.subscribe((cartItem: CartItem) => {
      this.itemSelected.emit(this.item);
    });

    modalInstance.itemDeleted.subscribe((menuItem: MenuItem) => {
      this.itemSelected.emit(this.item);
    });
  }

  addItemToCart() {
    console.log("addItem : ", this.isGroupMode);
    if (this.isGroupMode) {
      this.itemSelected.emit(this.item);
      console.log("emission this item selected :", this.item);
      return;
    }
    if(this.inlineMode){
      return;
    }
    let cartItem: CartItem = {
      menuItem: this.item,
      howMany: this.computeItemDefaultHowMany()
    };
    this.orderService.addMenuItem(cartItem).subscribe(() => {});//necessary to subscribe to trigger the POST
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
