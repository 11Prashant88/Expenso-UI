import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  public isAuthenticated: boolean = false;
  @Output() close = new EventEmitter<void>();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.isAuthenticated = true;
      }
    })
  }

  onLogin(){
    this.authService.login(this.loginForm.value)
  }

  onSignup(){
    this.authService.signup(this.loginForm.value).subscribe((res)=>{
      alert('user created')
    })
  }

  closePopup(){
    this.close.emit();
  }

}
