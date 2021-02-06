import {Component} from '@angular/core';
import {AthleteService} from '../service/athlete.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Athlete, Transfer} from '../../../api/api-interfaces';
import {getSimpleDateString, getYearsFrom} from '../../../util/date-utils';

@Component({
  selector: 'app-athletes-details',
  templateUrl: './athlete-details.component.html',
  styleUrls: ['./athlete-details.component.scss']
})
export class AthleteDetailsComponent {
  athlete$: Observable<Athlete>;
  transferHistory$: Observable<Transfer[]>;
  headerNames = ['Manager', 'Data transferu', 'Kwota transferu (zł)',
    'Prowizja (%)', 'Wypożyczenie?', 'Kontrakt start', 'Kontrakt koniec'];

  constructor(private service: AthleteService,
              private route: ActivatedRoute) {
    this.athlete$ = this.route.paramMap.pipe(map(params => +params.get('id')), switchMap(id => service.getAthleteById(id)));
    this.transferHistory$ = this.athlete$.pipe(switchMap(athlete => this.service.getAthleteTransferHistory(athlete._id)));
  }

  getAthleteAge(birthDate: string) {
    return getYearsFrom(birthDate);
  }

  getSimpleDate(inputDate: string): string {
    return getSimpleDateString(inputDate);
  }

}
