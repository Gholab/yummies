/**
 * Modèle utilisé par le backend des profs "dining", utilisé pour ajouter un menu item à la commande
 */
export interface AddMenuItemDto {
  menuItemId: string,
  menuItemShortName: string,
  howMany: number
}
