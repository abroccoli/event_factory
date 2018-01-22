import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Event Factory';

  navLinks = [
    {label: 'Basic Search', path: 'event-list'},
    {label: 'Sequence Search', path: 'sequence-search'},
  ];

}
