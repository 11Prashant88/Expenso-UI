import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SUBMIT_TYPE } from '../enums/submit-type.enum';
import { TopicEnum } from '../enums/topic.enum';
import { Contribution } from '../models/contribution.model';
import { Expense } from '../models/expense.model';
import { ContributionService } from '../services/contribution.service';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss'],
})
export class AddPopupComponent implements OnInit {
  @Input() topic: string;
  @Input() mode: string;
  @Input() editId: string;
  private submitType = { ...SUBMIT_TYPE }
  topicEnum;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Contribution>();
  @Output() editContribution = new EventEmitter<{id: string, contribution: Contribution}>();
  @Output() editExpense = new EventEmitter<{id: string, expense: Expense}>();
  @ViewChild('f') f: NgForm;

  public isAuthenticated: boolean = false;
  constructor(public contributionService: ContributionService, public expenseService: ExpenseService) {
    this.topicEnum = TopicEnum;
  }

  ngOnInit() {
    if (this.mode === this.submitType.EDIT && this.topic === TopicEnum.CONTRIBUTION) {
      this.contributionService.getContribution(this.editId).subscribe((contribution) => {
        this.f.form.patchValue(contribution);
      })
    }
    if (this.mode === this.submitType.EDIT && this.topic === TopicEnum.EXPENSE) {
      this.expenseService.getExpense(this.editId).subscribe((expense) => {
        this.f.form.patchValue(expense);
      })
    }
  }

  closePopup() {
    this.close.emit();
  }
  onSubmit() {
    if(this.topic === TopicEnum.CONTRIBUTION){
      if (this.mode === this.submitType.EDIT) {
        this.editContribution.emit({id: this.editId, contribution: this.f.value})
      } else {
        this.add.emit(this.f.value);
      }
    }
    if(this.topic === TopicEnum.EXPENSE){
      if (this.mode === this.submitType.EDIT) {
        this.editExpense.emit({id: this.editId, expense: this.f.value})
      } else {
        this.add.emit(this.f.value);
      }
    }
  }
}
