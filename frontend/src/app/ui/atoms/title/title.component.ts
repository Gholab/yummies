import { Component , Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [NgClass],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() text: string = '';      
  @Input() size: 'l' | 'm' | 's' = 'l';
  @Input() color: 'primary' | 'secondary' = 'primary';

}
