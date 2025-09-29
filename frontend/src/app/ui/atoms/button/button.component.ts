import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() size: 'ultralarge' | 'l' | 'm' | 's' = 'l';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() icon: string | null = null;
}
