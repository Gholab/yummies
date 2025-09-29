import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';


@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent]
})

export class CartComponent {
  open = false;

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }

}

