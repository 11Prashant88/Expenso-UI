import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AppRoutingModule } from './app-routing.module';
import { ContributionsComponent } from './contributions/contributions.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HeaderComponent } from './header/header.component';
import { UtilizationComponent } from './utilization/utilization.component';
import { AddPopupComponent } from './add-popup/add-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnersModule } from 'ngx-spinners'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { ActionsPopupComponent } from './actions-popup/actions-popup.component';
import { ContributionComponent } from './contributions/contribution/contribution.component';
import { ExpenseComponent } from './expenses/expense/expense.component';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { BirthdayComponent } from './birthdays/birthday/birthday.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule,
    NgxSpinnersModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-right', timeOut: 2000, easeTime: 500}),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  declarations: [
    AppComponent,
    HelloComponent,
    ContributionsComponent,
    ExpensesComponent,
    UtilizationComponent,
    HeaderComponent,
    AddPopupComponent,
    LoginComponent,
    SettingsComponent,
    ConfirmationPopupComponent,
    ErrorPopupComponent,
    ActionsPopupComponent,
    ContributionComponent,
    ExpenseComponent,
    BirthdaysComponent,
    BirthdayComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
