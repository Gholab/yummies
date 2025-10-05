import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitButtonComponent } from '../../atoms/digit-button/digit-button.component';

@Component({
  selector: 'app-bipper',
  standalone: true,
  imports: [CommonModule, DigitButtonComponent],
  templateUrl: './bipper.component.html',
  styleUrls: ['./bipper.component.scss']
})
export class BipperComponent {
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
