import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../../services/group.service';

@Component({
  selector: 'app-booked-tables-component',
  imports: [],
  templateUrl: './booked-tables.component.html',
  styleUrl: './booked-tables.component.scss'
})
export class BookedTablesComponent implements OnInit {
  tables: number[] = [];
  stringToDisplay: string = "";
  constructor(private groupService: GroupService) {
  }

  ngOnInit(){
    this.tables = this.groupService.getBookedTables();
    this.computeTableString();
  }

  computeTableString(){
    let res = ""+this.tables[0];
    for(let i=1; i<this.tables.length -1; i++){
      res = res + ", " + this.tables[i];
    }
    res = res + " et " + this.tables[this.tables.length-1];
    this.stringToDisplay = res;
  }

  get shouldDisplay() {
    return this.tables.length > 0;
  }
}
