import {Component, Input, ChangeDetectionStrategy, Inject} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {CardItemComponent} from '../cardItem/cardItem.component';
import {MenuItem} from '../../../models/menu-item.model';
import {OrderService} from '../../../services/order/order.service';
import {ORDER_SERVICE} from '../../../services/services.token';
import {CartItem} from '../../../models/cart-item-model';

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
  @Input() type = '';
  @Input() items: ReadonlyArray<MenuItem> = [];
  @Input() subtitle: string = '';

  selectedItemId: string | null = null;
  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService) {}
  trackById = (_: number, item: MenuItem) => item?._id ?? _;


  onItemSelected(item: MenuItem) {
    console.log("Item selected !!!! : ", item);
    if (this.selectedItemId === item._id) {
      console.log("Déselection : ", item);
      // Déselection
      this.selectedItemId = null;
      this.orderService.removeMenuItem(item._id); // ✅ supprime du panier
    } else {
      console.log("Sélection : this.selectedItemId", this.selectedItemId);
      // Sélection d'un nouvel item
      if (this.selectedItemId) {
        // Si un autre était sélectionné → le retirer du panier
        this.orderService.removeMenuItem(this.selectedItemId);
      }
      this.selectedItemId = item._id;

      // ✅ ajout dans le panier
      const cartItem: CartItem = {
        menuItem: item,
        howMany: this.computeItemDefaultHowMany(item)
      };
      this.orderService.addMenuItem(cartItem).subscribe(() => {});
    }
  }

  computeItemDefaultHowMany(item: MenuItem) {
    let howMany = '1.';
    for (let ingredient of item.ingredients) {
      let splittedRange = ingredient.range.split('-');
      howMany = howMany + splittedRange[1];
    }
    return parseFloat(howMany);
  }
}



