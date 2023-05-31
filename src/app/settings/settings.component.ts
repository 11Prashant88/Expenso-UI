import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  showLoginPopup: boolean = false;
  showLogoutPopup: boolean = false;
  public isAuthenticated: boolean = false;
  isChecked: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.isAuthenticated = true;
      }
    })

    if(localStorage.getItem('application-theme') === 'app-light'){
      this.isChecked = false;
    } else{
      this.isChecked = true;
    }
  }

  openLoginPopup(){
    this.showLoginPopup = true;
  }

  openLogoutPopup(){
    this.showLogoutPopup = true;
  }

  closeLoginPopup(){
    this.showLoginPopup = false;
  }

  closeLogoutPopup(){
    this.showLogoutPopup = false;
  }

  logout(){
    this.authService.logout()
  }
  modeChange(event: string){
    switch(event){
      case 'on':
        document.body.setAttribute('application-theme', 'app-dark');
        localStorage.setItem('application-theme', 'app-dark');
        break;
      case 'off':
        document.body.setAttribute('application-theme', 'app-light');
        localStorage.setItem('application-theme', 'app-light');
        break;
      default:
        break;
    }
  }

}
