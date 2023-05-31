import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomError } from '../models/error.model';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {

  @Input() error: CustomError;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  closeErrorPopup(){
    this.close.emit();
  }

}
