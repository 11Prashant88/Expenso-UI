import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { ACTION } from 'src/app/enums/actions.enum';
import { Expense } from 'src/app/models/expense.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  @Input() expense: Expense;
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

  formatDate(date: Date) {
    return moment(date).format('MMM, DD, YYYY');
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

  deleteExpense(){
    this.delete.emit(this.expense.id);
  }

  editExpense(){
    this.edit.emit(this.expense.id);
  }

}
