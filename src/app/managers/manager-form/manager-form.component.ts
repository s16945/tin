import {Component, OnInit} from '@angular/core';
import {dateValidator, numberValidator} from '../../util/form/validator/common-validator';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-manager-form',
  templateUrl: './manager-form.component.html'
})
export class ManagerFormComponent implements OnInit {

  managerForm: FormGroup;

  constructor() {
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

    // do submit
  }
}
