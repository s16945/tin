import {Component} from '@angular/core';
import {TransferService} from '../service/transfer.service';
import {Observable} from 'rxjs';
import {Transfer} from '../../../api/api-interfaces';
import {getSimpleDateString} from '../../../util/date-utils';
import {AuthService} from '../../auth/service/auth.service';


@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html'
})
export class TransferListComponent {

  headerNames = ['Sportwiec', 'Manager', 'Data transferu', 'Kwota transferu (zł)',
    'Prowizja (%)', 'Wypożyczenie?', 'Kontrakt start', 'Kontrakt koniec', 'Akcje'];
  transfers$: Observable<Transfer[]>;

  constructor(private service: TransferService,
              private authService: AuthService) {
    if (authService.loggedIn()) {
      this.transfers$ = service.getTransfers();
    }
  }

  getSimpleDate(inputDate: string): string {
    return getSimpleDateString(inputDate);
  }

  deleteRecord(id: number) {
    const confirmed = confirm('Na pewno chcesz usunąć rekord?');

    if (!confirmed) {
      return;
    }

    this.service.deleteTransfer(id).subscribe(res => {
      alert('Usunięto transfer');
      window.location.reload();
    }, err => {
      console.log(err);
    });
  }

}
