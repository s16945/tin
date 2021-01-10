import {Component, OnInit} from '@angular/core';
import {dateValidator, numberValidator} from '../../../util/form/validator/common-validator';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ManagerService} from '../service/manager.service';
import {Location} from '@angular/common';
import {Manager} from '../../../api/api-interfaces';

@Component({
  selector: 'app-manager-form',
  templateUrl: './manager-form.component.html'
})
export class ManagerFormComponent implements OnInit {

  managerForm: FormGroup;

  constructor(private service: ManagerService,
              private location: Location) {
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
  }

  onSubmit() {
    this.managerForm.markAllAsTouched();
    const managerObj = this.managerForm.getRawValue() as Manager;

    this.service.createManager(managerObj).subscribe(res => {
      this.goBack();
    }, err => {
      console.log(err);
    });
  }

  goBack() {
    this.location.back();
  }
}
