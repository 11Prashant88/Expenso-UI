import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { delay } from 'rxjs/operators'
import { environment } from "src/environments/environment";
import { Birthday } from "../models/birthday.model";

@Injectable({
    providedIn:'root'
})
export class BirthdayService{
    public creating: boolean = false;
    constructor(private http: HttpClient){

    }
    getBirthdays(){
        return this.http.get<Birthday[]>(`${environment.apiUrl}/birthdays`);
    }
    getBirthday(id: string){
        return this.http.get<Birthday>(`${environment.apiUrl}/birthdays/${id}`);
    }
    addBirthday(birthday: Birthday){
        return this.http.post<Birthday>(`${environment.apiUrl}/birthdays`, birthday);
    }

    deleteBirthday(id: string){
        return this.http.delete(`${environment.apiUrl}/birthdays/${id}`)
    }

    editBirthday(data:{id: string, birthday: Birthday}){
        return this.http.patch<Birthday>(`${environment.apiUrl}/birthdays/${data.id}`, data.birthday);
    }
}