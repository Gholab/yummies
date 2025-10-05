import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BackTable} from '../../../models/simulation-check-status/back-table.model';

@Component({
  selector: 'app-update-status',
  imports: [],
  templateUrl: './updating-status.component.html',
  styleUrl: './updating-status.component.scss'
})
export class UpdatingStatusComponent {
  constructor(private http: HttpClient) {}

  public tables: BackTable[] = [];

  public preparationsIdsToCheck: number[] = [];

  ngOnInit() {
    this.http.get("http://localhost:9500/kitchen/preparations?state=preparationStarted").subscribe((preparations: any) => {
      console.log("pinged preparations: there are : " + preparations.length);

      if(preparations.length >= 1) {

        for(let preparationObject of preparations) {
          //if the current preparation is not already usually checked
          if(this.preparationsIdsToCheck.find(val => val === preparationObject._id) === undefined) {
            this.preparationsIdsToCheck.push(preparationObject._id);
            console.log("there are preparations waiting !!");

            for(let itemToPrepare of preparationObject.preparedItems) {
              console.log("starting to prepare " + itemToPrepare.shortName);
              this.http.post("http://localhost:9500/kitchen/preparedItems/"+itemToPrepare._id+"/start", null).subscribe(() => {});
              setTimeout(() => {
                console.log("finish " + itemToPrepare.shortName);
                this.http.post("http://localhost:9500/kitchen/preparedItems/"+itemToPrepare._id+"/finish", null).subscribe(() => {});
              }, 3000);
            }
          }
        }
      }
    });
  }
}
