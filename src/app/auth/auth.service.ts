import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CustomError } from "../models/error.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    public token: string;
    isAuthenticated: boolean = false;
    isAuthenticatedSubject = new Subject<boolean>();
    loggingIn: boolean = false;
    loginError$ = new Subject<CustomError>();
    timer: NodeJS.Timer;
    constructor(private http: HttpClient, private router: Router){

    }
    login(creds:{email: string, password: string}){
        this.loggingIn = true;
        this.http.post<{token: string, expiresIn: number}>(`${environment.apiUrl}/users/login`, creds).subscribe((response)=>{
            this.token = response.token;
            const expiresIn = response.expiresIn;
           this.setTimer(expiresIn);
            this.isAuthenticated = true;
            localStorage.setItem('token', this.token);
            this.isAuthenticatedSubject.next(true);
            const expiryDate = new Date((new Date().getTime() + (expiresIn * 1000)));
            this.saveAuthData(this.token, expiryDate)
            this.router.navigate(['/'])
            this.loggingIn = false;
          }, (e)=>{
            this.loginError$.next({type: e?.error?.error?.type, message: e?.error?.error?.message})
            this.loggingIn = false;
          })
    }

    logout(){
        clearTimeout(this.timer);
        this.isAuthenticated = false;
        this.isAuthenticatedSubject.next(false);
        localStorage.removeItem('token')
        this.router.navigate(['/'])
        this.removeAuthData();
    }

    signup(creds:{email: string, password: string}){
        return this.http.post(`${environment.apiUrl}/users`, creds);
    }

    getIsAuth(){
        return this.isAuthenticatedSubject.asObservable();
      }

      autoAuthUser(){
        const authData = this.getAuthData();
        if(!authData){
            return;
        }
        const expiresIn = new Date(authData.expiryDate).getTime() - new Date().getTime();
        if(expiresIn > 0){
            this.token = authData.token;
            this.isAuthenticated = true;
            this.isAuthenticatedSubject.next(true);
            this.setTimer(expiresIn / 1000);
        }
      }

      setTimer(expiresIn: number){
        this.timer = setTimeout(()=>{
            this.logout();
        }, (expiresIn * 1000))
      }

      saveAuthData(token: string, expiryDate: Date){
        localStorage.setItem('token', token);
        localStorage.setItem('expiryDate', expiryDate.toISOString());
      }

      getAuthData(){
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        if(!token || !expiryDate){
            return;
        }
        return {token, expiryDate};
      }

      removeAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
      }
}