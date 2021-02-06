import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Athlete, Transfer} from '../../../api/api-interfaces';
import {Observable} from 'rxjs';
import {ApiPath} from '../../../api/api-path';
import {AbstractService} from '../../../api/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AthleteService extends AbstractService {

  getAthletes(): Observable<Athlete[]> {
    return super.get<Athlete[]>(ApiPath.ATHLETES_PATH());
  }

  getAthleteById(id: number): Observable<Athlete> {
    return super.get<Athlete>(ApiPath.SINGLE_ATHLETE(id));
  }

  createAthlete(athlete: Athlete): Observable<Athlete> {
    return super.post<Athlete>(ApiPath.ATHLETES_PATH(), athlete);
  }

  updateAthlete(id: number, athlete: Athlete): Observable<Athlete> {
    return super.put<Athlete>(ApiPath.SINGLE_ATHLETE(id), athlete);
  }

  deleteAthlete(id: number): Observable<Athlete> {
    return super.delete<Athlete>(ApiPath.SINGLE_ATHLETE(id));
  }

  getAthleteTransferHistory(id: number): Observable<Transfer[]> {
    return super.get<Transfer[]>(ApiPath.SINGLE_ATHLETE_TRANSFERS(id));
  }
}
