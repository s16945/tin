import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Manager} from '../../../api/api-interfaces';
import {ApiPath} from '../../../api/api-path';
import {HttpClient} from '@angular/common/http';
import {AbstractService} from '../../../api/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService extends AbstractService {

  getManagers(): Observable<Manager[]> {
    return super.get<Manager[]>(ApiPath.MANAGERS_PATH());
  }

  getManagerById(id: number): Observable<Manager> {
    return super.get<Manager>(ApiPath.SINGLE_MANAGER(id));
  }

  updateManager(id: number, athlete: Manager): Observable<Manager> {
    return super.put<Manager>(ApiPath.SINGLE_MANAGER(id), athlete);
  }

  deleteManager(id: number): Observable<Manager> {
    return super.delete<Manager>(ApiPath.SINGLE_MANAGER(id));
  }
}
