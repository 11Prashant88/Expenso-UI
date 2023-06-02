import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CONFIRMATION_TYPES } from '../enums/confirmation-types.enum';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  @Output() logout = new EventEmitter<void>();
  @Output() clearContributions = new EventEmitter<void>();
  @Output() clearExpenses = new EventEmitter<void>();
  @Output() deleteContribution = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Input() message: string = '';
  @Input() buttonText: string = '';
  @Input() type: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(type: string) {
    switch (type) {
      case CONFIRMATION_TYPES.logout:
        this.logout.emit();
        break;
      case CONFIRMATION_TYPES.clearContributions:
        this.clearContributions.emit();
        break;
      case CONFIRMATION_TYPES.clearExpenses:
        this.clearExpenses.emit();
        break;
      case CONFIRMATION_TYPES.deleteContribution:
        this.deleteContribution.emit();
        break;
      default:
        break;
    }

  }

  onCancel() {
    this.cancel.emit();
  }

}
