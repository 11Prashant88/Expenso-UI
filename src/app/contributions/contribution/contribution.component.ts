import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contribution } from 'src/app/models/contribution.model';
import * as moment from 'moment';
import { ACTION } from 'src/app/enums/actions.enum';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss']
})
export class ContributionComponent implements OnInit {

  @Input() contribution: Contribution;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  showActionsPopup: boolean = false;
  public actions: string[];
  public action = {...ACTION};
  public isAuthenticated: boolean = false;
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

  formatMonth(date: Date){
    return moment(date).format('MMM');
  }

  formatDay(date: Date){
    return moment(date).format('D');
  }

  formatYear(date: Date){
    return moment(date).format('YYYY');
  }

  deleteContribution(){
    this.delete.emit(this.contribution.id);
  }

  editContribution(){
    this.edit.emit(this.contribution.id);
  }

}
