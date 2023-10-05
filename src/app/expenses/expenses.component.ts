import { Component, OnInit, ViewChild } from '@angular/core';
import { Expense } from '../models/expense.model';
import * as moment from 'moment';
import { TopicEnum } from '../enums/topic.enum';
import { ExpenseService } from '../services/expense.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'
import { AuthService } from '../auth/auth.service';
import { SUBMIT_TYPE } from '../enums/submit-type.enum';
import { CONFIRMATION_TYPES } from '../enums/confirmation-types.enum';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  topic;

  public total: number;
  public deleteId: string;
  public loadingExpenses: boolean = false;
  public showdeleteExpensePopup: boolean = false;

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  public isAuthenticated: boolean = false;

  constructor(private expenseService: ExpenseService,
    private toastr: ToastrService,
    private authService: AuthService) {
    this.topic = TopicEnum 
  }
  isShowAddExpensePopup: boolean = false;
  public editId: string;
  public mode: string = 'add';
  private submitType = {...SUBMIT_TYPE}
  public confirmationTypes = {...CONFIRMATION_TYPES}


  expenses: {[key:string]:Expense[]}[] = [];
  allExpenses: Expense[] = [];

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      this.isAuthenticated = isAuthenticated;
    })
    this.toastr.overlayContainer = this.toastContainer;
    this.getExpenses();
  }

  closeAddExpensePopup() {
    this.isShowAddExpensePopup = false;
  }

  getExpenses(){
    this.loadingExpenses = true;
    this.expenses = [];
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
      this.toastr.success(`Expense added : ₹${expense.price}`, 'Success');
    }, (err)=>{

      this.toastr.error(err.error.error, 'Failed');
      this.expenseService.creating = false;
    })
  }

  get loaderColor(): string{
    if(localStorage.getItem('application-theme') === 'app-light'){
      return 'white';
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

  showAddExpensePopup(id?: string) {
    this.editId = id;
    this.mode = this.editId ? this.submitType.EDIT : this.submitType.SUBMIT;
    this.isShowAddExpensePopup = true;
  }
  deleteExpense(id: string){
    this.deleteId = id;
    this.showdeleteExpensePopup = true;
  }
  confirmDeletion(){
    this.showdeleteExpensePopup = false;
    this.expenseService.deleteExpense(this.deleteId).subscribe((res)=>{
      this.getExpenses();
    });
  }

  editExpense(data:{id: string, expense: Expense}){
    this.expenseService.creating = true;
    this.expenseService.editExpense(data).subscribe((expense: Expense)=>{
      this.expenses = [];
      const cont = this.allExpenses.findIndex((c)=>{return c.id === data.id})
      if(cont != -1){
        this.allExpenses[cont] = expense;
      }
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
      this.toastr.success(`Contribution edited : ₹${expense.price}`, 'Success');
    }, (err)=>{
      this.toastr.error(err.error.error, 'Failed');
      this.expenseService.creating = false;
    })
  }

  closeDeleteExpensePopup(){
    this.showdeleteExpensePopup = false;
  }
}
