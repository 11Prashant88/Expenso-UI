import { Component, OnInit, ViewChild } from '@angular/core';
import { Spending } from '../models/spending.model';
import * as moment from 'moment';
import { TopicEnum } from '../enums/topic.enum';
import { SpendingService } from '../services/spending.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss'],
})
export class SpendingsComponent implements OnInit {
  topic;

  public total: number;

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(private spendingService: SpendingService,
    private toastr: ToastrService) {
    this.topic = TopicEnum 
  }
  isShowAddSpendPopup: boolean = false;

  spendings: {[key:string]:Spending[]}[] = [];
  allSpendings: Spending[];

  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
    this.getSpendings();
  }

  formatDate(date: Date) {
    return moment(date).format('MMM, DD, YYYY');
  }

  formatMonth(date: Date){
    return moment(date).format('MMM');
  }

  formatDay(date: Date){
    return moment(date).format('D');
  }
  showAddSpendPopup() {
    this.isShowAddSpendPopup = true;
  }

  closeAddSpendPopup() {
    this.isShowAddSpendPopup = false;
  }

  getSpendings(){
    this.spendingService.getSpendings().subscribe((spendings: Spending[])=>{
      this.allSpendings = spendings;
      spendings = _.groupBy(spendings, ({createdAt})=> moment(createdAt).format('MMM YYYY'));
      Object.keys(spendings).forEach((k)=>{
        let obj = {}
        obj[k] = spendings[k]
        this.spendings.push(obj)
      })
      this.refreshTotal();
    })
  }

  addSpending(spending: Spending){
    this.spendingService.creating = true;
    this.spendingService.addSpending(spending).subscribe((spending: Spending)=>{
      this.spendings = [];
      this.allSpendings = [...this.allSpendings, spending];
      let spendings = this.allSpendings;
      spendings = _.groupBy(this.allSpendings, ({createdAt})=> moment(createdAt).format('MMM YYYY'));
      Object.keys(spendings).forEach((k)=>{
        let obj = {}
        obj[k] = spendings[k]
        this.spendings.push(obj)
      })
      this.refreshTotal();
      this.closeAddSpendPopup();
      this.spendingService.creating = false;
      this.toastr.success('Spending added successfully!', 'Success');
    }, (err)=>{

      this.toastr.error(err.error.error, 'Failed');
      this.spendingService.creating = false;
    })
  }

  refreshTotal(){
    this.total = 0;
    this.spendings.forEach((spendingo)=>{
      let monthlySpendings = spendingo[Object.keys(spendingo)[0]];
      this.total = this.total + monthlySpendings.reduce((total, spending)=>{return total + spending.price}, 0)
    })
  }

  monthlySpendings(spendingo:{[s: string]:Spending}){
    return spendingo[Object.keys(spendingo)[0]]
  }

  getMonthHeader(spendingo:{[s: string]:Spending[]}){
    return Object.keys(spendingo)[0];
  }
}
