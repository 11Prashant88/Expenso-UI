import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ACTION } from '../enums/actions.enum';

@Component({
  selector: 'app-actions-popup',
  templateUrl: './actions-popup.component.html',
  styleUrls: ['./actions-popup.component.scss']
})
export class ActionsPopupComponent implements OnInit {

  @Input() actions: string[]
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  emitAction(action: string){
    switch(action){
      case ACTION.DELETE:
        this.delete.emit()
        break;
      case ACTION.EDIT:
        this.edit.emit()
        break;
    }
  }

}
