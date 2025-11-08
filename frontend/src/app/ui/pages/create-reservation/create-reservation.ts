import { Component } from '@angular/core';
import { TitleComponent } from '../../atoms/title/title.component';
import { ProductGridComponent } from '../../molecules/product-grid/product-grid.component';
import { ButtonComponent} from '../../atoms/button/button.component';
import { FormsModule } from '@angular/forms';
import { MenuItem} from '../../../models/menu-item.model';
import {InputComponent} from '../../atoms/input/input';

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
    return this.allItems.filter(i => i.category === 'STARTER');
  }

  get mains(): MenuItem[] {
    return this.allItems.filter(i => i.category === 'MAIN');
  }

  get desserts(): MenuItem[] {
    return this.allItems.filter(i => i.category === 'DESSERT');
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

  allItems: MenuItem[] = [
    // 🥗 STARTERS
    {
      _id: '1',
      shortName: 'Salade César',
      price: 8.9,
      category: 'STARTER',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Caesar_salad_%281%29.jpg',
      description: 'Salade croquante, poulet grillé, parmesan et sauce césar maison.',
      ingredients: [
        { name: 'salade romaine', range: '0-1-1' },
        { name: 'poulet grillé', range: '0-1-1' },
        { name: 'parmesan', range: '0-1-1' },
        { name: 'croûtons', range: '0-1-1' }
      ],
      allergenes: ['lait', 'gluten', 'œufs']
    },
    {
      _id: '2',
      shortName: 'Soupe du Jour',
      price: 6.5,
      category: 'STARTER',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Bowl_of_vegetable_soup.jpg',
      description: 'Soupe maison selon les légumes de saison.',
      ingredients: [
        { name: 'carottes', range: '0-1-1' },
        { name: 'poireaux', range: '0-1-1' },
        { name: 'pommes de terre', range: '0-1-1' }
      ],
      allergenes: []
    },
    {
      _id: '3',
      shortName: 'Bruschetta Tomate Basilic',
      price: 7.0,
      category: 'STARTER',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Bruschetta_al_pomodoro.jpg',
      description: 'Pain grillé à l’huile d’olive, tomates fraîches et basilic.',
      ingredients: [
        { name: 'pain', range: '0-1-1' },
        { name: 'tomates', range: '0-1-1' },
        { name: 'basilic', range: '0-1-1' },
        { name: 'huile d’olive', range: '0-1-1' }
      ],
      allergenes: ['gluten']
    },
    {
      _id: '4',
      shortName: 'Œuf poché',
      price: 8.5,
      category: 'STARTER',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Poached_egg_with_asparagus.jpg',
      description: 'Œuf poché sur lit d’asperges vertes et sauce hollandaise.',
      ingredients: [
        { name: 'œuf', range: '0-1-1' },
        { name: 'asperges', range: '0-1-1' },
        { name: 'beurre', range: '0-1-1' },
        { name: 'citron', range: '0-1-1' }
      ],
      allergenes: ['œufs', 'lait']
    },
    {
      _id: '5',
      shortName: 'Tartare de saumon',
      price: 9.5,
      category: 'STARTER',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Salmon_tartare.jpg',
      description: 'Saumon frais coupé au couteau, citron vert et herbes.',
      ingredients: [
        { name: 'saumon', range: '0-1-1' },
        { name: 'citron vert', range: '0-1-1' },
        { name: 'ciboulette', range: '0-1-1' }
      ],
      allergenes: ['poisson']
    },
    {
      _id: '6',
      shortName: 'Camembert rôti',
      price: 8.0,
      category: 'STARTER',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Baked_camembert.jpg',
      description: 'Camembert rôti au miel et aux noix, servi avec du pain grillé.',
      ingredients: [
        { name: 'camembert', range: '0-1-1' },
        { name: 'miel', range: '0-1-1' },
        { name: 'noix', range: '0-1-1' },
        { name: 'pain', range: '0-1-1' }
      ],
      allergenes: ['lait', 'fruits à coque', 'gluten']
    },

    // 🍝 MAINS
    {
      _id: '7',
      shortName: 'Burger Maison',
      price: 12.9,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Hamburger_%28black_bg%29.jpg',
      description: 'Burger bœuf, cheddar, bacon et sauce secrète.',
      ingredients: [
        { name: 'bœuf', range: '0-1-1' },
        { name: 'cheddar', range: '0-1-1' },
        { name: 'pain burger', range: '0-1-1' },
        { name: 'bacon', range: '0-1-1' }
      ],
      allergenes: ['gluten', 'lait']
    },
    {
      _id: '8',
      shortName: 'Pâtes Carbonara',
      price: 11.5,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Spaghetti_alla_Carbonara.jpg',
      description: 'Spaghetti à la crème, œuf et pancetta.',
      ingredients: [
        { name: 'pâtes', range: '0-1-1' },
        { name: 'œuf', range: '0-1-1' },
        { name: 'crème', range: '0-1-1' },
        { name: 'pancetta', range: '0-1-1' }
      ],
      allergenes: ['gluten', 'lait', 'œufs']
    },
    {
      _id: '9',
      shortName: 'Risotto aux champignons',
      price: 13.0,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Risotto_ai_funghi.jpg',
      description: 'Risotto crémeux aux cèpes et parmesan.',
      ingredients: [
        { name: 'riz arborio', range: '0-1-1' },
        { name: 'champignons', range: '0-1-1' },
        { name: 'parmesan', range: '0-1-1' }
      ],
      allergenes: ['lait']
    },
    {
      _id: '10',
      shortName: 'Poulet au curry',
      price: 12.0,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Chicken_curry_dish.jpg',
      description: 'Poulet mijoté dans une sauce curry et lait de coco.',
      ingredients: [
        { name: 'poulet', range: '0-1-1' },
        { name: 'curry', range: '0-1-1' },
        { name: 'lait de coco', range: '0-1-1' }
      ],
      allergenes: []
    },
    {
      _id: '11',
      shortName: 'Steak frites',
      price: 14.5,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Steak_frites.jpg',
      description: 'Pièce de bœuf grillée servie avec frites maison.',
      ingredients: [
        { name: 'bœuf', range: '0-1-1' },
        { name: 'pommes de terre', range: '0-1-1' },
        { name: 'sel', range: '0-1-1' }
      ],
      allergenes: []
    },
    {
      _id: '12',
      shortName: 'Filet de dorade',
      price: 15.0,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Dorade_grillee.jpg',
      description: 'Dorade grillée, légumes croquants et citron confit.',
      ingredients: [
        { name: 'dorade', range: '0-1-1' },
        { name: 'courgette', range: '0-1-1' },
        { name: 'citron confit', range: '0-1-1' }
      ],
      allergenes: ['poisson']
    },

    // 🍰 DESSERTS
    {
      _id: '13',
      shortName: 'Crêpe Nutella',
      price: 6.0,
      category: 'DESSERT',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Crepe_with_nutella.jpg',
      description: 'Crêpe moelleuse garnie de pâte à tartiner.',
      ingredients: [
        { name: 'farine', range: '0-1-1' },
        { name: 'œuf', range: '0-1-1' },
        { name: 'lait', range: '0-1-1' },
        { name: 'Nutella', range: '0-1-1' }
      ],
      allergenes: ['gluten', 'lait', 'œufs', 'fruits à coque']
    },
    {
      _id: '14',
      shortName: 'Tiramisu',
      price: 6.5,
      category: 'DESSERT',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Tiramisu_-_Raffaele_Diomede.jpg',
      description: 'Dessert italien à la mascarpone et au café.',
      ingredients: [
        { name: 'mascarpone', range: '0-1-1' },
        { name: 'café', range: '0-1-1' },
        { name: 'biscuits cuillère', range: '0-1-1' }
      ],
      allergenes: ['lait', 'œufs', 'gluten']
    },
    {
      _id: '15',
      shortName: 'Fondant au chocolat',
      price: 7.0,
      category: 'DESSERT',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Chocolate_fondant.jpg',
      description: 'Gâteau fondant avec cœur coulant au chocolat noir.',
      ingredients: [
        { name: 'chocolat', range: '0-1-1' },
        { name: 'beurre', range: '0-1-1' },
        { name: 'œufs', range: '0-1-1' },
        { name: 'farine', range: '0-1-1' }
      ],
      allergenes: ['lait', 'gluten', 'œufs']
    },
    {
      _id: '16',
      shortName: 'Tarte aux pommes',
      price: 5.5,
      category: 'DESSERT',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Apple_pie.jpg',
      description: 'Pâte sablée et pommes caramélisées au four.',
      ingredients: [
        { name: 'pommes', range: '0-1-1' },
        { name: 'farine', range: '0-1-1' },
        { name: 'beurre', range: '0-1-1' },
        { name: 'sucre', range: '0-1-1' }
      ],
      allergenes: ['gluten', 'lait']
    },
    {
      _id: '17',
      shortName: 'Mousse au citron',
      price: 5.9,
      category: 'DESSERT',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Lemon_mousse.jpg',
      description: 'Mousse légère au citron frais.',
      ingredients: [
        { name: 'citron', range: '0-1-1' },
        { name: 'crème', range: '0-1-1' },
        { name: 'œufs', range: '0-1-1' }
      ],
      allergenes: ['lait', 'œufs']
    },
    {
      _id: '18',
      shortName: 'Café gourmand',
      price: 7.5,
      category: 'DESSERT',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Cafe_gourmand.jpg',
      description: 'Assortiment de mini-desserts accompagnés d’un café.',
      ingredients: [
        { name: 'café', range: '0-1-1' },
        { name: 'crème', range: '0-1-1' },
        { name: 'sucre', range: '0-1-1' }
      ],
      allergenes: ['lait', 'œufs', 'gluten']
    }
  ];

}
