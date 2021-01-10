import {Component} from '@angular/core';
import {TransferService} from '../service/transfer.service';
import {Observable} from 'rxjs';
import {Transfer} from '../../../api/api-interfaces';
import {getSimpleDateString} from '../../../util/date-utils';


@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html'
})
export class TransferListComponent {

  headerNames = ['Sportwiec', 'Manager', 'Data transferu', 'Kwota transferu (zł)',
    'Prowizja (%)', 'Wypożyczenie?', 'Kontrakt start', 'Kontrakt koniec', 'Akcje'];
  transfers$: Observable<Transfer[]>;

  constructor(private service: TransferService) {
    this.transfers$ = service.getTransfers();
  }

  getSimpleDate(inputDate: string): string {
    return getSimpleDateString(inputDate);
  }

  deleteRecord(id: number) {
    this.service.deleteTransfer(id).subscribe(res => {
      window.location.reload();
    }, err => {
      console.log(err);
    });
  }

}
