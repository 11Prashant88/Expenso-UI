import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { CONFIRMATION_TYPES } from '../enums/confirmation-types.enum';
import { ContributionService } from '../services/contribution.service';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  contributionTypes = {...CONFIRMATION_TYPES};
  showLoginPopup: boolean = false;
  showLogoutPopup: boolean = false;
  showClearContributionsPopup: boolean = false;
  showClearExpensesPopup: boolean = false;
  public isAuthenticated: boolean = false;
  isChecked: boolean = false;
  constructor(private authService: AuthService, private contributionService: ContributionService, private expensesService: ExpenseService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.getIsAuth().subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.isAuthenticated = true;
      }
    })

    if(localStorage.getItem('application-theme') === 'app-light'){
      this.isChecked = false;
    } else{
      this.isChecked = true;
    }
  }

  openLoginPopup(){
    this.showLoginPopup = true;
  }

  openLogoutPopup(){
    this.showLogoutPopup = true;
  }

  closeLoginPopup(){
    this.showLoginPopup = false;
  }

  closeLogoutPopup(){
    this.showLogoutPopup = false;
  }

  logout(){
    this.authService.logout()
  }

  openClearContributionsPopup(){
    this.showClearContributionsPopup = true
  }

  openClearExpensesPopup(){
    this.showClearExpensesPopup = true
  }

  closeClearContributionsPopup(){
    this.showClearContributionsPopup = false
  }

  closeClearExpensesPopup(){
    this.showClearExpensesPopup = false
  }

  clearContributions(){
    this.showClearContributionsPopup = false;
    this.contributionService.clearContributions().subscribe((res)=>{
      this.toastr.success(`Contributions cleared`);
    });
  }

  clearExpenses(){
    this.showClearExpensesPopup = false;
    this.expensesService.clearExpenses().subscribe((res)=>{
      this.toastr.success(`Expenses cleared`);
    });
  }

  modeChange(event: string){
    switch(event){
      case 'on':
        document.body.setAttribute('application-theme', 'app-dark');
        localStorage.setItem('application-theme', 'app-dark');
        break;
      case 'off':
        document.body.setAttribute('application-theme', 'app-light');
        localStorage.setItem('application-theme', 'app-light');
        break;
      default:
        break;
    }
  }

}
