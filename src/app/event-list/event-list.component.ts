import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import * as eventData from "../../assets/EventFactoryProblemData.json";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  displayedColumns = ['userId', 'event', 'createdAt'];
  eventDataSource = new MatTableDataSource<Event>(eventData);

  constructor() {
  }

  ngOnInit() {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.eventDataSource.paginator = this.paginator;
    this.eventDataSource.sort = this.sort;
  }
}

// export interface Event {
//   user_id: number;
//   event: string;
//   created_at: number;
// }
