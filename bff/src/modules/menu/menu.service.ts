import { Injectable, NotFoundException } from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ParsedMenuItemDto} from "./dto/parsedMenuItem.dto";
import {UnparsedMenuItemDto} from "./dto/unparsedMenuItem.dto";

@Injectable()
export class MenuService {
  private baseUrl = "http://localhost:9500/menu";

  private menuItemList : ParsedMenuItemDto[] = [];

  constructor(private http: HttpService) {}


  async getItemById(itemId: string): Promise<ParsedMenuItemDto> {
    let value = await this.http.get<UnparsedMenuItemDto>(`${this.baseUrl}/menus/${itemId}`).toPromise()
    if(value?.data === undefined){
      throw  new Error("Couldn't fetch menu with id "+itemId);
    }
    return this.parseMenuItem(value.data);
  }

  async getItems(): Promise<ParsedMenuItemDto[]> {
    console.log("Fetching items from backend")
    const response = await this.http.get<UnparsedMenuItemDto[]>(`${this.baseUrl}/menus`).toPromise();
    if (!response || !response.data) {
      throw new Error('Erreur lors de la récupération du menu');
    }
    console.log("items received, parsing and returning parsed Items")
    return response.data.map((item: UnparsedMenuItemDto) => this.parseMenuItem(item));
  }

  private parseMenuItem(item: UnparsedMenuItemDto): ParsedMenuItemDto {
    let parsedFullName;

    try {
      parsedFullName = JSON.parse(item.fullName);
    } catch (error) {
      throw new Error(`Invalid JSON in fullName for item ${item._id}: ${error}`);
    }

    return {
      _id: item._id,
      shortName: item.shortName,
      price: item.price,
      category: item.category,
      image: item.image,
      description: parsedFullName.description || "",
      ingredients: Array.isArray(parsedFullName.ingredients) ? parsedFullName.ingredients : [],
      allergenes: Array.isArray(parsedFullName.allergenes) ? parsedFullName.allergenes : []
    };
  }
}
