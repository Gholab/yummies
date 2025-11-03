import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GroupService {

  baseUrl: string = "http://localhost:9500/reservation/reservations"

  constructor(private http : HttpClient) {}

  submitCode(code: number){
    return this.http.get<any>(`${this.baseUrl}/${code}`)
  }
}
