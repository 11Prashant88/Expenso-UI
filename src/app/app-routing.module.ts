import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContributionsComponent } from './contributions/contributions.component';
import { SpendingsComponent } from './spendings/spendings.component';
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
    path: 'spendings',
    component: SpendingsComponent,
  },
  {
    path: 'utilization',
    component: UtilizationComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
