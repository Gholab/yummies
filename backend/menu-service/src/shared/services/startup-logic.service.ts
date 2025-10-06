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
                displayName: "Risotto aux champignons sauvages",
                description: "Crémeux risotto cuisiné avec des champignons de saison et du parmesan.",
                ingredients: [
                    { name: "Riz arborio", range: "0-1-1" },
                    { name: "Champignons", range: "0-1-1" },
                    { name: "Crème", range: "0-1-2" },
                    { name: "Parmesan", range: "0-1-2" },
                    { name: "Beurre", range: "0-1-1" }
                ],
                allergenes: ["lactose", "sulfites"]
            }), "risotto", 17, CategoryEnum.MAIN, "https://assets.afcdn.com/recipe/20201006/114629_w1024h1024c1cx3608cy2706cxt0cyt0cxb7216cyb5412.webp");
        } catch (e) {}
        try {
            await this.addMenuItem(JSON.stringify({
                displayName: "Tarte aux poireaux et lardons",
                description: "Une tarte salée croustillante avec poireaux fondants et lardons fumés.",
                ingredients: [
                    { name: "Pâte brisée", range: "0-1-1" },
                    { name: "Poireaux", range: "0-1-1" },
                    { name: "Crème fraîche", range: "0-1-1" },
                    { name: "Lardons", range: "0-1-3" },
                    { name: "Oeufs", range: "0-1-1" }
                ],
                allergenes: ["gluten", "oeufs", "lactose"]
            }), "tarte poireaux", 15, CategoryEnum.MAIN, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xT0X6WcO5bMGa5HkXmapOeK1n4bEDtdY7g&s");
        } catch (e) {}
        try {
            await this.addMenuItem(JSON.stringify({
                displayName: "Poulet au curry et lait de coco",
                description: "Poulet tendre mijoté dans une sauce au curry et lait de coco parfumé.",
                ingredients: [
                    { name: "Poulet", range: "0-1-2" },
                    { name: "Lait de coco", range: "0-1-1" },
                    { name: "Curry", range: "0-1-2" },
                    { name: "Oignons", range: "0-0-1" },
                    { name: "Riz basmati", range: "0-1-1" }
                ],
                allergenes: ["fruits à coque", "sulfites"]
            }), "poulet curry", 18, CategoryEnum.MAIN, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYIzcWfqZ6s6DhK7u0yqdUu91lQt0ibMQtzA&s");
        } catch (e) {}
        try {
            await this.addMenuItem(JSON.stringify({
                displayName: "Gratin dauphinois",
                description: "Pommes de terre fondantes cuites dans la crème et le lait, gratinées au four.",
                ingredients: [
                    { name: "Pommes de terre", range: "1-1-1" },
                    { name: "Crème", range: "0-1-1" },
                    { name: "Lait", range: "0-1-1" },
                    { name: "Beurre", range: "0-1-1" },
                    { name: "Ail", range: "0-1-1" }
                ],
                allergenes: ["lactose", "sulfites"]
            }), "gratin dauphinois", 14, CategoryEnum.MAIN, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScgIHt2a9eix-UTjb3qxKWdhoCv8XVxfdAXg&s");
        } catch (e) {}
        try {
            await this.addMenuItem(JSON.stringify({
                displayName: "Salade de quinoa, feta et noix",
                description: "Salade fraîche avec quinoa, légumes croquants, feta et noix grillées.",
                ingredients: [
                    { name: "Quinoa", range: "0-1-1" },
                    { name: "Feta", range: "0-1-2" },
                    { name: "Noix", range: "0-1-1" },
                    { name: "Tomates cerises", range: "0-1-1" },
                    { name: "Concombre", range: "1-1-1" }
                ],
                allergenes: ["lactose", "fruits à coque"]
            }), "salade quinoa", 13, CategoryEnum.STARTER, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbib16I4HX1EfsUxvpkGXJ9AqlJnqDfMNDg&s");
        } catch (e) {}
        try {
            await this.addMenuItem(JSON.stringify({
                displayName: "Tagliatelles aux fruits de mer",
                description: "Pâtes fraîches accompagnées de crevettes, moules et calamars dans une sauce crémeuse.",
                ingredients: [
                    { name: "Tagliatelles", range: "1-1-2" },
                    { name: "Crevettes", range: "0-0-1" },
                    { name: "Moules", range: "0-1-1" },
                    { name: "Crème", range: "1-1-1" },
                    { name: "Ail", range: "0-1-1" }
                ],
                allergenes: ["gluten", "crustacés", "mollusques", "lactose"]
            }), "tagliatelles mer", 19, CategoryEnum.MAIN, "https://assets.afcdn.com/recipe/20150806/63231_w1024h576c1cx3000cy2000.webp");
        } catch (e) {}
        try {
            await this.addMenuItem(JSON.stringify({
                displayName: "Soupe thaï au lait de coco",
                description: "Soupe parfumée au gingembre, citronnelle et lait de coco.",
                ingredients: [
                    { name: "Lait de coco", range: "0-1-1" },
                    { name: "Gingembre", range: "1-1-1" },
                    { name: "Citronnelle", range: "0-1-1" },
                    { name: "Poulet", range: "1-1-2" },
                    { name: "Piment", range: "0-1-1" }
                ],
                allergenes: ["fruits à coque", "sulfites"]
            }), "soupe thaï", 12, CategoryEnum.STARTER, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgS3NtvbC1w3C5uLeLfU5SIwmH2hyN9WqiQg&s");
        } catch (e) {}
        try {
            await this.addMenuItem(JSON.stringify({
                    displayName: "Brownie (home made)",
                    description: "Delicious homemade brownie.",
                    ingredients: [
                        { name: "Chocolate", range: "1-1-2" },
                        { name: "Flour", range: "1-1-2" },
                        { name: "Sugar", range: "1-1-2" },
                        { name: "Eggs", range: "1-1-2" },
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
