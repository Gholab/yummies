import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { Recipe } from '../schemas/recipe.schema';
import { PostEnum } from '../schemas/post-enum.schema';

export class StartupLogicService implements OnApplicationBootstrap {
  constructor(@InjectConnection() private connection: Connection) {}

  createRecipe(shortName: string, post: PostEnum, cookingSteps: string[], meanCookingTimeInSec: number): Recipe {
    const recipe: Recipe = new Recipe();
    recipe.shortName = shortName;
    recipe.post = post;
    recipe.cookingSteps = cookingSteps;
    recipe.meanCookingTimeInSec = meanCookingTimeInSec;
    return recipe;
  }

  async addRecipe(shortName: string, post: PostEnum, cookingSteps: string[], meanCookingTimeInSec: number) {
    const recipeModel = this.connection.models['Recipe'];

    const alreadyExists = await recipeModel.find({ shortName });
    if (alreadyExists.length > 0) {
      throw new Error('Recipe already exists.');
    }

    return recipeModel.create(this.createRecipe(shortName, post, cookingSteps, meanCookingTimeInSec));
  }

  async onApplicationBootstrap() {
    /* Starters */
    try {
      await this.addRecipe('risotto', PostEnum.HOT_DISH, ['Faire du risotto', 'Cook it!'], 18);
    } catch (e) {
    }
    try {
      await this.addRecipe('tarte poireaux', PostEnum.COLD_DISH,['Faire la tarte', 'La manger'], 16);
    } catch (e) {
    }
    try {
      await this.addRecipe('poulet curry', PostEnum.HOT_DISH,['Take goat cheese', 'Cook it!'], 15);
    } catch (e) {
    }
    try {
      await this.addRecipe('gratin dauphinois', PostEnum.HOT_DISH, ['Take salmon', 'Cook it!'], 16);
    } catch (e) {
    }
    try {
      await this.addRecipe('salade quinoa', PostEnum.HOT_DISH, ['Take crab', 'Cook it!', 'Make maki'], 16);
    } catch (e) {
    }
    try {
      await this.addRecipe('tagliatelles mer', PostEnum.COLD_DISH, ['Take burrata', 'Take mozzarella', 'Put them togther', 'Shake', 'Ok it\'s finished!'], 16);
    } catch (e) {
    }

    /* Main */
    try {
      await this.addRecipe('soupe thai', PostEnum.HOT_DISH, ['Stretch pizza dough', 'Put toppings on it', 'Bake at 350 Celsius degree'], 10);
    } catch (e) {
    }
    try {
      await this.addRecipe('brownie', PostEnum.HOT_DISH, ['Get the frozen dish', 'Oven it at 220 Celsius degree'], 8);
    } catch (e) {
    }
    try {
      await this.addRecipe('chocolate', PostEnum.HOT_DISH, ['Take piece of beef', 'Cook it!', 'Make the burger', 'Don\'t forget fries!!'], 19);
    } catch (e) {
    }
    try {
      await this.addRecipe('lemon', PostEnum.HOT_DISH, ['Take piece of beef chuck', 'Cook it!', 'Don\'t forget fries!!'], 24);
    } catch (e) {
    }
    try {
      await this.addRecipe('rasp and peaches', PostEnum.HOT_DISH, ['Take tuna', 'Half-cook it!'], 23);
    } catch (e) {
    }

    /* Desserts */
    try {
      await this.addRecipe('strawberries', PostEnum.COLD_DISH, ['Take a piece of brownie', 'Oven it quickly', 'Put it in a plate', 'Add some vanilla ice', 'Add some cream'], 6);
    } catch (e) {
    }
    try {
      await this.addRecipe('seasonal fruit', PostEnum.COLD_DISH, ['Put some chocolate ice cream in a plate'], 12);
    } catch (e) {
    }
    try {
      await this.addRecipe('milkshake noisette', PostEnum.COLD_DISH, ['Take lemon cream', 'Take limoncello sorbet', 'Put all in a plate'], 12);
    } catch (e) {
    }
    try {
      await this.addRecipe('smoothie cacahuète', PostEnum.COLD_DISH, ['Take raspberries', 'Take peaches', 'That\'s it'], 12);
    } catch (e) {
    }
    try {
      await this.addRecipe('frappuccino caramel', PostEnum.COLD_DISH, ['Put some strawberries in a plate', 'Add vanilla mascarpone mousse'], 12);
    } catch (e) {
    }
    try {
      await this.addRecipe('pina colada', PostEnum.COLD_DISH, ['Put some seasonal fruit in a bowl'], 12);
    } catch (e) {
    }
    try {
      await this.addRecipe('irish coffee glacé', PostEnum.COLD_DISH, ['Take a prepared tiramisu'], 10);
    } catch (e) {
    }

    /* Beverage */
    try {
      await this.addRecipe('cocktail amande miel', PostEnum.BAR, ['Serve it!'], 2);
    } catch (e) {
    }
    try {
      await this.addRecipe('milkshake fraise biscuit', PostEnum.BAR, ['Serve it!'], 2);
    } catch (e) {
    }
    try {
      await this.addRecipe('cocktail noisette chocolat', PostEnum.BAR, ['Serve it!'], 2);
    } catch (e) {
    }
    try {
      await this.addRecipe('frappé moka', PostEnum.BAR, ['Serve it!'], 2);
    } catch (e) {
    }
    try {
      await this.addRecipe('cocktail bière pomme', PostEnum.BAR, ['Prosecco: 3 cl', 'Aperol: 2 cl', 'A bit of Schweppes Tonic Original', 'Shake it!',  'Serve it!'], 20);
    } catch (e) {
    }
  }
}
