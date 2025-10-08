export class FrontOrderItemDTO {
    howMany: number;
    menuItem: {
        allergenes: string[];
        category: string;
        description: string;
        image: string;
        ingredients: any;
        price: number;
        shortName: string;
        _id: string;
    }
}
