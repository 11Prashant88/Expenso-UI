import { Injectable } from "@angular/core";
import { Contribution } from "../models/contribution.model";
import { HttpClient, HttpParams } from '@angular/common/http'
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
        return this.http.get<Contribution[]>(`${environment.apiUrl}/contributions`);
    }
    getContribution(id: string){
        return this.http.get<Contribution>(`${environment.apiUrl}/contributions/${id}`);
    }
    addContribution(contribution: Contribution){
        return this.http.post<Contribution>(`${environment.apiUrl}/contributions`, contribution);
    }
    clearContributions(){
        return this.http.delete(`${environment.apiUrl}/contributions`);
    }

    deleteContribution(id: string){
        return this.http.delete(`${environment.apiUrl}/contributions/${id}`)
    }

    editContribution(data:{id: string, contribution: Contribution}){
        return this.http.patch<Contribution>(`${environment.apiUrl}/contributions/${data.id}`, data.contribution);
    }
}