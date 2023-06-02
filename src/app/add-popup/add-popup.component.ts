import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SUBMIT_TYPE } from '../enums/submit-type.enum';
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
  @Input() mode: string;
  @Input() editId: string;
  private submitType = { ...SUBMIT_TYPE }
  topicEnum;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Contribution>();
  @Output() edit = new EventEmitter<{id: string, contribution: Contribution}>();
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
  }

  closePopup() {
    this.close.emit();
  }
  onSubmit() {
    if (this.mode === this.submitType.EDIT) {
      this.edit.emit({id: this.editId, contribution: this.f.value})
    } else {
      this.add.emit(this.f.value);
    }
  }
}
