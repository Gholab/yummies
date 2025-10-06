import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-check-status',
  imports: [CommonModule],
  templateUrl: './check-status.html',
  styleUrl: './check-status.scss'
})
export class CheckStatus {
  public tables: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    for(let i=1; i < 10; i++) {
      this.tables.push({});//initialize array
    }

    this.updateAllStatus();

    setInterval(() => {
      this.updateAllStatus();
    }, 6000);
  }

  public updateAllStatus() {
    this.http.get("http://localhost:9500/kitchen/preparations?state=preparationStarted").subscribe((unfinishedTableOrders: any) => {
      for(let tableOrder of unfinishedTableOrders) {
        this.tables[tableOrder.tableNumber]={
          orderId: tableOrder._id,
          ready: false,
          tableId: tableOrder.tableNumber
        };
      }
    });
    this.http.get("http://localhost:9500/kitchen/preparations?state=readyToBeServed").subscribe(async (unfinishedTableOrders: any) => {
      for(let tableOrder of unfinishedTableOrders) {
        this.tables[tableOrder.tableNumber]={
          orderId: tableOrder._id,
          ready: true,
          tableId: tableOrder.tableNumber
        };
      }
    });
  }

  public async createTable() {
    let tableNumber=Number.parseInt(prompt("Entrez un numéro de table pour tester: ") as any);

    let tableOrderId = (await this.http.post("http://localhost:9500/dining/tableOrders", {
      tableNumber: tableNumber,
      customersCount: 1
    }).toPromise() as any)._id;
    await this.http.post("http://localhost:9500/dining/tableOrders/"+tableOrderId, {
      "menuItemId": "68e2865b068f5ea76c763cf3",
      "menuItemShortName": "foie gras",
      "howMany": 1
    }).toPromise();

    await this.http.post("http://localhost:9500/dining/tableOrders/"+tableOrderId, {
      "menuItemId": "68e2865b068f5ea76c763cfc",
      "menuItemShortName": "salmon",
      "howMany": 1
    }).toPromise();

    await this.http.post("http://localhost:9500/dining/tableOrders/"+tableOrderId+"/prepare", {}).toPromise();
  }

  public deleteAllOrders() {
    for(let finishedOrder of this.tables.filter(table => table.ready)) {
      this.http.post("http://localhost:9500/kitchen/preparations/"+finishedOrder.orderId + "/takenToTable", {}).subscribe(() => {});
    }

    this.http.get("http://localhost:9500/dining/tables/").subscribe(async (tables: any) => {
      for(let table of tables) {
        if(table.tableOrderId) {
          await this.http.post("http://localhost:9500/dining/tableOrders/"+table.tableOrderId+"/bill", {}).toPromise();
        }
      }
    });
  }
}
