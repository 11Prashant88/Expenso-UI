import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Angular';
  constructor() {
    document.body.setAttribute('application-theme', 'app-light');
  }
}
