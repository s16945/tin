import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transfer} from '../../api/api-interfaces';
import {ApiPath} from '../../api/api-path';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(public http: HttpClient) {
  }

  getTransfers(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(ApiPath.TRANSFERS_PATH());
  }

  getTransferById(id: number): Observable<Transfer> {
    return this.http.get<Transfer>(ApiPath.SINGLE_TRANSFER(id));
  }

  createTransfer(athlete: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(ApiPath.TRANSFERS_PATH(), athlete);
  }

  updateTransfer(id: number, athlete: Transfer): Observable<Transfer> {
    return this.http.put<Transfer>(ApiPath.SINGLE_TRANSFER(id), athlete);
  }

  deleteTransfer(id: number): Observable<Transfer> {
    return this.http.delete<Transfer>(ApiPath.SINGLE_TRANSFER(id));
  }

  deleteManyTransfers(ids: number[]): Observable<Transfer> {
    const paramList: HttpParams = new HttpParams().set('transferIds', ids.join(','));
    return this.http.delete<Transfer>(ApiPath.TRANSFERS_PATH(), {
      params: paramList
    });
  }
}
