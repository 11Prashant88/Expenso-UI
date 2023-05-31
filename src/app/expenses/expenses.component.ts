import { Component, OnInit, ViewChild } from '@angular/core';
import { Expense } from '../models/expense.model';
import * as moment from 'moment';
import { TopicEnum } from '../enums/topic.enum';
import { ExpenseService } from '../services/expense.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  topic;

  public total: number;

  public loadingExpenses: boolean = false;

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  public isAuthenticated: boolean = false;

  constructor(private expenseService: ExpenseService,
    private toastr: ToastrService,
    private authService: AuthService) {
    this.topic = TopicEnum 
  }
  isShowAddExpensePopup: boolean = false;

  expenses: {[key:string]:Expense[]}[] = [];
  allExpenses: Expense[] = [];

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.isAuthenticated = true;
      }
    })
    this.toastr.overlayContainer = this.toastContainer;
    this.getExpenses();
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
  showAddExpensePopup() {
    this.isShowAddExpensePopup = true;
  }

  closeAddExpensePopup() {
    this.isShowAddExpensePopup = false;
  }

  getExpenses(){
    this.loadingExpenses = true;
    this.expenseService.getExpenses().subscribe((expenses: Expense[])=>{
      this.allExpenses = expenses;
      expenses = _.groupBy(expenses, ({createdAt})=> moment(createdAt).format('MMM YYYY'));
      Object.keys(expenses).forEach((k)=>{
        let obj = {}
        obj[k] = expenses[k]
        this.expenses.push(obj)
      })
      this.refreshTotal();
      this.loadingExpenses = false;
    }, ()=>{
      this.loadingExpenses = false;
    })
  }

  addExpense(expense: Expense){
    this.expenseService.creating = true;
    this.expenseService.addExpense(expense).subscribe((expense: Expense)=>{
      this.expenses = [];
      this.allExpenses = [...this.allExpenses, expense];
      let expenses = this.allExpenses;
      expenses = _.groupBy(this.allExpenses, ({createdAt})=> moment(createdAt).format('MMM YYYY'));
      Object.keys(expenses).forEach((k)=>{
        let obj = {}
        obj[k] = expenses[k]
        this.expenses.push(obj)
      })
      this.refreshTotal();
      this.closeAddExpensePopup();
      this.expenseService.creating = false;
      this.toastr.success(`expense added : ₹${expense.price}`, 'Success');
    }, (err)=>{

      this.toastr.error(err.error.error, 'Failed');
      this.expenseService.creating = false;
    })
  }

  get loaderColor(): string{
    if(localStorage.getItem('application-theme') === 'app-light'){
      return 'pink';
    } else {
      return '#02c7c7'
    }
  }

  refreshTotal(){
    this.total = 0;
    this.expenses.forEach((expenso)=>{
      let monthlyExpenses = expenso[Object.keys(expenso)[0]];
      this.total = this.total + monthlyExpenses.reduce((total, expense)=>{return total + expense.price}, 0)
    })
  }

  monthlyExpenses(expenso:{[s: string]:Expense}){
    return expenso[Object.keys(expenso)[0]]
  }

  getMonthHeader(expenso:{[s: string]:Expense[]}){
    return Object.keys(expenso)[0];
  }
}
