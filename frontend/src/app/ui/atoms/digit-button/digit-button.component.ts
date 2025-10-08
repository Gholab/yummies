import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-digit-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.scss']
})
export class DigitButtonComponent {
  /** Le texte affiché sur le bouton (1, 2, 3, … ou flèche) */
  @Input() label: string | number = '';

  @Input() color: 'primary' = 'primary';

  @Input() size: 's' | 'l' = 's';

  @Output() clicked = new EventEmitter<string | number>();

  onClick() {
    this.clicked.emit(this.label);
  }

}
