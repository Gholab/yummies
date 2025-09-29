import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-payment-option',
  imports: [],
  standalone: true,
  templateUrl: './payment-option.component.html',
  styleUrl: './payment-option.component.scss'
})
export class PaymentOptionComponent {
  @Input() public imgSrc: string = "assets/icons/edit.svg";//example values
  @Input() public explanation: string = "Je règle au comptoir en espèces";//example values
}
