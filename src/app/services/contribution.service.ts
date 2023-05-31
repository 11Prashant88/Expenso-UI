import { Injectable } from "@angular/core";
import { Contribution } from "../models/contribution.model";
import { HttpClient } from '@angular/common/http'
import { delay } from 'rxjs/operators'
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class ContributionService{
    public creating: boolean = false;
    constructor(private http: HttpClient){

    }
    getContributions(){
        return this.http.get<Contribution[]>(`${environment.apiUrl}/contributions`).pipe(delay(4000000));
    }
    addContribution(contribution: Contribution){
        return this.http.post<Contribution>(`${environment.apiUrl}/contributions`, contribution);
    }
}