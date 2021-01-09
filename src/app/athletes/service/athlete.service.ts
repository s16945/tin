import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Athlete} from '../../api/api-interfaces';
import {Observable} from 'rxjs';
import {ApiPath} from '../../api/api-path';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  constructor(public http: HttpClient) {
  }

  getAthletes(): Observable<Athlete[]> {
    return this.http.get<Athlete[]>(ApiPath.ATHLETES_PATH());
  }

  getAthleteById(id: number): Observable<Athlete> {
    return this.http.get<Athlete>(ApiPath.SINGLE_ATHLETE(id));
  }

  createAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(ApiPath.ATHLETES_PATH(), athlete);
  }

  updateAthlete(id: number, athlete: Athlete): Observable<Athlete> {
    return this.http.put<Athlete>(ApiPath.SINGLE_ATHLETE(id), athlete);
  }

  deleteAthlete(id: number): Observable<Athlete> {
    return this.http.delete<Athlete>(ApiPath.SINGLE_ATHLETE(id));
  }
}
