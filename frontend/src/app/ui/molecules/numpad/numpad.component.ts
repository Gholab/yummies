import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitButtonComponent } from '../../atoms/digit-button/digit-button.component';

@Component({
  selector: 'app-numpad',
  standalone: true,
  imports: [CommonModule, DigitButtonComponent],
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss']
})
export class NumpadComponent {
  inputValue: string = '';

  keys: (number)[] = [1,2,3,4,5,6,7,8,9,0];

  onKeyClick(key: string | number) {
    if (key === '→') {
      console.log('Submit value:', this.inputValue);
      this.inputValue = ''; // reset après validation
      return;
    }
    this.inputValue += key.toString();
  }
}
