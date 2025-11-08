import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GroupService {

  baseUrl: string = "http://localhost:9500/reservation/reservations"

  groupName: string = "";

  groupCode: number = -1;

  bookedTables: number[] = [];

  constructor(private http : HttpClient) {}

  submitCode(code: number){
    return this.http.get<any>(`${this.baseUrl}/${code}`)
  }

  getGroupName(){
    return this.groupName;
  }

  setGroupName(name : string){
    this.groupName = name;
  }

  setBookedTables(tables: number[]){
    this.bookedTables = tables;
  }

  getBookedTables(){
    return this.bookedTables;
  }

  setGroupCode(code : number){
    this.groupCode = code;
  }

  getGroupCode(){
    return this.groupCode;
  }

  resetGroup(){
    this.bookedTables = [];
    this.groupCode = -1;
    this.groupName = "";
  }
}
