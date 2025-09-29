export interface MenuItem {
  _id: string,
  shortName: string,
  price: number,
  category: "STARTER" | "MAIN" | "DESSERT" | "BEVERAGE",
  image: string,
  description: string,
  ingredients: {
    name: string,
    range: string//au format "valeur minimale - valeur par défaut - valeur maximale", exemple : "0-1-1"
  }[],
  allergenes: string[]
}
