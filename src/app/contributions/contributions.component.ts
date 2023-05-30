import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { TopicEnum } from '../enums/topic.enum';
import { Contribution } from '../models/contribution.model';
import { ContributionService } from '../services/contribution.service';
import * as moment from 'moment';
import * as _ from 'lodash'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss'],
})
export class ContributionsComponent implements OnInit {
  topic

  public total: number;
  public loadingContributions: boolean = false;

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(private contributionsService: ContributionService,
    private toastr: ToastrService,
    private authService: AuthService) {
    this.topic = TopicEnum
  }

  contributions: {[key:string]:Contribution[]}[] = [];
  allContributions: Contribution[] = [];

  isShowContributinSpendPopup: boolean = false;
  public isAuthenticated: boolean = false;

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.isAuthenticated = true;
      }
    })
    this.toastr.overlayContainer = this.toastContainer;
    this.getContributions();
  }

  showAddContributionSpendPopup() {
    this.isShowContributinSpendPopup = true;
  }

  closeAddContributionSpendPopup() {
    this.isShowContributinSpendPopup = false;
  }

  formatMonth(date: Date){
    return moment(date).format('MMM');
  }

  formatDay(date: Date){
    return moment(date).format('D');
  }

  getContributions(){
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
      this.toastr.success(`Contribution done : ₹${contribution.amount}`, 'Success');
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
}
