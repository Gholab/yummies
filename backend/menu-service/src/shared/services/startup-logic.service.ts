import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { AddMenuItemDto } from '../../menus/dto/add-menu-item.dto';

import { CategoryEnum } from '../../menus/schemas/category-enum.schema';

export class StartupLogicService implements OnApplicationBootstrap {
  constructor(@InjectConnection() private connection: Connection) {}

  createMenuItem(fullName: string, shortName: string, price: number, category: CategoryEnum, image: string = null): AddMenuItemDto {
    const menuItem: AddMenuItemDto = new AddMenuItemDto();
    menuItem.fullName = fullName;
    menuItem.shortName = shortName;
    menuItem.price = price;
    menuItem.category = category;
    menuItem.image = image;
    return menuItem;
  }

  async addMenuItem(fullName: string, shortName: string, price: number, category: CategoryEnum, image: string = null) {
    const menuItemModel = this.connection.models['MenuItem'];

    const alreadyExists = await menuItemModel.find({ shortName });
    if (alreadyExists.length > 0) {
      throw new Error('Menu Item already exists.');
    }

    return menuItemModel.create(this.createMenuItem(fullName, shortName, price, category, image));
  }

  async onApplicationBootstrap() {
    try {
      await this.addMenuItem(JSON.stringify({
        displayName: "Homemade foie gras terrine",
        description: "Traditional foie gras served with toasted bread.",
        ingredients: [
          { name: "Foie gras", range: "0-1-1" },
          { name: "Bread", range: "0-1-2" }
        ],
        allergenes: ["gluten"]
      }),
        "foie gras",
        18,
        CategoryEnum.STARTER,
        "https://cdn.pixabay.com/photo/2016/11/12/15/28/restaurant-1819024_960_720.jpg"
      );
    } catch (e) {
    }
    try {
      await this.addMenuItem(JSON.stringify({
        displayName: "Soft-boiled egg breaded with breadcrumbs and nuts",
        description: "Crispy breaded egg with nutty flavor.",
        ingredients: [
          { name: "Egg", range: "0-1-1" },
          { name: "Breadcrumbs", range: "0-1-2" },
          { name: "Nuts", range: "0-1-1" }
        ],
        allergenes: ["eggs", "nuts", "gluten"]
      }), "soft-boiled egg", 16, CategoryEnum.STARTER,
        "https://cdn.pixabay.com/photo/2019/06/03/22/06/eggs-4250077_960_720.jpg");
    } catch (e) {
    }
    try {
      await this.addMenuItem(JSON.stringify({
        displayName: "Goat cheese foam from Valbonne goat farm",
        description: "Light and airy goat cheese preparation.",
        ingredients: [
          { name: "Goat cheese", range: "0-1-2" }
        ],
        allergenes: ["lactose"]
      }), "goat cheese", 15, CategoryEnum.STARTER,
        "https://cdn.pixabay.com/photo/2016/09/15/19/24/salad-1672505_960_720.jpg");
    } catch (e) {
    }
    try {
      await this.addMenuItem(JSON.stringify({
        displayName: "Homemade dill salmon gravlax",
        description: "Marinated salmon with dill and spices.",
        ingredients: [
          { name: "Salmon", range: "0-1-1" },
          { name: "Dill", range: "0-1-1" }
        ],
        allergenes: ["fish"]
      }), "salmon", 16, CategoryEnum.STARTER,
        "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg");
    } catch (e) {
    }
    try {
      await this.addMenuItem(JSON.stringify({
        displayName: "Homemade dill salmon gravlax",
        description: "Marinated salmon with dill and spices.",
        ingredients: [
          { name: "Salmon", range: "0-1-1" },
          { name: "Dill", range: "0-1-1" }
        ],
        allergenes: ["fish"]
      }), "salmon", 16, CategoryEnum.STARTER,
        "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg");
  } catch(e) {
  }
    try {
await this.addMenuItem(JSON.stringify({
      displayName: "Burrata Mozzarella",
      description: "Creamy burrata with fresh garnish.",
      ingredients: [
        { name: "Mozzarella", range: "0-1-1" }
      ],
      allergenes: ["lactose"]
    }), "burrata", 16, CategoryEnum.STARTER,
      "https://cdn.pixabay.com/photo/2021/02/08/12/40/burrata-5994616_960_720.jpg");
  } catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Delicious Pizza Regina",
      description: "Classic pizza with tomato, mozzarella, and basil.",
      ingredients: [
        { name: "Tomato", range: "0-1-1" },
        { name: "Mozzarella", range: "0-1-2" },
        { name: "Basil", range: "0-1-1" }
      ],
      allergenes: ["gluten", "lactose"]
    }), "pizza", 12, CategoryEnum.MAIN,
      "https://cdn.pixabay.com/photo/2020/02/27/20/13/cake-4885715_1280.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Lasagna al forno",
      description: "Classic Italian lasagna with layers of pasta, meat, and cheese.",
      ingredients: [
        { name: "Lasagna sheets", range: "0-1-2" },
        { name: "Ground beef", range: "0-1-1" },
        { name: "Tomato sauce", range: "0-1-1" },
        { name: "Mozzarella cheese", range: "0-1-2" },
        { name: "Parmesan cheese", range: "0-1-1" }
      ],
      allergenes: ["gluten", "lactose"]
    }), "lasagna", 18, CategoryEnum.MAIN,
      "https://cdn.pixabay.com/photo/2017/02/15/15/17/meal-2069021_1280.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Homemade beef burger",
      description: "Juicy beef burger with fresh toppings.",
      ingredients: [
        { name: "Beef patty", range: "0-1-1" },
        { name: "Burger bun", range: "0-1-1" },
        { name: "Lettuce", range: "0-1-1" },
        { name: "Tomato", range: "0-1-1" },
        { name: "Cheese", range: "0-1-1" }
      ],
      allergenes: ["gluten", "lactose"]
    }), "beef burger", 19, CategoryEnum.MAIN,
      "https://cdn.pixabay.com/photo/2022/01/17/19/24/burger-6945571_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Beef chuck cooked 48 hours at low temperature",
      description: "Tender beef chuck slow-cooked for 48 hours.",
      ingredients: [
        { name: "Beef chuck", range: "0-1-1" }
      ],
      allergenes: []
    }), "beef chuck", 24, CategoryEnum.MAIN,
      "https://cdn.pixabay.com/photo/2017/01/23/15/36/eat-2002918_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Half cooked tuna and octopus grilled on the plancha",
      description: "A delightful dish featuring half-cooked tuna and octopus, grilled to perfection.",
      ingredients: [
        { name: "Tuna", range: "0-1-1" },
        { name: "Octopus", range: "0-1-1" }
      ],
      allergenes: []
    }), "half cooked tuna", 23, CategoryEnum.MAIN,
      "https://cdn.pixabay.com/photo/2019/09/20/05/53/tuna-4490877_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Brownie (home made)",
      description: "Delicious homemade brownie.",
      ingredients: [
        { name: "Chocolate", range: "0-1-2" },
        { name: "Flour", range: "0-1-2" },
        { name: "Sugar", range: "0-1-2" },
        { name: "Eggs", range: "0-1-2" },
        { name: "Butter", range: "0-1-2" }
      ],
      allergenes: [
        "gluten",
        "eggs",
        "lactose"
      ]
    }), "brownie", 6.5, CategoryEnum.DESSERT,
      "https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Valrhona chocolate declination with salted chocolate ice cream",
      description: "A rich chocolate dessert with a touch of salt.",
      ingredients: [ 
        { name: "Valrhona chocolate", range: "0-1-2" },
        { name: "Salt", range: "0-1-1" },
        { name: "Chocolate ice cream", range: "0-1-2" }
      ],  
      allergenes: [
        "lactose",
        "eggs"
      ]
    }), "chocolate", 12, CategoryEnum.DESSERT,
      "https://cdn.pixabay.com/photo/2020/07/31/11/53/ice-cream-5452794_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Marmalade of Menton\'s lemon - Lemon cream - Limoncello jelly and sorbet - Homemade meringue",
      description: "",
      ingredients: [
        { name: "Lemon", range: "0-1-2" },
        { name: "Limoncello", range: "0-1-1" },
        { name: "Eggs", range: "0-1-2" }
      ],
      allergenes: [
        "eggs",
      ]
    }), "lemon", 12, CategoryEnum.DESSERT,
      "https://cdn.pixabay.com/photo/2018/05/01/18/19/eat-3366425_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Fresh raspberries and peaches",
      description: "",
      ingredients: [
        { name: "Raspberries", range: "0-1-2" },
        { name: "Peaches", range: "0-1-2" }
      ],
      allergenes: []
    }), "rasp and peaches", 12, CategoryEnum.DESSERT,
      "https://cdn.pixabay.com/photo/2020/05/15/17/28/fruit-plate-5174414_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Dessert of fresh strawberries and vanilla mascarpone mousse",
      description: "",
      ingredients: [],
      allergenes: []
    }), "strawberries", 12, CategoryEnum.DESSERT,
      "https://cdn.pixabay.com/photo/2018/04/09/18/20/strawberry-3304967_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Fresh seasonal fruit",
      description: "",
      ingredients: [],
      allergenes: []
    }), "seasonal fruit", 12, CategoryEnum.DESSERT,
      "https://cdn.pixabay.com/photo/2016/08/09/19/03/fruit-1581400_960_720.jpg");
} catch (e) {
}

try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Bottled coke (33cl)",
      description: "",
      ingredients: [],
      allergenes: []
    }), "coke", 3.5, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2019/11/14/15/47/coke-4626458_1280.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Ice Tea (33cl)",
      description: "",
      ingredients: [],
      allergenes: []
    }), "ice tea", 3.5, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2022/04/11/08/52/iced-tea-7125271_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Bottled water",
      description: "",
      ingredients: [],
      allergenes: []
    }), "bottled water", 1, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2014/12/11/09/49/water-564048_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Sparkling water",
      description: "",
      ingredients: [],
      allergenes: []
    }), "sparkling water", 1.5, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2018/10/23/19/39/water-3768773_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Spritz",
      description: "",
      ingredients: [],
      allergenes: []
    }), "spritz", 5, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2020/05/12/21/17/spritz-5164971_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Margarita",
      description: "",
      ingredients: [],
      allergenes: []
    }), "margarita", 6.5, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2014/08/11/08/37/margarita-415360_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Tequila sunrise",
      description: "",
      ingredients: [],
      allergenes: []
    }), "tequila", 7, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2018/01/25/19/33/summer-3106910_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Mojito",
      description: "",
      ingredients: [],
      allergenes: []
    }), "mojito", 6, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2015/03/30/12/35/mojito-698499_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Martini",
      description: "",
      ingredients: [],
      allergenes: []
    }), "martini", 7, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2015/10/19/07/50/cocktail-995574_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Lemonade",
      description: "",
      ingredients: [],
      allergenes: []
    }), "lemonade", 3, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2016/07/21/11/17/drink-1532300_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Apple juice",
      description: "",
      ingredients: [],
      allergenes: []
    }), "apple juice", 3, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2016/11/28/22/07/punch-1866178_960_720.jpg");
} catch (e) {
}
try {
  await this.addMenuItem(JSON.stringify({
      displayName: "Café",
      description: "",
      ingredients: [],
      allergenes: []
    }), "café", 1.8, CategoryEnum.BEVERAGE,
      "https://cdn.pixabay.com/photo/2014/12/11/02/56/coffee-563797_960_720.jpg");
} catch (e) {
}
  }
}
