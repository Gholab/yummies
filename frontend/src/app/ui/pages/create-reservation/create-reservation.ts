import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import { TitleComponent } from '../../atoms/title/title.component';
import { ProductGridComponent } from '../../molecules/product-grid/product-grid.component';
import { ButtonComponent} from '../../atoms/button/button.component';
import { FormsModule } from '@angular/forms';
import {MenuCategory, MenuItem} from '../../../models/menu-item.model';
import {InputComponent} from '../../atoms/input/input';
import {map, Observable} from 'rxjs';
import {MENU_SERVICE} from '../../../services/services.token';
import {MenuService} from '../../../services/menu/menu.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [TitleComponent, ProductGridComponent, ButtonComponent, FormsModule, InputComponent],
  templateUrl: './create-reservation.html',
  styleUrls: ['./create-reservation.scss'],
})
export class CreateReservation {

  // 🟦 Champs du formulaire
  companyName: string = '';
  reservationCode: string = '';
  expectedGuests: number | null = null;
  menuPrice: number | null = null;

  // 🟦 Sélections de menu
  selectedEntrees: MenuItem[] = [];
  selectedPlats: MenuItem[] = [];
  selectedDesserts: MenuItem[] = [];

  menuItemsList: MenuItem[] = [];
  constructor(private cdr: ChangeDetectorRef,
              @Inject(MENU_SERVICE) private menuService: MenuService, private router:Router) {
  }

  ngOnInit(): void{
    this.populateMenuItemsList().subscribe((list) => {
      this.menuItemsList = list;
      console.log("[Frontend] MenuComponent: Menu items loaded", this.menuItemsList);
    });
  }


  // 🟦 Gestion des sélections (limité à 3 par catégorie)
  toggleSelection(item: MenuItem) {
    const list = this.getListByCategory(item.category);
    const index = list.findIndex(i => i._id === item._id);

    if (index >= 0) {
      list.splice(index, 1);
    } else {
      if (list.length < 3) list.push(item);
      else alert('Vous ne pouvez sélectionner que 3 éléments par catégorie.');
    }

    console.log('🟢 Sélections actuelles :', {
      entrees: this.selectedEntrees.map(i => i.shortName),
      plats: this.selectedPlats.map(i => i.shortName),
      desserts: this.selectedDesserts.map(i => i.shortName),
    });
  }


  get starters(): MenuItem[] {
    return this.menuItemsList.filter(i => i.category === 'STARTER');
  }

  get mains(): MenuItem[] {
    return this.menuItemsList.filter(i => i.category === 'MAIN');
  }

  get desserts(): MenuItem[] {
    return this.menuItemsList.filter(i => i.category === 'DESSERT');
  }


  getListByCategory(category: string): MenuItem[] {
    if (category === 'STARTER') return this.selectedEntrees;
    if (category === 'MAIN') return this.selectedPlats;
    return this.selectedDesserts;
  }

  // 🟦 Vérifie que les conditions minimales sont respectées
  canSubmit(): boolean {
    return (
      this.companyName.trim() !== '' &&
      this.reservationCode.trim() !== '' &&
      this.selectedEntrees.length >= 1 &&
      this.selectedPlats.length >= 1 &&
      this.selectedDesserts.length >= 1 &&
      !!this.expectedGuests &&
      !!this.menuPrice
    );
  }

  // 🟦 Simulation de sauvegarde
  saveReservation() {
    if (!this.canSubmit()) {
      alert('Veuillez remplir tous les champs et choisir au moins une entrée, un plat et un dessert.');
      return;
    }

    const reservation = {
      companyName: this.companyName,
      reservationCode: this.reservationCode,
      expectedGuests: this.expectedGuests,
      menuPrice: this.menuPrice,
      entrees: this.selectedEntrees,
      plats: this.selectedPlats,
      desserts: this.selectedDesserts,
    };

    console.log('✅ Réservation enregistrée :', reservation);
    alert('Réservation créée avec succès !');
  }

  private populateMenuItemsList(): Observable<MenuItem[]> {
    return this.menuService.getMenuItems();
  }
  goBack(){
    this.router.navigate(['/reservations']);
  }
}
