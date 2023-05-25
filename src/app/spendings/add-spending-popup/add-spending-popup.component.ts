import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopicEnum } from '../../enums/topic.enum';

@Component({
  selector: 'app-add-spending-popup',
  templateUrl: './add-spending-popup.component.html',
  styleUrls: ['./add-spending-popup.component.scss'],
})
export class AddSpendingPopupComponent implements OnInit {
  @Input() topic: string;
  topicEnum;
  @Output() close = new EventEmitter<void>();
  constructor() {
    this.topicEnum = TopicEnum;
  }

  ngOnInit() {}

  closePopup() {
    this.close.emit();
  }
}
