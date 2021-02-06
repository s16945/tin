import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transfer} from '../../../api/api-interfaces';
import {ApiPath} from '../../../api/api-path';
import {AbstractService} from '../../../api/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService extends AbstractService {

  getTransfers(): Observable<Transfer[]> {
    return super.get<Transfer[]>(ApiPath.TRANSFERS_PATH());
  }

  getTransferById(id: number): Observable<Transfer> {
    return super.get<Transfer>(ApiPath.SINGLE_TRANSFER(id));
  }

  createTransfer(athlete: Transfer): Observable<Transfer> {
    return super.post<Transfer>(ApiPath.TRANSFERS_PATH(), athlete);
  }

  updateTransfer(id: number, athlete: Transfer): Observable<Transfer> {
    return super.put<Transfer>(ApiPath.SINGLE_TRANSFER(id), athlete);
  }

  deleteTransfer(id: number): Observable<Transfer> {
    return super.delete<Transfer>(ApiPath.SINGLE_TRANSFER(id));
  }

  deleteManyTransfers(ids: number[]): Observable<Transfer> {
    const paramList: HttpParams = new HttpParams().set('transferIds', ids.join(','));
    return super.delete<Transfer>(ApiPath.TRANSFERS_PATH(), paramList);
  }
}
