import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Manager} from '../../../api/api-interfaces';
import {ApiPath} from '../../../api/api-path';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(public http: HttpClient) {
  }

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(ApiPath.MANAGERS_PATH());
  }

  getManagerById(id: number): Observable<Manager> {
    return this.http.get<Manager>(ApiPath.SINGLE_MANAGER(id));
  }

  createManager(athlete: Manager): Observable<Manager> {
    return this.http.post<Manager>(ApiPath.MANAGERS_PATH(), athlete);
  }

  updateManager(id: number, athlete: Manager): Observable<Manager> {
    return this.http.put<Manager>(ApiPath.SINGLE_MANAGER(id), athlete);
  }

  deleteManager(id: number): Observable<Manager> {
    return this.http.delete<Manager>(ApiPath.SINGLE_MANAGER(id));
  }
}
