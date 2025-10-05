import { Component , Input, ChangeDetectionStrategy } from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {CardItemComponent} from '../cardItem/cardItem.component';
import {MenuItem} from '../../../models/menu-item.model';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [TitleComponent, CardItemComponent ],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridComponent {
  @Input() title = 'Produits';
  @Input() items: ReadonlyArray<MenuItem> = [];
  trackById = (_: number, item: MenuItem) => item?._id ?? _;
}

