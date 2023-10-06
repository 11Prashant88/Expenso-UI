import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import * as moment from 'moment';
import { Birthday } from 'src/app/models/birthday.model';
import { ACTION } from 'src/app/enums/actions.enum';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.scss']
})
export class BirthdayComponent implements OnInit {
  @Input() birthday: Birthday;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  public isAuthenticated: boolean = false;
  showActionsPopup: boolean = false;
  public actions: string[];
  public action = {...ACTION};
  constructor(private authService: AuthService) { 
    this.actions = [this.action.DELETE, this.action.EDIT];
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      this.isAuthenticated = isAuthenticated;
    })
  }

  toggleActionsPopup(){
    this.showActionsPopup = !this.showActionsPopup;
  }

  formatDOB(date: Date){
    return moment(date).format('MMM D - YYYY');
  }

  deleteBirthday(){
    this.delete.emit(this.birthday.id);
  }

  editBirthday(){
    this.edit.emit(this.birthday.id);
  }

}
