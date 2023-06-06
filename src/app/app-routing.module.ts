import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SettingsComponent } from './settings/settings.component';
import { UtilizationComponent } from './utilization/utilization.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/contributions',
    pathMatch: 'full',
  },
  {
    path: 'contributions',
    component: ContributionsComponent,
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
  },
  {
    path: 'utilization',
    component: UtilizationComponent,
  },
  {
    path:'birthdays',
    component: BirthdaysComponent
  },
  {
    path:'settings',
    component: SettingsComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
