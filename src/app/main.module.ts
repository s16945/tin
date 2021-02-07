import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MainComponent} from './main.component';
import {AppRoutingModule} from './routing.module';
import {ManagerListComponent} from './components/managers/manager-list/manager-list.component';
import {HomeComponent} from './components/home/home.component';
import {AthleteListComponent} from './components/athletes/athlete-list/athlete-list.component';
import {TransferListComponent} from './components/transfers/transfer-list/transfer-list.component';
import {ManagerFormComponent} from './components/managers/manager-form/manager-form.component';
import {AthleteFormComponent} from './components/athletes/athlete-form/athlete-form.component';
import {TransferFormComponent} from './components/transfers/transfer-form/transfer-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {AthleteDetailsComponent} from './components/athletes/athlete-details/athlete-details.component';
import {DatePipe} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    MainComponent,
    ManagerListComponent,
    HomeComponent,
    AthleteListComponent,
    TransferListComponent,
    ManagerFormComponent,
    AthleteFormComponent,
    TransferFormComponent,
    LoginComponent,
    RegisterComponent,
    AthleteDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost'],
        disallowedRoutes: ['localhost:3000/api/login', 'localhost:3000/api/register']
      }
    })
  ],
  providers: [DatePipe],
  bootstrap: [MainComponent],
})
export class MainModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
