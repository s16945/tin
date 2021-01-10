import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Manager} from '../../../api/api-interfaces';
import {getYearsFrom} from '../../../util/date-utils';
import {ManagerService} from '../service/manager.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html'
})
export class ManagerListComponent {

  headerNames = ['Imię', 'Nazwisko', 'Email', 'Numer telefonu', 'Staż (w latach)', 'Akcje'];
  managers$: Observable<Manager[]>;

  constructor(private service: ManagerService) {
    this.managers$ = service.getManagers();
  }

  getEmploymentYears(careerStartDate: string) {
    return getYearsFrom(careerStartDate);
  }

  deleteRecord(id: number) {
    this.service.deleteManager(id).subscribe(res => {
      window.location.reload();
    }, err => {
      console.log(err);
    });
  }
}
