import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Manager} from '../../../api/api-interfaces';
import {getYearsFrom} from '../../../util/date-utils';
import {ManagerService} from '../service/manager.service';
import {AuthService} from '../../auth/service/auth.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html'
})
export class ManagerListComponent {

  headerNames = ['Imię', 'Nazwisko', 'Email', 'Numer telefonu', 'Staż (w latach)', 'Akcje'];
  managers$: Observable<Manager[]>;

  constructor(private service: ManagerService,
              private authService: AuthService) {
    this.managers$ = service.getManagers();
  }

  getEmploymentYears(careerStartDate: string) {
    return getYearsFrom(careerStartDate);
  }

  deleteRecord(id: number) {
    if (!this.authService.loggedIn()) {
      return;
    }

    const confirmed = confirm('Na pewno chcesz usunąć rekord?');

    if (!confirmed) {
      return;
    }

    this.service.deleteManager(id).subscribe(res => {
      alert('Usunięto menadżera');
      window.location.reload();
    }, err => {
      console.log(err);
    });
  }
}
