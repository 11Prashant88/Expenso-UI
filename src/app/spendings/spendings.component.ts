import { Component, OnInit, ViewChild } from '@angular/core';
import { Spending } from '../models/spending.model';
import * as moment from 'moment';
import { TopicEnum } from '../enums/topic.enum';
import { SpendingService } from '../services/spending.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

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

  spendings: Spending[];

  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
    this.getSpendings();
  }

  formatDate(date: Date) {
    return moment(date).format('MMM, DD, YYYY');
  }
  showAddSpendPopup() {
    this.isShowAddSpendPopup = true;
  }

  closeAddSpendPopup() {
    this.isShowAddSpendPopup = false;
  }

  getSpendings(){
    this.spendingService.getSpendings().subscribe((spendings: Spending[])=>{
      this.spendings = spendings;
      this.refreshTotal();
    })
  }

  addSpending(spending: Spending){
    this.spendingService.creating = true;
    this.spendingService.addSpending(spending).subscribe((spending: Spending)=>{
      this.spendings = [...this.spendings, spending];
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
    this.total = this.spendings.reduce((total, spending)=>{return total + spending.price}, 0)
  }
}
