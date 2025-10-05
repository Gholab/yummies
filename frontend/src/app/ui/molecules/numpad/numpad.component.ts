import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitButtonComponent } from '../../atoms/digit-button/digit-button.component';
import { OrderService } from '../../../services/order/order.service';
import { ORDER_SERVICE } from '../../../services/services.token';

@Component({
  selector: 'app-numpad',
  standalone: true,
  imports: [CommonModule, DigitButtonComponent],
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss']
})
export class NumpadComponent {
  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService) {}
  @Output() nextStep = new EventEmitter<void>();
  inputValue: string = '';

  keys: (number)[] = [1,2,3,4,5,6,7,8,9,0];

  onKeyClick(key: string | number) {
    if (key === '→') {
      console.log('Submit value:', this.inputValue);
      let numValue = parseInt(this.inputValue, 10);
      this.orderService.addBipperNumber(numValue);
      this.inputValue = ''; // reset après validation
      this.nextStep.emit();
    }
    this.inputValue += key.toString();
  }
}
