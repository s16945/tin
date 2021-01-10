import {Component} from '@angular/core';
import {Athlete} from '../../../api/api-interfaces';
import {Observable} from 'rxjs';
import {AthleteService} from '../service/athlete.service';
import {getYearsFrom} from '../../../util/date-utils';

@Component({
  selector: 'app-athletes-list',
  templateUrl: './athlete-list.component.html'
})
export class AthleteListComponent {

  headerNames = ['Imię', 'Nazwisko', 'Email', 'Numer telefonu', 'Wiek', 'Akcje'];
  athletes$: Observable<Athlete[]>;

  constructor(private service: AthleteService) {
    this.athletes$ = service.getAthletes();
  }

  getAthleteAge(birthDate: string) {
    return getYearsFrom(birthDate);
  }

  deleteRecord(id: number) {
    this.service.deleteAthlete(id).subscribe(res => {
      window.location.reload();
    }, err => {
      console.log(err);
    });
  }
}
