import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TopicEnum } from '../enums/topic.enum';
import { Contribution } from '../models/contribution.model';
import { ContributionService } from '../services/contribution.service';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss'],
})
export class AddPopupComponent implements OnInit {
  @Input() topic: string;
  topicEnum;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Contribution>();
  @ViewChild('f') f: NgForm;
  constructor(public contributionService: ContributionService, public expenseService: ExpenseService) {
    this.topicEnum = TopicEnum;
  }

  ngOnInit() {
  }

  closePopup() {
    this.close.emit();
  }
  onSubmit(){
    this.add.emit(this.f.value);
  }
}
