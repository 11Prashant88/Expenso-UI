import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { CustomError } from 'src/app/models/error.model';
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
  loggingIn: boolean = false;
  error: CustomError;
  showError: boolean = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.isAuthenticated = true;
      }
    })
    this.authService.loginError$.subscribe((error: CustomError)=>{
      this.error = error;
      this.showError = true;
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

  closeErrorPopup(){
    this.showError = false;
  }

}
