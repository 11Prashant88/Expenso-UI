import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  @Output() logout = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onlogout(){
    this.logout.emit();
  }

  onCancel(){
    this.cancel.emit();
  }

}
