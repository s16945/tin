import {Component, OnInit} from '@angular/core';
import {dateValidator, numberValidator} from '../../../util/form/validator/common-validator';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ManagerService} from '../service/manager.service';
import {DatePipe, Location} from '@angular/common';
import {Manager} from '../../../api/api-interfaces';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-manager-form',
  templateUrl: './manager-form.component.html'
})
export class ManagerFormComponent implements OnInit {

  managerForm: FormGroup;
  private idParam$: Observable<number>;

  constructor(private service: ManagerService,
              private location: Location,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {
    this.idParam$ = this.route.paramMap.pipe(map(params => params.get('id') as unknown as number));
  }

  ngOnInit() {
    this.managerForm = new FormGroup({
      firstName: new FormControl('',
        [Validators.required, Validators.minLength(3),
          Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3),
        Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9),
        Validators.maxLength(9), numberValidator()]),
      careerStartDate: new FormControl('', [Validators.required, dateValidator()])
    });

    this.fillOnEdit();
  }

  private fillOnEdit() {
    this.idParam$.pipe(
      filter(id => id !== null),
      switchMap(id => this.service.getManagerById(id))).subscribe(data => {
      this.managerForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        careerStartDate: this.datePipe.transform(data.careerStartDate, 'yyyy-MM-dd'),
      });
    });
  }

  onSubmit() {
    this.managerForm.markAllAsTouched();
    if (!this.managerForm.valid) {
      return;
    }

    const managerObj = this.managerForm.getRawValue() as Manager;

    this.idParam$.pipe(
      switchMap(id => this.service.updateManager(id, managerObj)))
      .subscribe(res => {
        alert('Zapisano informacje na temat menadżera');
        this.goBack();
      }, err => {
        console.log(err);
      });
  }

  goBack() {
    this.location.back();
  }
}
