import {Component, Input, ChangeDetectionStrategy, Inject, EventEmitter, Output} from '@angular/core';
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
  @Input() maxSelectableItems = 1; // par défaut, une seule sélection

  @Output() itemSelected = new EventEmitter<MenuItem>();

  selectedItemIds: string[] = [];

  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService) {}
  trackById = (_: number, item: MenuItem) => item?._id ?? _;

  onItemSelected(item: MenuItem) {
    console.log("Item selected !!!! : ", item);

    const isSelected = this.selectedItemIds.includes(item._id);

    // 🔸 Si déjà sélectionné → on le retire
    if (isSelected) {
      console.log("Déselection : ", item);
      this.selectedItemIds = this.selectedItemIds.filter(id => id !== item._id);
      this.orderService.removeMenuItem(item._id);
    }
    // 🔸 Si nouveau clic → tentative d’ajout
    else {
      // Si on n’est pas en mode group → reset la sélection
      if (this.type !== 'group') {
        if (this.selectedItemIds.length > 0) {
          this.selectedItemIds.forEach(id => this.orderService.removeMenuItem(id));
        }
        this.selectedItemIds = [item._id];
      }
      // Si mode group → vérifier qu’on n’a pas atteint le max
      else {
        if (this.selectedItemIds.length >= this.maxSelectableItems) {
          console.warn(`Nombre max d’items sélectionnés atteint (${this.maxSelectableItems}).`);
          return;
        }
        this.selectedItemIds.push(item._id);
      }

      // ✅ Ajout dans le panier
      const cartItem: CartItem = {
        menuItem: item,
        howMany: this.computeItemDefaultHowMany(item)
      };
      this.orderService.addMenuItem(cartItem).subscribe(() => {});
    }

    this.itemSelected.emit(item);
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



