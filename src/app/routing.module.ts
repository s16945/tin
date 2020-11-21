import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerListComponent} from './managers/manager-list/manager-list.component';
import {HomeComponent} from './home/home.component';
import {AthleteListComponent} from './athletes/athlete-list/athlete-list.component';
import {TransferListComponent} from './transfers/transfer-list/transfer-list.component';
import {ManagerFormComponent} from './managers/manager-form/manager-form.component';
import {AthleteFormComponent} from './athletes/athlete-form/athlete-form.component';
import {TransferFormComponent} from './transfers/transfer-form/transfer-form.component'; // CLI imports router

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'managers', component: ManagerListComponent },
  { path: 'managers/edit', component: ManagerFormComponent },
  { path: 'athletes', component: AthleteListComponent },
  { path: 'athletes/edit', component: AthleteFormComponent },
  { path: 'transfers', component: TransferListComponent },
  { path: 'transfers/edit', component: TransferFormComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
