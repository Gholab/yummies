import {Component, Inject, OnInit} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {ProductGridComponent} from '../../molecules/product-grid/product-grid.component';
import {MenuItem} from '../../../models/menu-item.model';
import {CardItemCarousel} from '../../molecules/cart-item-carousel/card-item-carousel';
import {CartComponent} from '../../molecules/cart/cart.component';
import {GroupService} from '../../../services/group.service';
import {MENU_SERVICE} from '../../../services/services.token';
import {MenuService} from '../../../services/menu/menu.service';

@Component({
  selector: 'app-group-menu.component',
  imports: [
    TitleComponent,
    ProductGridComponent,
    CardItemCarousel,
    CartComponent
  ],
  templateUrl: './group-menu.component.html',
  standalone: true,
  styleUrl: './group-menu.component.scss'
})
export class GroupMenuComponent implements OnInit{

  group_starters : MenuItem[] = [];
  extra_starters : MenuItem[] = [];
  group_mains : MenuItem[] = [];
  extra_mains : MenuItem[] = [];
  group_desserts : MenuItem[] = [];
  extra_desserts : MenuItem[] = [];



  MOCK_GROUP_ITEMS : MenuItem[] = [   // a remplacer par la liste des items proposé par l'entreprise
    {
      _id: '1',
      shortName: 'Pizza Margherita',
      price: 9.5,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Margherita_Originale.jpg',
      description: 'Pizza italienne classique avec sauce tomate, mozzarella et basilic frais.',
      ingredients: [
        { name: 'Tomate', range: '1-1-2' },
        { name: 'Mozzarella', range: '1-1-2' },
        { name: 'Basilic', range: '0-1-1' }
      ],
      allergenes: ['lait']
    },
    {
      _id: '2',
      shortName: 'Burger Maison',
      price: 12.9,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Hamburger_%28black_bg%29.jpg',
      description: 'Burger gourmet avec steak haché, fromage fondu et pain brioché maison.',
      ingredients: [
        { name: 'Pain', range: '1-1-1' },
        { name: 'Steak', range: '1-1-2' },
        { name: 'Fromage', range: '0-1-1' }
      ],
      allergenes: ['gluten', 'lait']
    },
    {
      _id: '3',
      shortName: 'Salade César',
      price: 8.9,
      category: 'STARTER',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Caesar_salad_%281%29.jpg',
      description: 'Laitue croquante, poulet grillé, copeaux de parmesan et sauce César maison.',
      ingredients: [
        { name: 'Laitue', range: '1-1-1' },
        { name: 'Poulet', range: '0-1-2' },
        { name: 'Parmesan', range: '0-1-1' }
      ],
      allergenes: ['lait', 'œuf', 'poisson']
    }
  ]



  MOCK_ITEMS: MenuItem[] = [    // a remplacer par toutes les entrees proposees par le resto moins les entrees inclues dans le menu de l'entreprise
    {
      _id: '1',
      shortName: 'Pizza Margherita',
      price: 9.5,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Margherita_Originale.jpg',
      description: 'Pizza italienne classique avec sauce tomate, mozzarella et basilic frais.',
      ingredients: [
        { name: 'Tomate', range: '1-1-2' },
        { name: 'Mozzarella', range: '1-1-2' },
        { name: 'Basilic', range: '0-1-1' }
      ],
      allergenes: ['lait']
    },
    {
      _id: '2',
      shortName: 'Burger Maison',
      price: 12.9,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Hamburger_%28black_bg%29.jpg',
      description: 'Burger gourmet avec steak haché, fromage fondu et pain brioché maison.',
      ingredients: [
        { name: 'Pain', range: '1-1-1' },
        { name: 'Steak', range: '1-1-2' },
        { name: 'Fromage', range: '0-1-1' }
      ],
      allergenes: ['gluten', 'lait']
    },
    {
      _id: '3',
      shortName: 'Salade César',
      price: 8.9,
      category: 'STARTER',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Caesar_salad_%281%29.jpg',
      description: 'Laitue croquante, poulet grillé, copeaux de parmesan et sauce César maison.',
      ingredients: [
        { name: 'Laitue', range: '1-1-1' },
        { name: 'Poulet', range: '0-1-2' },
        { name: 'Parmesan', range: '0-1-1' }
      ],
      allergenes: ['lait', 'œuf', 'poisson']
    },
    {
      _id: '4',
      shortName: 'Sushi Mix',
      price: 14.5,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Sushi_platter.jpg',
      description: 'Assortiment varié de sushis frais : saumon, thon, crevette et maki.',
      ingredients: [
        { name: 'Riz', range: '1-1-1' },
        { name: 'Poisson', range: '1-1-2' },
        { name: 'Algue', range: '0-1-1' }
      ],
      allergenes: ['poisson', 'soja']
    },
    {
      _id: '5',
      shortName: 'Tacos Mexicain',
      price: 10.5,
      category: 'MAIN',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Tacos_de_carnitas%2C_Ciudad_de_M%C3%A9xico.jpg',
      description: 'Tacos traditionnels garnis de bœuf mariné, guacamole et salsa épicée.',
      ingredients: [
        { name: 'Tortilla', range: '1-1-1' },
        { name: 'Bœuf', range: '1-1-2' },
        { name: 'Guacamole', range: '0-1-1' }
      ],
      allergenes: []
    },
    {
      _id: '6',
      shortName: 'Crêpe Nutella',
      price: 6.0,
      category: 'DESSERT',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Crepe_with_nutella.jpg',
      description: 'Crêpe moelleuse garnie de Nutella et saupoudrée de sucre glace.',
      ingredients: [
        { name: 'Pâte à crêpe', range: '1-1-1' },
        { name: 'Nutella', range: '1-1-1' },
        { name: 'Sucre glace', range: '0-1-1' }
      ],
      allergenes: ['lait', 'gluten', 'noisette']
    },
    {
      _id: '7',
      shortName: 'Smoothie Fraise Banane',
      price: 5.5,
      category: 'BEVERAGE',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Strawberry_smoothie.jpg',
      description: 'Boisson onctueuse à base de fruits frais mixés et de lait végétal.',
      ingredients: [
        { name: 'Fraise', range: '1-1-2' },
        { name: 'Banane', range: '1-1-2' },
        { name: 'Lait végétal', range: '0-1-1' }
      ],
      allergenes: []
    }
  ];

  constructor(private groupService: GroupService,
              @Inject(MENU_SERVICE)private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getGroupMenuItems().subscribe({
      next: (items: any) => {
        this.group_starters = items.groupStarters;
        this.extra_starters = items.extraStarters;
        this.group_mains = items.groupMains;
        this.extra_mains = items.extraMains;
        this.group_desserts = items.groupDesserts;
        this.extra_desserts = items.extraDesserts;
      },
      error: (err: any) => {
        console.log("Error fetching group menuItems");
      }
    });
  }


  get groupName(){
    return this.groupService.getGroupName();
  }
}
