import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitButtonComponent } from '../../atoms/digit-button/digit-button.component';
import { OrderService } from '../../../services/order/order.service';
import { ModalService } from '../../../services/modal.service';
import { ORDER_SERVICE } from '../../../services/services.token';
import {ButtonComponent} from '../../atoms/button/button.component';
import {TitleComponent} from '../../atoms/title/title.component';
import {ErrorMessage} from '../error-message/error-message.component';

@Component({
  selector: 'app-numpad',
  standalone: true,
  imports: [CommonModule, DigitButtonComponent, ButtonComponent],
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss']
})
export class NumpadComponent {
  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService, private modalService: ModalService) {}
  @Output() nextStep = new EventEmitter<void>();
  inputValue: string = '';
  keys: (number)[] = [1,2,3,4,5,6,7,8,9,0];

  onKeyClick(key: string | number) {
    if (key === '→') {
      console.log('Submit value:', this.inputValue);
      if( Number(this.inputValue) < 0 || Number(this.inputValue) > 50){
        this.modalService.open(ErrorMessage, {
          text: "Veuillez entrer un numéro de bipper valide !",
        }).then(r => {this.inputValue = '';});
        return
      }
      let numValue = parseInt(this.inputValue, 10);
      this.orderService.addBipperNumber(numValue);
      this.inputValue = ''; // reset après validation
      this.nextStep.emit();
    }
    this.inputValue += key.toString();
  }

  suppressInput(){
    this.inputValue = '';
  }
}
