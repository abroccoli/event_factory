import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as eventData from "../../assets/EventFactoryProblemData.json";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  rawEventData = eventData;
  displayedColumns = ['userId', 'event', 'createdAt'];
  eventDataSource = new MatTableDataSource<Event>(eventData);
  sequenceEventDataSource = new MatTableDataSource<Event>();

  selectedEventSequence = ['REGISTER', 'REGISTER', 'REGISTER'];

  filterBy = 'userId';

  initialDate = new FormControl(new Date(eventData[eventData.length - 1].created_at));

  onChange($event: MatRadioChange): void {
    this.filterBy = $event.value
  }

  applyFilter(filterValue: string, filterCaller: string) {
    if(filterCaller == 'textFilter') {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      if (this.filterBy == 'userId'){
        this.eventDataSource.filterPredicate = (data, filter) => { return data.user_id.toString().includes(filter);}
      } else {
        this.eventDataSource.filterPredicate = (data, filter) => { return data.event.toLowerCase().includes(filter);}
      }
    } else if (filterCaller == 'startDateFilter'){
        this.eventDataSource.filterPredicate = (data, filter) => { return data.created_at >= filter ? true : false;}
    } else if (filterCaller == 'endDateFilter'){
        this.eventDataSource.filterPredicate = (data, filter) => { return data.created_at <= filter ? true : false;}
    }
    this.eventDataSource.filter = filterValue;
  }

  startDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value.getTime();
  }

  endDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value.getTime();
  }

  startTimeChange(time){
    let addedTime = this.stringTimeToMilliseconds(time);
    this.applyFilter(this.startDate + addedTime, 'startDateFilter');
  }

  endTimeChange(time){
    let addedTime = this.stringTimeToMilliseconds(time);
    this.applyFilter(this.startDate + addedTime, 'endDateFilter');
  }

  stringTimeToMilliseconds(stringTime){
    let timeArray = stringTime.split(':');
    return (timeArray[0] * 3600000) + (timeArray[1] * 1000);
  }

  firstSelectionChange($event: MatRadioChange): void {
    this.selectedEventSequence[0] = $event.value
  }

  secondSelectionChange($event: MatRadioChange): void {
    this.selectedEventSequence[1] = $event.value
  }

  thirdSelectionChange($event: MatRadioChange): void {
    this.selectedEventSequence[2] = $event.value
  }

  applySequenceFilter(){
    let sortedDataByTime = this.rawEventData.sort((a,b)=> a.created_at - b.created_at);
    let foundSequences = [];
    let indexCounter = 0;
    for (let value of sortedDataByTime){
      if (sortedDataByTime[indexCounter + 1] && sortedDataByTime[indexCounter + 2]){
        if (value.event == this.selectedEventSequence[0] && sortedDataByTime[indexCounter + 1].event == this.selectedEventSequence[1] && sortedDataByTime[indexCounter + 2].event == this.selectedEventSequence[2]){
          foundSequences.push([value, sortedDataByTime[indexCounter + 1], sortedDataByTime[indexCounter + 2]]);
        }
        indexCounter++;
      }
    }
    debugger
    this.sequenceEventDataSource.data = [].concat(...foundSequences);
  }


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
