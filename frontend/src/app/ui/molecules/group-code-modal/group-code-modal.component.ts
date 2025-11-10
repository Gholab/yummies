import {Component} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {NumpadComponent} from '../numpad/numpad.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-group-code-modal',
  imports: [TitleComponent, NumpadComponent, CommonModule],
  templateUrl: './group-code-modal.component.html',
  styleUrl: './group-code-modal.component.scss'
})
export class GroupCodeModalComponent {

  hasError = false;

  enableErrorMsg(){
    this.hasError = true;
  }
}
