import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatPaginator, MatTableDataSource, MatSort, MatRadioChange, MatDatepickerInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as eventData from "../../assets/EventFactoryProblemData.json";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  rawEventData = eventData;
  processedEventData = [];
  startDate = null;
  endDate = null;
  startTime = null;
  endTime = null;
  timeSelectionError = '';
  displayedColumns = ['user_id', 'event', 'created_at'];
  sequenceEventDataSource = new MatTableDataSource<Event>();
  eventDataSource = new MatTableDataSource<Event>();
  dateEventDataSource = new MatTableDataSource<Event>();

  selectedEventSequence = ['REGISTER', 'REGISTER', 'REGISTER'];

  filterBy = 'userId';

  onChange($event: MatRadioChange): void {
    this.filterBy = $event.value
  }

  applyFilter(filterValue, filterCaller: string) {
    if(filterCaller == 'textFilter') {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      if (this.filterBy == 'userId'){
        this.eventDataSource.filterPredicate = (data, filter) => { return data.user_id.toString().includes(filter)};
      } else {
        this.eventDataSource.filterPredicate = (data, filter) => { return data.event.toLowerCase().includes(filter)};
      }
    }
    this.eventDataSource.filter = filterValue;
  }

  applyDateFilter(filterValue, filterCaller: string) {
    if (filterCaller == 'startDateFilter'){
        this.dateEventDataSource.filterPredicate = (data, filter) => { return data.created_at >= filter ? true : false};
    } else if (filterCaller == 'endDateFilter'){
        this.dateEventDataSource.filterPredicate = (data, filter) => { return data.created_at <= filter ? true : false};
    } else if (filterCaller == 'dateRangeFilter'){
        this.dateEventDataSource.filterPredicate = (data, filter) => { return data.created_at >= filter[0] && data.created_at <= filter[1] ? true : false};
    }
    this.dateEventDataSource.filter = filterValue;
  }

  startDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value){
      this.startDate = event.value.getTime();
    } else {
      this.startDate = null;
    }
  }

  endDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value){
      this.endDate = event.value.getTime();
    } else {
      this.endDate = null;
    }
  }

  startTimeChange(time){
    this.startTime = time;
  }

  endTimeChange(time){
    this.endTime = time;
  }

  filterByDate(){
    this.timeSelectionError = '';
    if (this.startDate && this.startTime && this.endDate && this.endTime ){
      let addedStartTime = this.stringTimeToMilliseconds(this.startTime);
      let addedEndTime = this.stringTimeToMilliseconds(this.endTime);
      this.applyDateFilter([this.startDate + addedStartTime, this.endDate + addedEndTime], 'dateRangeFilter');
    } else if (this.startDate && this.startTime){
      let addedTime = this.stringTimeToMilliseconds(this.startTime);
      this.applyDateFilter(this.startDate + addedTime, 'startDateFilter');
    } else if (this.endDate && this.endTime){
      let addedTime = this.stringTimeToMilliseconds(this.endTime);
      this.applyDateFilter(this.endDate + addedTime, 'endDateFilter');
    } else {
      this.timeSelectionError = "Please ensure you have set a start date and time or end date and time"
    }
  }

  stringTimeToMilliseconds(stringTime){
    let timeArray = stringTime.split(':');
    return (timeArray[0] * 3600000) + (timeArray[1] * 60000);
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
    let sortedDataByTime = this.processedEventData.sort((a,b)=> a.created_at - b.created_at);
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
    this.sequenceEventDataSource.data = [].concat(...foundSequences);
  }


  constructor() {
  }

  ngOnInit() {
    this.processedEventData = []
    //ran into some compiler issues, this is my temporary work around
    let arrayTypeRawData = JSON.parse(JSON.stringify(this.rawEventData));
    for (let value of arrayTypeRawData){
      let readableDate = (new Date(value.created_at)).toLocaleString();
      this.processedEventData.push({user_id: value.user_id, event: value.event, created_at: value.created_at, readable_date: readableDate});
    }
    this.eventDataSource.data = this.processedEventData;
    this.dateEventDataSource.data = this.processedEventData;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('eventTable') eventTableSort: MatSort;
  @ViewChild('eventDateTable') eventDateTableSort: MatSort;

  ngAfterViewInit() {
    this.eventDataSource.paginator = this.paginator;
    this.eventDataSource.sort = this.eventTableSort;
    this.eventDataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return data[sortHeaderId];
    };
    this.dateEventDataSource.paginator = this.paginator;
    this.dateEventDataSource.sort = this.eventDateTableSort;
    this.dateEventDataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return data[sortHeaderId];
    };
  }
}

export interface Event {
  user_id: any;
  event: any;
  created_at: any;
}
