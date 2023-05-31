import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Angular';
  constructor() {
    if (!localStorage.getItem('application-theme')) {
      document.body.setAttribute('application-theme', 'app-light');
      localStorage.setItem('application-theme', 'app-light');
    } else{
      document.body.setAttribute('application-theme', localStorage.getItem('application-theme'));
    }
  }
}
