import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {dateValidator, numberValidator} from '../../../util/form/validator/common-validator';
import {AthleteService} from '../service/athlete.service';
import {DatePipe, Location} from '@angular/common';
import {Athlete} from '../../../api/api-interfaces';
import {filter, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-athletes-form',
  templateUrl: './athlete-form.component.html'
})
export class AthleteFormComponent implements OnInit {

  athleteForm: FormGroup;
  private idParam$: Observable<number>;

  constructor(private service: AthleteService,
              private location: Location,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {
    this.idParam$ = this.route.paramMap.pipe(map(params => params.get('id') as unknown as number));
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
      currentClub: new FormControl('', [Validators.required, Validators.minLength(3),
        Validators.maxLength(20)])
    });

    this.fillOnEdit();
  }

  private fillOnEdit() {
    this.idParam$.pipe(
      filter(id => id !== null),
      switchMap(id => this.service.getAthleteById(id))).subscribe(data => {
      this.athleteForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        birthdate: this.datePipe.transform(data.birthDate, 'yyyy-MM-dd'),
        currentClub: data.currentClub
      });
    });
  }

  onSubmit() {
    this.athleteForm.markAllAsTouched();
    if (!this.athleteForm.valid) {
      return;
    }

    const athleteObj = this.athleteForm.getRawValue() as Athlete;

    this.idParam$.pipe(
      switchMap(id => {
        if (!id) {
          return this.service.createAthlete(athleteObj);
        } else {
          return this.service.updateAthlete(id, athleteObj);
        }
      })).subscribe(res => {
      alert('Zapisano dane na temat sportowca');
      this.goBack();
    }, err => {
      console.log(err);
    });
  }

  goBack() {
    this.location.back();
  }
}
