import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  showLoginPopup: boolean = false;
  public isAuthenticated: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.isAuthenticated = true;
      }
    })
  }

  openLoginPopup(){
    this.showLoginPopup = true;
  }

  closeLoginPopup(){
    this.showLoginPopup = false;
  }

  logout(){
    this.authService.logout()
  }

}
