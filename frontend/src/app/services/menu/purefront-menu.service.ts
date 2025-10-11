  import {MenuService} from './menu.service';
  import {Injectable} from '@angular/core';
  import {MenuItem} from '../../models/menu-item.model';
  import {HttpClient} from '@angular/common/http';
  import {UnparsedMenuItem} from '../../models/unparsed/unparsed-menu-item.model';
  import {map, Observable} from 'rxjs';

  @Injectable({
    providedIn: "root"
  })
  export class PurefrontMenuService extends MenuService {
    private baseUrl= "http://localhost:9500/menu";
    private loggerPrefix: string = "[PureFront Version | MenuService] :";
    constructor(private http: HttpClient) {
      super();
    }

    getMenuItems(): Observable<MenuItem[]> {
      let unparsedMenuItems=this.http.get<UnparsedMenuItem[]>(`${this.baseUrl}/menus`);
      console.log(this.loggerPrefix+"fetched menu items from backend :", unparsedMenuItems);
      let parsedMenuItems = unparsedMenuItems.pipe(map(items=>items.map(item=>{console.log(item);  return this.parseMenuItem(item)})));
      console.log(this.loggerPrefix+"Parsed menu items : ", parsedMenuItems);

      return parsedMenuItems;
    }

    getMenuItemById(id: string): Observable<MenuItem | undefined> {
      let unparsedMenuItem=this.http.get<UnparsedMenuItem>(`${this.baseUrl}/menus/${id}`);
      console.log(this.loggerPrefix+`Fetched menuItem of id ${id} and parsed it`)
      return unparsedMenuItem.pipe(map(item=>this.parseMenuItem(item)));
    }

    private parseMenuItem(item: UnparsedMenuItem): MenuItem {
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
