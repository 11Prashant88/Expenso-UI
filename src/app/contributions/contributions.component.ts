import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { TopicEnum } from '../enums/topic.enum';
import { Contribution } from '../models/contribution.model';
import { ContributionService } from '../services/contribution.service';

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss'],
})
export class ContributionsComponent implements OnInit {
  topic

  public total: number;

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(private contributionsService: ContributionService,
    private toastr: ToastrService) {
    this.topic = TopicEnum
  }

  contributions: Contribution[];

  isShowContributinSpendPopup: boolean = false;

  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
    this.getContributions();
  }

  showAddContributionSpendPopup() {
    this.isShowContributinSpendPopup = true;
  }

  closeAddContributionSpendPopup() {
    this.isShowContributinSpendPopup = false;
  }

  getContributions(){
    this.contributionsService.getContributions().subscribe((response: Contribution[])=>{
      this.contributions = response;
      this.refreshTotal();
    })
  }

  addContribution(contribution: Contribution){
    this.contributionsService.creating = true;
    this.contributionsService.addContribution(contribution).subscribe((contribution: Contribution)=>{
      this.contributions = [...this.contributions, contribution];
      this.refreshTotal();
      this.closeAddContributionSpendPopup()
      this.contributionsService.creating = false;
      this.toastr.success('Contribution added successfully!', 'Success');
    }, (err)=>{
      this.contributionsService.creating = false;
    })
  }

  public refreshTotal(){
    this.total = this.contributions.reduce((total, spending)=>{return total + spending.amount}, 0)
  }
}
