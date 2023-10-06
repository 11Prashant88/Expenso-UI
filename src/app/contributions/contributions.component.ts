import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { TopicEnum } from '../enums/topic.enum';
import { Contribution } from '../models/contribution.model';
import { ContributionService } from '../services/contribution.service';
import * as moment from 'moment';

import * as _ from 'lodash'
import { AuthService } from '../auth/auth.service';
import { SUBMIT_TYPE } from '../enums/submit-type.enum';
import { CONFIRMATION_TYPES } from '../enums/confirmation-types.enum';

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss'],
})
export class ContributionsComponent implements OnInit {
  topic
  public total: number;
  public editId: string;
  public mode: string = 'add';
  public submitType = {...SUBMIT_TYPE}
  public loadingContributions: boolean = false;
  public deleteId: string;
  public showdeleteContributionPopup: boolean = false;
  public confirmationTypes = {...CONFIRMATION_TYPES}

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(private contributionsService: ContributionService,
    private toastr: ToastrService,
    private authService: AuthService) {
    this.topic = TopicEnum
  }

  contributions: {[key:string]:Contribution[]}[] = [];
  allContributions: Contribution[] = [];

  isShowContributionPopup: boolean = false;
  public isAuthenticated: boolean = false;
  

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      this.isAuthenticated = isAuthenticated;
    })
    this.toastr.overlayContainer = this.toastContainer;
    this.getContributions();
  }

  showAddContributionPopup(id?: string) {
    this.editId = id;
    this.mode = this.editId ? this.submitType.EDIT : this.submitType.SUBMIT;
    this.isShowContributionPopup = true;
  }

  closeAddContributionSpendPopup() {
    this.isShowContributionPopup = false;
  }

  get loaderColor(): string{
    if(localStorage.getItem('application-theme') === 'app-light'){
      return 'white';
    } else {
      return '#ffffff'
    }
  }

  getContributions(){
    this.contributions = [];
    this.loadingContributions = true;
    this.contributionsService.getContributions().subscribe((contributions: Contribution[])=>{
      this.allContributions = contributions;
      contributions = _.groupBy(contributions, ({createdAt})=> moment(createdAt).format('MMM YYYY'));
      Object.keys(contributions).forEach((k)=>{
        let obj = {}
        obj[k] = contributions[k]
        this.contributions.push(obj)
      })
      this.refreshTotal();
      this.loadingContributions = false;
    }, ()=>{
      this.loadingContributions = false;
    })
  }

  addContribution(contribution: Contribution){
    this.contributionsService.creating = true;
    this.contributionsService.addContribution(contribution).subscribe((contribution: Contribution)=>{
      this.contributions = [];
      this.allContributions = [...this.allContributions, contribution];
      let expenses = this.allContributions;
      expenses = _.groupBy(this.allContributions, ({createdAt})=> moment(createdAt).format('MMM YYYY'));
      Object.keys(expenses).forEach((k)=>{
        let obj = {}
        obj[k] = expenses[k]
        this.contributions.push(obj)
      })
      this.refreshTotal();
      this.closeAddContributionSpendPopup()
      this.contributionsService.creating = false;
      this.toastr.success(`Contribution deposited : ₹${contribution.amount}`, 'Success');
    }, (err)=>{
      this.contributionsService.creating = false;
    })
  }

  editContribution(data:{id: string, contribution: Contribution}){
    this.contributionsService.creating = true;
    this.contributionsService.editContribution(data).subscribe((contribution: Contribution)=>{
      console.log('')
      this.contributions = [];
      const cont = this.allContributions.findIndex((c)=>{return c.id === data.id})
      if(cont != -1){
        this.allContributions[cont] = contribution;
      }
      let contributions = this.allContributions;
      contributions = _.groupBy(this.allContributions, ({createdAt})=> moment(createdAt).format('MMM YYYY'));
      Object.keys(contributions).forEach((k)=>{
        let obj = {}
        obj[k] = contributions[k]
        this.contributions.push(obj)
      })
      this.refreshTotal();
      this.closeAddContributionSpendPopup()
      this.contributionsService.creating = false;
      this.toastr.success(`Contribution edited : ₹${contribution.amount}`, 'Success');
    }, (err)=>{
      this.contributionsService.creating = false;
    })
  }

  public refreshTotal(){
    this.total = 0;
    this.contributions.forEach((contribution)=>{
      let monthlyContributions = contribution[Object.keys(contribution)[0]];
      this.total = this.total + monthlyContributions.reduce((total, contro)=>{return total + contro.amount}, 0)
    })
  }

  monthlyContributions(contro:{[s: string]:Contribution}){
    return contro[Object.keys(contro)[0]]
  }

  getMonthHeader(contro:{[s: string]:Contribution[]}){
    return Object.keys(contro)[0];
  }

  deleteContribution(id: string){
    this.deleteId = id;
    this.showdeleteContributionPopup = true;
  }

  confirmDeletion(){
    this.showdeleteContributionPopup = false;
    this.contributionsService.deleteContribution(this.deleteId).subscribe((res)=>{
      this.getContributions();
    });
  }

  closeDeleteContributionPopup(){
    this.showdeleteContributionPopup = false;
  }
}
