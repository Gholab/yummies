import { Component } from '@angular/core';
import {ButtonComponent} from '../../atoms/button/button.component';
import {NumberSelectorComponent} from '../../atoms/number-selector/number-selector.component';

@Component({
  selector: 'app-choose-number-of-parts-equal-division',
  imports: [ButtonComponent, NumberSelectorComponent],
  templateUrl: './choose-number-of-parts-equal-division.component.html',
  styleUrl: './choose-number-of-parts-equal-division.component.scss'
})
export class ChooseNumberOfPartsEqualDivisionComponent {

}
