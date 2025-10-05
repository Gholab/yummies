import {Component, Input} from '@angular/core';
import { NgClass } from '@angular/common';
import {ButtonComponent} from '../../atoms/button/button.component';
import {EditItemModalComponent} from '../edit-item-modal/edit-item-modal.component';
import {ModalService} from '../../../services/modal.service';
import {ModalComponent} from '../modal/modal.component';
import {MenuItem} from '../../../models/menu-item.model';

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

  constructor(private modalService: ModalService) {
  }

  onEdit(event: MouseEvent) {
    event.stopPropagation();
    this.modalService.open(EditItemModalComponent, {
      menuItem: this.item})
  }

  addItemToCart() {
    //TODO: add Item to cart via OrderService
    console.log("item added")
  }
}
