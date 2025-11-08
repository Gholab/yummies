import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';
  @Input() value: string | number | null = null;

  @Output() valueChange = new EventEmitter<string | number>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(this.type === 'number' ? Number(target.value) : target.value);
  }
}
