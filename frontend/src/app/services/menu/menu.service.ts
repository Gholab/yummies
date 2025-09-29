import {MenuItem} from '../../models/menu-item.model';
import {Observable} from 'rxjs';

export abstract class MenuService {
  abstract getMenuItems(): Observable<MenuItem[]>;
  abstract getMenuItemById(id: string): Observable<MenuItem | undefined>;
}
