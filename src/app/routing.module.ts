import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerListComponent} from './components/managers/manager-list/manager-list.component';
import {HomeComponent} from './components/home/home.component';
import {ManagerFormComponent} from './components/managers/manager-form/manager-form.component';
import {AthleteFormComponent} from './components/athletes/athlete-form/athlete-form.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {TransferFormComponent} from './components/transfers/transfer-form/transfer-form.component';
import {AthleteDetailsComponent} from './components/athletes/athlete-details/athlete-details.component';
import {AthleteListComponent} from './components/athletes/athlete-list/athlete-list.component';
import {TransferListComponent} from './components/transfers/transfer-list/transfer-list.component';
import {AuthenticationGuard} from './util/authentication.guard'; // CLI imports router

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'managers', component: ManagerListComponent},
  {
    path: 'managers', children: [
      {path: 'edit/:id', component: ManagerFormComponent, canActivate: [AuthenticationGuard]}
    ]
  },
  {path: 'athletes', component: AthleteListComponent},
  {
    path: 'athletes', children: [
      {path: 'add', component: AthleteFormComponent, canActivate: [AuthenticationGuard]},
      {path: 'edit/:id', component: AthleteFormComponent, canActivate: [AuthenticationGuard]},
      {path: 'details/:id', component: AthleteDetailsComponent}
    ]
  },
  {path: 'transfers', component: TransferListComponent},
  {
    path: 'transfers', children: [
      {path: 'add', component: TransferFormComponent, canActivate: [AuthenticationGuard]},
      {path: 'edit/:id', component: TransferFormComponent, canActivate: [AuthenticationGuard]}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class AppRoutingModule {
}
