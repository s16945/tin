import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {dateValidator, numberValidator, selectionValidator} from '../../../util/form/validator/common-validator';
import {AthleteService} from '../service/athlete.service';
import {Location} from '@angular/common';
import {Athlete} from '../../../api/api-interfaces';

@Component({
  selector: 'app-athletes-form',
  templateUrl: './athlete-form.component.html'
})
export class AthleteFormComponent implements OnInit {

  athleteForm: FormGroup;

  constructor(private service: AthleteService,
              private location: Location) {
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
    });
  }

  onSubmit() {
    this.athleteForm.markAllAsTouched();
    const athleteObj = this.athleteForm.getRawValue() as Athlete;

    this.service.createAthlete(athleteObj).subscribe(res => {
      this.goBack();
    }, err => {
      console.log(err);
    });
  }

  goBack() {
    this.location.back();
  }
}
