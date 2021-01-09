import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MainComponent} from './main.component';
import {AppRoutingModule} from './routing.module';
import {ManagerListComponent} from './managers/manager-list/manager-list.component';
import {HomeComponent} from './home/home.component';
import {AthleteListComponent} from './athletes/athlete-list/athlete-list.component';
import {TransferListComponent} from './transfers/transfer-list/transfer-list.component';
import {ManagerFormComponent} from './managers/manager-form/manager-form.component';
import {AthleteFormComponent} from './athletes/athlete-form/athlete-form.component';
import {TransferFormComponent} from './transfers/transfer-form/transfer-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MainComponent,
    ManagerListComponent,
    HomeComponent,
    AthleteListComponent,
    TransferListComponent,
    ManagerFormComponent,
    AthleteFormComponent,
    TransferFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class MainModule {
}
