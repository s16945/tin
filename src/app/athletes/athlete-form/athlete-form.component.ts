import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {dateValidator, numberValidator, selectionValidator} from '../../util/form/validator/common-validator';

@Component({
  selector: 'app-athletes-form',
  templateUrl: './athlete-form.component.html'
})
export class AthleteFormComponent implements OnInit {

  athleteForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.athleteForm = new FormGroup({
      firstName: new FormControl('',
        [Validators.required, Validators.minLength(3),
          Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3),
        Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9),
        Validators.maxLength(9), numberValidator()]),
      birthdate: new FormControl('', [Validators.required, dateValidator()]),
      club: new FormControl('', [Validators.required, selectionValidator()]),
      nationality: new FormControl('', [Validators.required, selectionValidator()])
    });
  }

  onSubmit() {
    this.athleteForm.markAllAsTouched();

    // do submit
  }
}
