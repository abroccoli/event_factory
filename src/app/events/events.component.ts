import { Component, OnInit } from '@angular/core';
import * as eventList from "../../assets/EventFactoryProblemData.json";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = eventList;

  constructor() { }

  ngOnInit() {
  }
}
