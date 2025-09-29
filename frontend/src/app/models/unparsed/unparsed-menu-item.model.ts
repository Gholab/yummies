export interface UnparsedMenuItem {
  _id: string,
  shortName: string,
  fullName: string,
  price: number,
  category: "STARTER" | "MAIN" | "DESSERT" | "BEVERAGE",
  image: string
}
