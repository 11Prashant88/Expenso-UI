import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    public token: string;
    isAuthenticated: boolean = false;
    isAuthenticatedSubject = new Subject<boolean>();
    loggingIn: boolean = false;
    constructor(private http: HttpClient, private router: Router){

    }
    login(creds:{email: string, password: string}){
        this.loggingIn = true;
        this.http.post(`${environment.apiUrl}/users/login`, creds).subscribe((response)=>{
            this.token = response['token'];
            this.isAuthenticated = true;
            localStorage.setItem('token', this.token);
            this.isAuthenticatedSubject.next(true);
            this.router.navigate(['/'])
            this.loggingIn = false;
          }, ()=>{
            this.loggingIn = false;
          })
    }

    logout(){
        this.isAuthenticated = false;
        this.isAuthenticatedSubject.next(false);
        localStorage.removeItem('token')
        this.router.navigate(['/'])
    }

    signup(creds:{email: string, password: string}){
        return this.http.post(`${environment.apiUrl}/users`, creds);
    }

    getIsAuth(){
        return this.isAuthenticatedSubject.asObservable();
      }
}