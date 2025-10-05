export class OrderItemDTO {
  menuItemId: string;
  menuItemShortName: {
    name: string;
    modifications: { [ingredientName: string]: number };
  };
  howMany: number;  
}
