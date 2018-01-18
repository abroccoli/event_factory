import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
