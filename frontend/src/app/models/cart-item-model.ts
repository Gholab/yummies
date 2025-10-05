import {MenuItem} from './menu-item.model';

export interface CartItem {
  menuItem: MenuItem,
  howMany: number;
  modifications: { [ingredientName: string]: number }
}
