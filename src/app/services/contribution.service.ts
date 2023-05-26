import { EventEmitter, Injectable } from "@angular/core";
import { Contribution } from "../models/contribution.model";
import { HttpClient } from '@angular/common/http'
import { delay } from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class ContributionService{
    public creating: boolean = false;
    constructor(private http: HttpClient){

    }
    getContributions(){
        return this.http.get<Contribution[]>('http://localhost:3000/contributions');
    }
    addContribution(contribution: Contribution){
        return this.http.post<Contribution>('http://localhost:3000/contributions', contribution);
    }
}