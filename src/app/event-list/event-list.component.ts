import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import * as eventData from "../../assets/EventFactoryProblemData.json";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  displayedColumns = ['userId', 'event', 'createdAt'];
  eventDataSource = new MatTableDataSource<Event>(eventData);

  debugger

  constructor() {
  }

  ngOnInit() {
  }
}

export interface Event {
  user_id: number;
  event: string;
  created_at: number;
}
