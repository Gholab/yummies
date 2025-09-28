import {MenuService} from './menu.service';
import {Injectable} from '@angular/core';
import {MenuItem} from '../../models/menu-item.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BffMenuService extends MenuService {
  private baseUrl= "http://localhost:9500/menu";

  constructor(private http: HttpClient) {
    super();
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}/menus`);
  }

  getMenuItemById(id: string): Observable<MenuItem | undefined> {
    return this.http.get<MenuItem>(`${this.baseUrl}/menus/${id}`);
  }
}
