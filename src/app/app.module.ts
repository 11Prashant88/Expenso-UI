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

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule,
    NgxSpinnersModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-right', timeOut: 2000, easeTime: 500}),
    BrowserAnimationsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    ContributionsComponent,
    ExpensesComponent,
    UtilizationComponent,
    HeaderComponent,
    AddPopupComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
