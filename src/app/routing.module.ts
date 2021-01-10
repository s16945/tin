import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerListComponent} from './components/managers/manager-list/manager-list.component';
import {HomeComponent} from './components/home/home.component';
import {AthleteListComponent} from './components/athletes/athlete-list/athlete-list.component';
import {TransferListComponent} from './components/transfers/transfer-list/transfer-list.component';
import {ManagerFormComponent} from './components/managers/manager-form/manager-form.component';
import {AthleteFormComponent} from './components/athletes/athlete-form/athlete-form.component';
import {TransferFormComponent} from './components/transfers/transfer-form/transfer-form.component';
import {LoginComponent} from './components/auth/login/login.component'; // CLI imports router

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'managers', component: ManagerListComponent },
  { path: 'managers/edit', component: ManagerFormComponent },
  { path: 'athletes', component: AthleteListComponent },
  { path: 'athletes/edit', component: AthleteFormComponent },
  { path: 'transfers', component: TransferListComponent },
  { path: 'transfers/edit', component: TransferFormComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
