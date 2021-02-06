import {Component} from '@angular/core';
import {Athlete} from '../../../api/api-interfaces';
import {Observable} from 'rxjs';
import {AthleteService} from '../service/athlete.service';
import {getYearsFrom} from '../../../util/date-utils';
import {AuthService} from '../../auth/service/auth.service';

@Component({
  selector: 'app-athletes-list',
  templateUrl: './athlete-list.component.html'
})
export class AthleteListComponent {

  headerNames = ['Imię', 'Nazwisko', 'Email', 'Numer telefonu', 'Aktualny klub', 'Wiek', 'Akcje'];
  athletes$: Observable<Athlete[]>;

  constructor(private service: AthleteService,
              private authService: AuthService) {
    this.athletes$ = service.getAthletes();
  }

  getAthleteAge(birthDate: string) {
    return getYearsFrom(birthDate);
  }

  deleteRecord(id: number) {
    if (!this.authService.loggedIn()) {
      return;
    }

    const confirmed = confirm('Na pewno chcesz usunąć rekord?');

    if (!confirmed) {
      return;
    }

    this.service.deleteAthlete(id).subscribe(res => {
      alert('Usunięto sportowca');
      window.location.reload();
    }, err => {
      console.log(err);
    });
  }
}
