/* tslint:disable:no-string-literal */
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  dateAfterOtherDateValidator,
  dateValidator,
  numberRangeValidator,
  numberValidator,
  selectionValidator
} from '../../../util/form/validator/common-validator';
import {Athlete, Manager} from '../../../api/api-interfaces';
import {TransferService} from '../service/transfer.service';
import {DatePipe, Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {filter, first, flatMap, map, shareReplay, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AthleteService} from '../../athletes/service/athlete.service';
import {ManagerService} from '../../managers/service/manager.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html'
})
export class TransferFormComponent implements OnInit {

  transferForm: FormGroup;
  contractDatesGroup: FormGroup;
  private idParam$: Observable<number>;
  athletes$: Observable<Athlete[]>;
  managers$: Observable<Manager[]>;
  currentClub = '';

  constructor(private service: TransferService,
              private location: Location,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private athleteService: AthleteService,
              private managerService: ManagerService) {
    this.idParam$ = this.route.paramMap.pipe(map(params => params.get('id') as unknown as number));
  }

  ngOnInit() {
    this.contractDatesGroup = new FormGroup({
      contractStartDate: new FormControl('', [Validators.required, dateValidator()]),
      contractEndDate: new FormControl('', [Validators.required, dateValidator()]),
    }, [dateAfterOtherDateValidator('contractStartDate', 'contractEndDate')]);

    this.transferForm = new FormGroup({
      athlete_id: new FormControl('',
        [Validators.required, selectionValidator()]),
      manager_id: new FormControl('', [Validators.required, selectionValidator()]),
      newClub: new FormControl('', [Validators.required, selectionValidator()]),
      transferDate: new FormControl('', [Validators.required, dateValidator()]),
      price: new FormControl('', [Validators.required, numberValidator()]),
      commission: new FormControl('', [Validators.required, numberRangeValidator(0, 100)]),
      isLoan: new FormControl(''),
      contractDatesGroup: this.contractDatesGroup
    });

    this.initAthletes();
    this.initManagers();

    this.fillOnEdit();
  }

  private initAthletes() {
    this.athletes$ = this.athleteService.getAthletes().pipe(shareReplay(1));
  }

  private initManagers() {
    this.managers$ = this.managerService.getManagers();
  }

  private fillOnEdit() {
    this.idParam$.pipe(
      filter(id => id !== null),
      switchMap(id => this.service.getTransferById(id))).subscribe(data => {
      this.athletes$.subscribe(res => {
        this.updateCurrentClub(data.athlete_id);
      });

      this.contractDatesGroup.patchValue({
        contractStartDate: this.datePipe.transform(data.contractStartDate, 'yyyy-MM-dd'),
        contractEndDate: this.datePipe.transform(data.contractEndDate, 'yyyy-MM-dd')
      });

      this.transferForm.patchValue({
        athlete_id: data.athlete_id,
        manager_id: data.manager_id,
        newClub: data.newClub,
        transferDate: this.datePipe.transform(data.transferDate, 'yyyy-MM-dd'),
        price: data.price,
        commission: data.commission,
        isLoan: data.isLoan,
        contractDatesGroup: this.contractDatesGroup
      });
    });
  }

  onSubmit() {
    this.transferForm.markAllAsTouched();
    const transferObj = this.transferForm.getRawValue();
    const datesGroup = this.transferForm.get('contractDatesGroup');
    const contractStartDate = datesGroup.get('contractStartDate');
    const contractEndDate = datesGroup.get('contractEndDate');

    transferObj.contractStartDate = contractStartDate.value;
    transferObj.contractEndDate = contractEndDate.value;

    delete transferObj['contractDatesGroup'];

    this.idParam$.pipe(
      switchMap(id => {
        if (!id) {
          return this.service.createTransfer(transferObj);
        } else {
          return this.service.updateTransfer(id, transferObj);
        }
      })).subscribe(res => {
      alert('Zapisano dane na temat transferu');
      this.goBack();
    }, err => {
      console.log(err);
    });
  }

  goBack() {
    this.location.back();
  }

  updateCurrentClub(selectedId: any) {
    this.athletes$.pipe(
      flatMap(athletes => athletes),
      first(athlete => {
        return +athlete._id === +selectedId;
      })
    ).subscribe(athlete => {
      this.currentClub = athlete.currentClub;
    });
  }
}
