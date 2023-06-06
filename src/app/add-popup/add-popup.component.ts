import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SUBMIT_TYPE } from '../enums/submit-type.enum';
import { TopicEnum } from '../enums/topic.enum';
import { Birthday } from '../models/birthday.model';
import { Contribution } from '../models/contribution.model';
import { Expense } from '../models/expense.model';
import { BirthdayService } from '../services/birthday.service';
import { ContributionService } from '../services/contribution.service';
import { ExpenseService } from '../services/expense.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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
  @Output() editBirthday = new EventEmitter<{id: string, birthday: Birthday}>();
  @ViewChild('f') f: NgForm;
  public bsDatepickerConfig: Partial<BsDatepickerConfig>;


  public isAuthenticated: boolean = false;
  constructor(public contributionService: ContributionService, public expenseService: ExpenseService, public birthdayService: BirthdayService) {
    this.topicEnum = TopicEnum;
    this.bsDatepickerConfig=  {...{containerClass:'theme-dark-blue', showWeekNumbers: false, dateInputFormat:'DD/MM/YYYY', maxDate:new Date(Date.now() + ( 3600 * 1000 * 24)), selectFromOtherMonth: false}}
    // enGbLocale.weekdaysShort = ["S", "M", "T", "W", "Th", "F", "Sa"];
    // enGbLocale.week.dow = 0;
    // defineLocale("en-gb", enGbLocale);
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

    if (this.mode === this.submitType.EDIT && this.topic === TopicEnum.BIRTHDAY) {
      this.birthdayService.getBirthday(this.editId).subscribe((birthday) => {
        // birthday.dob = new Date(birthday.dob);
        this.f.form.patchValue({name:birthday.name, dob: new Date(birthday.dob)});
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

    if(this.topic === TopicEnum.BIRTHDAY){
      if (this.mode === this.submitType.EDIT) {
        this.editBirthday.emit({id: this.editId, birthday: this.f.value})
      } else {
        this.add.emit(this.f.value);
      }
    }
  }
}
