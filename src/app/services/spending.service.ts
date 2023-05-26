import { EventEmitter, Injectable } from "@angular/core";
import { Contribution } from "../models/contribution.model";
import { HttpClient } from '@angular/common/http'
import { delay } from 'rxjs/operators'
import { Spending } from "../models/spending.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class SpendingService{
    public creating: boolean = false;
    constructor(private http: HttpClient){

    }
    getSpendings(){
        return this.http.get<Spending[]>(`${environment.apiUrl}/spendings`);
    }
    addSpending(spending: Spending){
        return this.http.post<Spending>(`${environment.apiUrl}/spendings`, spending);
    }
}