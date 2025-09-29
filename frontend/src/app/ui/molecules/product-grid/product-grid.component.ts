import { Component , Input, ChangeDetectionStrategy } from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {CardItemComponent} from '../cardItem/cardItem.component';


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
  @Input() items: ReadonlyArray<ProductItem> = [];
  trackById = (_: number, item: ProductItem) => item?.id ?? _;
}

export type ProductItem = {
  id: number | string;
  shortName: string;
  image: string;
  price: number;
};

