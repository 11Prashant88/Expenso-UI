import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AppRoutingModule } from './app-routing.module';
import { ContributionsComponent } from './contributions/contributions.component';
import { SpendingsComponent } from './spendings/spendings.component';
import { HeaderComponent } from './header/header.component';
import { AddSpendingPopupComponent } from './spendings/add-spending-popup/add-spending-popup.component';
import { UtilizationComponent } from './utilization/utilization.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HelloComponent,
    ContributionsComponent,
    SpendingsComponent,
    UtilizationComponent,
    HeaderComponent,
    AddSpendingPopupComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
